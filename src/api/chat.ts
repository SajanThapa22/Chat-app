// src/api/chat.ts
import api from "./axios";
import { Data, Results } from "../types/chat";

export const ChatAPI = {
  getChatHistories: async (): Promise<Data> => {
    const response = await api.get("/chat/history_list/");
    return response.data;
  },

  searchUsers: async (searchTerm: string) => {
    const response = await api.get(`/chat/users/?search=${searchTerm}`);
    return response.data;
  },

  getChatById: async (chatId: string): Promise<Results> => {
    const response = await api.get(`/chat/history/${chatId}/`);
    return response.data;
  },

  sendMessage: async (chatId: string, message: string) => {
    return api.post(`/chat/send_message/`, {
      chat_history: chatId,
      message,
    });
  },
};
