import { useContext } from "react";
import { QuizContext } from "./provider/QuizProvider";

const Scoreboard = () => {
  const { score, attempts } = useContext(QuizContext);

  return (
    <div className="flex flex-col items-center min-h-screen p-6 bg-base-200">
      <div className="card w-full max-w-2xl bg-white shadow-lg p-6">
        <h2 className="text-3xl font-bold text-center text-primary">
          📊 Scoreboard
        </h2>

        <div className="mt-4 text-center">
          <p className="text-2xl font-semibold text-gray-800">
            Your Score: <span className="text-green-600">{score}</span>
          </p>
        </div>

        <h3 className="text-xl font-semibold mt-6 text-center text-secondary">
          📌 Attempt History
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
              {attempts.map((attempt, index) => {
                const isIntegerQuestion = !isNaN(attempt.selectedAnswer) && !isNaN(attempt.correctAnswer);
                return (
                  <tr
                    key={index}
                    className={`${
                      isIntegerQuestion
                        ? parseInt(attempt.selectedAnswer) === parseInt(attempt.correctAnswer)
                          ? "bg-green-100"
                          : "bg-red-100"
                        : attempt.selectedAnswer === attempt.correctAnswer
                        ? "bg-green-100"
                        : "bg-red-100"
                    }`}
                  >
                    <td className="p-3">{attempt.question}</td>
                    <td className="p-3 font-medium">
                      {attempt.selectedAnswer || "No answer"}
                    </td>
                    <td className="p-3 font-medium">{attempt.correctAnswer}</td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>

        <button
          className="btn btn-primary w-full mt-6"
          onClick={() => window.history.back()}
        >
          🔙 Back to Quiz
        </button>
      </div>
    </div>
  );
};

export default Scoreboard;
