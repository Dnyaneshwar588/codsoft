import { Link, NavLink } from "react-router-dom";
import { useAuth } from "../context/AuthContext.jsx";
import "../styles/Navbar.css";

const Navbar = () => {
  const { isAuthenticated, user, logout } = useAuth();

  return (
    <header className="nav-wrapper">
      <div className="nav-shell">
        <Link to="/" className="brand">
          QuizCraft
        </Link>
        <nav className="nav-links">
          <NavLink to="/quizzes">Browse</NavLink>
          {isAuthenticated && <NavLink to="/create">Create</NavLink>}
          {isAuthenticated && <NavLink to="/results">My Results</NavLink>}
        </nav>
        <div className="nav-actions">
          {isAuthenticated ? (
            <>
              <span className="nav-user">Hi, {user?.name || "Learner"}</span>
              <button type="button" className="ghost-btn" onClick={logout}>
                Log out
              </button>
            </>
          ) : (
            <>
              <Link to="/login" className="ghost-btn">
                Log in
              </Link>
              <Link to="/register" className="solid-btn">
                Sign up
              </Link>
            </>
          )}
        </div>
      </div>
    </header>
  );
};

export default Navbar;
