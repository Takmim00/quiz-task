import { createContext, useState } from "react";

export const QuizContext = createContext();
const QuizProvider = ({ children }) => {
  const [score, setScore] = useState(0);
  const [attempts, setAttempts] = useState([]);

  return (
    <QuizContext.Provider value={{ score, setScore, attempts, setAttempts }}>
      {children}
    </QuizContext.Provider>
  );
};

export default QuizProvider;
