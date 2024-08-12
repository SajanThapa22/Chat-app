import { useEffect, useState } from "react";
import { Users } from "../services/GetUsers";
import User from "./User";
import pp from "../assets/img/pp.png";
import { CiSearch } from "react-icons/ci";
import api from "../services/api";

interface Props {
  searchTerm: string | undefined;
}

const BoxUsersSearch = ({ searchTerm }: Props) => {
  const [users, setUsers] = useState<Users[]>();
  const [error, setError] = useState<string>();

  useEffect(() => {
    const access = localStorage.getItem("access");
    const url = `/chat/users`;

    if (!access) return;

    if (!searchTerm || searchTerm.trim() === "") {
      setUsers([]);
      return;
    }

    api
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
        if (err.response.status === 404) {
          setError("No users found");
        }
      });
  }, [searchTerm]);

  return (
    <div>
      {users?.length === 0 ? (
        !searchTerm ? (
          <div className="text-center text-[20px] flex gap-3 justify-center text-txtClr capitalize ml-auto mr-auto">
            <CiSearch className="text-[24px]" />
            <div>search users</div>
          </div>
        ) : (
          <div className="text-center text-[20px] text-txtClr">{error}</div>
        )
      ) : (
        <div className="bg-bgComp w-full h-full">
          {users?.map((u) => (
            <User key={u.id} img={pp} username={u.username} id={u.id} />
          ))}
        </div>
      )}
    </div>
  );
};

export default BoxUsersSearch;
