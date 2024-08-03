import axios, { AxiosResponse } from "axios";
import React, { useEffect, useState } from "react";
import { useAuth } from "../context/AuthContext";

const GetUsers = () => {
  const [users, setUsers] = useState();
  const { logout, fetchNewAccess } = useAuth();

  useEffect(() => {
    const access = localStorage.getItem("access");
    setInterval(fetchNewAccess, 4 * 60 * 1000);
    axios
      .get("http://127.0.0.1:8000/chat/users", {
        headers: {
          Authorization: `Bearer ${access}`,
        },
      })
      .then((res) => console.log(res.data));
  }, []);

  return { users };
};

export default GetUsers;
