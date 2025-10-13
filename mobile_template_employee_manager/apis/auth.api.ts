import api from "../services/api";

export const authApi = {
  signIn: (payload: { email: string; password: string }) => api.post("/auth/login", payload),
  signUp: (payload: { email: string; password: string; fullName?: string }) =>
    api.post("/auth/register", payload),
};
