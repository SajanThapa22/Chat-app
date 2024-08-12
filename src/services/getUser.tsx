import axios from "axios";
import React, { useEffect, useState } from "react";
import api from "./api";

interface User {
  id: string;
  username: string;
  email: string;
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
        console.log(res.data);
      })
      .catch((err) => setError(err.message));
  }, [id]);
  return { user, error };
};

export default getUser;
