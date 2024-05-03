import React from "react";

type ResultsProps = {
  results: {
    totalQuestions: number;
    correctAnswers: number;
    wrongAnswers: number;
  };
};

const ResultsComponent = ({ results }) => {
  return (
    <div>
      <h3>Overall Result</h3>
      <p>Total Questions: {results.totalQuestions}</p>
      <p>Correct Answers: {results.totalCorrectAnswers}</p>
      <p>Wrong Answers: {results.totalWrongAnswers}</p>
    </div>
  );
};

export default ResultsComponent;
