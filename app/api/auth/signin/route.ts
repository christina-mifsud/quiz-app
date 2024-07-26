// NEXT
import { cookies } from "next/headers";
// FIREBASE
import { adminAuth } from '@/firebase/admin-config';

export async function POST(req: Request, res: Response) {
  const { idToken } = await req.json();
  const decodedFirebaseToken = await adminAuth.verifyIdToken(idToken);

  const expiresIn = 60 * 60 * 24 * 5 * 1000; // 5 days

  if (new Date().getTime() / 1000 - decodedFirebaseToken.auth_time < 5 * 60) {
    const cookieToken = await adminAuth.createSessionCookie(idToken, { expiresIn });
    const options = { maxAge: expiresIn, httpOnly: true, secure: true, path: '/' };

    cookies().set('__sessionTest', cookieToken, options);

    return new Response('Authentication Successful', { status: 200 });
  } else {
    return new Response('Authentication Failed', { status: 401 })
  }
}

export async function DELETE(req: Request) {
  cookies().delete('__sessionTest');
  return new Response('Session Deleted', { status: 200 });
}