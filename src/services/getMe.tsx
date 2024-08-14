import { useEffect, useState } from "react";
import api from "./api";

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

const getMe = async () => {
  const [currentUser, setCurrentUser] = useState<Users>();
  const [error, setError] = useState<{}>();
  const access = localStorage.getItem("access");
  const url = `/auth/loggedin_user_details/`;

  useEffect(() => {
    const getMe = async () => {
      try {
        const response = await api.get<Users>(url, {
          headers: {
            Authorization: `Bearer ${access}`,
          },
        });
        setCurrentUser(response.data);
      } catch (error) {
        if (error) setError(error);
      }
    };
    getMe();
  }, []);

  return { currentUser };
};

export default getMe;
