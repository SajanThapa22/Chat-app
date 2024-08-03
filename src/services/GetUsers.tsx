import axios, { AxiosResponse } from "axios";
import React, { useEffect, useState } from "react";
import { useAuth } from "../context/AuthContext";

export interface Users {
  id: string;
  email: string;
  username: string;
}

const GetUsers = (searchTerm?: string) => {
  const [users, setUsers] = useState<Users[]>();
  const [error, setError] = useState();
  const { fetchNewAccess } = useAuth();

  useEffect(() => {
    const access = localStorage.getItem("access");
    const url = `http://127.0.0.1:8000/chat/users`;
    console.log(users?.length);

    if (!access) return;

    if (!searchTerm || searchTerm.trim() === "") {
      setUsers([]);
      return;
    }

    axios
      .get(url, {
        headers: {
          Authorization: `Bearer ${access}`,
        },
        params: {
          search: searchTerm,
        },
      })
      .then((res) => {
        const visibleUsers: Users[] = res.data.filter(
          (u: Users) => u.username !== "admin"
        );
        setUsers(visibleUsers);
      })
      .catch((err) => {
        if (err.response.status === 400) {
          console.log(err.message);
        }
      });
  }, [searchTerm]);
  return { users, setUsers };
};

export default GetUsers;
