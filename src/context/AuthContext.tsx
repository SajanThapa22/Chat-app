import React, {
  createContext,
  useState,
  useEffect,
  useCallback,
  ReactNode,
  useContext,
} from "react";
import { jwtDecode } from "jwt-decode";
import api from "../services/api";
import axios from "axios";

interface AuthContextType {
  accessToken: string | null;
  isLoggedIn: () => Promise<boolean>;
  login: (accessToken: string, refreshToken: string) => void;
  logout: () => void;
  fetchNewAccess: () => void;
  getCurrentUser: () => void;
  userdata: User | undefined;
}

interface User {
  id: string;
  username: string;
  email: string;
}

interface AuthProviderProps {
  children: ReactNode;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

const AuthProvider = ({ children }: AuthProviderProps) => {
  const [accessToken, setAccessToken] = useState<string | null>(
    localStorage.getItem("access")
  );
  const [refreshToken, setRefreshToken] = useState<string | null>(
    localStorage.getItem("refresh")
  );
  const [userdata, setUserdata] = useState<User>();

  const isTokenValid = (token: string | null): boolean => {
    if (!token) return false;
    const decoded = jwtDecode<{ exp: number }>(token);
    if (!decoded.exp) return false;
    return decoded.exp * 1000 > Date.now();
  };

  const refreshAccessToken = useCallback(async (): Promise<boolean> => {
    let refresh = refreshToken;
    if (!refreshToken) return false;

    try {
      const response = await api.post(`/token/refresh/`, refresh, {
        headers: {
          "Content-Type": "application/json",
        },
      });

      if (response.status === 200) {
        const { accessToken: newAccessToken, refreshToken: newRefreshToken } =
          response.data;
        setAccessToken(newAccessToken);
        setRefreshToken(newRefreshToken);
        localStorage.setItem("access", newAccessToken);
        localStorage.setItem("refresh", newRefreshToken);
        return true;
      } else {
        return false;
      }
    } catch (error) {
      console.error("Failed to refresh access token:", error);
      return false;
    }
  }, [refreshToken]);

  const isLoggedIn = useCallback(async (): Promise<boolean> => {
    if (isTokenValid(refreshToken)) {
      return true;
    } else {
      return false;
    }
  }, [accessToken]);

  const fetchNewAccess = async () => {
    if (!isTokenValid(refreshToken)) {
      return await refreshAccessToken();
    }
  };

  const login = (newAccessToken: string, newRefreshToken: string): void => {
    setAccessToken(newAccessToken);
    setRefreshToken(newRefreshToken);
    localStorage.setItem("access", newAccessToken);
    localStorage.setItem("refresh", newRefreshToken);
  };

  const logout = (): void => {
    setAccessToken(null);
    setRefreshToken(null);
    localStorage.removeItem("access");
    localStorage.removeItem("refresh");
  };

  const getCurrentUser = () => {
    const url = `http://127.0.0.1:8000/auth/loggedin_user_details/`;
    axios
      .get(url, {
        headers: {
          Authorization: `Bearer ${accessToken}`,
        },
      })
      .then((res) => setUserdata(res.data))
      .catch((err) => {
        console.log(err);
      });
  };

  useEffect(() => {
    isLoggedIn();
  }, [isLoggedIn]);

  return (
    <AuthContext.Provider
      value={{
        accessToken,
        isLoggedIn,
        login,
        logout,
        fetchNewAccess,
        getCurrentUser,
        userdata,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};

export { AuthContext, AuthProvider };

// Custom hook to use the AuthContext
export const useAuth = () => {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error("useAuth must be used within an AuthProvider");
  }
  return context;
};
