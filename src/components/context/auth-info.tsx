import { decodedToken } from "@/services/auth.services";
import React, { createContext, useContext, useEffect, useMemo, useState } from "react";
import { AuthProps } from "@/types";

interface AuthContextType {
  authInfo: AuthProps | null;
  setAuthInfo: React.Dispatch<React.SetStateAction<AuthProps | null>>;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);


export const AuthProvider= ({ children }:{ children: React.ReactNode }) => {
  const [authInfo, setAuthInfo] = useState<AuthProps | null>(null);

  useEffect(() => {
    const  unsubscribe=()=>{
        const token = localStorage.getItem("accessToken");
        if (token) {
          setAuthInfo(decodedToken(token));
        }
    }
    return ()=>{
        unsubscribe();
    }
  }, []);

  return (
    <AuthContext.Provider value={{authInfo, setAuthInfo}}>
      {children}
    </AuthContext.Provider>
  );
};

export default function useAuth():AuthContextType {
   const context = useContext(AuthContext);
  if (!context) {
    throw new Error("useAuth must be used within an AuthProvider");
  }
  return context;
}


