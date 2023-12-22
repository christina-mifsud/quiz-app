"use client";
import { useState } from "react";
import { auth } from "@/firebase/config";
import { useAuth } from "../contexts/AuthContext";

///////// HELP!! do these go here or in a separate file with types?
interface SignupResult {
  signup: (email: string, password: string) => Promise<void>;
  isLoading: boolean;
  error: string | null;
}
////////////////

export function useSignup(): SignupResult {
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);
  const { setCurrentUser } = useAuth();

  const signup = async (email: string, password: string): Promise<void> => {
    setIsLoading(true);
    setError(null);
    try {
      const response = await auth.createUserWithEmailAndPassword(
        email,
        password
      );

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

  return { signup, isLoading, error };
}
