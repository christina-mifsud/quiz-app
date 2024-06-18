"use client";

import "@/styles/quiz.scss";
import Link from "next/link";
import { useAuth } from "@/contexts/AuthContext";
import { useEffect, useState } from "react";
import { firestore } from "@/firebase/admin-config";

// firestore setup
// - quiz (collection)
//   - desserts (document)
//     - questions (collection)
//       - question-one (document)
//         - question (field) eg. "What is the main ingredient used to make brownies?"
//         - answers (field) eg. ["chocolate", "butter", "milk"]
//         - correctAns (field) eg. "chocolate"
//       - question-two (document)
//         - question (document) eg. "Which desert was named after a Russian ballerina?"
//         - answers (field) eg. ["pavlova", "tiramisu", "madeleine"]
//         - correctAns (field) eg. "madeleine"

// fetch all quiz categories from quiz collection (eg. fruit etc.) & map over them
async function getAllCategories() {
  const collectionRef = await firestore.collection("quiz").get();
  return collectionRef.docs.map((doc) => ({
    // getting id which is then used for dynamic routing in the <Link>
    id: doc.id,
  }));
}

// fetches catagories data obtained from prev function & renders something based on data
export default function AllCategoriesPage() {
  const { currentUser } = useAuth();
  const [data, setData] = useState([]);

  useEffect(() => {
    if (currentUser) {
      getAllCategories().then(setData);
    }
  }, [currentUser]);

  if (!currentUser) {
    return <div>Loading...</div>;
  }

  return (
    <div className="quizzes-container">
      <div className="quiz-cards">
        <h1>Pick a Quiz</h1>
        {data.length &&
          data.map((category: any) => (
            <Link
              legacyBehavior
              // dynamic routing
              href={`/quiz/${category.id}`}
              key={category.id}
            >
              <a className="quiz-card">
                <h3>{category?.id}</h3>
              </a>
            </Link>
          ))}
      </div>
    </div>
  );
}
