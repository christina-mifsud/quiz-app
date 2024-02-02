import { firestore } from "@/firebase/admin-config";
import { useSearchParams } from "next/navigation";

export async function fetchQuizData() {
  const categoryId = useSearchParams();

  let quizData: {
    id: string;
    question: any;
    options: any;
    correctAnswer: any;
  }[] = [];

  try {
    const quizRef = await firestore
      .collection("quiz")
      .doc(categoryId)
      .collection("questions")
      .get();
    quizData = quizRef.docs.map((doc) => ({
      id: doc.id,
      question: doc.data().question,
      options: doc.data().options,
      correctAnswer: doc.data().correctAnswer,
    }));
    console.log("FETCHED quizData:", quizData);
  } catch (error) {
    console.error("Error fetching!!", error);
  }

  return {
    categoryId,
    quizData,
  };
}

export default async function QuizPage({ categoryId, quizData }) {
  // const data = await fetchQuizData();
  return (
    <div className="quiz-container">
      <h1>Quiz Category: {categoryId}</h1>
      <div className="quiz-questions">
        {quizData.length &&
          quizData.map((question) => (
            <div key={question.id}>
              <h3>{question.question}</h3>
              <ul>
                {question.options.map((option, index) => (
                  <li key={index}>{option}</li>
                ))}
              </ul>
            </div>
          ))}
      </div>
    </div>
  );
}
