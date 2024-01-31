"use client";

import { useSearchParams } from "next/navigation";
import QuizCard from "@/components/quizCard";

const QuizCategoryPage = () => {
  const searchParams = useSearchParams();
  const categoryId = searchParams.get("categoryId") || null;

  return (
    <div className="quiz-container">
      <h1>Quiz Category: {categoryId}</h1>
      <QuizCard category={categoryId} />
    </div>
  );
};

export default QuizCategoryPage;
