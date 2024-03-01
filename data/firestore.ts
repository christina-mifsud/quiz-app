import { firestore } from "@/firebase/admin-config";

export async function fetchDocumentFromFirestore(queryString: string, documentId: string) {
    const answerRef = firestore
      .collection(queryString).doc(documentId)
  
    const answerDoc = (await answerRef.get()).data();
  
    return answerDoc;
  }


  export async function fetchCollectionFromFirestore(queryString: string) {
    const collectionRef = firestore
      .collection(queryString)
  
    const collectionDocs = (await collectionRef.get()).docs.map(doc => doc.data());
  
    return collectionDocs;
  }

  // static page. contact.html

  // isr -> static page -> revalidate path evey 100 seconds

  // server side rendering -> /games.html