import { Link } from "react-router-dom";
import "../styles/QuizListPage.css";

const QuizCard = ({ quiz }) => (
  <article className="quiz-card">
    <div className="quiz-card-body">
      <h3>{quiz.title}</h3>
      <p>{quiz.description || "No description yet."}</p>
      <div className="quiz-meta">
        <span>{quiz.questionCount} questions</span>
        <span>By {quiz.creatorName}</span>
      </div>
    </div>
    <Link to={`/quizzes/${quiz.id}`} className="solid-btn">
      Take Quiz
    </Link>
  </article>
);

export default QuizCard;
