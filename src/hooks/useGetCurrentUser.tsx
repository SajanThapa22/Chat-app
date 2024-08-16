import { useEffect, useState } from "react";
import api from "../services/api";

export interface Users {
  id: string;
  email: string;
  username: string;
  profile: {
    profile_pic: string;
    bio: string;
  };
  user_status: {
    status: string;
    last_seen: string;
  };
}

const useGetCurrentUser = () => {
  const [currentUser, setCurrentUser] = useState<Users | null>(null);
  const [error, setError] = useState<string | null>(null);
  const [loading, setLoading] = useState<boolean>(true);

  const access = localStorage.getItem("access");
  const url = `/auth/loggedin_user_details/`;

  useEffect(() => {
    const getMe = async () => {
      setLoading(true);
      try {
        if (!access) {
          setError("Access token is missing");
          setLoading(false);
          return;
        }

        const response = await api.get(url, {
          headers: {
            Authorization: `Bearer ${access}`,
          },
        });

        if (response.status === 200) {
          setCurrentUser(response.data);
        } else {
          setError("Failed to fetch user data");
        }
      } catch (err) {
        setError((err as Error).message);
      } finally {
        setLoading(false);
      }
    };

    getMe();
  }, [access]);

  return { currentUser, error, loading };
};

export default useGetCurrentUser;
