"use client";

import { useRef, useState, MouseEvent } from "react";
import { useRouter } from "next/navigation";
import { useAuth } from "@/hooks/useAuth";
import { useSignin } from "@/hooks/useSignin";
import Link from "next/link";

const SignInForm = () => {
  const router = useRouter();
  const emailRef = useRef<HTMLInputElement>(null);
  const passwordRef = useRef<HTMLInputElement>(null);
  const [error, setError] = useState<string>("");
  const { currentUser } = useAuth();

  async function handleSignIn(event: MouseEvent) {
    event.preventDefault();

    if (emailRef.current?.value && passwordRef.current?.value) {
      try {
        // handling sign in with firebase auth with useSignin hook
        const authResponse = await signin(
          emailRef.current?.value,
          passwordRef.current?.value
        );

        if (!currentUser) {
          throw new Error("User not found");
        }

        // get token from authenticated user
        const idToken = await currentUser.getIdToken();

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
      <p>
        Don't have an account?{" "}
        <Link href="/signup">
          <span className="sign-up-link">Sign Up</span>
        </Link>
      </p>
    </>
  );
};
export default SignInForm;
function signin(value: string, value1: string) {
  throw new Error("Function not implemented.");
}
