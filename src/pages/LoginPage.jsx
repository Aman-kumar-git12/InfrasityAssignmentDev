import { useEffect, useState } from "react";
import { Link, useLocation } from "react-router-dom";
import useAuth from "../hooks/useAuth";
import Alert from "../components/Alert";

const LoginPage = () => {
  const { login, authMessage, setAuthMessage } = useAuth();
  const location = useLocation();

  useEffect(() => {
    if (location.state?.alert) setAuthMessage(location.state.alert);
  }, [location.state, setAuthMessage]);
  const [form, setForm] = useState({ email: "", password: "" });
  const [submitting, setSubmitting] = useState(false);

  const handleChange = (e) => setForm({ ...form, [e.target.name]: e.target.value });

  const handleSubmit = async (e) => {
    e.preventDefault();
    setSubmitting(true);
    try {
      const res = await login(form);
      setAuthMessage({ type: "success", text: res.message });
    } catch (error) {
      setAuthMessage({ type: "error", text: error.message });
      setSubmitting(false);
    }
  };

  return (
    <div className="auth-page">
      <form className="auth-card" onSubmit={handleSubmit}>
        <span className="auth-brand">Notes</span>
        <h2>Login</h2>
        <Alert
          type={authMessage?.type}
          message={authMessage?.text}
          onClose={() => setAuthMessage(null)}
        />
        <input name="email" type="email" placeholder="Email" value={form.email} onChange={handleChange} />
        <input name="password" type="password" placeholder="Password" value={form.password} onChange={handleChange} />
        <button className="btn btn-block" type="submit" disabled={submitting}>
          Login
        </button>
        <p className="auth-switch">
          No account? <Link to="/signup" onClick={() => setAuthMessage(null)}>Sign up</Link>
        </p>
      </form>
    </div>
  );
};

export default LoginPage;
