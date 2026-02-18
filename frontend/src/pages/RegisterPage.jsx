import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { authService } from "../services/api.js";
import { useAuth } from "../context/AuthContext.jsx";
import "../styles/AuthPages.css";

const RegisterPage = () => {
  const navigate = useNavigate();
  const { login } = useAuth();
  const [form, setForm] = useState({
    name: "",
    email: "",
    password: "",
    role: "taker"
  });
  const [error, setError] = useState("");

  const updateForm = (field, value) => {
    setForm((prev) => ({ ...prev, [field]: value }));
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    setError("");

    try {
      const response = await authService.register(form);
      login(response.data);
      navigate("/quizzes");
    } catch (err) {
      setError("Registration failed. Try again.");
    }
  };

  return (
    <section className="auth-page">
      <form className="auth-card" onSubmit={handleSubmit}>
        <h2>Create your account</h2>
        <p>Build quizzes or take them instantly.</p>
        {error && <div className="alert">{error}</div>}
        <label htmlFor="name">Name</label>
        <input
          id="name"
          type="text"
          value={form.name}
          onChange={(event) => updateForm("name", event.target.value)}
          required
        />
        <label htmlFor="email">Email</label>
        <input
          id="email"
          type="email"
          value={form.email}
          onChange={(event) => updateForm("email", event.target.value)}
          required
        />
        <label htmlFor="password">Password</label>
        <input
          id="password"
          type="password"
          value={form.password}
          onChange={(event) => updateForm("password", event.target.value)}
          required
        />
        <label htmlFor="role">Role</label>
        <select
          id="role"
          value={form.role}
          onChange={(event) => updateForm("role", event.target.value)}
        >
          <option value="taker">Quiz Taker</option>
          <option value="creator">Quiz Creator</option>
        </select>
        <button type="submit" className="solid-btn">
          Sign up
        </button>
        <p className="auth-footer">
          Have an account? <Link to="/login">Log in</Link>
        </p>
      </form>
    </section>
  );
};

export default RegisterPage;
