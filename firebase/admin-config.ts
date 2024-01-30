import admin from "firebase-admin";

if (!admin.apps.length) {
  admin.initializeApp({
    credential: admin.credential.cert({
      client_email: process.env.FIRESTORE_CLIENT_EMAIL,
      private_key: process.env.FIRESTORE_PRIVATE_KEY,
      project_id: process.env.FIRESTORE_PROJECT_ID,
    } as admin.ServiceAccount),
    databaseURL: "",
  });
}

export const firestore = admin.firestore();
