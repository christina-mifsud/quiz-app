import { User } from "firebase/auth";

export interface AuthContextValue {
  currentUser: User | null | undefined;
  setCurrentUser: any;
}
export interface AuthProviderProps {
  children: React.ReactNode;
}
