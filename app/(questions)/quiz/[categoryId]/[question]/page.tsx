import "@/styles/quiz.scss";
import { firestore } from "@/firebase/admin-config";
import Link from "next/link";

// fetch all answers from selected question (eg. Which French dessert's name means "Perfect"? etc.) & map over them
export async function fetchAnswerData(categoryId, questionId) {
  // HELP!!!! Do I have to fetch info from firestore using the categoryId everytime?
  const answersRef = await firestore
    .collection("quiz")
    .doc(categoryId)
    .collection("questions")
    .doc("question-one") // HELP!!! When using 'questionId', I am getting this error:
    // Unhandled Runtime Error: Value for argument "documentPath" is not a valid resource path. Path must be a non-empty string.
    .get();

  const answersData = answersRef.data();
  console.log("FETCHED answersData:", answersData);

  return answersData;
}

export default async function QuestionPage({ params }) {
  const { categoryId, questionId } = params;

  console.log("categoryId:", categoryId);
  console.log("questionId:", questionId);

  const fetchedAnswerData = await fetchAnswerData(categoryId, questionId);
  // console.log("fetchedAnswerData:", fetchedAnswerData);

  return (
    <div className="quiz-container">
      <h1>Quiz Category: {categoryId}</h1>
      <div className="quiz-cards">
        {fetchedAnswerData.answers.length > 0 &&
          fetchedAnswerData.answers.map((answer) => (
            <a className="quiz-card" key={answer.id}>
              {/* <h3>{answer}</h3> */}
              <ul>
                <li>{answer}</li>
              </ul>
            </a>
          ))}
      </div>
    </div>
  );
}
