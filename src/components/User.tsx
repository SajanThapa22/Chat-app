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
      className={({ isActive }) => (isActive ? "bg-selected rounded-md" : "")}
    >
      <div
        onClick={onclick}
        className={`flex gap-4 px-2 py-2 items-center rounded-md ${style}`}
      >
        <div className="rounded-full aspect-square overflow-hidden size-10">
          <img src={img} className="size-full" />
        </div>

        <div className="w-full text-txtClr">
          <div className="w-full flex justify-between">
            <div className="text-[18px]">{username}</div>
            {status === "online" && (
              <div className="size-3 bg-[#00FF00] rounded-full"></div>
            )}
          </div>
          <div className="flex justify-between gap-2 text-sm">
            <div className="">{message}</div>
            <div>{time}</div>
          </div>
        </div>
      </div>
    </NavLink>
  );
};

export default User;
