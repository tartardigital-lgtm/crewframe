import { useEffect, useState, type SyntheticEvent } from "react";
import { api } from "../../lib/api";
import type { Testimonial } from "../../types";
import Modal from "../../components/Modal/Modal";
import ConfirmDialog from "../../components/ConfirmDialog/ConfirmDialog";
import { IconPlus, IconEdit, IconTrash, IconStar } from "../../components/Icons";
import "./Testimonials.css";

const emptyForm = {
  quote: "",
  name: "",
  company: "",
  avatar: "",
  stars: 5,
  order: 1,
};

type FormState = typeof emptyForm;

export default function Testimonials() {
  const [items, setItems] = useState<Testimonial[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const [modalOpen, setModalOpen] = useState(false);
  const [editing, setEditing] = useState<Testimonial | null>(null);
  const [form, setForm] = useState<FormState>(emptyForm);
  const [saving, setSaving] = useState(false);
  const [formErr, setFormErr] = useState<string | null>(null);

  const [toDelete, setToDelete] = useState<Testimonial | null>(null);
  const [deleting, setDeleting] = useState(false);

  async function load() {
    setLoading(true);
    setError(null);
    try {
      setItems(await api.get<Testimonial[]>("/testimonials"));
    } catch (e) {
      setError(e instanceof Error ? e.message : "Failed to load testimonials");
    } finally {
      setLoading(false);
    }
  }

  useEffect(() => {
    load();
  }, []);

  function openCreate() {
    setEditing(null);
    setForm({ ...emptyForm, order: items.length + 1 });
    setFormErr(null);
    setModalOpen(true);
  }

  function openEdit(t: Testimonial) {
    setEditing(t);
    setForm({ quote: t.quote, name: t.name, company: t.company, avatar: t.avatar, stars: t.stars, order: t.order });
    setFormErr(null);
    setModalOpen(true);
  }

  async function onSubmit(e: SyntheticEvent) {
    e.preventDefault();
    setSaving(true);
    setFormErr(null);
    try {
      const payload = { ...form, stars: Number(form.stars), order: Number(form.order) || 0 };
      if (editing) {
        const updated = await api.put<Testimonial>(`/testimonials/${editing._id}`, payload);
        setItems((prev) => prev.map((t) => (t._id === editing._id ? updated : t)));
      } else {
        const created = await api.post<Testimonial>("/testimonials", payload);
        setItems((prev) => [...prev, created]);
      }
      setModalOpen(false);
    } catch (err) {
      setFormErr(err instanceof Error ? err.message : "Failed to save");
    } finally {
      setSaving(false);
    }
  }

  async function confirmDelete() {
    if (!toDelete) return;
    setDeleting(true);
    try {
      await api.del(`/testimonials/${toDelete._id}`);
      setItems((prev) => prev.filter((t) => t._id !== toDelete._id));
      setToDelete(null);
    } catch (e) {
      setError(e instanceof Error ? e.message : "Failed to delete");
    } finally {
      setDeleting(false);
    }
  }

  return (
    <div>
      <div className="page-head">
        <div>
          <h2 className="page-title">Testimonials</h2>
          <p className="page-sub">Client quotes shown in the Testimonials carousel.</p>
        </div>
        <button className="btn btn-primary" onClick={openCreate}>
          <IconPlus size={16} /> Add testimonial
        </button>
      </div>

      {error && <div className="form-err" style={{ marginBottom: 16 }}>{error}</div>}

      {loading ? (
        <div className="empty-state">
          <div className="spinner" style={{ margin: "0 auto 12px" }} />
          Loading…
        </div>
      ) : items.length === 0 ? (
        <div className="card empty-state">No testimonials yet.</div>
      ) : (
        <div className="testi-grid">
          {items.map((t) => (
            <div key={t._id} className="testi-card">
              <div className="testi-stars">
                {Array.from({ length: 5 }).map((_, i) => (
                  <IconStar key={i} size={13} filled={i < t.stars} />
                ))}
              </div>
              <p className="testi-quote">"{t.quote}"</p>
              <div className="testi-person">
                <div className="testi-avatar" style={{ backgroundImage: `url(${t.avatar})` }} />
                <div>
                  <div className="testi-name">{t.name}</div>
                  <div className="testi-company">{t.company}</div>
                </div>
              </div>
              <div className="work-card-actions">
                <button className="btn btn-ghost btn-sm" onClick={() => openEdit(t)}>
                  <IconEdit size={14} /> Edit
                </button>
                <button className="btn btn-danger btn-sm" onClick={() => setToDelete(t)}>
                  <IconTrash size={14} />
                </button>
              </div>
            </div>
          ))}
        </div>
      )}

      <Modal
        open={modalOpen}
        onClose={() => setModalOpen(false)}
        title={editing ? "Edit testimonial" : "Add testimonial"}
        footer={
          <>
            <button className="btn btn-ghost" onClick={() => setModalOpen(false)}>
              Cancel
            </button>
            <button className="btn btn-primary" onClick={onSubmit} disabled={saving}>
              {saving ? "Saving…" : "Save"}
            </button>
          </>
        }
      >
        <form onSubmit={onSubmit} className="adm-form-grid">
          {formErr && <div className="form-err">{formErr}</div>}
          <div className="field adm-span-2">
            <label>Quote</label>
            <textarea required value={form.quote} onChange={(e) => setForm({ ...form, quote: e.target.value })} />
          </div>
          <div className="field">
            <label>Name</label>
            <input required value={form.name} onChange={(e) => setForm({ ...form, name: e.target.value })} />
          </div>
          <div className="field">
            <label>Company / role</label>
            <input value={form.company} onChange={(e) => setForm({ ...form, company: e.target.value })} />
          </div>
          <div className="field adm-span-2">
            <label>Avatar image URL</label>
            <input value={form.avatar} onChange={(e) => setForm({ ...form, avatar: e.target.value })} />
          </div>
          <div className="field">
            <label>Stars (0–5)</label>
            <input type="number" min={0} max={5} value={form.stars} onChange={(e) => setForm({ ...form, stars: Number(e.target.value) })} />
          </div>
          <div className="field">
            <label>Order</label>
            <input type="number" value={form.order} onChange={(e) => setForm({ ...form, order: Number(e.target.value) })} />
          </div>
        </form>
      </Modal>

      <ConfirmDialog
        open={!!toDelete}
        title="Delete testimonial"
        message={`Delete the testimonial from ${toDelete?.name}? This can't be undone.`}
        confirmLabel="Delete"
        busy={deleting}
        onConfirm={confirmDelete}
        onCancel={() => setToDelete(null)}
      />
    </div>
  );
}
