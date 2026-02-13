import { login as loginService } from "@/services/authService";
import { getProfile } from "@/services/userService";
import {
  getAccessToken,
  removeTokens,
  saveTokens,
} from "@/utils/storage";
import React, { createContext, useContext, useEffect, useState } from "react";

type UserType = {
  id: number;
  name: string;
  email: string;
};

type AuthContextType = {
  user: UserType | null;
  userToken: string | null;
  loading: boolean;
  login: (email: string, password: string) => Promise<void>;
  logout: () => Promise<void>;
};

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const AuthProvider = ({ children }: { children: React.ReactNode }) => {
  const [userToken, setUserToken] = useState<string | null>(null);
  const [user, setUser] = useState<UserType | null>(null);
  const [loading, setLoading] = useState(true);

  // 🔥 Load token & profile saat app dibuka
  useEffect(() => {
    const loadUser = async () => {
      try {
        const token = await getAccessToken();

        if (token) {
          setUserToken(token);
          const profile = await getProfile();
          setUser(profile);
        }
      } catch (error) {
        console.log("Failed to load user");
      } finally {
        setLoading(false);
      }
    };

    loadUser();
  }, []);

  const login = async (email: string, password: string) => {
    const response = await loginService({ email, password });

    await saveTokens(response.access_token, response.refresh_token);

    setUserToken(response.access_token);

    // 🔥 Ambil profile setelah login
    const profile = await getProfile();
    setUser(profile);
  };

  const logout = async () => {
    await removeTokens();
    setUserToken(null);
    setUser(null);
  };

  return (
    <AuthContext.Provider
      value={{ user, userToken, loading, login, logout }}
    >
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error("useAuth must be used inside AuthProvider");
  }
  return context;
};
