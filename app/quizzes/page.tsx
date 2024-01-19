import QuestionForm from "@/components/questionForm";
import "@/styles/quiz.scss";

export default async function QuestionPage() {
  return (
    // <div className="quiz-container">
    //   <div className="quiz-card">
    <div>
      <div>
        <h1>All Quizzes</h1>
        <h2>Fruit Quiz</h2>
        <h2>Vegetable Quiz</h2>
        {/* <QuestionForm questions={[]} /> */}
      </div>
    </div>
  );
}
