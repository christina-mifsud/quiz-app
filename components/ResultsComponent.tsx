import React from "react";

type ResultsProps = {
  results: {
    totalQuestions: number;
    totalScore: number;
    totalCorrectAnswers: number;
    totalWrongAnswers: number;
  };
};

const ResultsComponent = ({ results }) => {
  return (
    <div>
      <h3>Overall Result</h3>
      <p>Total Questions: {results.totalQuestions}</p>
      <p>Total Score: {results.totalScore}</p>
      <p>Total Correct Answers: {results.totalCorrectAnswers}</p>
      <p>Total Wrong Answers: {results.totalWrongAnswers}</p>
    </div>
  );
};

export default ResultsComponent;
