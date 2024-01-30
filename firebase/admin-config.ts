import admin from 'firebase-admin';

if(!admin.apps.length) {
  admin.initializeApp({
    credential: admin.credential.cert({
      client_email: "",
      private_key: "",
      project_id: ""
    } as admin.ServiceAccount),
  databaseURL: ""
  })
}

export const firestore = admin.firestore();