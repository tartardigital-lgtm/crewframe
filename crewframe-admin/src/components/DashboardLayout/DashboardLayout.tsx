import { useState } from "react";
import { Outlet, useLocation } from "react-router-dom";
import Sidebar from "../Sidebar/Sidebar";
import Topbar from "../Topbar/Topbar";
import "./DashboardLayout.css";

const TITLES: Record<string, string> = {
  "/": "Overview",
  "/leads": "Leads",
  "/work": "Work items",
  "/crew": "Crew",
  "/pricing": "Pricing plans",
  "/testimonials": "Testimonials",
  "/faq": "FAQ",
  "/settings": "Settings",
};

export default function DashboardLayout() {
  const [mobileOpen, setMobileOpen] = useState(false);
  const { pathname } = useLocation();
  const title = TITLES[pathname] || "Admin";

  return (
    <div className="adm-shell">
      <Sidebar open={mobileOpen} onNavigate={() => setMobileOpen(false)} />
      {mobileOpen && <div className="adm-backdrop" onClick={() => setMobileOpen(false)} />}

      <div className="adm-main">
        <Topbar title={title} onMenuClick={() => setMobileOpen((v) => !v)} />
        <main className="adm-content">
          <Outlet />
        </main>
      </div>
    </div>
  );
}
