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

const GetUsers = () => {
  const [users, setUsers] = useState<Users[]>();

  useEffect(() => {
    const access = localStorage.getItem("access");
    const url = `/chat/users`;

    if (!access) return;

    api
      .get(url, {
        headers: {
          Authorization: `Bearer ${access}`,
        },
      })
      .then((res) => {
        setUsers(res.data);
      })
      .catch((err) => {
        if (err.response.status === 400) {
          console.log(err.message);
        }
      });
  }, []);
  return { users, setUsers };
};

export default GetUsers;
