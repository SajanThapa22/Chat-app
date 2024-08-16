import { NavLink } from "react-router-dom";

interface Props {
  img: string | undefined;
  username: string | undefined;
  message?: string;
  time?: string;
  isSelected?: boolean;
  id?: string;
  onclick?: () => void;
  style?: string;
  status?: string;
}

const User = ({
  img,
  username,
  message,
  time,
  id,
  onclick,
  style,
  status,
}: Props) => {
  return (
    <NavLink
      to={`/chat/${id}`}
      className={({ isActive }) =>
        isActive ? "bg-selected rounded-[12px]" : ""
      }
    >
      <div
        onClick={onclick}
        className={`flex gap-3 px-2 py-2 items-center rounded-md z-10 ${style}`}
      >
        <div
          className={`overflow-hidden w-[65px] aspect-square rounded-full ${
            status === "online" && "border-[3px] border-[#00FF00]"
          }`}
        >
          <img src={img} className="w-full h-full object-cover" />
        </div>

        <div className="text-txtClr w-full">
          <div className="w-full flex justify-between">
            <div className="text-[18px]">{username}</div>
            {/* {status === "online" && (
              <div className="size-3 bg-[#00FF00] rounded-full"></div>
            )} */}
          </div>
          <div className="flex justify-between gap-2 text-[14px]">
            <div className="">{message}</div>
            <div>{time}</div>
          </div>
        </div>
      </div>
    </NavLink>
  );
};

export default User;
