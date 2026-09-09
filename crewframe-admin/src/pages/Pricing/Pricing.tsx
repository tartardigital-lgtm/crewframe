import { useEffect, useState, type SyntheticEvent } from "react";
import { api } from "../../lib/api";
import type { PricingPlan, PricingFeature } from "../../types";
import Modal from "../../components/Modal/Modal";
import ConfirmDialog from "../../components/ConfirmDialog/ConfirmDialog";
import { IconPlus, IconEdit, IconTrash, IconX, IconStar } from "../../components/Icons";
import "./Pricing.css";

const emptyForm = {
  name: "",
  monthly: "",
  yearly: "",
  desc: "",
  featured: false,
  popularLabel: "",
  cta: "Get started",
  order: 1,
};

type FormState = typeof emptyForm;

export default function Pricing() {
  const [plans, setPlans] = useState<PricingPlan[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const [modalOpen, setModalOpen] = useState(false);
  const [editing, setEditing] = useState<PricingPlan | null>(null);
  const [form, setForm] = useState<FormState>(emptyForm);
  const [features, setFeatures] = useState<PricingFeature[]>([]);
  const [saving, setSaving] = useState(false);
  const [formErr, setFormErr] = useState<string | null>(null);

  const [toDelete, setToDelete] = useState<PricingPlan | null>(null);
  const [deleting, setDeleting] = useState(false);

  async function load() {
    setLoading(true);
    setError(null);
    try {
      setPlans(await api.get<PricingPlan[]>("/pricing"));
    } catch (e) {
      setError(e instanceof Error ? e.message : "Failed to load pricing plans");
    } finally {
      setLoading(false);
    }
  }

  useEffect(() => {
    load();
  }, []);

  function openCreate() {
    setEditing(null);
    setForm({ ...emptyForm, order: plans.length + 1 });
    setFeatures([{ label: "", included: true }]);
    setFormErr(null);
    setModalOpen(true);
  }

  function openEdit(p: PricingPlan) {
    setEditing(p);
    setForm({
      name: p.name,
      monthly: p.monthly === null ? "" : String(p.monthly),
      yearly: p.yearly === null ? "" : String(p.yearly),
      desc: p.desc,
      featured: !!p.featured,
      popularLabel: p.popularLabel || "",
      cta: p.cta,
      order: p.order,
    });
    setFeatures(p.features.length ? p.features : [{ label: "", included: true }]);
    setFormErr(null);
    setModalOpen(true);
  }

  function updateFeature(i: number, patch: Partial<PricingFeature>) {
    setFeatures((prev) => prev.map((f, idx) => (idx === i ? { ...f, ...patch } : f)));
  }

  async function onSubmit(e: SyntheticEvent) {
    e.preventDefault();
    setSaving(true);
    setFormErr(null);
    try {
      const payload = {
        ...form,
        monthly: form.monthly.trim() === "" ? null : Number(form.monthly),
        yearly: form.yearly.trim() === "" ? null : Number(form.yearly),
        features: features.filter((f) => f.label.trim()),
        order: Number(form.order) || 0,
      };
      if (editing) {
        const updated = await api.put<PricingPlan>(`/pricing/${editing._id}`, payload);
        setPlans((prev) => prev.map((p) => (p._id === editing._id ? updated : p)));
      } else {
        const created = await api.post<PricingPlan>("/pricing", payload);
        setPlans((prev) => [...prev, created]);
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
      await api.del(`/pricing/${toDelete._id}`);
      setPlans((prev) => prev.filter((p) => p._id !== toDelete._id));
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
          <h2 className="page-title">Pricing plans</h2>
          <p className="page-sub">The tiers shown in the Pricing section.</p>
        </div>
        <button className="btn btn-primary" onClick={openCreate}>
          <IconPlus size={16} /> Add plan
        </button>
      </div>

      {error && <div className="form-err" style={{ marginBottom: 16 }}>{error}</div>}

      {loading ? (
        <div className="empty-state">
          <div className="spinner" style={{ margin: "0 auto 12px" }} />
          Loading…
        </div>
      ) : plans.length === 0 ? (
        <div className="card empty-state">No pricing plans yet.</div>
      ) : (
        <div className="pricing-grid">
          {plans.map((p) => (
            <div key={p._id} className={`pricing-card ${p.featured ? "is-featured" : ""}`}>
              {p.featured && <span className="pricing-badge">{p.popularLabel || "Most booked"}</span>}
              <h4>{p.name}</h4>
              <div className="pricing-amt">
                {p.monthly === null ? "Custom" : `$${p.monthly}`}
                {p.monthly !== null && <span>/mo</span>}
              </div>
              <p className="pricing-desc">{p.desc}</p>
              <ul className="pricing-feat-list">
                {p.features.slice(0, 4).map((f, i) => (
                  <li key={i} className={f.included ? "" : "is-excluded"}>
                    {f.label}
                  </li>
                ))}
              </ul>
              <div className="work-card-actions">
                <button className="btn btn-ghost btn-sm" onClick={() => openEdit(p)}>
                  <IconEdit size={14} /> Edit
                </button>
                <button className="btn btn-danger btn-sm" onClick={() => setToDelete(p)}>
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
        title={editing ? "Edit pricing plan" : "Add pricing plan"}
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
            <label>CTA label</label>
            <input value={form.cta} onChange={(e) => setForm({ ...form, cta: e.target.value })} />
          </div>
          <div className="field">
            <label>Monthly price (blank = custom)</label>
            <input type="number" value={form.monthly} onChange={(e) => setForm({ ...form, monthly: e.target.value })} />
          </div>
          <div className="field">
            <label>Yearly price (blank = custom)</label>
            <input type="number" value={form.yearly} onChange={(e) => setForm({ ...form, yearly: e.target.value })} />
          </div>
          <div className="field adm-span-2">
            <label>Description</label>
            <textarea value={form.desc} onChange={(e) => setForm({ ...form, desc: e.target.value })} />
          </div>
          <div className="field field-check">
            <input
              type="checkbox"
              id="featured"
              checked={form.featured}
              onChange={(e) => setForm({ ...form, featured: e.target.checked })}
            />
            <label htmlFor="featured" style={{ textTransform: "none", letterSpacing: 0 }}>
              <IconStar size={12} /> Featured / most popular
            </label>
          </div>
          <div className="field">
            <label>Popular label</label>
            <input value={form.popularLabel} onChange={(e) => setForm({ ...form, popularLabel: e.target.value })} placeholder="Most Booked" />
          </div>
          <div className="field">
            <label>Order</label>
            <input type="number" value={form.order} onChange={(e) => setForm({ ...form, order: Number(e.target.value) })} />
          </div>

          <div className="field adm-span-2">
            <label>Features</label>
            <div className="skills-editor">
              {features.map((f, i) => (
                <div key={i} className="feature-row">
                  <input
                    type="checkbox"
                    checked={f.included}
                    onChange={(e) => updateFeature(i, { included: e.target.checked })}
                  />
                  <input placeholder="Feature label" value={f.label} onChange={(e) => updateFeature(i, { label: e.target.value })} />
                  <button type="button" className="skill-remove" onClick={() => setFeatures((prev) => prev.filter((_, idx) => idx !== i))}>
                    <IconX size={14} />
                  </button>
                </div>
              ))}
              <button type="button" className="btn btn-ghost btn-sm" onClick={() => setFeatures((prev) => [...prev, { label: "", included: true }])}>
                <IconPlus size={13} /> Add feature
              </button>
            </div>
          </div>
        </form>
      </Modal>

      <ConfirmDialog
        open={!!toDelete}
        title="Delete pricing plan"
        message={`Delete "${toDelete?.name}"? This can't be undone.`}
        confirmLabel="Delete"
        busy={deleting}
        onConfirm={confirmDelete}
        onCancel={() => setToDelete(null)}
      />
    </div>
  );
}
