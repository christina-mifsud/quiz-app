const revalidate = 1000;

import "@/styles/quiz.scss";
import { fetchDocumentFromFirestore } from "@/data/firestore";
import { db } from '@/firebase/config';


export type QuestionPageProps = {
  params: {
    categoryId: string;
    questionId: string;
  };
};

export async function generateStaticPaths() {
  const questions = await db?.collectionGroup('questions').get();

  const paths = questions.docs.map((question: any) => ({
    params: {
      categoryId: question.id,
      questionId: question.id,
    },
  }));

  return {
    paths,
    revalidate,
  };
}

export default async function QuestionPage({ params }: QuestionPageProps) {
  const { categoryId, questionId } = params;

  const fetchedAnswerData = await fetchDocumentFromFirestore(`quiz/${categoryId}/questions`, questionId);

  if (!fetchedAnswerData) return 404;
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
