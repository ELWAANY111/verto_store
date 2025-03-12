// src/Components/authcontext.jsx
import React, { createContext, useState, useContext } from "react";

// Create Context
const AuthContext = createContext();

// AuthProvider component that will wrap the app to provide context
export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null); // Assuming you will set user data here

  // Example function to simulate logging in
  const login = (userData) => {
    setUser(userData); // In a real app, you'd authenticate with an API
  };

  // Example function to simulate logging out
  const logout = () => {
    setUser(null);
  };

  return (
    <AuthContext.Provider value={{ user, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
};

// Custom hook to access AuthContext
export const useAuthContext = () => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error("useAuthContext must be used within an AuthProvider");
  }
  return context;
};
