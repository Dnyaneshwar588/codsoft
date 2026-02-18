import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { quizService } from "../services/api.js";
import "../styles/QuizCreatePage.css";

const emptyQuestion = () => ({
  prompt: "",
  options: ["", "", "", ""],
  correctIndex: 0,
  points: 1
});

const QuizCreatePage = () => {
  const navigate = useNavigate();
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [questions, setQuestions] = useState([emptyQuestion()]);
  const [saving, setSaving] = useState(false);

  const updateQuestion = (index, updates) => {
    setQuestions((prev) =>
      prev.map((question, qIndex) =>
        qIndex === index ? { ...question, ...updates } : question
      )
    );
  };

  const updateOption = (qIndex, optionIndex, value) => {
    setQuestions((prev) =>
      prev.map((question, idx) => {
        if (idx !== qIndex) return question;
        const options = question.options.map((option, oIdx) =>
          oIdx === optionIndex ? value : option
        );
        return { ...question, options };
      })
    );
  };

  const addQuestion = () => {
    setQuestions((prev) => [...prev, emptyQuestion()]);
  };

  const removeQuestion = (index) => {
    if (questions.length === 1) return;
    setQuestions((prev) => prev.filter((_, qIndex) => qIndex !== index));
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    setSaving(true);

    const payload = {
      title,
      description,
      questions
    };

    try {
      await quizService.create(payload);
      navigate("/quizzes");
    } finally {
      setSaving(false);
    }
  };

  return (
    <section className="quiz-create">
      <div className="form-shell">
        <h2>Create a New Quiz</h2>
        <p>Structure your questions and mark the correct choice.</p>
        <form onSubmit={handleSubmit}>
          <div className="form-field">
            <label htmlFor="title">Quiz Title</label>
            <input
              id="title"
              type="text"
              value={title}
              onChange={(event) => setTitle(event.target.value)}
              required
            />
          </div>
          <div className="form-field">
            <label htmlFor="description">Description</label>
            <textarea
              id="description"
              rows="3"
              value={description}
              onChange={(event) => setDescription(event.target.value)}
            />
          </div>

          {questions.map((question, index) => (
            <div className="question-card" key={`question-${index}`}>
              <div className="question-header">
                <h4>Question {index + 1}</h4>
                <button type="button" onClick={() => removeQuestion(index)}>
                  Remove
                </button>
              </div>
              <div className="form-field">
                <label>Prompt</label>
                <input
                  type="text"
                  value={question.prompt}
                  onChange={(event) =>
                    updateQuestion(index, { prompt: event.target.value })
                  }
                  required
                />
              </div>

              <div className="options-grid">
                {question.options.map((option, optionIndex) => (
                  <div className="option-field" key={`option-${optionIndex}`}>
                    <label>Option {optionIndex + 1}</label>
                    <input
                      type="text"
                      value={option}
                      onChange={(event) =>
                        updateOption(index, optionIndex, event.target.value)
                      }
                      required
                    />
                  </div>
                ))}
              </div>

              <div className="question-footer">
                <div>
                  <label>Correct Answer</label>
                  <select
                    value={question.correctIndex}
                    onChange={(event) =>
                      updateQuestion(index, {
                        correctIndex: Number(event.target.value)
                      })
                    }
                  >
                    {question.options.map((_, optionIndex) => (
                      <option key={`correct-${optionIndex}`} value={optionIndex}>
                        Option {optionIndex + 1}
                      </option>
                    ))}
                  </select>
                </div>
                <div>
                  <label>Points</label>
                  <input
                    type="number"
                    min="1"
                    value={question.points}
                    onChange={(event) =>
                      updateQuestion(index, {
                        points: Number(event.target.value)
                      })
                    }
                  />
                </div>
              </div>
            </div>
          ))}

          <div className="form-actions">
            <button type="button" className="ghost-btn" onClick={addQuestion}>
              Add Question
            </button>
            <button type="submit" className="solid-btn" disabled={saving}>
              {saving ? "Saving..." : "Publish Quiz"}
            </button>
          </div>
        </form>
      </div>
    </section>
  );
};

export default QuizCreatePage;
