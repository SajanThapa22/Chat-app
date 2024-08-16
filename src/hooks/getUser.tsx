import { useEffect, useState } from "react";
import api from "../services/api";

interface User {
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

const getUser = (id?: string) => {
  const [user, setUser] = useState<User>();
  const [error, setError] = useState();

  useEffect(() => {
    const access = localStorage.getItem("access");
    const url = `/chat/user/${id}`;

    api
      .get(url, {
        headers: {
          Authorization: `Bearer ${access}`,
        },
      })
      .then((res) => {
        setUser(res.data);
      })
      .catch((err) => setError(err.message));
  }, [id]);
  return { user, error };
};

export default getUser;
