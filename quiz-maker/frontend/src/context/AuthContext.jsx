import { createContext, useContext, useMemo, useState } from "react";

const AuthContext = createContext(null);

export const AuthProvider = ({ children }) => {
  const [auth, setAuth] = useState(() => {
    const stored = localStorage.getItem("quiz_auth");
    return stored ? JSON.parse(stored) : { token: null, user: null };
  });

  const login = (payload) => {
    const next = { token: payload.token, user: payload.user };
    localStorage.setItem("quiz_auth", JSON.stringify(next));
    setAuth(next);
  };

  const logout = () => {
    localStorage.removeItem("quiz_auth");
    setAuth({ token: null, user: null });
  };

  const value = useMemo(
    () => ({
      token: auth.token,
      user: auth.user,
      isAuthenticated: Boolean(auth.token),
      login,
      logout
    }),
    [auth]
  );

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
};

export const useAuth = () => useContext(AuthContext);
