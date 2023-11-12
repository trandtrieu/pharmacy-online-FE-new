import React, { createContext, useContext, useState, useEffect } from "react";

const AuthContext = createContext();

export function useAuth() {
  return useContext(AuthContext);
}

export function AuthProvider({ children }) {
  const [accountId, setAccountId] = useState("");
  const [token, setToken] = useState("");

  // Initialize values from local storage
  useEffect(() => {
    const storedAccountId = localStorage.getItem("accountId");
    const storedToken = localStorage.getItem("token");

    if (storedAccountId && storedToken) {
      setAccountId(storedAccountId);
      setToken(storedToken);
    }
  }, []);

  // Set values and update local storage when they change
  useEffect(() => {
    localStorage.setItem("accountId", accountId);
    localStorage.setItem("token", token);
  }, [accountId, token]);

  return (
    <AuthContext.Provider value={{ accountId, token, setAccountId, setToken }}>
      {children}
    </AuthContext.Provider>
  );
}
export { AuthContext };
