import axios from "axios";
import React, { useEffect, useState } from "react";

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
    const url = `http://127.0.0.1:8000/chat/user/${id}`;

    axios
      .get(url, {
        headers: {
          Authorization: `Bearer ${access}`,
        },
      })
      .then((res) => setUser(res.data))
      .catch((err) => setError(err.message));
  }, [id]);
  return { user, error };
};

export default getUser;
