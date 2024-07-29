// import React, {
//   createContext,
//   useState,
//   useEffect,
//   useCallback,
//   ReactNode,
// } from "react";
// import jwtDecode from "jwt-decode";

// interface AuthContextType {
//   accessToken: string | null;
//   isLoggedIn: () => Promise<boolean>;
//   login: (accessToken: string, refreshToken: string) => void;
//   logout: () => void;
// }

// interface AuthProviderProps {
//   children: ReactNode;
// }

// const AuthContext = createContext<AuthContextType | undefined>(undefined);

// const AuthProvider = ({ children }: AuthProviderProps) => {
//   const [accessToken, setAccessToken] = useState<string | null>(
//     localStorage.getItem("accessToken")
//   );
//   const [refreshToken, setRefreshToken] = useState<string | null>(
//     localStorage.getItem("refreshToken")
//   );

//   const isTokenValid = (token: string | null): boolean => {
//     if (!token) return false;
//     const { exp } = jwtDecode<{ exp: number }>(token);
//     return exp > Date.now() / 1000;
//   };

//   const refreshAccessToken = useCallback(async (): Promise<boolean> => {
//     if (!refreshToken) return false;

//     try {
//       const response = await fetch("YOUR_AUTH_SERVER_ENDPOINT", {
//         method: "POST",
//         headers: {
//           "Content-Type": "application/json",
//         },
//         body: JSON.stringify({ refreshToken }),
//       });

//       if (response.ok) {
//         const { accessToken: newAccessToken, refreshToken: newRefreshToken } =
//           await response.json();
//         setAccessToken(newAccessToken);
//         setRefreshToken(newRefreshToken);
//         localStorage.setItem("accessToken", newAccessToken);
//         localStorage.setItem("refreshToken", newRefreshToken);
//         return true;
//       } else {
//         return false;
//       }
//     } catch (error) {
//       console.error("Failed to refresh access token:", error);
//       return false;
//     }
//   }, [refreshToken]);

//   const isLoggedIn = useCallback(async (): Promise<boolean> => {
//     if (isTokenValid(accessToken)) {
//       return true;
//     } else {
//       return await refreshAccessToken();
//     }
//   }, [accessToken, refreshAccessToken]);

//   const login = (newAccessToken: string, newRefreshToken: string): void => {
//     setAccessToken(newAccessToken);
//     setRefreshToken(newRefreshToken);
//     localStorage.setItem("accessToken", newAccessToken);
//     localStorage.setItem("refreshToken", newRefreshToken);
//   };

//   const logout = (): void => {
//     setAccessToken(null);
//     setRefreshToken(null);
//     localStorage.removeItem("accessToken");
//     localStorage.removeItem("refreshToken");
//   };

//   useEffect(() => {
//     isLoggedIn();
//   }, [isLoggedIn]);

//   return (
//     <AuthContext.Provider value={{ accessToken, isLoggedIn, login, logout }}>
//       {children}
//     </AuthContext.Provider>
//   );
// };

// export { AuthContext, AuthProvider };
