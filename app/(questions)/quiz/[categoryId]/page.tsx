import "@/styles/quiz.scss";
import { firestore } from "@/firebase/admin-config";
import Link from "next/link";
import { fetchCollectionFromFirestore } from "@/data/firestore";

export type QuizPageProps = {
  params: {
    categoryId: string;
  };
};

// export default async function QuizPage({ params }: QuizPageProps) {
//   const { categoryId } = params;

//   const fetchedQuizData = await fetchCollectionFromFirestore(
//     `quiz/${categoryId}/questions`
//   );

// fetch all questions from selected quiz collection (eg. fruit etc.) & map over them
// export async function fetchQuizData(categoryId: string) {

// const quizRef = await firestore
//   .collection("quiz")
//   .doc(categoryId)
//   .collection("questions")
//   .get();

// const quizData = quizRef.docs.map((doc) => {
//   return {
//     id: doc.id,
//     ...doc.data(),
//   };
// });
// console.log("FETCHED quizData:", quizData);}

// page component to show quiz questions
export default async function QuizPage({ params }: QuizPageProps) {
  const { categoryId } = params;

  const fetchedQuizData = await fetchCollectionFromFirestore(
    `quiz/${categoryId}/questions`
  );

  console.log("fetchedQuizData:", fetchedQuizData);

  return (
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
  );
}
