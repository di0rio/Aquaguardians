import React, { createContext, useContext, useEffect, useState } from "react";

// Crie o contexto de autenticação
const AuthContext = createContext();

// Hook para acessar o contexto
export const useAuth = () => useContext(AuthContext);

// AuthProvider que irá envolver o App
export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(() => {
    const storedUser = localStorage.getItem("user");
    return storedUser
      ? JSON.parse(storedUser)
      : {
          isAdmin: false,
          isAuthenticated: false,
          email: null,
        };
  });

  useEffect(() => {
    // Salva o usuário no localStorage sempre que o estado 'user' mudar
    localStorage.setItem("user", JSON.stringify(user));
  }, [user]);

  const loginAsAdmin = (email) => {
    setUser({ isAdmin: true, isAuthenticated: true, email: email });
  };

  const loginAsUser = (email) => {
    setUser({ isAdmin: false, isAuthenticated: true, email: email });
  };

  const logout = () => {
    setUser({ isAdmin: false, isAuthenticated: false, email: null });
  };

  return (
    <AuthContext.Provider value={{ user, loginAsAdmin, loginAsUser, logout }}>
      {children}
    </AuthContext.Provider>
  );
};
