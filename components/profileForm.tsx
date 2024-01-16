"use client";

import { MouseEvent } from "react";
import { useRouter } from "next/navigation";

const ProfileForm = () => {
  const router = useRouter();

  async function handleSignIn(event: MouseEvent) {
    event.preventDefault();
    router.push("/signin");
  }

  async function handleSignUp(event: MouseEvent) {
    event.preventDefault();
    router.push("/signup");
  }

  return (
    <>
      <button onClick={(event: MouseEvent) => handleSignIn(event)}>
        Sign In
      </button>
      <button onClick={(event: MouseEvent) => handleSignUp(event)}>
        Sign Up
      </button>
    </>
  );
};
export default ProfileForm;
