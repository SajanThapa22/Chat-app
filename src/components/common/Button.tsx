import { ReactNode } from "react";

interface Props {
  styles?: string;
  type?: "submit" | "reset" | "button";
  disabled?: boolean;
  children: ReactNode;
}
const Button = ({ styles, type, disabled, children }: Props) => {
  return (
    <button
      disabled={disabled}
      type={type}
      className={`px-4 py-2 rounded-[10px] bg-[#0068FF] flex justify-center text-center text-white text-[18px] font-[500] cursor-pointer ${styles}`}
    >
      {children}
    </button>
  );
};

export default Button;
