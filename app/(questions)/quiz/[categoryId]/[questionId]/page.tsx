import "@/styles/quiz.scss";
import { firestore } from "@/firebase/admin-config";

// fetch all answers from selected question (eg. Which French dessert's name means "Perfect"? etc.) & map over them
export async function fetchAnswerData(categoryId, questionId) {
  const answersRef = await firestore
    .collection("quiz")
    .doc(categoryId)
    .collection("questions")
    .doc(questionId)
    .get();

  const answersData = answersRef.data();
  console.log("FETCHED answersData:", answersData);

  return answersData;
}

export default async function QuestionPage({ params, answersData }) {
  const { categoryId, questionId } = params;

  // console.log("categoryId:", categoryId);
  // console.log("questionId:", questionId);

  const fetchedAnswerData = await fetchAnswerData(categoryId, questionId);

  return (
    <div className="quiz-container">
      <h1>Question: {questionId}</h1>
      <div className="quiz-card">
        <h3>{answersData.question}</h3>
        <ul>
          <li>{answersData.answer}</li>
        </ul>
      </div>
    </div>
  );
}
