// src/context/AuthContext.js
import React, { createContext, useState, useEffect } from "react";

// Create AuthContext
export const AuthContext = createContext();

const AuthContextProvider = ({ children }) => {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [userToken, setUserToken] = useState(null);

  useEffect(() => {
    const storedToken = localStorage.getItem("token");
    if (storedToken) {
      setIsLoggedIn(true);
      setUserToken(storedToken);
    }
  }, []);

  const login = (token) => {
    setIsLoggedIn(true);
    setUserToken(token);
    localStorage.setItem("token", token);  // Save token to localStorage
  };

  const logout = () => {
    setIsLoggedIn(false);
    setUserToken(null);
    localStorage.removeItem("token");  // Remove token from localStorage
  };

  return (
    <AuthContext.Provider value={{ isLoggedIn, userToken, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
};

export default AuthContextProvider;
