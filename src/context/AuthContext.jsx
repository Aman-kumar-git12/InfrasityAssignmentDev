import { createContext, useCallback, useEffect, useState } from "react";
import * as authService from "../services/authService";
import { setUnauthorizedHandler } from "../api/axiosClient";

export const AuthContext = createContext(null);

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);
  const [authMessage, setAuthMessage] = useState(null);
  const [sessionError, setSessionError] = useState(null);

  useEffect(() => {
    setUnauthorizedHandler((message) => {
      setUser(null);
      setAuthMessage({ type: "error", text: message });
    });

    const loadUser = async () => {
      try {
        const res = await authService.getMe();
        setUser(res.data.user);
      } catch (error) {
        setUser(null);
        setSessionError({ type: "error", text: error.message });
      } finally {
        setLoading(false);
      }
    };
    loadUser();
  }, []);

  const signup = async (payload) => {
    const res = await authService.signup(payload);
    setUser(res.data.user);
    setSessionError(null);
    return res;
  };

  const login = async (payload) => {
    const res = await authService.login(payload);
    setUser(res.data.user);
    setSessionError(null);
    return res;
  };

  const logout = useCallback(async () => {
    try {
      const res = await authService.logout();
      setAuthMessage({ type: "success", text: res.message });
    } catch (error) {
      setAuthMessage({ type: "error", text: error.message });
    } finally {
      setUser(null);
    }
  }, []);

  return (
    <AuthContext.Provider
      value={{ user, loading, signup, login, logout, authMessage, setAuthMessage, sessionError }}
    >
      {children}
    </AuthContext.Provider>
  );
};
