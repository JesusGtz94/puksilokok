import { UserContext } from "@/context/userContext";
import { auth } from "@/firebase";
import { signOut } from "firebase/auth";
import { useContext } from "react";

export const useUser = () => {
  const context = useContext(UserContext);
  const logout = () => context?.user && signOut(auth);

  if (!context) {
    throw new Error("useUser must be used inside the UserContextProvider");
  }
  return { ...context, logout };
};
