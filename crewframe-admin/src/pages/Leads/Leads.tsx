import { useEffect, useState } from "react";
import { api } from "../../lib/api";
import type { Lead, LeadStatus } from "../../types";
import ConfirmDialog from "../../components/ConfirmDialog/ConfirmDialog";
import { IconTrash, IconSearch } from "../../components/Icons";
import "./Leads.css";

const TABS: { key: "all" | LeadStatus; label: string }[] = [
  { key: "all", label: "All" },
  { key: "new", label: "New" },
  { key: "contacted", label: "Contacted" },
  { key: "won", label: "Won" },
  { key: "archived", label: "Archived" },
];

const STATUS_OPTIONS: LeadStatus[] = ["new", "contacted", "won", "archived"];

export default function Leads() {
  const [leads, setLeads] = useState<Lead[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [tab, setTab] = useState<"all" | LeadStatus>("all");
  const [q, setQ] = useState("");
  const [toDelete, setToDelete] = useState<Lead | null>(null);
  const [busyId, setBusyId] = useState<string | null>(null);

  async function load() {
    setLoading(true);
    setError(null);
    try {
      const query = tab === "all" ? "" : `?status=${tab}`;
      const data = await api.get<Lead[]>(`/leads${query}`);
      setLeads(data);
    } catch (e) {
      setError(e instanceof Error ? e.message : "Failed to load leads");
    } finally {
      setLoading(false);
    }
  }

  useEffect(() => {
    load();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [tab]);

  async function updateStatus(lead: Lead, status: LeadStatus) {
    setBusyId(lead._id);
    try {
      const updated = await api.patch<Lead>(`/leads/${lead._id}`, { status });
      setLeads((prev) => prev.map((l) => (l._id === lead._id ? updated : l)));
    } catch (e) {
      setError(e instanceof Error ? e.message : "Failed to update status");
    } finally {
      setBusyId(null);
    }
  }

  async function confirmDelete() {
    if (!toDelete) return;
    setBusyId(toDelete._id);
    try {
      await api.del(`/leads/${toDelete._id}`);
      setLeads((prev) => prev.filter((l) => l._id !== toDelete._id));
      setToDelete(null);
    } catch (e) {
      setError(e instanceof Error ? e.message : "Failed to delete lead");
    } finally {
      setBusyId(null);
    }
  }

  const filtered = leads.filter((l) => {
    if (!q.trim()) return true;
    const s = q.toLowerCase();
    return (
      l.firstName.toLowerCase().includes(s) ||
      l.lastName.toLowerCase().includes(s) ||
      l.email.toLowerCase().includes(s) ||
      (l.trade || "").toLowerCase().includes(s)
    );
  });

  return (
    <div>
      <div className="page-head">
        <div>
          <h2 className="page-title">Leads</h2>
          <p className="page-sub">Every contact-form submission from the site, newest first.</p>
        </div>
        <div className="leads-search">
          <IconSearch size={16} />
          <input placeholder="Search name, email, trade…" value={q} onChange={(e) => setQ(e.target.value)} />
        </div>
      </div>

      <div className="leads-tabs">
        {TABS.map((t) => (
          <button key={t.key} className={`leads-tab ${tab === t.key ? "is-active" : ""}`} onClick={() => setTab(t.key)}>
            {t.label}
          </button>
        ))}
      </div>

      {error && <div className="form-err" style={{ marginBottom: 16 }}>{error}</div>}

      <div className="card">
        {loading ? (
          <div className="empty-state">
            <div className="spinner" style={{ margin: "0 auto 12px" }} />
            Loading…
          </div>
        ) : filtered.length === 0 ? (
          <div className="empty-state">No leads match this view.</div>
        ) : (
          <div className="table-wrap">
            <table className="dt">
              <thead>
                <tr>
                  <th>Name</th>
                  <th>Email</th>
                  <th>Trade</th>
                  <th>Message</th>
                  <th>Received</th>
                  <th>Status</th>
                  <th></th>
                </tr>
              </thead>
              <tbody>
                {filtered.map((l) => (
                  <tr key={l._id}>
                    <td style={{ color: "var(--text)", fontWeight: 600 }}>
                      {l.firstName} {l.lastName}
                    </td>
                    <td>
                      <a href={`mailto:${l.email}`} className="leads-email-link">
                        {l.email}
                      </a>
                    </td>
                    <td>{l.trade || "—"}</td>
                    <td className="leads-msg" title={l.message}>
                      {l.message || "—"}
                    </td>
                    <td>{new Date(l.createdAt).toLocaleDateString()}</td>
                    <td>
                      <select
                        className={`leads-status-select badge badge-${l.status}`}
                        value={l.status}
                        disabled={busyId === l._id}
                        onChange={(e) => updateStatus(l, e.target.value as LeadStatus)}
                      >
                        {STATUS_OPTIONS.map((s) => (
                          <option key={s} value={s}>
                            {s}
                          </option>
                        ))}
                      </select>
                    </td>
                    <td>
                      <button className="btn btn-ghost btn-icon" onClick={() => setToDelete(l)} aria-label="Delete lead">
                        <IconTrash size={16} />
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </div>

      <ConfirmDialog
        open={!!toDelete}
        title="Delete lead"
        message={`Delete the submission from ${toDelete?.firstName} ${toDelete?.lastName}? This can't be undone.`}
        confirmLabel="Delete"
        busy={!!busyId}
        onConfirm={confirmDelete}
        onCancel={() => setToDelete(null)}
      />
    </div>
  );
}
