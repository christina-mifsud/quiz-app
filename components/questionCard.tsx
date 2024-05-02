"use client";

import { useState } from "react";
import QuestionForm from "./questionForm";

const QuestionCard = ({ question, answers, correctAns }) => {
  const [results, setResults] = useState({
    totalQuestions: 3, // TODO - change to dynamic
    totalScore: 0,
    totalCorrectAnswers: 0,
    totalWrongAnswers: 0,
  });

  const updateResults = (isCorrect) => {
    setResults((prevResults) => ({
      ...prevResults,
      totalScore: prevResults.totalScore + (isCorrect ? 5 : 0),
      totalCorrectAnswers: isCorrect
        ? prevResults.totalCorrectAnswers + 1
        : prevResults.totalCorrectAnswers,
      totalWrongAnswers: isCorrect
        ? prevResults.totalWrongAnswers
        : prevResults.totalWrongAnswers + 1,
    }));
  };

  return (
    <div className="question-card">
      <QuestionForm
        question={question}
        answers={answers}
        correctAns={correctAns}
        updateResults={updateResults}
      />
    </div>
  );
};
export default QuestionCard;
