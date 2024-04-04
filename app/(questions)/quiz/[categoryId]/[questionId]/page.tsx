export const revalidate = 120;

import "@/styles/quiz.scss";
import { fetchDocumentFromFirestore } from "@/data/firestore";
import { db } from "@/firebase/config";
import { firestore } from "@/firebase/admin-config";

export type QuestionPageProps = {
  params: {
    categoryId: string;
    questionId: string;
  };
};

// pre-rendered at build time
export async function getStaticPaths() {
  // get questions collection from firestore & make path for each
  const questions = await firestore?.collectionGroup("questions").get();

  const paths = questions.docs.map((question: any) => ({
    params: {
      categoryId: question.id,
      questionId: question.id,
    },
  }));

  return {
    paths,
    fallback: true, // do I have to make a fallback? (I don't think I've set one)
  };
}

// fetches data (answers for specific question)
async function fetchQuestionData(categoryId: string, questionId: string) {
  // get answers documents from firestore
  const fetchedAnswerData = await fetchDocumentFromFirestore(
    `quiz/${categoryId}/questions`,
    questionId
  );

  return fetchedAnswerData;
}

export default async function QuestionPage({ params }: QuestionPageProps) {
  const { categoryId, questionId } = params;
  const fetchedAnswerData = await fetchQuestionData(categoryId, questionId);

  return (
    <div className="quiz-container">
      <h1>Question: {questionId}</h1>
      <div className="question-card">
        <h3>{fetchedAnswerData?.question}</h3>
        <div className="answers">
          {fetchedAnswerData?.answers.length > 0 &&
            fetchedAnswerData?.answers.map((answer: any) => (
              // I am single question card with buttons for answers
              <button key={answer.id} className="btn">
                {answer}
              </button>
            ))}
        </div>
      </div>
    </div>
  );
}
