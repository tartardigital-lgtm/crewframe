import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { api } from "../../lib/api";
import type { DashboardStats } from "../../types";
import StatCard from "../../components/StatCard/StatCard";
import StatusBadge from "../../components/StatusBadge/StatusBadge";
import { IconInbox, IconFilm, IconUsers, IconStar, IconArrowRight } from "../../components/Icons";
import "./Overview.css";

export default function Overview() {
  const [stats, setStats] = useState<DashboardStats | null>(null);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    api
      .get<DashboardStats>("/dashboard/stats")
      .then(setStats)
      .catch((e) => setError(e.message || "Failed to load stats"));
  }, []);

  return (
    <div>
      <div className="page-head">
        <div>
          <h2 className="page-title">Overview</h2>
          <p className="page-sub">A quick pulse on leads and content.</p>
        </div>
      </div>

      {error && <div className="form-err" style={{ marginBottom: 20 }}>{error}</div>}

      {!stats && !error && (
        <div className="empty-state">
          <div className="spinner" style={{ margin: "0 auto 12px" }} />
          Loading…
        </div>
      )}

      {stats && (
        <>
          <div className="stat-grid">
            <StatCard label="Total leads" value={stats.totalLeads} icon={<IconInbox size={22} />} accent="orange" />
            <StatCard label="New leads" value={stats.newLeads} icon={<IconInbox size={22} />} accent="amber" />
            <StatCard label="Work items" value={stats.workItems} icon={<IconFilm size={22} />} accent="blue" />
            <StatCard label="Crew members" value={stats.crewMembers} icon={<IconUsers size={22} />} accent="green" />
            <StatCard label="Testimonials" value={stats.testimonials} icon={<IconStar size={22} />} accent="orange" />
          </div>

          <div className="card ov-recent">
            <div className="ov-recent-head">
              <h3>Recent leads</h3>
              <Link to="/leads" className="ov-recent-link">
                View all <IconArrowRight size={14} />
              </Link>
            </div>

            {stats.recentLeads.length === 0 ? (
              <div className="empty-state">No leads yet — they'll show up here as soon as the contact form is used.</div>
            ) : (
              <div className="table-wrap">
                <table className="dt">
                  <thead>
                    <tr>
                      <th>Name</th>
                      <th>Email</th>
                      <th>Trade</th>
                      <th>Status</th>
                    </tr>
                  </thead>
                  <tbody>
                    {stats.recentLeads.map((l) => (
                      <tr key={l._id}>
                        <td style={{ color: "var(--text)", fontWeight: 600 }}>
                          {l.firstName} {l.lastName}
                        </td>
                        <td>{l.email}</td>
                        <td>{l.trade || "—"}</td>
                        <td>
                          <StatusBadge status={l.status} />
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            )}
          </div>
        </>
      )}
    </div>
  );
}
