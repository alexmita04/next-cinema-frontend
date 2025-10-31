import React, { useState, useEffect } from "react";
import { AxiosError } from "axios";
import { AuthContext } from "@/components/auth/AuthContext";
import ApiClient, { setToken } from "@/lib/apiClient";

interface LoginCredentials {
  username: string;
  password: string;
}

interface SignupCredentials {
  username: string;
  password: string;
  address: string;
  phoneNumber: string;
  gender: string;
}

export interface AuthContextInterface {
  accessToken: string | null;
  isAuthenticated: boolean;
  loading: boolean;
  isAdmin: boolean;
  login: (
    credentials: LoginCredentials
  ) => Promise<boolean | { status: string; message: string }>;
  signup: (
    credentials: SignupCredentials
  ) => Promise<boolean | { status: string; message: string }>;
  logout: () => Promise<boolean>;
  setAccessToken: React.Dispatch<React.SetStateAction<string | null>>;
}

const AuthProvider = ({ children }: { children: React.ReactElement }) => {
  const [accessToken, setAccessToken] = useState<string | null>(null);
  const [isAuthenticated, setIsAuthenticated] = useState(!!accessToken);
  const [loading, setLoading] = useState(false);
  const [isAdmin, setIsAdmin] = useState(false);

  useEffect(() => {
    setToken(accessToken);
    setIsAuthenticated(!!accessToken);
  }, [accessToken]);

  const login = async (credentials: LoginCredentials) => {
    setLoading(true);
    try {
      const response = await ApiClient.post("users/login", credentials);
      const { accessToken } = response.data.data;
      setAccessToken(accessToken);
      setIsAdmin(response.data.data.user.isAdmin);

      return true;
    } catch (err) {
      const error = err as AxiosError;
      setAccessToken(null);
      return JSON.parse(error.request.response) as {
        status: string;
        message: string;
      };
    } finally {
      setLoading(false);
    }
  };

  const signup = async (credentials: SignupCredentials) => {
    setLoading(true);
    try {
      const response = await ApiClient.post("/users/register", {
        ...credentials,
        dateOfBirth: new Date(),
      });
      const { accessToken } = response.data.data;
      setAccessToken(accessToken);
      setIsAdmin(response.data.data.isAdmin);

      return true;
    } catch (err) {
      const error = err as AxiosError;
      setAccessToken(null);
      return JSON.parse(error.request.response) as {
        status: string;
        message: string;
      };
    } finally {
      setLoading(false);
    }
  };

  const logout = async () => {
    setLoading(true);

    try {
      await ApiClient.post("/users/logout");
      setAccessToken(null);
      setIsAdmin(false);
      setIsAuthenticated(false);
      setToken(null);

      return true;
    } catch (err) {
      console.log(err);
      setAccessToken(null);
      setIsAdmin(false);

      return false;
    } finally {
      setLoading(false);
    }
  };

  const contextValue = {
    accessToken,
    isAuthenticated,
    loading,
    isAdmin,
    login,
    signup,
    logout,
    setAccessToken,
  };

  return (
    <>
      <AuthContext.Provider value={contextValue}>
        {children}
      </AuthContext.Provider>
    </>
  );
};

export default AuthProvider;
