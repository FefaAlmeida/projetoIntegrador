"use client";

import {
 createContext,
 useCallback,
 useEffect,
 useMemo,
 useState,
} from "react";
import { useRouter } from "next/navigation";
import { toast } from "sonner";
import { apiFetch } from "@/utils/api";
import { ROUTES } from "@/constants/web-routes";
import { postLoginRouteFor } from "@/utils/post-login-route";
import { USER_TYPE } from "@/constants/enums";

export const AuthContext = createContext(null);

const REFRESH_INTERVAL_MS = 55 * 60 * 1000;

export function AuthProvider({ children }) {
 const router = useRouter();
 const [user, setUser] = useState(null);
 const [loading, setLoading] = useState(true);

 const fetchProfile = useCallback(async () => {
  const { ok, data } = await apiFetch("/auth/perfil", { method: "GET" });
  if (!ok) {
   setUser(null);
   return null;
  }
  const fresh = data?.dados || null;
  setUser(fresh);
  return fresh;
 }, []);

 useEffect(() => {
  fetchProfile().finally(() => setLoading(false));
 }, [fetchProfile]);

 useEffect(() => {
  const onExpired = () => {
   setUser((prev) => {
    if (prev) toast.error("Sua sessão expirou. Entre novamente.");
    return null;
   });
  };
  window.addEventListener("auth-expired", onExpired);
  return () => window.removeEventListener("auth-expired", onExpired);
 }, []);

 useEffect(() => {
  if (!user) return undefined;
  const id = setInterval(async () => {
   const { ok, status } = await apiFetch("/auth/refresh", { method: "POST" });
   if (!ok && status === 401) setUser(null);
  }, REFRESH_INTERVAL_MS);
  return () => clearInterval(id);
 }, [user]);

 const login = useCallback(
  async ({ email, senha, redirectTo } = {}) => {
   const promise = apiFetch("/auth/login", {
    method: "POST",
    body: { email: email.trim(), senha },
   }).then((r) => {
    if (!r.ok) throw new Error(r.error || "Falha na autenticação");
    const usuario = r.data?.dados?.usuario;
    if (!usuario) throw new Error("Resposta inválida do servidor");
    return usuario;
   });

   toast.promise(promise, {
    loading: "Verificando credenciais...",
    success: (usuario) => `Bem-vindo(a), ${usuario.nome || "usuário"}!`,
    error: (err) => err.message,
   });

   try {
    const usuario = await promise;
    setUser(usuario);
    router.push(redirectTo || postLoginRouteFor(usuario));
    return { ok: true, user: usuario };
   } catch (err) {
    return { ok: false, error: err.message };
   }
  },
  [router],
 );

 const register = useCallback(
  async ({ nome, email, senha }) => {
   const promise = apiFetch("/auth/registrar", {
    method: "POST",
    body: {
     nome: nome.trim(),
     email: email.trim().toLowerCase(),
     senha,
     tipo: USER_TYPE.CLIENTE,
    },
   }).then((r) => {
    if (!r.ok) throw new Error(r.error || "Erro ao criar conta. Tente novamente.");
    return r;
   });

   toast.promise(promise, {
    loading: "Criando sua conta...",
    success: "Conta criada com sucesso! Faça login para continuar.",
    error: (err) => err.message,
   });

   try {
    await promise;
    router.push(ROUTES.LOGIN.href);
    return { ok: true };
   } catch (err) {
    return { ok: false, error: err.message };
   }
  },
  [router],
 );

 const logout = useCallback(
  async ({ silent = false } = {}) => {
   await apiFetch("/auth/logout", { method: "POST" });
   setUser(null);
   if (!silent) toast.success("Sessão encerrada");
   router.push(ROUTES.HOME.href);
  },
  [router],
 );

 const refresh = useCallback(() => fetchProfile(), [fetchProfile]);

 const updateProfile = useCallback(async (payload) => {
  const promise = apiFetch("/auth/perfil", {
   method: "PUT",
   body: payload,
  }).then((r) => {
   if (!r.ok) throw new Error(r.error || "Não foi possível atualizar o perfil");
   return r.data?.dados || null;
  });

  toast.promise(promise, {
   loading: "Salvando...",
   success: "Perfil atualizado",
   error: (err) => err.message,
  });

  try {
   const fresh = await promise;
   if (fresh) setUser(fresh);
   return { ok: true, user: fresh };
  } catch (err) {
   return { ok: false, error: err.message };
  }
 }, []);

 const value = useMemo(
  () => ({
   user,
   loading,
   isAuthenticated: !!user,
   isAdmin: user?.tipo === USER_TYPE.ADMIN,
   isCustomer: user?.tipo === USER_TYPE.CLIENTE,
   login,
   register,
   logout,
   refresh,
   updateProfile,
  }),
  [user, loading, login, register, logout, refresh, updateProfile],
 );

 return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
}
