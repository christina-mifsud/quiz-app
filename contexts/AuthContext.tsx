"use client";
import { createContext, useContext, useEffect, useState } from "react";
import firebase from "firebase/app";
import { auth } from "@/firebase/config";
import { AuthContextValue, AuthProviderProps } from "@/types";

export const AuthContext = createContext<AuthContextValue | undefined>(
  undefined
);

// useAuth Hook - person requesting access to AuthProvider (manager) instead of directly managing the authentication state (going directly for access)
export function useAuth() {
  return useContext(AuthContext);
}

// AuthProvider Component - manager of access - keeping track of who has access/is logged in etc through useAuth Hook.
export function AuthProvider({ children }: AuthProviderProps) {
  const [currentUser, setCurrentUser] = useState<firebase.User | null>(null);
  const [loading, setLoading] = useState(true);

  ////// HELP!! What is happening here?
  useEffect(() => {
    const unsubscribe = auth.onAuthStateChanged((user) => {
      setCurrentUser(user);
      setLoading(false);
    });
    return unsubscribe;
  }, []);

  const value: AuthContextValue = { currentUser, setCurrentUser };

  return (
    <AuthContext.Provider value={{ currentUser, setCurrentUser }}>
      {!loading && children}
    </AuthContext.Provider>
  );
}
