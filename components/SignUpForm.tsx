"use client";

import { useRef, useState, MouseEvent, useCallback } from "react";
import { useRouter } from "next/navigation";
import { useSignup } from "@/hooks/useSignup";

// react hook forms

const SignUpForm = () => {
  const emailRef = useRef<HTMLInputElement>(null);
  const passwordRef = useRef<HTMLInputElement>(null);
  const passwordConfirmRef = useRef<HTMLInputElement>(null);
  const { signup, isLoading: isLoadingSignup } = useSignup();
  const [error, setError] = useState<string>("");
  const router = useRouter();

  // useCallback not working
  const handleSignUp = useCallback(
    async (event: MouseEvent) => {
      event.preventDefault();

      if (emailRef.current?.value && passwordRef.current?.value) {
        if (passwordRef.current?.value !== passwordConfirmRef.current?.value) {
          setError("Passwords do not match!");
        } else {
          await signup(emailRef.current?.value, passwordRef.current?.value);
          router.push("/quiz");
        }
      }
    },
    [router, signup]
  );

  return (
    <>
      <input type="email" placeholder="Email" ref={emailRef} required />
      <input type="" placeholder="Password" ref={passwordRef} required />
      <input
        type=""
        placeholder="Password Confirmation"
        ref={passwordConfirmRef}
        required
      />

      <button onClick={(event: MouseEvent) => handleSignUp(event)}>
        Sign Up
      </button>
    </>
  );
};
export default SignUpForm;
