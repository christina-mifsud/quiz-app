import { firestore } from '@/firebase/admin-config'

interface QuestionPageProps {
    category: string;
    questionId: string;
}

export async function getQuestion(category: string, questionId: string) {
    const questionRef = await firestore.collection('quiz').doc(category).collection('questions').doc(questionId).get();
    const questionData = questionRef.data();

    return questionData;
}

export default async function QuestionPage({ params }: { params: QuestionPageProps }) {
    const { category, questionId } = params;
    const data = await getQuestion(category, questionId);

    // {} undef

    return (
        <>
            <h1>{data?.question}</h1>
            <section className="">
                {data?.answers.map((answer: any, index: number) => (
                    <button 
                        key={index}
                    >
                        {answer}
                    </button>
                ))}
            </section>
        </>
    )
}