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
export async function generateStaticPaths() {
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
export async function getStaticProps({
  params,
}: {
  params: { categoryId: string; questionId: string };
}) {
  const { categoryId, questionId } = params;

  // get answers documents from firestore
  const fetchedAnswerData = await fetchDocumentFromFirestore(
    `quiz/${categoryId}/questions`,
    questionId
  );

  return {
    props: {
      categoryId,
      questionId,
      fetchedAnswerData,
    },
    revalidate: 120, // re-load in 2mins
  };
}

// export default async function QuestionPage({ params }: QuestionPageProps) {
// export default function QuestionPage({ fetchedAnswerData }: { fetchedAnswerData: any }) {

export default function QuestionPage({
  categoryId,
  questionId,
  fetchedAnswerData,
}: {
  categoryId: string;
  questionId: string;
  fetchedAnswerData: any;
}) {
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

// NOTES: generateStaticPaths & getStaticProps - both are needed for ISR.
// if a request is made to a page that hasn't been pre-rendered (because of fallback: true), fallback version of page will be displayed. In the meantime,  data will be fetched with getStaticProps. Once fetched, page will reload with new data to show updated version.
