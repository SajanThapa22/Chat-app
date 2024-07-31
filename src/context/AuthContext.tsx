import React, {
  createContext,
  useState,
  useEffect,
  useCallback,
  ReactNode,
  useContext,
} from "react";
import { jwtDecode } from "jwt-decode";

interface AuthContextType {
  accessToken: string | null;
  isLoggedIn: () => boolean | undefined;
  fetchNewToken: () => Promise<boolean | undefined>;
  login: (accessToken: string, refreshToken: string) => void;
  logout: () => void;
}

interface AuthProviderProps {
  children: ReactNode;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

const AuthProvider = ({ children }: AuthProviderProps) => {
  const [accessToken, setAccessToken] = useState<string | null>(
    localStorage.getItem("accessToken")
  );
  const [refreshToken, setRefreshToken] = useState<string | null>(
    localStorage.getItem("refreshToken")
  );

  const isTokenValid = (token: string | null): boolean => {
    if (!token) return false;
    const decoded = jwtDecode<{ exp: number }>(token);
    if (!decoded.exp) return false;
    return decoded.exp * 1000 > Date.now();
  };

  const refreshAccessToken = useCallback(async (): Promise<boolean> => {
    if (!refreshToken) return false;

    try {
      const response = await fetch("YOUR_AUTH_SERVER_ENDPOINT", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ refreshToken }),
      });

      if (response.ok) {
        const { accessToken: newAccessToken, refreshToken: newRefreshToken } =
          await response.json();
        setAccessToken(newAccessToken);
        setRefreshToken(newRefreshToken);
        localStorage.setItem("accessToken", newAccessToken);
        localStorage.setItem("refreshToken", newRefreshToken);
        return true;
      } else {
        return false;
      }
    } catch (error) {
      console.error("Failed to refresh access token:", error);
      return false;
    }
  }, [refreshToken]);

  const isLoggedIn = () => {
    if (isTokenValid(accessToken)) {
      return true;
    } else {
      return false;
    }
  };

  const fetchNewToken = async () => {
    if (!isLoggedIn) {
      return await refreshAccessToken();
    }
  };

  const login = (newAccessToken: string, newRefreshToken: string): void => {
    setAccessToken(newAccessToken);
    setRefreshToken(newRefreshToken);
    localStorage.setItem("accessToken", newAccessToken);
    localStorage.setItem("refreshToken", newRefreshToken);
  };

  const logout = (): void => {
    setAccessToken(null);
    setRefreshToken(null);
    localStorage.removeItem("accessToken");
    localStorage.removeItem("refreshToken");
  };

  useEffect(() => {
    isLoggedIn();
  }, [isLoggedIn]);

  return (
    <AuthContext.Provider
      value={{ accessToken, isLoggedIn, login, logout, fetchNewToken }}
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
