import { useEffect, useState } from "react";
import QuizCard from "../components/QuizCard.jsx";
import { quizService } from "../services/api.js";
import "../styles/QuizListPage.css";

const QuizListPage = () => {
  const [quizzes, setQuizzes] = useState([]);
  const [search, setSearch] = useState("");
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    quizService
      .list()
      .then((response) => setQuizzes(response.data))
      .finally(() => setLoading(false));
  }, []);

  const filtered = quizzes.filter((quiz) =>
    quiz.title.toLowerCase().includes(search.toLowerCase())
  );

  return (
    <section className="quiz-list">
      <div className="quiz-list-header">
        <div>
          <h2>Browse Quizzes</h2>
          <p>Pick a quiz, answer one question at a time, and see your score.</p>
        </div>
        <input
          type="text"
          placeholder="Search quizzes"
          value={search}
          onChange={(event) => setSearch(event.target.value)}
        />
      </div>

      {loading ? (
        <p className="status">Loading quizzes...</p>
      ) : filtered.length === 0 ? (
        <p className="status">No quizzes found. Try another keyword.</p>
      ) : (
        <div className="quiz-grid">
          {filtered.map((quiz) => (
            <QuizCard key={quiz.id} quiz={quiz} />
          ))}
        </div>
      )}
    </section>
  );
};

export default QuizListPage;
