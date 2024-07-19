"use client";

import { useRef, useState, MouseEvent } from "react";
import { useRouter } from "next/navigation";
import { auth } from "@/firebase/config";

const SignInForm = () => {
  const emailRef = useRef<HTMLInputElement>(null);
  const passwordRef = useRef<HTMLInputElement>(null);
  const router = useRouter();
  const [error, setError] = useState<string>("");

  async function handleSignIn(event: MouseEvent) {
    event.preventDefault();

    if (emailRef.current?.value && passwordRef.current?.value) {
      try {
        // handling sign in with firebase auth within component itself
        // HELP - so I am no longer using the custom hook I made????
        const authResponse = await auth.signInWithEmailAndPassword(
          emailRef.current?.value,
          passwordRef.current?.value
        );

        if (!authResponse.user) {
          throw new Error("User not found");
        }

        // get token from authenticated user
        const idToken = await authResponse.user.getIdToken();

        // send said token to API to create session cookie
        const response = await fetch("/api/auth/signin", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({ idToken }),
        });

        if (!response.ok) {
          throw new Error("Failed to sign in");
        }

        router.push("/quiz");
      } catch (error) {
        console.error("Sign-in error:", error);
        setError("Failed! Check email & password");
      }
    } else {
      setError("Fill in both username & password.");
    }
  }

  return (
    <>
      {error && <div>{error}</div>}

      <input type="email" placeholder="Email" ref={emailRef} required />
      <input type="" placeholder="Password" ref={passwordRef} required />

      <button onClick={(event: MouseEvent) => handleSignIn(event)}>
        Sign In
      </button>
    </>
  );
};
export default SignInForm;
