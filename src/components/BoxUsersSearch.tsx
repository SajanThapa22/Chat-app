import { useEffect, useState } from "react";
import { Users } from "../services/GetUsers";
import User from "./User";
import { CiSearch } from "react-icons/ci";
import api from "../services/api";
import { debounce } from "lodash";

interface Props {
  searchTerm: string | undefined;
}

const BoxUsersSearch = ({ searchTerm }: Props) => {
  const [users, setUsers] = useState<Users[]>();
  const [error, setError] = useState<string>();

  // const debouncedFetchUsers = debounce((access: string) => {
  //   const url = `/chat/users`;

  //   api
  //     .get(url, {
  //       headers: {
  //         Authorization: `Bearer ${access}`,
  //       },
  //       params: {
  //         search: searchTerm,
  //       },
  //     })
  //     .then((res) => {
  //       setUsers(res.data);
  //     })
  //     .catch((err) => {
  //       if (err.response.status === 404) {
  //         setError("No users found");
  //       }
  //     });
  // }, 300); // Adjust the debounce delay as needed

  useEffect(() => {
    const access = localStorage.getItem("access");

    if (!access) return;

    if (!searchTerm || searchTerm.trim() === "") {
      setUsers([]);
      return;
    }

    const debouncedFetchUsers = debounce(() => {
      const url = `/chat/users`;

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

export default BoxUsersSearch;
