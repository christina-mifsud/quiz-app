import { useRouter } from "next/router";
import QuizCard from "@/components/quizCard";

const QuizCategoryPage = () => {
  const router = useRouter();
  const { categoryId } = router.query;

  return (
    <div className="quiz-container">
      <h1>Quiz Category: {categoryId}</h1>
      <QuizCard category={category} />
    </div>
  );
};

export default QuizCategoryPage;
