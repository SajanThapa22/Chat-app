interface Props {
  img: string;
  userName: string;
  message?: string;
  time?: string;
  style?: string;
}

const User = ({ img, userName, style, message, time }: Props) => {
  return (
    <div className={`flex gap-4 px-2 py-2 items-center ${style}`}>
      <div className="rounded-full aspect-square overflow-hidden size-10">
        <img src={img} className="size-full" />
      </div>

      <div className="w-full text-txtClr">
        <div className="text-[18px]">{userName}</div>
        <div className="flex justify-between gap-2 text-sm">
          <div className="">{message}</div>
          <div>{time}</div>
        </div>
      </div>
    </div>
  );
};

export default User;
