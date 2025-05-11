import { useEffect, useState } from "react";
import User from "./User";
import { CiSearch } from "react-icons/ci";
import { debounce } from "lodash";
import { Users } from "../../types/chat";
import { ChatAPI } from "../../api/chat";

interface Props {
  searchTerm: string | undefined;
}

const UsersSearch = ({ searchTerm }: Props) => {
  const [users, setUsers] = useState<Users[]>();
  const [error, setError] = useState<string>();

  useEffect(() => {
    const access = localStorage.getItem("access");

    if (!access) return;

    if (!searchTerm || searchTerm.trim() === "") {
      setUsers([]);
      return;
    }

    const debouncedFetchUsers = debounce(async () => {
      try {
        const users = await ChatAPI.searchUsers(searchTerm);
        setUsers(users);
      } catch (err) {
        setError("Error searching users");
        console.error("Error fetching users", err);
      }
    }, 300);

    debouncedFetchUsers();

    // Cleanup function to cancel the debounce on unmount
    return () => {
      debouncedFetchUsers.cancel();
    };
  }, [searchTerm]);

  return (
    <div className="w-full">
      {users?.length === 0 ? (
        !searchTerm ? (
          <div className="text-center w-full text-[20px] flex gap-3 justify-center text-txtClr capitalize ml-auto mr-auto">
            <CiSearch className="text-[24px]" />
            <div>search users</div>
          </div>
        ) : (
          <div className="w-full text-center text-[20px] text-txtClr">
            {error}
          </div>
        )
      ) : (
        <div className="bg-bgComp w-full flex flex-col justify-start h-full">
          {users?.map((u) => (
            <User
              key={u.id}
              img={u.profile.profile_pic}
              username={u.username}
              id={u.id}
            />
          ))}
        </div>
      )}
    </div>
  );
};

export default UsersSearch;
