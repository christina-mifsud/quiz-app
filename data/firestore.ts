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
  if (!userDocument) {
    throw new Error(`User document with ID ${userId} not found`);
  }
  return userDocument.experiencePoints;
}

export async function fetchUserProgress(userId: string) {
  const userDocument = await fetchDocumentFromFirestore("progress", userId);
  if (!userDocument) {
    throw new Error(`User progress document with ID ${userId} not found`);
  }
  return userDocument.questionKey; // Adjust this based on actual data structure
}

export async function fetchCollectionFromFirestore(queryString: string) {
  const collectionRef = firestore.collection(queryString);
  const collectionDocs = (await collectionRef.get()).docs.map((doc) => ({
    id: doc.id,
    ...doc.data(),
  }));
  return collectionDocs;
}
