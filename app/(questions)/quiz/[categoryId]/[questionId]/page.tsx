import "@/styles/quiz.scss";
import { fetchDocumentFromFirestore } from "@/data/firestore";
import { firestore } from "@/firebase/admin-config";
import QuestionCard from "@/components/questionCard";
// import ResultsComponent from "@/components/ResultsComponent";

export type QuestionPageProps = {
  params: {
    categoryId: string;
    questionId: string;
  };
};

// pre-rendered at build time
export async function generateStaticParams() {
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

  // console.log("Single Question (FetchedAnswerDataaaaa):", fetchedAnswerData);

  // console.log("ANSANSwers: ", question.answers);

  return (
    <>
      <div className="questions-container">
        <h1>Question: {questionId}</h1>
        {/* I am a single question card */}
        <div className="question-card">
          <QuestionCard
            question={fetchedAnswerData?.question}
            answers={fetchedAnswerData?.answers}
            correctAns={fetchedAnswerData?.correctAns}
            // questionId={`/${categoryId}/${questionId}`}
          />
        </div>
      </div>
    </>
  );
}

// as QuestionPage is server-side and we'd like to keep it that way, we are fetching the data from Firestore as normal during server-side rendering & passing said data as props to the questionForm client-side component to handle the results logic etc.
// (logic here kept breaking everything - so no thanks)
