import "@/styles/quiz.scss";
import { fetchDocumentFromFirestore } from "@/data/firestore";


export type QuestionPageProps = {
  params: {
    categoryId: string;
    questionId: string;
  };
};


export default async function QuestionPage({ params }: QuestionPageProps) {
  const { categoryId, questionId } = params;

  const fetchedAnswerData = await fetchDocumentFromFirestore(`quiz/${categoryId}/questions`, questionId);
  // {}

  return (
    <div className="quiz-container">
      <h1>Quiz Category: {categoryId}</h1>
      <div className="quiz-cards">
        {fetchedAnswerData?.answers.length > 0 &&
          fetchedAnswerData?.answers.map((answer: any) => (
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
