"use client";

import { useRef, useState, MouseEvent } from "react";
import { useRouter } from "next/navigation";
import { quiz } from "@/app/(questions)/questions-data";

const QuestionForm = () => {
  const [currentQuestion, setCurrentQuestion] = useState(0);

  const router = useRouter();
  const { questions } = quiz;

  return (
    <>
      <h3>Question</h3>
      <p>{questions[currentQuestion].question}</p>
    </>
  );
};
export default QuestionForm;
