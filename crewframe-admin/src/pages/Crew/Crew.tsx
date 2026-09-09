import { useEffect, useState, type SyntheticEvent } from "react";
import { api } from "../../lib/api";
import type { CrewMember, CrewSkill } from "../../types";
import Modal from "../../components/Modal/Modal";
import ConfirmDialog from "../../components/ConfirmDialog/ConfirmDialog";
import { IconPlus, IconEdit, IconTrash, IconX } from "../../components/Icons";
import "./Crew.css";

const emptyForm = {
  name: "",
  role: "",
  tag: "",
  img: "",
  social: "",
  bio: "",
  focusLabel: "",
  order: 1,
};

type FormState = typeof emptyForm;

export default function Crew() {
  const [members, setMembers] = useState<CrewMember[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const [modalOpen, setModalOpen] = useState(false);
  const [editing, setEditing] = useState<CrewMember | null>(null);
  const [form, setForm] = useState<FormState>(emptyForm);
  const [skills, setSkills] = useState<CrewSkill[]>([]);
  const [saving, setSaving] = useState(false);
  const [formErr, setFormErr] = useState<string | null>(null);

  const [toDelete, setToDelete] = useState<CrewMember | null>(null);
  const [deleting, setDeleting] = useState(false);

  async function load() {
    setLoading(true);
    setError(null);
    try {
      setMembers(await api.get<CrewMember[]>("/crew"));
    } catch (e) {
      setError(e instanceof Error ? e.message : "Failed to load crew");
    } finally {
      setLoading(false);
    }
  }

  useEffect(() => {
    load();
  }, []);

  function openCreate() {
    setEditing(null);
    setForm({ ...emptyForm, order: members.length + 1 });
    setSkills([{ label: "", pct: 80 }]);
    setFormErr(null);
    setModalOpen(true);
  }

  function openEdit(m: CrewMember) {
    setEditing(m);
    setForm({
      name: m.name,
      role: m.role,
      tag: m.tag,
      img: m.img,
      social: m.social.join(", "),
      bio: m.bio,
      focusLabel: m.focusLabel,
      order: m.order,
    });
    setSkills(m.skills.length ? m.skills : [{ label: "", pct: 80 }]);
    setFormErr(null);
    setModalOpen(true);
  }

  function updateSkill(i: number, patch: Partial<CrewSkill>) {
    setSkills((prev) => prev.map((s, idx) => (idx === i ? { ...s, ...patch } : s)));
  }

  async function onSubmit(e: SyntheticEvent) {
    e.preventDefault();
    setSaving(true);
    setFormErr(null);
    try {
      const payload = {
        ...form,
        social: form.social
          .split(",")
          .map((s) => s.trim())
          .filter(Boolean),
        skills: skills.filter((s) => s.label.trim()),
        order: Number(form.order) || 0,
      };
      if (editing) {
        const updated = await api.put<CrewMember>(`/crew/${editing._id}`, payload);
        setMembers((prev) => prev.map((m) => (m._id === editing._id ? updated : m)));
      } else {
        const created = await api.post<CrewMember>("/crew", payload);
        setMembers((prev) => [...prev, created]);
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
      await api.del(`/crew/${toDelete._id}`);
      setMembers((prev) => prev.filter((m) => m._id !== toDelete._id));
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
          <h2 className="page-title">Crew</h2>
          <p className="page-sub">The people featured in the Crew section.</p>
        </div>
        <button className="btn btn-primary" onClick={openCreate}>
          <IconPlus size={16} /> Add crew member
        </button>
      </div>

      {error && <div className="form-err" style={{ marginBottom: 16 }}>{error}</div>}

      {loading ? (
        <div className="empty-state">
          <div className="spinner" style={{ margin: "0 auto 12px" }} />
          Loading…
        </div>
      ) : members.length === 0 ? (
        <div className="card empty-state">No crew members yet.</div>
      ) : (
        <div className="crew-grid">
          {members.map((m) => (
            <div key={m._id} className="crew-card">
              <div className="crew-card-media" style={{ backgroundImage: `url(${m.img})` }} />
              <div className="crew-card-body">
                <h4>{m.name}</h4>
                <p className="crew-card-role">{m.role}</p>
                <p className="crew-card-bio">{m.bio}</p>
              </div>
              <div className="work-card-actions">
                <button className="btn btn-ghost btn-sm" onClick={() => openEdit(m)}>
                  <IconEdit size={14} /> Edit
                </button>
                <button className="btn btn-danger btn-sm" onClick={() => setToDelete(m)}>
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
        title={editing ? "Edit crew member" : "Add crew member"}
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
        <form onSubmit={onSubmit} className="adm-form-grid">
          {formErr && <div className="form-err">{formErr}</div>}
          <div className="field">
            <label>Name</label>
            <input required value={form.name} onChange={(e) => setForm({ ...form, name: e.target.value })} />
          </div>
          <div className="field">
            <label>Role</label>
            <input required value={form.role} onChange={(e) => setForm({ ...form, role: e.target.value })} />
          </div>
          <div className="field">
            <label>Tag</label>
            <input value={form.tag} onChange={(e) => setForm({ ...form, tag: e.target.value })} placeholder="Field" />
          </div>
          <div className="field">
            <label>Focus label</label>
            <input value={form.focusLabel} onChange={(e) => setForm({ ...form, focusLabel: e.target.value })} placeholder="On site" />
          </div>
          <div className="field adm-span-2">
            <label>Image URL</label>
            <input value={form.img} onChange={(e) => setForm({ ...form, img: e.target.value })} />
          </div>
          <div className="field">
            <label>Social (comma separated)</label>
            <input value={form.social} onChange={(e) => setForm({ ...form, social: e.target.value })} placeholder="linkedin, instagram" />
          </div>
          <div className="field">
            <label>Order</label>
            <input type="number" value={form.order} onChange={(e) => setForm({ ...form, order: Number(e.target.value) })} />
          </div>
          <div className="field adm-span-2">
            <label>Bio</label>
            <textarea value={form.bio} onChange={(e) => setForm({ ...form, bio: e.target.value })} />
          </div>

          <div className="field adm-span-2">
            <label>Skills</label>
            <div className="skills-editor">
              {skills.map((s, i) => (
                <div key={i} className="skill-row">
                  <input
                    placeholder="Skill label"
                    value={s.label}
                    onChange={(e) => updateSkill(i, { label: e.target.value })}
                  />
                  <input
                    type="number"
                    min={0}
                    max={100}
                    value={s.pct}
                    onChange={(e) => updateSkill(i, { pct: Number(e.target.value) })}
                  />
                  <span>%</span>
                  <button type="button" className="skill-remove" onClick={() => setSkills((prev) => prev.filter((_, idx) => idx !== i))}>
                    <IconX size={14} />
                  </button>
                </div>
              ))}
              <button type="button" className="btn btn-ghost btn-sm" onClick={() => setSkills((prev) => [...prev, { label: "", pct: 80 }])}>
                <IconPlus size={13} /> Add skill
              </button>
            </div>
          </div>
        </form>
      </Modal>

      <ConfirmDialog
        open={!!toDelete}
        title="Delete crew member"
        message={`Delete ${toDelete?.name}? This can't be undone.`}
        confirmLabel="Delete"
        busy={deleting}
        onConfirm={confirmDelete}
        onCancel={() => setToDelete(null)}
      />
    </div>
  );
}
