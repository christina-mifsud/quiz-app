"use client";

import { useRef, useState, MouseEvent } from "react";
import { useRouter } from "next/navigation";
import { quiz } from "@/app/(questions)/questions-data";

const QuestionForm = () => {
  const [currentQuestion, setCurrentQuestion] = useState(0);
  const [selectedAnswer, setSelectedAnswer] = useState("");

  const router = useRouter();
  const { questions } = quiz; // getting single question object from questions objects
  const { question, choices, correctAnswer } = questions[currentQuestion]; // destructuring single question object to access keys & values

  function handleClickNext() {
    setCurrentQuestion((prev) => prev + 1);
  }

  function handleSelectedAnswer(answer: string) {
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
      <h3>Question</h3>
      <p>{question}</p>
      <ul>
        {choices.map((answer) => (
          <li onClick={() => handleSelectedAnswer(answer)} key={answer}>
            {answer}
          </li>
        ))}
      </ul>
      {/* check is currentQuestion the last question? if so, change button to finish */}
      <button onClick={handleClickNext}>
        {currentQuestion === questions.length - 1 ? "Finish" : "Next"}
      </button>
    </>
  );
};
export default QuestionForm;
