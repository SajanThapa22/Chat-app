import axios from "axios";
import api from "./api";

export interface User {
  id: string | undefined;
  email: string;
  username: string;
}

const getCurrentUser = async () => {
  const access = localStorage.getItem("access");
  const url = `/auth/loggedin_user_details/`;

  return await api
    .get(url, {
      headers: {
        Authorization: `Bearer ${access}`,
      },
    })
    .then((res) => res.data)
    .catch((err) => err.message);
};

export default getCurrentUser;
