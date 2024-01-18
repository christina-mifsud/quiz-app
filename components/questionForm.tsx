"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { quiz } from "@/app/(questions)/questions-data";

const QuestionForm = () => {
  const [currentQuestion, setCurrentQuestion] = useState(0);
  const [selectedAnswer, setSelectedAnswer] = useState(null);
  const [selectedAnswerIndex, setSelectedAnswerIndex] = useState(null);

  const router = useRouter();
  const { questions } = quiz; // getting single question object from questions objects
  const { question, choices, correctAnswer } = questions[currentQuestion]; // destructuring single question object to access keys & values

  function handleClickNext() {
    // reset to null so as not to affect next question
    setSelectedAnswer(null);
    setSelectedAnswerIndex(null);
    setCurrentQuestion((prevQuestion) => prevQuestion + 1);
  }

  function handleSelectedAnswer(answer: string, index: number) {
    setSelectedAnswerIndex(index);

    if (answer === correctAnswer) {
      setSelectedAnswer(true);
      console.log("CORRECT ANS!!");
    } else {
      setSelectedAnswer(false);
      console.log("WRONGGGG!!");
    }
  }

  return (
    <>
      {/* <h3>Question</h3> */}
      <p>{question}</p>
      <ul>
        {choices.map((answer, index) => (
          <div
            onClick={() => handleSelectedAnswer(answer, index)}
            key={answer}
            className={selectedAnswerIndex === index ? "selected-answer" : null}
          >
            <label>{answer}</label>
            <input type="radio" name="" value="" />
          </div>
        ))}
      </ul>

      {/* checking is currentQuestion the last question? if so, change button to finish &
      set selectedAnswerIndex to null again when next/finish is clicked */}
      <button onClick={handleClickNext} disabled={selectedAnswer === null}>
        {currentQuestion === questions.length - 1 ? "Finish" : "Next"}
      </button>
    </>
  );
};
export default QuestionForm;
