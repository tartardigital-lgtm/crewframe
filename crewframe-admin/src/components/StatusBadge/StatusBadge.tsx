import type { LeadStatus } from "../../types";
import "./StatusBadge.css";

const LABELS: Record<LeadStatus, string> = {
  new: "New",
  contacted: "Contacted",
  won: "Won",
  archived: "Archived",
};

export default function StatusBadge({ status }: { status: LeadStatus }) {
  return (
    <span className={`badge badge-${status}`}>
      <span className="badge-dot" />
      {LABELS[status]}
    </span>
  );
}
