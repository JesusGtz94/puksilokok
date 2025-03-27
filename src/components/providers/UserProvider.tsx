import { UserContext } from "@/context/userContext";
import { User } from "firebase/auth";
import { ReactNode, useMemo, useState } from "react";

export const UserContextProvider = ({ children }: { children: ReactNode }) => {
  const [user, setUser] = useState<User | null>(null);

  const value = useMemo(() => ({ user, setUser }), [user]);

  return <UserContext.Provider value={value}>{children}</UserContext.Provider>;
};
