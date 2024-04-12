// as QuestionsAndResultsPage is server-side and we'd like to keep it that way, we are fetching the data from Firestore as normal during server-side rendering & passing said data as props to this client-side component to handle the results logic etc.
"use client";

import { useState } from "react";

const QuestionForm = ({ question, answers, correctAns, updateResults }) => {
  const [selectedAnswer, setSelectedAnswer] = useState(null);

  const onClickNext = () => {
    const isCorrect = selectedAnswer === correctAns;
    updateResults(isCorrect);
  };

  const onAnswerSelected = (answer) => {
    setSelectedAnswer(answer);
  };

  console.log("CHOOOOOOOICES: ", answers);

  return (
    <>
      <h2>{question}</h2>
      <ul>
        {answers.map((answer) => (
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
          {/* {activeQuestion === questions.length - 1 ? "Finish" : "Next"} // turn into back button */}
        </button>
      </div>
    </>
  );
};

export default QuestionForm;
