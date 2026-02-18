import { Link, useNavigate } from 'react-router-dom'
import './Navbar.css'

function Navbar({ user, onLogout }) {
  const navigate = useNavigate()

  const handleLogout = () => {
    onLogout()
    navigate('/')
  }

  return (
    <nav className="navbar">
      <div className="container navbar-container">
        <Link to="/" className="navbar-logo">
          💼 JobBoard
        </Link>
        <div className="navbar-menu">
          <Link to="/jobs">Browse Jobs</Link>
          {user ? (
            <>
              {user.role === 'employer' ? (
                <Link to="/employer-dashboard">Dashboard</Link>
              ) : (
                <Link to="/candidate-dashboard">Dashboard</Link>
              )}
              <span className="user-info">Hello, {user.name}</span>
              <button className="btn btn-secondary" onClick={handleLogout}>
                Logout
              </button>
            </>
          ) : (
            <>
              <Link to="/login">Login</Link>
              <Link to="/register">Register</Link>
            </>
          )}
        </div>
      </div>
    </nav>
  )
}

export default Navbar
