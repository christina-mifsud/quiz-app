// as QuestionPage is server-side and we'd like to keep it that way, we are fetching the data from Firestore as normal during server-side rendering & passing said data as props to this client-side component to handle the results logic etc.
"use client";

import { useState } from "react";

const QuestionForm = ({ questions }) => {
  const [activeQuestion, setActiveQuestion] = useState(0);
  const [selectedAnswer, setSelectedAnswer] = useState(null);
  const [showResult, setShowResult] = useState(false);

  const [result, setResult] = useState({
    score: 0,
    correctAnswers: 0,
    wrongAnswers: 0,
  });

  // const { questions } = quiz; // getting single question object from questions objects
  const { question, choices, correctAnswer } = questions[activeQuestion]; // destructuring single question object to access keys & values

  const onClickNext = () => {
    setResult((prev) =>
      selectedAnswer === correctAnswer
        ? {
            ...prev,
            score: prev.score + 5,
            correctAnswers: prev.correctAnswers + 1,
          }
        : { ...prev, wrongAnswers: prev.wrongAnswers + 1 }
    );

    setSelectedAnswer(null);
    if (activeQuestion !== questions.length - 1) {
      setActiveQuestion((prev) => prev + 1);
    } else {
      setActiveQuestion(0);
      setShowResult(true);
    }
  };

  const onAnswerSelected = (answer) => {
    setSelectedAnswer(answer);
  };

  return (
    <div className="quiz-container">
      {!showResult ? (
        <div>
          <h2>{question}</h2>
          <ul>
            {choices.map((answer) => (
              <li
                onClick={() => onAnswerSelected(answer)}
                key={answer}
                // checking if each li is selected or not
                className={selectedAnswer === answer ? "selected-answer" : null}
              >
                {answer}
              </li>
            ))}
          </ul>
          <div className="flex-right">
            <button onClick={onClickNext} disabled={!selectedAnswer}>
              {activeQuestion === questions.length - 1 ? "Finish" : "Next"}
            </button>
          </div>
        </div>
      ) : (
        <div className="result">
          <h3>Result</h3>
          <p>
            Total Question: <span>{questions.length}</span>
          </p>
          <p>
            Total Score:<span> {result.score}</span>
          </p>
          <p>
            Correct Answers:<span> {result.correctAnswers}</span>
          </p>
          <p>
            Wrong Answers:<span> {result.wrongAnswers}</span>
          </p>
        </div>
      )}
    </div>
  );
};

export default QuestionForm;
