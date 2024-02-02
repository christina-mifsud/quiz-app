import "@/styles/quiz.scss";
import { firestore } from "@/firebase/admin-config";
import Link from "next/link";

// firestore setup
// - quiz (collection)
//   - fruit (document)
//     - questions (collection)
//       - question (document) eg. "What color is a banana?"
//         - options (field) eg. ["yellow", "blue", "red"]
//         - correctAnswer (field) eg. "yellow"
//       - question (document) eg. "What color is a strawberry?"
//         - options (field) eg. ["blue", "red", "yellow"]
//         - correctAnswer (field) eg. "red"
//   - vegetables (document)
//     - questions (collection)
//       - question (document) eg. "What color is broccoli?"
//         - options (field) eg. ["green", "white", "purple"]
//         - correctAnswer (field) eg. "green"
//       - question (document) eg. "What color are carrots?"
//         - options (field) eg. ["purple", "orange", "yellow"]
//         - correctAnswer (field) eg. "orange"

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
    <div className="quiz-container">
      <h1>Pick a Quiz</h1>
      <div className="quiz-cards">
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
