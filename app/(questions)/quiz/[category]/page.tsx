import { firestore } from '@/firebase/admin-config'
import Link from 'next/link'
import "@/styles/quiz.scss";

interface IParams {
    category: string;
}

export async function getAllQuestions (category: string) {
    const questionsRef = await firestore.collection('quiz').doc(category).collection('questions').get();
    const questionsData = questionsRef.docs.map((doc) => {
        return {
            id: doc.id,
            ...doc.data()
        }
    })

    return questionsData;
}


export default async function QuestionsPage({ params }: { params: IParams }) {
    const category = params.category;
    const data = await getAllQuestions(category);

    console.log(data);

    return (
        <div className="quiz-container">
        <h1>Pick a Quiz</h1>
        <div className="quiz-cards">
        {data.length &&
          data.map((question) => (
            <Link
              href={`/quiz/${category}/${question.id}`}
              className="quiz-card"
              key="category.id"
            >
              <h3>{question?.id}</h3>
            </Link>
          ))}
      </div>
      </div>
    )
}