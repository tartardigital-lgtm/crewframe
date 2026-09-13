import { useEffect, useState, type SyntheticEvent } from "react";
import { api } from "../../lib/api";
import type { WorkItem } from "../../types";
import Modal from "../../components/Modal/Modal";
import ConfirmDialog from "../../components/ConfirmDialog/ConfirmDialog";
import { IconPlus, IconEdit, IconTrash, IconFilm } from "../../components/Icons";
import "./Work.css";

const emptyForm = {
  title: "",
  format: "reel" as "reel" | "long",
  cat: "reel",
  img: "",
  marker: "",
  dur: "",
  loc: "",
  views: "",
  job: "",
  desc: "",
  result: "",
  order: 1,
};

type FormState = typeof emptyForm;

export default function Work() {
  const [items, setItems] = useState<WorkItem[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const [modalOpen, setModalOpen] = useState(false);
  const [editing, setEditing] = useState<WorkItem | null>(null);
  const [form, setForm] = useState<FormState>(emptyForm);
  const [saving, setSaving] = useState(false);
  const [formErr, setFormErr] = useState<string | null>(null);

  const [toDelete, setToDelete] = useState<WorkItem | null>(null);
  const [deleting, setDeleting] = useState(false);

  async function load() {
    setLoading(true);
    setError(null);
    try {
      const data = await api.get<WorkItem[]>("/work");
      setItems(data);
    } catch (e) {
      setError(e instanceof Error ? e.message : "Failed to load work items");
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

  function openEdit(item: WorkItem) {
    setEditing(item);
    setForm({
      title: item.title,
      format: item.format,
      cat: item.cat.join(", "),
      img: item.img,
      marker: item.marker,
      dur: item.dur,
      loc: item.loc,
      views: item.views,
      job: item.job,
      desc: item.desc,
      result: item.result,
      order: item.order,
    });
    setFormErr(null);
    setModalOpen(true);
  }

  async function onSubmit(e: SyntheticEvent) {
    e.preventDefault();
    setSaving(true);
    setFormErr(null);
    try {
      const payload = {
        ...form,
        cat: form.cat
          .split(",")
          .map((c) => c.trim())
          .filter(Boolean),
        order: Number(form.order) || 0,
      };
      if (editing) {
        const updated = await api.put<WorkItem>(`/work/${editing._id}`, payload);
        setItems((prev) => prev.map((i) => (i._id === editing._id ? updated : i)));
      } else {
        const created = await api.post<WorkItem>("/work", payload);
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
      await api.del(`/work/${toDelete._id}`);
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
          <h2 className="page-title">Work items</h2>
          <p className="page-sub">Portfolio clips and case studies shown in the Work section.</p>
        </div>
        <button className="btn btn-primary" onClick={openCreate}>
          <IconPlus size={16} /> Add item
        </button>
      </div>

      {error && <div className="form-err" style={{ marginBottom: 16 }}>{error}</div>}

      {loading ? (
        <div className="empty-state">
          <div className="spinner" style={{ margin: "0 auto 12px" }} />
          Loading…
        </div>
      ) : items.length === 0 ? (
        <div className="card empty-state">No work items yet. Add your first one.</div>
      ) : (
        <div className="work-grid">
          {items.map((item) => (
            <div key={item._id} className="work-card">
              <div className="work-card-media" style={{ backgroundImage: `url(${item.img})` }}>
                <span className="work-card-format">
                  <IconFilm size={13} /> {item.format}
                </span>
              </div>
              <div className="work-card-body">
                <h4>{item.title}</h4>
                <p className="work-card-meta">
                  {item.loc} · {item.dur} · {item.views}
                </p>
                <div className="work-card-tags">
                  {item.cat.map((c) => (
                    <span key={c} className="work-tag">
                      {c}
                    </span>
                  ))}
                </div>
              </div>
              <div className="work-card-actions">
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
        title={editing ? "Edit work item" : "Add work item"}
        size="lg"
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
        <form onSubmit={onSubmit} className="adm-form-grid" id="work-form">
          {formErr && <div className="form-err">{formErr}</div>}
          <div className="field">
            <label>Title</label>
            <input required value={form.title} onChange={(e) => setForm({ ...form, title: e.target.value })} />
          </div>
          <div className="field">
            <label>Format</label>
            <select value={form.format} onChange={(e) => setForm({ ...form, format: e.target.value as "reel" | "long" })}>
              <option value="reel">Reel</option>
              <option value="long">Long-form</option>
            </select>
          </div>
          <div className="field">
            <label>Categories (comma separated)</label>
            <input value={form.cat} onChange={(e) => setForm({ ...form, cat: e.target.value })} placeholder="reel, proof" />
          </div>
          <div className="field adm-span-2">
            <label>Image URL</label>
            <input required value={form.img} onChange={(e) => setForm({ ...form, img: e.target.value })} placeholder="https://…" />
          </div>
          <div className="field">
            <label>Marker</label>
            <input value={form.marker} onChange={(e) => setForm({ ...form, marker: e.target.value })} placeholder="Crew Cam" />
          </div>
          <div className="field">
            <label>Duration</label>
            <input value={form.dur} onChange={(e) => setForm({ ...form, dur: e.target.value })} placeholder="0:41" />
          </div>
          <div className="field">
            <label>Location</label>
            <input value={form.loc} onChange={(e) => setForm({ ...form, loc: e.target.value })} />
          </div>
          <div className="field">
            <label>Views</label>
            <input value={form.views} onChange={(e) => setForm({ ...form, views: e.target.value })} placeholder="182K views" />
          </div>
          <div className="field">
            <label>Job reference</label>
            <input value={form.job} onChange={(e) => setForm({ ...form, job: e.target.value })} placeholder="Job #1482" />
          </div>
          <div className="field">
            <label>Order</label>
            <input type="number" value={form.order} onChange={(e) => setForm({ ...form, order: Number(e.target.value) })} />
          </div>
          <div className="field adm-span-2">
            <label>Description</label>
            <textarea value={form.desc} onChange={(e) => setForm({ ...form, desc: e.target.value })} />
          </div>
          <div className="field adm-span-2">
            <label>Result</label>
            <textarea value={form.result} onChange={(e) => setForm({ ...form, result: e.target.value })} />
          </div>
        </form>
      </Modal>

      <ConfirmDialog
        open={!!toDelete}
        title="Delete work item"
        message={`Delete "${toDelete?.title}"? This can't be undone.`}
        confirmLabel="Delete"
        busy={deleting}
        onConfirm={confirmDelete}
        onCancel={() => setToDelete(null)}
      />
    </div>
  );
}
