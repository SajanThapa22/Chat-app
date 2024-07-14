interface Props {
  placeholder: string;
  type: string;
  styles?: string;
}

const Input = ({ type, styles, placeholder }: Props) => {
  return (
    <div
      className={`rounded-[12px] bg-white px-[20px] py-[10px] border border-[#e8e5e5] focus:outline-[#8AC0FF] ${styles}`}
    >
      <input
        placeholder={placeholder}
        type={type}
        className="w-full border-none bg-transparent outline-none "
      />
    </div>
  );
};

export default Input;
