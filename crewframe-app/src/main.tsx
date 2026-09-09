import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App";
import "./index.css";

// Visiting /admin on the public site sends you to the admin panel instead
// of rendering this app. Configure VITE_ADMIN_URL to point at wherever the
// admin panel is served (defaults to its local dev server).
if (window.location.pathname.replace(/\/+$/, "") === "/admin") {
  const adminUrl = import.meta.env.VITE_ADMIN_URL || "http://localhost:5174";
  window.location.replace(adminUrl);
} else {
  ReactDOM.createRoot(document.getElementById("root") as HTMLElement).render(
    <React.StrictMode>
      <App />
    </React.StrictMode>
  );
}
