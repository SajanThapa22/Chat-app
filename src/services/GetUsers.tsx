import axios from "axios";
import { useEffect, useState } from "react";

const GetUsers = () => {
  const [users, setUsers] = useState();
  const [access, setAccess] = useState(() => localStorage.getItem("access"));

  useEffect(() => {
    fetch("http://127.0.0.1:8000/chat/users/", {
      method: "GET",
      headers: {
        Authorization: `Bearer ${access}`,
      },
    }).then((res) => res.json());
  }, []);
  return { users };
};

export default GetUsers;
