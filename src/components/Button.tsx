interface Props {
  text: string;
  styles?: string;
}
const Button = ({ text, styles }: Props) => {
  return (
    <div
      className={`px-4 py-2 rounded-[10px] bg-[#0068FF] text-center text-white cursor-pointer ${styles}`}
    >
      <p className="text-[18px] font-[600]">{text}</p>
    </div>
  );
};

export default Button;
