"use client";

import "@/styles/quiz.scss";
import Link from "next/link";
import { useAuth } from "@/contexts/AuthContext";
import { useEffect, useState } from "react";

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

interface Category {
  id: string;
}

// fetches catagories data obtained from prev function & renders something based on data
export default function AllCategoriesPage() {
  const { currentUser } = useAuth();
  const [data, setData] = useState<Category[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // client-side fetching data from API to keep everything separate
    if (currentUser) {
      fetch("/api/getCategories")
        .then((response) => response.json())
        .then((data: Category[]) => {
          setData(data);
          setLoading(false);
        });
    }
  }, [currentUser]);

  if (!currentUser || loading) {
    return <div>Loading...</div>;
  }

  return (
    <div className="quizzes-container">
      <div className="quiz-cards">
        <h1>Pick a Quiz</h1>
        {data.length > 0 &&
          data.map((category) => (
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
