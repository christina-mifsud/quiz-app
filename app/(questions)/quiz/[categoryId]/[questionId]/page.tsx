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


  const fetchedAnswerData = await fetchDocumentFromFirestore(
    `quiz/${categoryId}/questions`,
    questionId
  );

  return (
    <div className="quiz-container">
      <h1>Question: {questionId}</h1>
      <div className="quiz-card">
        <h3>{fetchedAnswerData?.question}</h3>
        <div>
          {fetchedAnswerData?.answers.length > 0 &&
            fetchedAnswerData?.answers.map((answer: any) => (
              <ul key={answer.id}>
                <li>{answer}</li>
              </ul>
            ))}
        </div>
      </div>
    </div>
  );
}
