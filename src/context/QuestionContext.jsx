import { createContext, useContext } from "react";
import { useLocalStorage } from "../hooks/useLocalStorage";
import { INITIAL_QUESTIONS } from "../utils/constants";

// eslint-disable-next-line react-refresh/only-export-components
export const QuestionContext = createContext();

export const QuestionProvider = ({ children }) => {
  const [questions, setQuestions] = useLocalStorage(
    "questions",
    INITIAL_QUESTIONS
  );

  const addQuestion = (newQuestion) => {
    const formattedQuestion = {
      ...newQuestion,
      id: new Date().toString(),
      createdAt: new Date().toISOString(),
    };
    setQuestions((prev) => [formattedQuestion, ...prev]);
  };

  const updateStatus = (id, newStatus) => {
    setQuestions((prev) =>
      prev.map((q) => (q.id === id ? { ...q, status: newStatus } : q))
    );
  };

  const deleteQuestions = (id) => {
    setQuestions((prev) => prev.filter((q) => q.id !== id));
  };

  return (
    <QuestionContext.Provider
      value={{ questions, addQuestion, updateStatus, deleteQuestions }}
    >
      {children}
    </QuestionContext.Provider>
  );
};

// eslint-disable-next-line react-refresh/only-export-components
export const useQuestion = () => useContext(QuestionContext);
