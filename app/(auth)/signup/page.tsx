"use client";
import { useRef, useState, MouseEvent } from "react";
import { useRouter } from "next/navigation";
import { useSignup } from "@/hooks/useSignup";

// react hook forms

const SignUpPage = () => {
  const emailRef = useRef<HTMLInputElement>(null);
  const passwordRef = useRef<HTMLInputElement>(null);
  const passwordConfirmRef = useRef<HTMLInputElement>(null);
  const { signup, isLoading: isLoadingSignup } = useSignup();
  const [error, setError] = useState<string>("");
  const router = useRouter();

  async function handleSignUp(event: MouseEvent) {
    event.preventDefault();

    if (emailRef.current?.value && passwordRef.current?.value) {
      if (passwordRef.current?.value !== passwordConfirmRef.current?.value) {
        setError("Passwords do not match!");
      } else {
        await signup(emailRef.current?.value, passwordRef.current?.value);
        router.push("/");
      }
    }
  }

  return (
    <div className="card-container">
      <div className="card">
        <h1 className="text-white text-2xl mb-5">Sign In</h1>
        <input type="email" placeholder="Email" ref={emailRef} required />
        <input
          type="password"
          placeholder="Password"
          ref={passwordRef}
          required
        />
        <input
          type="password"
          placeholder="Password Confirmation"
          ref={passwordConfirmRef}
          required
        />

        <button onClick={(event: MouseEvent) => handleSignUp(event)}>
          Sign Up
        </button>
      </div>
    </div>
  );
};
export default SignUpPage;
