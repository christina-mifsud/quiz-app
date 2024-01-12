"use client";

import { useRef, useState, MouseEvent } from "react";
import { useRouter } from "next/navigation";
import { quiz } from "@/app/(questions)/questions-data";

const QuestionForm = () => {
  const [currentQuestion, setCurrentQuestion] = useState(0);
  const [selectedAnswer, setSelectedAnswer] = useState("");

  const router = useRouter();
  const { questions } = quiz; // getting single question object from questions objects
  const { question, choices } = questions[currentQuestion]; // destructuring single question object to access keys & values

  function handleClickNext() {
    setCurrentQuestion((prev) => prev + 1);
  }

  return (
    <>
      <h3>Question</h3>
      <p>{questions[currentQuestion].question}</p>
      <ul>
        {choices.map((item, index) => (
          <li key={index}>{item}</li>
        ))}
      </ul>

      <button onClick={(event: MouseEvent) => handleClickNext()}>NEXT</button>
    </>
  );
};
export default QuestionForm;
