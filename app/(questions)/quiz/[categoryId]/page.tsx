import "@/styles/quiz.scss";
import { firestore } from "@/firebase/admin-config";
import Link from "next/link";
import {
  fetchUserExperiencePoints,
  fetchCollectionFromFirestore,
} from "@/data/firestore";
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

  const userId = "WhEdXBpNsITHbP1qFx6V";
  const results = await fetchUserExperiencePoints(userId);

  console.log("EXPERiencePoints: ", results);

  return (
    <>
      <div className="quizzes-container">
        <h1>Quiz Category: {categoryId}</h1>
        <div className="quiz-cards">
          {/* QuizContainer */}
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
      <div>
        {/* ResultsComponent */}
        {results && (
          <ResultsComponent
            results={{
              totalQuestions: fetchedQuizData.length,
              totalCorrectAnswers: results,
              totalWrongAnswers: fetchedQuizData.length - results,
            }}
          />
        )}
      </div>
    </>
  );
}
