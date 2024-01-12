import QuestionForm from "@/components/questionForm";
import "@/app/(auth)/auth.scss";

export default async function QuestionPage() {
  return (
    <div className="question-container">
      <div className="question-card">
        <h2>Fruit Quiz</h2>
        <QuestionForm />
      </div>
    </div>
  );
}
