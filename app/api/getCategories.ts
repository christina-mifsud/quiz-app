// API route to handle firestore data fetching to make sure server-side code remains server-side & client-side code can fetch data from this API

import { NextApiRequest, NextApiResponse } from "next";
import { firestore } from "@/firebase/admin-config";

// 'handler' function will be called whenever request is made to this API route
export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  try {
    // fetch all quiz categories from quiz collection (eg. fruit etc.) & map over them
    const collectionRef = await firestore.collection("quiz").get();
    const categories = collectionRef.docs.map((doc) => ({
      // getting id which is then used for dynamic routing in the <Link>
      id: doc.id,
    }));
    res.status(200).json(categories);
  } catch (error) {
    res.status(500).json({ error: "Failed to fetch categories" });
  }
}
