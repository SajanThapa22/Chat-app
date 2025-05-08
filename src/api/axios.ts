import axios from "axios";

const api = axios.create({
  baseURL: "http://127.0.0.1:8000",
  withCredentials: true, // Important for cookies
  headers: {
    "Content-Type": "application/json",
  },
});

// Add interceptors
api.interceptors.response.use(
  (response) => response,
  async (error) => {
    const originalRequest = error.config;

    // If error is 401 (Unauthorized) and we haven't tried to refresh the token yet
    if (error.response?.status === 401 && !originalRequest._retry) {
      originalRequest._retry = true;

      try {
        // Try to refresh token
        await api.post("/auth/token/refresh/");
        // Retry the original request
        return api(originalRequest);
      } catch (refreshError) {
        // Refresh failed, logout will be handled in the auth context
        return Promise.reject(refreshError);
      }
    }

    return Promise.reject(error);
  }
);

export default api;
