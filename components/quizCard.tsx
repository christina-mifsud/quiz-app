import QuestionForm from "@/components/questionForm";

const QuizCard = ({ category }: { category: string }) => (
  <div className="quiz-card">
    <h3>{category?.id}</h3>
    <QuestionForm />
  </div>
);

export default QuizCard;
