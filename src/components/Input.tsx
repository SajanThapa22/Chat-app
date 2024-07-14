interface Props {
  placeholder: string;
  type: string;
  styles?: string;
}

const Input = ({ type, styles, placeholder }: Props) => {
  return (
    <div
      className={`rounded-[10px] px-[30px] py-6 focus:outline-[#8AC0FF] ${styles}`}
    >
      <input
        placeholder={placeholder}
        type={type}
        className="w-full border-none outline-none "
      />
    </div>
  );
};

export default Input;
