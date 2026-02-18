import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { authService } from "../services/api.js";
import { useAuth } from "../context/AuthContext.jsx";
import "../styles/AuthPages.css";

const LoginPage = () => {
  const navigate = useNavigate();
  const { login } = useAuth();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");

  const handleSubmit = async (event) => {
    event.preventDefault();
    setError("");

    try {
      const response = await authService.login({ email, password });
      login(response.data);
      navigate("/quizzes");
    } catch (err) {
      setError("Invalid credentials. Try again.");
    }
  };

  return (
    <section className="auth-page">
      <form className="auth-card" onSubmit={handleSubmit}>
        <h2>Welcome back</h2>
        <p>Log in to create quizzes and save your results.</p>
        {error && <div className="alert">{error}</div>}
        <label htmlFor="email">Email</label>
        <input
          id="email"
          type="email"
          value={email}
          onChange={(event) => setEmail(event.target.value)}
          required
        />
        <label htmlFor="password">Password</label>
        <input
          id="password"
          type="password"
          value={password}
          onChange={(event) => setPassword(event.target.value)}
          required
        />
        <button type="submit" className="solid-btn">
          Log in
        </button>
        <p className="auth-footer">
          No account? <Link to="/register">Sign up</Link>
        </p>
      </form>
    </section>
  );
};

export default LoginPage;
