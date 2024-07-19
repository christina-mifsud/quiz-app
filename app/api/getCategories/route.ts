// API route to handle firestore data fetching to make sure server-side code remains server-side & client-side code can fetch data from this API

import { NextResponse } from "next/server";
import { firestore } from "@/firebase/admin-config";

export async function GET() {
  try {
    // fetch all quiz categories from quiz collection (eg. fruit etc.) & map over them
    const collectionRef = await firestore.collection("quiz").get();
    const categories = collectionRef.docs.map((doc) => ({
      // getting id which is then used for dynamic routing in the <Link>
      id: doc.id,
    }));
    return NextResponse.json(categories);
  } catch (error) {
    console.error("ERROR fetching categories:", error);
    return NextResponse.json(
      { error: "Failed to fetch categories" },
      { status: 500 }
    );
  }
}
