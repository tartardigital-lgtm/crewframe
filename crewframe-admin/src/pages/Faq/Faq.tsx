import { useEffect, useState, type SyntheticEvent } from "react";
import { api } from "../../lib/api";
import type { FaqItem } from "../../types";
import Modal from "../../components/Modal/Modal";
import ConfirmDialog from "../../components/ConfirmDialog/ConfirmDialog";
import { IconPlus, IconEdit, IconTrash } from "../../components/Icons";
import "./Faq.css";

const emptyForm = { q: "", a: "", order: 1 };
type FormState = typeof emptyForm;

export default function Faq() {
  const [items, setItems] = useState<FaqItem[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const [modalOpen, setModalOpen] = useState(false);
  const [editing, setEditing] = useState<FaqItem | null>(null);
  const [form, setForm] = useState<FormState>(emptyForm);
  const [saving, setSaving] = useState(false);
  const [formErr, setFormErr] = useState<string | null>(null);

  const [toDelete, setToDelete] = useState<FaqItem | null>(null);
  const [deleting, setDeleting] = useState(false);

  async function load() {
    setLoading(true);
    setError(null);
    try {
      setItems(await api.get<FaqItem[]>("/faq"));
    } catch (e) {
      setError(e instanceof Error ? e.message : "Failed to load FAQ");
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

  function openEdit(item: FaqItem) {
    setEditing(item);
    setForm({ q: item.q, a: item.a, order: item.order });
    setFormErr(null);
    setModalOpen(true);
  }

  async function onSubmit(e: SyntheticEvent) {
    e.preventDefault();
    setSaving(true);
    setFormErr(null);
    try {
      const payload = { ...form, order: Number(form.order) || 0 };
      if (editing) {
        const updated = await api.put<FaqItem>(`/faq/${editing._id}`, payload);
        setItems((prev) => prev.map((i) => (i._id === editing._id ? updated : i)));
      } else {
        const created = await api.post<FaqItem>("/faq", payload);
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
      await api.del(`/faq/${toDelete._id}`);
      setItems((prev) => prev.filter((i) => i._id !== toDelete._id));
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
          <h2 className="page-title">FAQ</h2>
          <p className="page-sub">Questions and answers shown in the FAQ accordion.</p>
        </div>
        <button className="btn btn-primary" onClick={openCreate}>
          <IconPlus size={16} /> Add question
        </button>
      </div>

      {error && <div className="form-err" style={{ marginBottom: 16 }}>{error}</div>}

      {loading ? (
        <div className="empty-state">
          <div className="spinner" style={{ margin: "0 auto 12px" }} />
          Loading…
        </div>
      ) : items.length === 0 ? (
        <div className="card empty-state">No FAQ items yet.</div>
      ) : (
        <div className="faq-list">
          {items.map((item) => (
            <div key={item._id} className="faq-row card">
              <div className="faq-row-body">
                <h4>{item.q}</h4>
                <p>{item.a}</p>
              </div>
              <div className="faq-row-actions">
                <button className="btn btn-ghost btn-sm" onClick={() => openEdit(item)}>
                  <IconEdit size={14} /> Edit
                </button>
                <button className="btn btn-danger btn-sm" onClick={() => setToDelete(item)}>
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
        title={editing ? "Edit FAQ item" : "Add FAQ item"}
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
        <form onSubmit={onSubmit} className="adm-form-grid" style={{ gridTemplateColumns: "1fr" }}>
          {formErr && <div className="form-err">{formErr}</div>}
          <div className="field">
            <label>Question</label>
            <input required value={form.q} onChange={(e) => setForm({ ...form, q: e.target.value })} />
          </div>
          <div className="field">
            <label>Answer</label>
            <textarea required value={form.a} onChange={(e) => setForm({ ...form, a: e.target.value })} />
          </div>
          <div className="field">
            <label>Order</label>
            <input type="number" value={form.order} onChange={(e) => setForm({ ...form, order: Number(e.target.value) })} />
          </div>
        </form>
      </Modal>

      <ConfirmDialog
        open={!!toDelete}
        title="Delete FAQ item"
        message="Delete this question? This can't be undone."
        confirmLabel="Delete"
        busy={deleting}
        onConfirm={confirmDelete}
        onCancel={() => setToDelete(null)}
      />
    </div>
  );
}
