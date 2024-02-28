import { firestore } from "@/firebase/admin-config";

// fetch all quiz data from selected quiz collection (eg. fruit etc.) & map over them
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
      <div className="quiz-questions">
        {fetchedQuizData.length > 0 &&
          fetchedQuizData.map((question) => (
            <div key={question.id}>
              <h3>{question.question}</h3>
              <ul>
                {question.answers.map((answer, index) => (
                  <li key={index}>{answer}</li>
                ))}
              </ul>
            </div>
          ))}
      </div>
    </div>
  );
}
