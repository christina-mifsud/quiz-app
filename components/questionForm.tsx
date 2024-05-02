// as QuestionsAndResultsPage is server-side and we'd like to keep it that way, we are fetching the data from Firestore as normal during server-side rendering & passing said data as props to this client-side component to handle the results logic etc.
"use client";

import { useState, useEffect } from "react";
import { db, increment } from "@/firebase/config";

const QuestionForm = ({
  question,
  answers,
  correctAns,
  questionId,
  currentUser,
}) => {
  const [selectedAnswer, setSelectedAnswer] = useState(null);
  const [countDown, setCountDown] = useState(10);

  const onAnswerSelected = (answer) => {
    setSelectedAnswer(answer);
  };

  const onClickNext = async () => {
    const isCorrect = selectedAnswer === correctAns;
    if (countDown > 0 && isCorrect) {
      console.log("hurray we got the correct answer");

      // console.log("CHOOOOOOOICES: ", answers);

      // saves which questions were answered and whether correct or not
      await db
        .collection("progress")
        .doc("WhEdXBpNsITHbP1qFx6V")
        .set(
          {
            [questionId]: true,
          },
          { merge: true }
        );

      // give experience points
      await db
        .collection("users")
        .doc("WhEdXBpNsITHbP1qFx6V")
        .set(
          {
            experiencePoints: increment(5),
          },
          { merge: true }
        );
    } else if (countDown > 0) {
      console.log("NOPE");
    }
  };

  // panic timer
  useEffect(() => {
    if (countDown <= 0) return;

    const timer = setTimeout(() => {
      setCountDown(countDown - 1);
    }, 1000);

    return () => clearTimeout(timer);
  }, [countDown]);

  console.log(answers);

  return (
    <>
      <h2>{question}</h2>
      <p>{countDown} seconds remaining</p>
      <ul>
        {answers.map((answer) => (
          <li
            onClick={() => onAnswerSelected(answer)}
            key={answer}
            className={selectedAnswer === answer ? "selected-answer" : ""}
          >
            {answer}
          </li>
        ))}
      </ul>
      <div className="flex-right">
        <button
          onClick={onClickNext}
          disabled={!selectedAnswer || countDown <= 0}
        >
          Next
        </button>
      </div>
    </>
  );
};

export default QuestionForm;
