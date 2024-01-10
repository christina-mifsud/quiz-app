"use client";
import { useState } from "react";
import { auth } from "@/firebase/config";
import { useAuth } from "./useAuth";
import { signInWithEmailAndPassword } from "firebase/auth";

//////// in types folder? ///////
interface SignInResult {
  signin: (email: string, password: string) => Promise<void>;
  isLoading: boolean;
  error: string | null;
}
//////////////////////////////////

export function useSignin(): SignInResult {
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);
  const { setCurrentUser } = useAuth();

  const signin = async (email: string, password: string): Promise<void> => {
    setIsLoading(true);
    setError(null);
    try {
      const response = await signInWithEmailAndPassword(auth, email, password);

      if (!response || !response.user) {
        throw new Error("Something went wrong!");
      }

      setCurrentUser(response.user);
      setIsLoading(false);
      setError(null);
    } catch (error: any) {
      setError(error.message);
      setIsLoading(false);
      throw new Error(error.message);
    }
  };

  return { signin, isLoading, error };
}
