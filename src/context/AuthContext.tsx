// AuthContext.ts
import { createContext, useContext } from "react";
import { User } from "../types/types";


type AuthContextType = {
  user: User | null;
  name: string;
  role: string;
  isLoading: boolean;
  error: unknown;
  refetchUser: () => void;
  logout: () => void;
  login: (token: string) => void;
};

export const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error("useAuth must be used within an AuthProvider");
  }
  return context;
};