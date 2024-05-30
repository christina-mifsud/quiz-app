import "@/styles/quiz.scss";
import { firestore } from "@/firebase/admin-config";
import Link from "next/link";

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
export async function getAllCategories() {
  const collectionRef = await firestore.collection("quiz").get();
  const collectionData = collectionRef.docs.map((doc) => {
    console.log(doc.id);
    return {
      // getting id which is then used for dynamic routing in the <Link>
      id: doc.id,
    };
  });

  return collectionData;
}

// fetches catagories data obtained from prev function & renders something based on data
export default async function AllCategoriesPage() {
  const data = await getAllCategories();

  return (
    <div className="quizzes-container">
      <div className="quiz-cards">
        <h1>Pick a Quiz</h1>
        {data.length &&
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
