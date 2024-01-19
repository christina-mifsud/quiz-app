import { useRouter } from "next/navigation";
import QuestionForm from "@/components/questionForm";
import { fruitQuiz, vegQuiz } from "../questions-data";

  // if (router.isFallback) {
  //   return <div>Loading...</div>;
  // }

// const { quiz } = router.query;

// // // useRouter().query.slug

export default function QuizQuestions({
  params,
}: {
  params: { quizTopic: string };
  }) {
  
  const router = useRouter();
  const { quiz } = { params.quizTopic };

  let selectedQuiz;

  if (quizTopic === "fruit") {
    selectedQuiz = fruitQuiz;
  } else if (quizTopic === "vegetables") {
    selectedQuiz = vegQuiz;
  } else {
    console.log("No quiz found!!");
  }

  return (
    <>
      <h1>Chosen quiz topic is:</h1>
      <h2>{params.quizTopic}</h2>

      <QuestionForm questions={selectedQuiz.questions} />
    </>
  );
}
