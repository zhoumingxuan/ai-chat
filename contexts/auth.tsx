import React, { createContext, useContext, useState } from "react";

export interface User {
  name: string;
  avatar?: string;
}

interface AuthContextValue {
  user: User | null;
  login: (username: string, password: string) => Promise<void>;
  logout: () => void;
  loadHistory: () => Promise<void>;
}

const AuthContext = createContext<AuthContextValue | undefined>(undefined);

// Placeholder API functions
async function loginApi(_username: string, _password: string): Promise<User> {
  // TODO: call backend login API
  return { name: _username };
}

export const AuthProvider = ({ children }: { children: React.ReactNode }) => {
  const [user, setUser] = useState<User | null>(null);

  const login = async (username: string, password: string) => {
    const u = await loginApi(username, password);
    setUser(u);
    await loadHistory();
  };

  const logout = () => {
    setUser(null);
  };

  const loadHistory = async () => {
    if (!user) return;
    // TODO: fetch chat history for current user
  };

  return (
    <AuthContext.Provider value={{ user, login, logout, loadHistory }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  const ctx = useContext(AuthContext);
  if (!ctx) throw new Error("useAuth must be used within AuthProvider");
  return ctx;
};
