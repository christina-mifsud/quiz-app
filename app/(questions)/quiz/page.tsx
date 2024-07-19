"use client";

import "@/styles/quiz.scss";
import "@/styles/auth.scss";
import Link from "next/link";
import { useAuth } from "@/contexts/AuthContext";
import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";

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
  const { currentUser, logout } = useAuth();
  const [data, setData] = useState<Category[]>([]);
  const [loading, setLoading] = useState(true);
  const router = useRouter();

  useEffect(() => {
    if (!currentUser) {
      router.push("/"); // redirect to home if not logged in
      return;
    }

    // client-side fetching data from API to keep client-side & server-side separate
    // only fetch categories if user is logged in
    console.log("Fetching categories...");
    fetch("api/getCategories")
      .then((response) => {
        if (!response.ok) {
          throw new Error("Failed to fetch categories");
        }
        return response.json();
      })
      .then((data: Category[]) => {
        console.log("Fetched categories:", data);
        setData(data);
        setLoading(false);
      })
      .catch((error) => {
        console.error("FAILEDDDDD to fetch categories:", error);
        setLoading(false);
      });
  }, [currentUser, router]);

  if (loading) {
    return <div>Log In or Sign Up</div>; // TODO - more user friendly/appealing
  }

  return (
    <>
      <div className="auth-nav-bar">
        <button onClick={logout}>Log Out</button>
      </div>
      <div className="page-container">
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
      </div>
    </>
  );
}
