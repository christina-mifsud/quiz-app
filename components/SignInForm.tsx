"use client";

import { useRef, useState, MouseEvent, useCallback } from "react";
import { useRouter } from "next/navigation";
import { useSignin } from "@/hooks/useSignin";

const SignInForm = () => {
  const emailRef = useRef<HTMLInputElement>(null);
  const passwordRef = useRef<HTMLInputElement>(null);
  const { signin, isLoading: isLoadingSignin } = useSignin();
  const [error, setError] = useState<string>("");
  const router = useRouter();

  // useCallback not working
  const handleSignIn = useCallback(
    async (event: MouseEvent) => {
      event.preventDefault();

      if (emailRef.current?.value && passwordRef.current?.value) {
        await signin(emailRef.current?.value, passwordRef.current?.value);
        router.push("/");
      } else {
        setError("Wrong Password!");
      }
    },
    [router, signin]
  );

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
