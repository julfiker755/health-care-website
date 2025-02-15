import { decodedToken } from "@/services/auth.services";
import React, {
  createContext,
  useContext,
  useEffect,
  useState,
} from "react";
import { AuthProps } from "@/types";
import Cookies from "js-cookie";

interface AuthContextType {
  authInfo: AuthProps | null;
  setAuthInfo: React.Dispatch<React.SetStateAction<AuthProps | null>>;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const AuthProvider = ({ children }: { children: React.ReactNode }) => {
  const [authInfo, setAuthInfo] = useState<AuthProps | null>(null);

  useEffect(() => {
    const unsubscribe = () => {
      const token = Cookies.get("authToken");
      if (token) {
        try {
          setAuthInfo(decodedToken(token));
        } catch (error) {
          // console.error("Error decoding token:", error);
        }
      }
    };

    unsubscribe();

    return unsubscribe;
  }, []);

  return (
    <AuthContext.Provider value={{ authInfo, setAuthInfo }}>
      {children}
    </AuthContext.Provider>
  );
};

export default function useAuth(): AuthContextType {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error("useAuth must be used within an AuthProvider");
  }
  return context;
}
