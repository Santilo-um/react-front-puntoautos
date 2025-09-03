import React, { createContext, useState } from "react";

export const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);

  const login = (email, password) => {
    // Datos hardcodeados
    if (email === "test@demo.com" && password === "1234") {
      setUser({ email });
      return true;
    }
    return false;
  };

  const register = (email, password) => {
    // En este TP no guardamos en DB, solo en memoria
    setUser({ email, password });
  };

  const logout = () => {
    setUser(null);
  };

  return (
    <AuthContext.Provider value={{ user, login, logout, register }}>
      {children}
    </AuthContext.Provider>
  );
};
