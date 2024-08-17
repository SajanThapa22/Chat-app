import { useEffect, useState } from "react";
import { useAuth } from "../context/AuthContext";

const useCheckLogged = () => {
  const { isLoggedIn } = useAuth();
  const [authenticated, setAuthenticated] = useState<boolean | undefined>();

  useEffect(() => {
    const checkAuth = async () => {
      const result = await isLoggedIn();
      setAuthenticated(result);
    };

    checkAuth();
  }, [isLoggedIn]);

  return { authenticated, setAuthenticated };
};

export default useCheckLogged;
