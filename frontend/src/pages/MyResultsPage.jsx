import { useEffect, useState } from "react";
import { resultService } from "../services/api.js";
import "../styles/QuizResultsPage.css";

const MyResultsPage = () => {
  const [results, setResults] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    resultService
      .myResults()
      .then((response) => setResults(response.data))
      .finally(() => setLoading(false));
  }, []);

  return (
    <section className="quiz-results">
      <div className="results-card">
        <h2>My Results</h2>
        {loading ? (
          <p className="status">Loading results...</p>
        ) : results.length === 0 ? (
          <p className="status">No results yet. Take a quiz!</p>
        ) : (
          <div className="results-list">
            {results.map((result) => (
              <div className="result-row" key={result.id}>
                <div>
                  <h4>{result.quizTitle}</h4>
                  <p>
                    Score: {result.score} / {result.total}
                  </p>
                </div>
                <span>{new Date(result.createdAt).toLocaleDateString()}</span>
              </div>
            ))}
          </div>
        )}
      </div>
    </section>
  );
};

export default MyResultsPage;
