import { adminAuth } from '@/firebase/admin-config';
import { cookies } from 'next/headers';

export async function getUserServerSide() {
    const sessionCookie = cookies().get('__sessionTest')

    let user = null;

    if (sessionCookie) {
        try {
            user = await adminAuth.verifyIdToken(sessionCookie?.value);
        } catch(error) {
            throw new Error('User not authenticated')
        }
    }

    return user;
}