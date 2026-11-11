import { useState } from "react";
import { Link } from "react-router-dom";
import useAuth from "../hooks/useAuth";
import Alert from "../components/Alert";

const SignupPage = () => {
  const { signup, authMessage, setAuthMessage } = useAuth();
  const [form, setForm] = useState({ name: "", email: "", password: "" });
  const [submitting, setSubmitting] = useState(false);

  const handleChange = (e) => setForm({ ...form, [e.target.name]: e.target.value });

  const handleSubmit = async (e) => {
    e.preventDefault();
    setSubmitting(true);
    try {
      const res = await signup(form);
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
        <h2>Sign Up</h2>
        <Alert
          type={authMessage?.type}
          message={authMessage?.text}
          onClose={() => setAuthMessage(null)}
        />
        <input name="name" type="text" placeholder="Name" value={form.name} onChange={handleChange} />
        <input name="email" type="email" placeholder="Email" value={form.email} onChange={handleChange} />
        <input name="password" type="password" placeholder="Password" value={form.password} onChange={handleChange} />
        <button className="btn btn-block" type="submit" disabled={submitting}>
          Sign Up
        </button>
        <p className="auth-switch">
          Have an account? <Link to="/login" onClick={() => setAuthMessage(null)}>Login</Link>
        </p>
      </form>
    </div>
  );
};

export default SignupPage;
