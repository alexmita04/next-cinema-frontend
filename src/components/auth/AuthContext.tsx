import { createContext, useContext } from "react";
import { type AuthContextInterface } from "@/components/auth/AuthProvider";

export const AuthContext = createContext<AuthContextInterface>({
  accessToken: null,
  isAuthenticated: false,
  loading: false,
  isAdmin: false,
  login: async () => false,
  signup: async () => false,
  logout: async () => false,
  setAccessToken: () => {},
});

export const useAuth = () => useContext(AuthContext);
