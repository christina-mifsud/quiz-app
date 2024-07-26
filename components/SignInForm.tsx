"use client";

import { useRef, useState, MouseEvent } from "react";
import { useRouter } from "next/navigation";
import { useAuth } from "@/hooks/useAuth";
import { useSignin } from "@/hooks/useSignin";
import Link from "next/link";


export const SignInForm = () => {
  const router = useRouter();
  const emailRef = useRef<HTMLInputElement>(null);
  const passwordRef = useRef<HTMLInputElement>(null);
  const [error, setError] = useState<string>("");
  const { currentUser } = useAuth();
  const { signin, error: SigninError} = useSignin();

  console.log(currentUser);

  async function handleSignIn(event: MouseEvent) {
    event.preventDefault();
    const email = emailRef.current?.value;
    const password = passwordRef.current?.value

    if (email && password) {
        // handling sign in with firebase auth with useSignin hook
        await signin(email, password);

        if (!currentUser) throw new Error("User not found");

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
    } else {
      setError("Fill in both username & password.");
    }
  }

  return (
    <>

      <input type="email" placeholder="Email" ref={emailRef} required />
      <input type="" placeholder="Password" ref={passwordRef} required />

      {error && <div>{error}</div>}
      {SigninError && <div>{SigninError}</div>}

      <button onClick={(event: MouseEvent) => handleSignIn(event)}>
        Sign In
      </button>
      <p>
        {`Don't`} have an account?{" "}
        <Link href="/signup">
          <span className="sign-up-link">Sign Up</span>
        </Link>
      </p>
    </>
  );
};

