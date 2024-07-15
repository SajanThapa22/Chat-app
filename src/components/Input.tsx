interface Props {
  placeholder: string;
  type: string;
  styles?: string;
}

const Input = ({ type, styles, placeholder }: Props) => {
  return (
    <div
      className={`rounded-[12px] bg-bgComp px-[20px] py-[10px] border border-[#c7c4c4] focus:outline-[#8AC0FF] ${styles}`}
    >
      <input
        placeholder={placeholder}
        type={type}
        className="w-full border-none bg-transparent outline-none text-txtClr"
      />
    </div>
  );
};

export default Input;
