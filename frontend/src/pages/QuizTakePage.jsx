import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { quizService } from "../services/api.js";
import { useAuth } from "../context/AuthContext.jsx";
import "../styles/QuizTakePage.css";

const QuizTakePage = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const { isAuthenticated } = useAuth();
  const [quiz, setQuiz] = useState(null);
  const [current, setCurrent] = useState(0);
  const [answers, setAnswers] = useState([]);
  const [feedback, setFeedback] = useState("");

  useEffect(() => {
    quizService.get(id).then((response) => setQuiz(response.data));
  }, [id]);

  if (!quiz) {
    return <p className="status">Loading quiz...</p>;
  }

  const question = quiz.questions[current];

  const handleSelect = (index) => {
    const updated = [...answers];
    updated[current] = index;
    setAnswers(updated);
    setFeedback("Answer locked. Move to the next question.");
  };

  const handleNext = () => {
    setFeedback("");
    if (current < quiz.questions.length - 1) {
      setCurrent((prev) => prev + 1);
    }
  };

  const handleSubmit = async () => {
    if (!isAuthenticated) {
      navigate("/login");
      return;
    }

    const response = await quizService.submit(id, { answers });
    navigate("/quiz-results", { state: { quiz, result: response.data } });
  };

  return (
    <section className="quiz-take">
      <div className="quiz-take-card">
        <div className="quiz-progress">
          <span>
            Question {current + 1} of {quiz.questions.length}
          </span>
          <span>{quiz.title}</span>
        </div>
        <h2>{question.prompt}</h2>
        <div className="option-list">
          {question.options.map((option, index) => (
            <button
              type="button"
              key={`option-${index}`}
              className={`option-btn ${answers[current] === index ? "selected" : ""}`}
              onClick={() => handleSelect(index)}
            >
              {option.text}
            </button>
          ))}
        </div>
        {feedback && <p className="feedback">{feedback}</p>}
        <div className="quiz-controls">
          <button
            type="button"
            className="ghost-btn"
            disabled={current === 0}
            onClick={() => setCurrent((prev) => prev - 1)}
          >
            Back
          </button>
          {current < quiz.questions.length - 1 ? (
            <button type="button" className="solid-btn" onClick={handleNext}>
              Next
            </button>
          ) : (
            <button type="button" className="solid-btn" onClick={handleSubmit}>
              Submit Quiz
            </button>
          )}
        </div>
      </div>
    </section>
  );
};

export default QuizTakePage;
