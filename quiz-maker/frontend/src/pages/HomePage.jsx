import { Link } from "react-router-dom";
import "../styles/HomePage.css";

const HomePage = () => (
  <section className="home">
    <div className="hero">
      <div className="hero-copy">
        <p className="hero-pill">Online Quiz Maker</p>
        <h1>Design quizzes that feel like a live challenge.</h1>
        <p className="hero-subtitle">
          Build multiple-choice quizzes, share them instantly, and track scores with
          real-time feedback.
        </p>
        <div className="hero-actions">
          <Link to="/create" className="solid-btn">
            Create a Quiz
          </Link>
          <Link to="/quizzes" className="ghost-btn">
            Take a Quiz
          </Link>
        </div>
      </div>
      <div className="hero-card">
        <h3>Quiz Spotlight</h3>
        <ul>
          <li>Timed flow, one question at a time</li>
          <li>Instant score feedback</li>
          <li>Mobile-first interface</li>
        </ul>
        <Link to="/quizzes" className="solid-btn">
          Browse Quizzes
        </Link>
      </div>
    </div>
    <div className="feature-grid">
      <div className="feature-card">
        <h4>Create</h4>
        <p>Build quizzes with structured options and points in minutes.</p>
      </div>
      <div className="feature-card">
        <h4>Take</h4>
        <p>Answer questions one at a time for a focused experience.</p>
      </div>
      <div className="feature-card">
        <h4>Review</h4>
        <p>See your score and the correct answers immediately.</p>
      </div>
      <div className="feature-card">
        <h4>Track</h4>
        <p>Keep your personal results in one place.</p>
      </div>
    </div>
  </section>
);

export default HomePage;
