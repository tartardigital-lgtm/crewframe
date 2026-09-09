import { useState, type FormEvent } from "react";
import { Navigate, useNavigate } from "react-router-dom";
import { useAuth } from "../../lib/AuthContext";
import { ApiError } from "../../lib/api";
import { IconMail, IconLock, IconArrowRight, IconAlert } from "../../components/Icons";
import "./Login.css";

export default function Login() {
  const { admin, loading, login } = useAuth();
  const navigate = useNavigate();
  const [email, setEmail] = useState("hello@crewframeagency.com");
  const [password, setPassword] = useState("");
  const [error, setError] = useState<string | null>(null);
  const [busy, setBusy] = useState(false);

  if (!loading && admin) return <Navigate to="/" replace />;

  async function onSubmit(e: FormEvent) {
    e.preventDefault();
    setError(null);
    setBusy(true);
    try {
      await login(email, password);
      navigate("/", { replace: true });
    } catch (err) {
      setError(err instanceof ApiError ? err.message : "Could not reach the server. Is the API running?");
    } finally {
      setBusy(false);
    }
  }

  return (
    <div className="login-screen">
      <div className="login-orbs" aria-hidden="true">
        <span className="login-orb login-orb-a" />
        <span className="login-orb login-orb-b" />
      </div>

      <div className="login-card">
        <div className="login-brand">
          <span className="login-brand-mark">CF</span>
          <div className="login-brand-text">
            Crew<em>Frame</em>
            <small>Admin console</small>
          </div>
        </div>

        <h1 className="login-title">Sign in</h1>
        <p className="login-sub">Manage leads, portfolio, crew, and site content.</p>

        <form onSubmit={onSubmit} className="login-form">
          {error && (
            <div className="form-err">
              <IconAlert size={15} /> {error}
            </div>
          )}

          <div className="field">
            <label htmlFor="email">Email</label>
            <div className="login-input-wrap">
              <IconMail size={16} className="login-input-icon" />
              <input
                id="email"
                type="email"
                autoComplete="username"
                required
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="you@crewframeagency.com"
              />
            </div>
          </div>

          <div className="field">
            <label htmlFor="password">Password</label>
            <div className="login-input-wrap">
              <IconLock size={16} className="login-input-icon" />
              <input
                id="password"
                type="password"
                autoComplete="current-password"
                required
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                placeholder="••••••••"
              />
            </div>
          </div>

          <button className="btn btn-primary login-submit" type="submit" disabled={busy}>
            {busy ? "Signing in…" : "Sign in"} {!busy && <IconArrowRight size={16} />}
          </button>
        </form>
      </div>
    </div>
  );
}
