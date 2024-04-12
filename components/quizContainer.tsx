"use client";

import { useState } from "react";
import QuestionForm from "./questionForm";

const QuizContainer = ({ question }) => {
  const [results, setResults] = useState({
    totalQuestions: question.length,
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
    <div>
      {question.map((question, index) => (
        <QuestionForm
          key={index}
          question={question.question}
          answers={question.answers}
          correctAns={question.correctAns}
          updateResults={updateResults}
        />
      ))}
    </div>
  );
};

export default QuizContainer;
export { results };
///////////// HELP!! ////////// Keep getting error: Module parse failed: Export 'results' is not defined but I am defining it as the initial state
