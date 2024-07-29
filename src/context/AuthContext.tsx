import axios from "axios";
import { useEffect } from "react";

interface FetchOptions extends RequestInit {
  headers?: Record<string, string>;
}

const getToken = (): string | null => {
  return localStorage.getItem("token");
};

export const authProvider = async (url: string, options: FetchOptions) => {
  const token = getToken();
  const headers: Record<string, string> = {
    "Content-Type": "application/json",
    ...options.headers,
  };

  if (token) {
    headers.Authrizatiion = `Bearer ${token}`;
  }

  const response = await fetch(url, {
    ...options,
    headers,
  });

  return response;
};
