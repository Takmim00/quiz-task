import { useContext, useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { QuizContext } from "./provider/QuizProvider";

const questions = [
  { id: 6, question: "What is the value of 12 + 28?", correctAnswer: 40 },
  {
    id: 7,
    question: "How many states are there in the United States?",
    correctAnswer: 50,
  },
  {
    id: 8,
    question: "In which year was the Declaration of Independence signed?",
    correctAnswer: 1776,
  },
  {
    id: 9,
    question: "What is the value of pi rounded to the nearest integer?",
    correctAnswer: 3,
  },
  {
    id: 10,
    question:
      "If a car travels at 60 mph for 2 hours, how many miles does it travel?",
    correctAnswer: 120,
  },
];

const Questions = () => {
  const [userAnswers, setUserAnswers] = useState({});
  const [feedback, setFeedback] = useState({});
  const [timeLeft, setTimeLeft] = useState(30);
  const [currentQuestion, setCurrentQuestion] = useState(0);
  const { setScore, setAttempts } = useContext(QuizContext);
  const navigate = useNavigate();

  useEffect(() => {
    const timer = setInterval(() => {
      setTimeLeft((prev) => {
        if (prev > 0) return prev - 1;
        if (currentQuestion < questions.length - 1) {
          setCurrentQuestion(currentQuestion + 1);
          return 30;
        } else {
          clearInterval(timer);
          handleSubmit();
          return 0;
        }
      });
    }, 1000);
    return () => clearInterval(timer);
  }, [currentQuestion]);

  const handleChange = (e, id) => {
    setUserAnswers({ ...userAnswers, [id]: e.target.value });
  };

  const handleNext = () => {
    if (currentQuestion < questions.length - 1) {
      setCurrentQuestion(currentQuestion + 1);
      setTimeLeft(30);
      setUserAnswers((prevAnswers) => ({
        ...prevAnswers,
        [questions[currentQuestion + 1].id]: "",
      }));
    } else {
      handleSubmit();
    }
  };

  const handleSubmit = () => {
    const newFeedback = {};
    let score = 0;
    const attemptDetails = [];

    questions.forEach((q) => {
      const isCorrect = parseInt(userAnswers[q.id]) === q.correctAnswer;
      newFeedback[q.id] = isCorrect ? "Correct" : "Incorrect";
      if (isCorrect) score++;
      attemptDetails.push({
        question: q.question,
        selectedAnswer: userAnswers[q.id] || "No answer",
        correctAnswer: q.correctAnswer,
      });
    });

    setFeedback(newFeedback);
    setScore(score);
    setAttempts(attemptDetails);
    navigate("/scoreboard");
  };

  return (
    <div className="p-8  flex items-center justify-center">
      <div className="w-full sm:w-2/3 md:w-1/2 lg:w-1/3 bg-white rounded-xl shadow-xl p-6">
        <h1 className="text-4xl font-bold text-center text-blue-600 mb-6">
          Integer-Type Questions
        </h1>
        <div className="mb-6 text-center">
          <div className="text-xl mb-4">
            {questions[currentQuestion].question}
          </div>
          <input
            type="text"
            className="input input-bordered text-black w-full mb-4 py-2 px-4 rounded-lg"
            onChange={(e) => handleChange(e, questions[currentQuestion].id)}
            disabled={timeLeft === 0}
            value={userAnswers[questions[currentQuestion].id] || ""}
            placeholder="Enter your answer"
          />
          <p className="text-lg mb-4">
            Time Left: <span className="font-bold">{timeLeft}</span> seconds
          </p>
          {feedback[questions[currentQuestion].id] && (
            <p className="mt-4 text-lg text-green-500 font-semibold">
              {feedback[questions[currentQuestion].id]}
            </p>
          )}
        </div>
        <button
          className={`btn btn-accent w-full py-3 mt-4 text-lg ${
            timeLeft === 0 ? "bg-gray-400" : "bg-blue-500"
          }`}
          onClick={handleNext}
          disabled={timeLeft === 0}
        >
          Next
        </button>
      </div>
    </div>
  );
};

export default Questions;
