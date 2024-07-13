"use client";

import { useRef, useState, MouseEvent } from "react";
import { useRouter } from "next/navigation";
import { useSignin } from "@/hooks/useSignin";
import { auth } from "@/firebase/config";

const SignInForm = () => {
  const emailRef = useRef<HTMLInputElement>(null);
  const passwordRef = useRef<HTMLInputElement>(null);
  const { signin, isLoading: isLoadingSignin } = useSignin();
  const [error, setError] = useState<string>("");
  const router = useRouter();

  async function handleSignIn(event: MouseEvent) {
    event.preventDefault();
    const email = emailRef.current?.value;
    const password = passwordRef.current?.value

    if (email && password) {
      const authResponse = await auth.signInWithEmailAndPassword(email, password);

      if (!authResponse.user) {
        throw new Error('User not found')
      }

      const idToken = await authResponse.user.getIdToken();

      const response = await fetch('/api/auth/signin', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ idToken })
      });

      router.push("/quiz");
    }
  }

  return (
    <>
      <input type="email" placeholder="Email" ref={emailRef} required />
      <input type="" placeholder="Password" ref={passwordRef} required />

      <button onClick={(event: MouseEvent) => handleSignIn(event)}>
        Sign In
      </button>
    </>
  );
};
export default SignInForm;
