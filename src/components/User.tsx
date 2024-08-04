import { Link } from "react-router-dom";

interface Props {
  img: string;
  username: string | undefined;
  message?: string;
  time?: string;
  isSelected?: boolean;
  id?: string;
  onclick?: () => void;
  style?: string;
}

const User = ({
  img,
  username,
  isSelected,
  message,
  time,
  id,
  onclick,
  style,
}: Props) => {
  return (
    <Link to={`/chat/${id}`}>
      <div
        onClick={onclick}
        className={`flex gap-4 px-2 py-2 items-center rounded-md ${style}`}
      >
        <div className="rounded-full aspect-square overflow-hidden size-10">
          <img src={img} className="size-full" />
        </div>

        <div className="w-full text-txtClr">
          <div className="text-[18px]">{username}</div>
          <div className="flex justify-between gap-2 text-sm">
            <div className="">{message}</div>
            <div>{time}</div>
          </div>
        </div>
      </div>
    </Link>
  );
};

export default User;
