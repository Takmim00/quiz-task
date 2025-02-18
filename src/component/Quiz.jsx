import { useContext, useEffect, useState } from "react";
import { useNavigate } from "react-router-dom"; // Import useNavigate
import { QuizContext } from "./provider/QuizProvider";
import questions from "./question";

const Quiz = () => {
  const { setScore, attempts, setAttempts } = useContext(QuizContext);
  const [currentQuestion, setCurrentQuestion] = useState(0);
  const [selectedAnswer, setSelectedAnswer] = useState(null);
  const [timer, setTimer] = useState(30);
  const [showResult, setShowResult] = useState(false);
  const navigate = useNavigate(); // Initialize useNavigate

  useEffect(() => {
    if (timer > 0) {
      const interval = setInterval(() => setTimer((prev) => prev - 1), 1000);
      return () => clearInterval(interval);
    } else {
      handleNextQuestion();
    }
  }, [timer]);

  const handleAnswerSelection = (answer) => {
    setSelectedAnswer(answer);
    if (answer === questions[currentQuestion].correctAnswer) {
      setScore((prev) => prev + 1);
    }
  };

  const handleNextQuestion = () => {
    setAttempts([
      ...attempts,
      {
        question: questions[currentQuestion].question,
        selectedAnswer,
        correctAnswer: questions[currentQuestion].correctAnswer,
      },
    ]);

    if (currentQuestion < questions.length - 1) {
      setCurrentQuestion(currentQuestion + 1);
      setSelectedAnswer(null);
      setTimer(30);
    } else {
      setShowResult(true);
    }
  };

  const handleRestartQuiz = () => {
    setCurrentQuestion(0);
    setSelectedAnswer(null);
    setTimer(30);
    setShowResult(false);
    setAttempts([]);
    setScore(0);
  };

  return (
    <div className="flex flex-col items-center min-h-screen p-6 bg-base-200">
      {showResult ? (
        <div className="card w-full max-w-2xl bg-white shadow-lg p-6">
          <h2 className="text-3xl font-bold text-center text-primary">
            🎉 Quiz Completed!
          </h2>
          <h3 className="text-xl font-semibold mt-4 text-center text-secondary">
            Attempt History
          </h3>
          <div className="overflow-x-auto mt-4">
            <table className="table w-full border border-gray-300 rounded-lg">
              <thead>
                <tr className="bg-primary text-white">
                  <th>Question</th>
                  <th>Your Answer</th>
                  <th>Correct Answer</th>
                </tr>
              </thead>
              <tbody>
                {attempts.map((attempt, index) => (
                  <tr
                    key={index}
                    className={`${
                      attempt.selectedAnswer === attempt.correctAnswer
                        ? "bg-green-100"
                        : "bg-red-100"
                    }`}
                  >
                    <td>{attempt.question}</td>
                    <td>{attempt.selectedAnswer || "No answer"}</td>
                    <td>{attempt.correctAnswer}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
          <button
            onClick={handleRestartQuiz}
            className="btn btn-primary mt-6 w-full"
          >
            🔄 Restart Quiz
          </button>
          <button
            onClick={() => navigate("/scoreboard")}
            className="btn btn-secondary mt-4 w-full"
          >
            📊 View Scoreboard
          </button>
        </div>
      ) : (
        <div className="card w-full max-w-lg bg-white shadow-lg p-6">
          <h2 className="text-2xl font-bold text-center text-primary">
            {questions[currentQuestion].question}
          </h2>
          <div className="mt-6 space-y-3">
            {questions[currentQuestion].options.map((option, index) => (
              <button
                key={index}
                className={`btn btn-block ${
                  selectedAnswer
                    ? option === questions[currentQuestion].correctAnswer
                      ? "btn-success"
                      : option === selectedAnswer
                      ? "btn-error"
                      : "btn-outline"
                    : "btn-outline"
                }`}
                onClick={() => handleAnswerSelection(option)}
              >
                {option}
                {selectedAnswer &&
                  option === questions[currentQuestion].correctAnswer &&
                  " ✅"}
                {selectedAnswer &&
                  option === selectedAnswer &&
                  option !== questions[currentQuestion].correctAnswer &&
                  " ❌"}
              </button>
            ))}
          </div>
          <p className="mt-4 text-lg text-gray-600">
            ⏳ Time left:{" "}
            <span className="font-bold text-red-500">{timer}s</span>
          </p>
          <button
            onClick={handleNextQuestion}
            className="btn btn-success btn-block mt-6"
          >
            ➡️ Next Question
          </button>
        </div>
      )}
    </div>
  );
};

export default Quiz;
