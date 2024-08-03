import axios from "axios";
import { useEffect, useState } from "react";
import { useAuth } from "../context/AuthContext";

export interface Users {
  id: string;
  email: string;
  username: string;
}

const GetUsers = () => {
  const [users, setUsers] = useState<Users[]>();
  const [error, setError] = useState();
  const { fetchNewAccess } = useAuth();

  useEffect(() => {
    const access = localStorage.getItem("access");
    const url = `http://127.0.0.1:8000/chat/users`;
    console.log(users?.length);

    if (!access) return;

    axios
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
