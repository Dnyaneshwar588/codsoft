import { Link, useLocation } from "react-router-dom";
import "../styles/QuizResultsPage.css";

const QuizResultsPage = () => {
  const location = useLocation();
  const payload = location.state;

  if (!payload) {
    return (
      <section className="quiz-results">
        <div className="results-card">
          <h2>No results to show yet.</h2>
          <Link to="/quizzes" className="solid-btn">
            Browse Quizzes
          </Link>
        </div>
      </section>
    );
  }

  const { quiz, result } = payload;
  const percentage = result.total ? Math.round((result.score / result.total) * 100) : 0;
  const passed = percentage >= 60;

  return (
    <section className="quiz-results">
      <div className="results-card">
        <h2>Quiz Complete</h2>
        <div className="result-summary">
          <span className={`result-badge ${passed ? "pass" : "fail"}`}>
            {passed ? "Result: Passed" : "Result: Needs Improvement"}
          </span>
          <span className="result-percentage">Accuracy: {percentage}%</span>
        </div>
        <p className="score">
          Score: {result.score} / {result.total}
        </p>
        <div className="answer-review">
          {quiz.questions.map((question, index) => (
            <div className="answer-item" key={`answer-${index}`}>
              <h4>{question.prompt}</h4>
              <p>
                Correct answer: {question.options[result.correctAnswers[index]].text}
              </p>
            </div>
          ))}
        </div>
        <div className="results-actions">
          <Link to="/quizzes" className="ghost-btn">
            Take Another Quiz
          </Link>
          <Link to="/results" className="solid-btn">
            View My Results
          </Link>
        </div>
      </div>
    </section>
  );
};

export default QuizResultsPage;
