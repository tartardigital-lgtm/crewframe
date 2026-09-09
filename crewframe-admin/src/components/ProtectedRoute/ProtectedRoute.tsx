import type { ReactNode } from "react";
import { Navigate } from "react-router-dom";
import { useAuth } from "../../lib/AuthContext";
import "./ProtectedRoute.css";

export default function ProtectedRoute({ children }: { children: ReactNode }) {
  const { admin, loading } = useAuth();

  if (loading) {
    return (
      <div className="adm-boot">
        <div className="spinner" />
      </div>
    );
  }

  if (!admin) return <Navigate to="/login" replace />;

  return <>{children}</>;
}
