"use client";

import { useCallback, useEffect, useMemo, useState } from "react";
import toast from "react-hot-toast";
import { AuthContext } from "@/contexts/auth-context";
import * as authService from "@/services/auth-service";

const USER_KEY = "@luminar:user";
const TOKEN_KEY = "@luminar:token";

function readStoredAuth() {
  if (typeof window === "undefined") return { user: null, token: null };
  try {
    const rawUser = localStorage.getItem(USER_KEY);
    const rawToken = localStorage.getItem(TOKEN_KEY);
    if (!rawUser || !rawToken) return { user: null, token: null };
    return { user: JSON.parse(rawUser), token: rawToken };
  } catch {
    return { user: null, token: null };
  }
}

function persistAuth(user, token) {
  localStorage.setItem(USER_KEY, JSON.stringify(user));
  localStorage.setItem(TOKEN_KEY, token);
  window.dispatchEvent(new Event("auth-changed"));
}

function clearAuth() {
  localStorage.removeItem(USER_KEY);
  localStorage.removeItem(TOKEN_KEY);
  window.dispatchEvent(new Event("auth-changed"));
}

export function AuthProvider({ children }) {
  const [user, setUser] = useState(null);
  const [token, setToken] = useState(null);
  const [loading, setLoading] = useState(true);

  const logout = useCallback((silent = false) => {
    clearAuth();
    setUser(null);
    setToken(null);
    if (!silent) toast.success("Sessão encerrada");
  }, []);

  const refresh = useCallback(async () => {
    const stored = readStoredAuth();
    if (!stored.token) {
      setUser(null);
      setToken(null);
      return null;
    }
    setToken(stored.token);
    const { ok, data, status } = await authService.getProfile();
    if (!ok) {
      if (status === 401) {
        clearAuth();
        setUser(null);
        setToken(null);
      }
      return null;
    }
    const fresh = data?.dados || stored.user;
    setUser(fresh);
    if (fresh) {
      localStorage.setItem(USER_KEY, JSON.stringify(fresh));
    }
    return fresh;
  }, []);

  useEffect(() => {
    const stored = readStoredAuth();
    setUser(stored.user);
    setToken(stored.token);
    if (stored.token) {
      refresh().finally(() => setLoading(false));
    } else {
      setLoading(false);
    }
  }, [refresh]);

  useEffect(() => {
    const onExpired = () => {
      clearAuth();
      setUser(null);
      setToken(null);
      toast.error("Sua sessão expirou. Entre novamente.");
    };
    const onChanged = () => {
      const stored = readStoredAuth();
      setUser(stored.user);
      setToken(stored.token);
    };
    window.addEventListener("auth-expired", onExpired);
    window.addEventListener("storage", onChanged);
    return () => {
      window.removeEventListener("auth-expired", onExpired);
      window.removeEventListener("storage", onChanged);
    };
  }, []);

  const login = useCallback(async ({ email, senha }) => {
    const { ok, data, error } = await authService.login({ email, senha });
    if (!ok) {
      return { ok: false, error: error || "Falha na autenticação" };
    }
    const { token: newToken, usuario } = data?.dados || {};
    if (!newToken || !usuario) {
      return { ok: false, error: "Resposta inválida do servidor" };
    }
    persistAuth(usuario, newToken);
    setUser(usuario);
    setToken(newToken);
    return { ok: true, user: usuario };
  }, []);

  const updateUser = useCallback((next) => {
    setUser(next);
    if (next) localStorage.setItem(USER_KEY, JSON.stringify(next));
    window.dispatchEvent(new Event("auth-changed"));
  }, []);

  const value = useMemo(
    () => ({
      user,
      token,
      loading,
      isAuthenticated: !!user,
      isAdmin: user?.tipo === "ADMIN",
      isCustomer: user?.tipo === "CLIENTE",
      login,
      logout,
      refresh,
      updateUser,
    }),
    [user, token, loading, login, logout, refresh, updateUser]
  );

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
}
