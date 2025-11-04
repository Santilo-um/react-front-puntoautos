import React, { createContext, useState } from "react";

export const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [users, setUsers] = useState([
    { email: "test@demo.com", password: "1234" }, // Usuario inicial hardcodeado
  ]);

  const login = (email, password) => {
    const foundUser = users.find(
      (u) => u.email === email && u.password === password
    );
    if (foundUser) {
      setUser({ email: foundUser.email });
      return true;
    }
    return false;
  };

  const register = (email, password) => {
    // Verifica si ya existe
    const exists = users.some((u) => u.email === email);
    if (exists) {
      return false; // Usuario ya registrado
    }

    const newUser = { email, password };
    setUsers([...users, newUser]);
    setUser({ email });
    return true;
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
