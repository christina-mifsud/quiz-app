import { firestore } from "@/firebase/admin-config";

export async function fetchDocumentFromFirestore(
  queryString: string,
  documentId: string
) {
  const answerRef = firestore.collection(queryString).doc(documentId);
  const answerDoc = (await answerRef.get()).data();
  return answerDoc;
}

export async function fetchCollectionFromFirestore(queryString: string) {
  const collectionRef = firestore.collection(queryString);
  const collectionDocs = (await collectionRef.get()).docs.map((doc) => ({
    id: doc.id,
    ...doc.data(),
  }));
  return collectionDocs;
}
