import QuestionForm from "@/components/questionForm";
import "@/styles/quiz.scss";
// import "@/styles/auth.scss";

export default async function QuestionPage() {
  return (
    // <div className="auth-container">
    //   <div className="auth-card">
    <div className="quiz-container">
      <div className="quiz-card">
        <h1>Fruit Quiz</h1>
        <QuestionForm />
      </div>
    </div>
  );
}
