import "@/styles/quiz.scss";
import { firestore } from "@/firebase/admin-config";
import Link from "next/link";
import {
  fetchUserExperiencePoints,
  fetchCollectionFromFirestore,
  fetchUserProgress,
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
  const userProgress = await fetchUserProgress(userId);

  let correctAnswers = 0;
  let wrongAnswers = 0;

  if (userProgress) {
    Object.values(userProgress).forEach(([key, value]) => {
      if (value === true) {
        correctAnswers += 1;
      } else {
        wrongAnswers += 1;
      }
    });
  }

  console.log("EXPERiencePoints: ", results);
  console.log("USERProgress: ", userProgress);

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
              totalCorrectAnswers: correctAnswers,
              totalWrongAnswers: wrongAnswers,
            }}
          />
        )}
      </div>
    </>
  );
}
