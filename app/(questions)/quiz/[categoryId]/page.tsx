import "@/styles/quiz.scss";
import { firestore } from "@/firebase/admin-config";
import Link from "next/link";

// fetch all questions from selected quiz collection (eg. fruit etc.) & map over them
export async function fetchQuizData(categoryId) {
  const quizRef = await firestore
    .collection("quiz")
    .doc(categoryId)
    .collection("questions")
    .get();

  const quizData = quizRef.docs.map((doc) => {
    return {
      id: doc.id,
      ...doc.data(),
    };
  });
  // console.log("FETCHED quizData:", quizData);

  return quizData;
}

// page component to show quiz questions - TO SPLIT?
export default async function QuizPage({ params }) {
  const { categoryId } = params;

  const fetchedQuizData = await fetchQuizData(categoryId);
  console.log("fetchedQuizData:", fetchedQuizData);

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
                <h3>{question?.question}</h3>
              </a>
            </Link>
          ))}
      </div>
    </div>
  );
}
