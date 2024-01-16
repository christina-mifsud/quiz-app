import QuestionForm from "@/components/questionForm";
import "@/styles/quiz.scss";

export default async function QuestionPage() {
  return (
    <div className="quiz-container">
      <div className="quiz-card">
        <h1>Fruit Quiz</h1>
        <QuestionForm />
      </div>
    </div>
  );
}
