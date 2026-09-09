import type { ReactNode } from "react";
import "./StatCard.css";

interface StatCardProps {
  label: string;
  value: string | number;
  icon: ReactNode;
  accent?: "orange" | "blue" | "green" | "amber";
}

export default function StatCard({ label, value, icon, accent = "orange" }: StatCardProps) {
  return (
    <div className={`stat-card stat-${accent}`}>
      <div className="stat-icon">{icon}</div>
      <div className="stat-body">
        <div className="stat-value">{value}</div>
        <div className="stat-label">{label}</div>
      </div>
    </div>
  );
}
