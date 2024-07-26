import "firebase/auth";
import firebase from "firebase";

export interface AuthContextValue {
  currentUser: firebase.User | null;
  setCurrentUser: (user: firebase.User | null) => void;
  logout: () => void;
  loading: boolean;
}

export interface AuthProviderProps {
  children: React.ReactNode;
}
