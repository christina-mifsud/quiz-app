import "@/styles/quiz.scss";
import { firestore } from "@/firebase/admin-config";
import Link from "next/link";
import { fetchCollectionFromFirestore } from "@/data/firestore";
import ResultsComponent from "@/components/ResultsComponent";

export type QuizPageProps = {
  params: {
    categoryId: string;
  };
};

// page component to show quiz questions
export default async function QuizPage({ params }: QuizPageProps) {
  const { categoryId } = params;

  const fetchedQuizData = await fetchCollectionFromFirestore(
    `quiz/${categoryId}/questions`
  );

  // console.log("fetchedQuizData:", fetchedQuizData);

  console.log("REEEEESults: ", results);

  return (
    <>
      <div className="quizzes-container">
        <h1>Quiz Category: {categoryId}</h1>
        <div className="quiz-cards">
          {fetchedQuizData?.length > 0 &&
            fetchedQuizData?.map((question) => (
              <Link
                legacyBehavior
                href={`/quiz/${categoryId}/${question.id}`}
                key={question.id}
              >
                <a className="quiz-card" key={question.id}>
                  {/* I am question-one etc. card */}
                  <h3>{question.id}</h3>
                </a>
              </Link>
            ))}
        </div>
      </div>
      <div className="results-container">
        {results && <ResultsComponent results={results} />}
      </div>
    </>
  );
}
