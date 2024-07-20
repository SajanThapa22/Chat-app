interface Props {
  text: string;
  styles?: string;
  type?: "submit" | "reset" | "button";
  disabled?: boolean;
}
const Button = ({ text, styles, type, disabled }: Props) => {
  return (
    <button
      disabled={disabled}
      type={type}
      className={`px-4 py-2 rounded-[10px] bg-[#0068FF] text-center text-white cursor-pointer ${styles}`}
    >
      <p className="text-[18px] font-[500]">{text}</p>
    </button>
  );
};

export default Button;

// const handleInputChange = (event:FormEvent) => {
//   const {name, value} = event.target;
//   setFormData({
//     ...formData,
//     [name]: value
//   })
// }

// const handleSubmit = async (e: FormEvent) => {
//   e.preventDefault();
//   try {
//     fetch("http://localhost:5000/user/register", {
//       method: "POST",
//       headers: {
//         "Content-Type": "application/json",
//       },
//       body: JSON.stringify(formData),
//     });
//   } catch (err) {
//     console.log("error occured", err);
//   }
// };
