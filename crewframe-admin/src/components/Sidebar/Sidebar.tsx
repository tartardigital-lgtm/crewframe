import { NavLink } from "react-router-dom";
import {
  IconGrid,
  IconInbox,
  IconFilm,
  IconUsers,
  IconTag,
  IconStar,
  IconHelp,
  IconSettings,
} from "../Icons";
import "./Sidebar.css";

const NAV = [
  { to: "/", label: "Overview", icon: IconGrid, end: true },
  { to: "/leads", label: "Leads", icon: IconInbox },
  { to: "/work", label: "Work", icon: IconFilm },
  { to: "/crew", label: "Crew", icon: IconUsers },
  { to: "/pricing", label: "Pricing", icon: IconTag },
  { to: "/testimonials", label: "Testimonials", icon: IconStar },
  { to: "/faq", label: "FAQ", icon: IconHelp },
  { to: "/settings", label: "Settings", icon: IconSettings },
];

interface SidebarProps {
  open: boolean;
  onNavigate?: () => void;
}

export default function Sidebar({ open, onNavigate }: SidebarProps) {
  return (
    <aside className={`adm-sidebar ${open ? "is-open" : ""}`}>
      <div className="adm-brand">
        <span className="adm-brand-mark">CF</span>
        <span className="adm-brand-text">
          Crew<em>Frame</em>
          <small>Admin</small>
        </span>
      </div>

      <nav className="adm-nav">
        {NAV.map(({ to, label, icon: Icon, end }) => (
          <NavLink
            key={to}
            to={to}
            end={end}
            onClick={onNavigate}
            className={({ isActive }) => `adm-nav-link ${isActive ? "is-active" : ""}`}
          >
            <Icon size={18} />
            <span>{label}</span>
          </NavLink>
        ))}
      </nav>

      <div className="adm-sidebar-foot">
        <a href="https://crewframeagency.com" target="_blank" rel="noreferrer" className="adm-view-site">
          View live site →
        </a>
      </div>
    </aside>
  );
}
