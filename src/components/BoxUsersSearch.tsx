import { useEffect, useState } from "react";
import { Users } from "../services/GetUsers";
import axios from "axios";
import User from "./User";
import pp from "../assets/img/pp.png";

interface Props {
  searchTerm: string | undefined;
}

const BoxUsersSearch = ({ searchTerm }: Props) => {
  const [users, setUsers] = useState<Users[]>();
  const [error, setError] = useState<string>();

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
        setUsers(res.data);
      })
      .catch((err) => {
        if (err.response.status === 400) {
          setError("No users found");
        }
      });
  }, [searchTerm]);

  return (
    <div>
      {users?.length === 0 ? (
        !searchTerm ? (
          <div className="text-center text-[20px] text-txtClr">
            Search Users
          </div>
        ) : (
          <div className="text-center text-[20px] text-txtClr">
            No users found
          </div>
        )
      ) : (
        <div className="bg-bgComp w-full h-full">
          {users?.map((u) => (
            <User key={u.id} img={pp} userName={u.username} />
          ))}
        </div>
      )}
    </div>
  );
};

export default BoxUsersSearch;
