import "@/styles/quiz.scss";
import Link from "next/link";
import { fetchCollectionFromFirestore } from "@/data/firestore";


export type QuizPageProps = {
  params: {
    categoryId: string;
  };
};

export default async function QuizPage({ params }: QuizPageProps) {
  const { categoryId } = params;

  const fetchedQuizData = await fetchCollectionFromFirestore(`quiz/${categoryId}/questions`);

  return (
    <div className="quiz-container">
      <h1>Quiz Category: {categoryId}</h1>
      <div className="quiz-cards">
        {fetchedQuizData.length > 0 &&
          fetchedQuizData.map((question) => (
            <Link
              legacyBehavior
              // dynamic routing
              href={`/quiz/${categoryId}/${question.id}`}
              key={question.id}
            >
              <a className="quiz-card" key={question.id}>
                {/* <h3>{question?.question}</h3> */}
                <h3>{question.id}</h3>
              </a>
            </Link>
          ))}
      </div>
    </div>
  );
}

