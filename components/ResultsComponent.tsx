import React from "react";

type ResultsProps = {
  results: {
    totalQuestions: number;
    correctAnswers: number;
    wrongAnswers: number;
  };
};

const ResultsComponent: React.FC<ResultsProps> = ({ results }) => {
  return (
    <div>
      <h3>Overall Result</h3>
      <p>Total Questions: {results.totalQuestions}</p>
      <p>Correct Answers: {results.correctAnswers}</p>
      <p>Wrong Answers: {results.wrongAnswers}</p>
    </div>
  );
};

export default ResultsComponent;
