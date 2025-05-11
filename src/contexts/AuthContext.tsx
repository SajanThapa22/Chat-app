import React, {
  createContext,
  useEffect,
  useState,
  useCallback,
  ReactNode,
} from "react";
import { AuthAPI } from "../api/auth";
import { User, AuthState } from "../types/auth";
import { useNavigate } from "react-router-dom";

interface AuthContextType extends AuthState {
  login: (email: string, password: string) => Promise<void>;
  registerUser: (
    username: string,
    email: string,
    password: string
  ) => Promise<void>;
  logout: () => Promise<void>;
  updateUser: (user: User) => void;
}

const initialState: AuthContextType = {
  isAuthenticated: false,
  isLoading: true,
  initialCheckDone: false,
  user: null,
  login: async () => {},
  registerUser: async () => {},
  logout: async () => {},
  updateUser: () => {},
};

export const AuthContext = createContext<AuthContextType>(initialState);

export const AuthProvider = ({ children }: { children: ReactNode }) => {
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [initialCheckDone, setInitialCheckDone] = useState(false);
  const [user, setUser] = useState<User | null>(null);
  const navigate = useNavigate();

  const updateUser = useCallback((updatedUser: User) => {
    setUser(updatedUser);
  }, []);

  useEffect(() => {
    const checkAuthStatus = async () => {
      setIsLoading(true);
      try {
        const user = await AuthAPI.getCurrentUser();
        setUser(user);
        setIsAuthenticated(true);
      } catch (error) {
        console.error("Authentication check failed:", error);
        setIsAuthenticated(false);
        setUser(null);
      } finally {
        setIsLoading(false);
        setInitialCheckDone(true);
      }
    };

    checkAuthStatus();
  }, []);

  const login = async (email: string, password: string) => {
    setIsLoading(true);
    try {
      await AuthAPI.login(email, password);
      const user = await AuthAPI.getCurrentUser();
      setUser(user);
      setIsAuthenticated(true);
      navigate("/chat");
    } catch (error) {
      console.error("Login failed:", error);
      throw error;
    } finally {
      setIsLoading(false);
    }
  };

  const registerUser = async (
    username: string,
    email: string,
    password: string
  ) => {
    setIsLoading(true);
    try {
      await AuthAPI.register(username, email, password);
      // await login(email, password);
      navigate("/login");
    } catch (error) {
      console.error("Registration failed:", error);
      throw error;
    } finally {
      setIsLoading(false);
    }
  };

  const logout = async () => {
    setIsLoading(true);
    try {
      await AuthAPI.logout();
    } catch (error) {
      console.error("Logout failed:", error);
    } finally {
      setUser(null);
      setIsAuthenticated(false);
      setIsLoading(false);
      navigate("/login");
    }
  };

  return (
    <AuthContext.Provider
      value={{
        isAuthenticated,
        isLoading,
        initialCheckDone,
        user,
        login,
        registerUser,
        logout,
        updateUser,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};
