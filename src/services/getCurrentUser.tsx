import axios from "axios";
import { useEffect, useState } from "react";

export interface User {
  id: string | undefined;
  email: string;
  username: string;
}

const getCurrentUser = async () => {
  const access = localStorage.getItem("access");
  const url = `http://127.0.0.1:8000/auth/loggedin_user_details/`;

  return await axios
    .get(url, {
      headers: {
        Authorization: `Bearer ${access}`,
      },
    })
    .then((res) => res.data)
    .catch((err) => err.message);
};

export default getCurrentUser;
