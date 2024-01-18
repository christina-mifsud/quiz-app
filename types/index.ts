import "firebase/auth";
import firebase from "firebase";

export interface AuthContextValue {
  currentUser: firebase.User | null; //// HELP!! This is giving me an error.
  setCurrentUser: any;
}
export interface AuthProviderProps {
  children: React.ReactNode;
}
