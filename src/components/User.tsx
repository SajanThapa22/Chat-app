interface Props {
  img: string;
  userName: string;
}

const User = ({ img }: Props) => {
  return (
    <div className="flex gap-3">
      <div className="rounded-full aspect-square overflow-hidden size-10">
        <img src={img} alt="" />
      </div>

      <div>
        <div>{userName}</div>
        <div className="flex gap-2">
          message...
          <div>4:50 pm</div>
        </div>
      </div>
    </div>
  );
};

export default User;
