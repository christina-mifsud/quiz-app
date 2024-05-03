import "@/styles/quiz.scss";
import { firestore } from "@/firebase/admin-config";
import Link from "next/link";
import {
  fetchUserExperiencePoints,
  fetchCollectionFromFirestore,
  fetchUserProgress,
  fetchDocumentFromFirestore,
} from "@/data/firestore";
import ResultsComponent from "@/components/ResultsComponent";
import { ProgressCheck } from "./_components/progress-check";

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
  const userDoc = await fetchDocumentFromFirestore("users", userId);
  const userProgressCollection = await fetchDocumentFromFirestore(`progress`, userId);
  const results = await fetchUserExperiencePoints(userId);

  return (
    <>
      <div className="quizzes-container">
        <h1>Quiz Category: {categoryId}</h1>
        <div className="quiz-cards">
          {/* QuizContainer */}
          {fetchedQuizData?.length > 0 &&
            fetchedQuizData?.map((question) => (
              <>
              <ProgressCheck
                questionSlug={`/${categoryId}/${question.id}`}
                progressSlugs={userProgressCollection}
                id={question.id}
              />
              </>
            ))}
        </div>
      </div>
      <div>
        {/* ResultsComponent */}
        {results && (
          <ResultsComponent
            results={{
              totalQuestions: fetchedQuizData.length,
            }}
          />
        )}
      </div>
    </>
  );
}
