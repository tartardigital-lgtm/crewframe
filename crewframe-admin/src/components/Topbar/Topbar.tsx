import { useState, useRef, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../../lib/AuthContext";
import { IconMenu, IconLogout, IconChevronDown, IconSettings } from "../Icons";
import "./Topbar.css";

interface TopbarProps {
  title: string;
  onMenuClick: () => void;
}

export default function Topbar({ title, onMenuClick }: TopbarProps) {
  const { admin, logout } = useAuth();
  const navigate = useNavigate();
  const [open, setOpen] = useState(false);
  const menuRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const onClick = (e: MouseEvent) => {
      if (menuRef.current && !menuRef.current.contains(e.target as Node)) setOpen(false);
    };
    document.addEventListener("mousedown", onClick);
    return () => document.removeEventListener("mousedown", onClick);
  }, []);

  const initials = (admin?.name || admin?.email || "A")
    .split(" ")
    .map((s) => s[0])
    .join("")
    .slice(0, 2)
    .toUpperCase();

  return (
    <header className="adm-topbar">
      <button className="adm-menu-btn" onClick={onMenuClick} aria-label="Toggle menu">
        <IconMenu size={20} />
      </button>

      <h1 className="adm-topbar-title">{title}</h1>

      <div className="adm-topbar-right" ref={menuRef}>
        <button className="adm-user-btn" onClick={() => setOpen((v) => !v)}>
          <span className="adm-avatar">{initials}</span>
          <span className="adm-user-name">{admin?.name || admin?.email}</span>
          <IconChevronDown size={16} />
        </button>

        {open && (
          <div className="adm-user-menu">
            <div className="adm-user-menu-email">{admin?.email}</div>
            <button
              onClick={() => {
                setOpen(false);
                navigate("/settings");
              }}
            >
              <IconSettings size={16} /> Settings
            </button>
            <button onClick={logout} className="adm-user-menu-logout">
              <IconLogout size={16} /> Log out
            </button>
          </div>
        )}
      </div>
    </header>
  );
}
