import "@/styles/quiz.scss";
import { firestore } from "@/firebase/admin-config";
import Link from "next/link";

export async function getAllCategories() {
  const collectionRef = await firestore.collection("quiz").get();
  const collectionData = collectionRef.docs.map((doc) => {
    return {
      id: doc.id,
    };
  });

  return collectionData;
}

export default async function CategoriesPage() {
  const data = await getAllCategories();

  return (
    <div className="quiz-container">
      <h1>Pick a Quiz</h1>
      <div className="quiz-cards">
        {data.length &&
          data.map((category) => (
            <Link
              href={`/quiz/${category.id}`}
              className="quiz-card"
              key="category.id"
            >
              <h3>{category?.id}</h3>
            </Link>
          ))}
      </div>
    </div>
  );
}
