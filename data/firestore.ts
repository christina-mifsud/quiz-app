import { firestore } from "@/firebase/admin-config";

export async function fetchDocumentFromFirestore(
  queryString: string,
  documentId: string
) {
  const docRef = firestore.collection(queryString).doc(documentId);
  const docData = (await docRef.get()).data();
  return docData;
}

export async function fetchUserExperiencePoints(userId: string) {
  const userDocument = await fetchDocumentFromFirestore("users", userId);
  return userDocument.experiencePoints;
}

export async function fetchUserProgress(userId: string) {
  const userDocument = await fetchDocumentFromFirestore("progress", userId);
  return userDocument.questionKey; // How do I target this key: '/desserts/question-one: true'
}

export async function fetchCollectionFromFirestore(queryString: string) {
  const collectionRef = firestore.collection(queryString);
  const collectionDocs = (await collectionRef.get()).docs.map((doc) => ({
    id: doc.id,
    ...doc.data(),
  }));
  return collectionDocs;
}
