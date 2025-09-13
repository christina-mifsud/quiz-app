// DELETE request to remove cookies 
import { cookies } from "next/headers";

export async function POST() {
  cookies().delete("__sessionTest");
  return new Response("Session Deleted", { status: 200 });
}