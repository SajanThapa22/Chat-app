import api from "./axios";
import { User } from "../types/chat";

export const AuthAPI = {
  login: async (email: string, password: string) => {
    return api.post("/auth/token/", { email, password });
  },

  register: async (username: string, email: string, password: string) => {
    return api.post("/auth/register/", { username, email, password });
  },

  logout: async () => {
    return api.post("/auth/logout/");
  },

  getCurrentUser: async (): Promise<User> => {
    const response = await api.get("/auth/user/");
    return response.data;
  },

  refreshToken: async () => {
    return api.post("/auth/token/refresh/");
  },
};
