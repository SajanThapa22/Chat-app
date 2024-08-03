import { useEffect, useState } from "react";
import { useAuth } from "../context/AuthContext";
import GetUsers, { Users } from "../services/GetUsers";
import axios from "axios";
import { DiVim } from "react-icons/di";
import User from "./User";
import pp from "../assets/img/pp.png";

interface Props {
  searchTerm: string | undefined;
}

const BoxUsersSearch = ({ searchTerm }: Props) => {
  const { users } = GetUsers(searchTerm);
  const [error, setError] = useState<string>();

  return (
    <div>
      {users?.length === 0 ? (
        searchTerm?.length === 0 ? (
          <div className="text-black text-center text-[20px]">Search Users</div>
        ) : (
          <div className="text-black text-center text-[20px]">
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
