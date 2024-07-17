import Input from "../components/Input";
import Logo from "../assets/img/messenger.png";
import Button from "../components/Button";
import { FormEvent, useState } from "react";

interface Props {
  firstName: string;
  lastName: string;
  email: string;
  password: string;
  confirmPassword: string;
}

const Register = () => {
  const [formData, setFormData] = useState({
    firstName: "",
    lastName: "",
    email: "",
    password: "",
    confirmPassword: "",
  });

  const handleInputChange = () => {
    const {name, value} = event.target;
    setFormData({
      ...formData,
      [name]: value
    })
  }

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();
    try{
      fetch('http://localhost:5000/user/register', {
        method: 'POST',
        headers: {
          "Content-Type": 'application/json'
        },
        body: JSON.stringify(formData)
      })
    }
  };

  return (
    <div className="w-full min-h-screen flex items-center bg-bgClr px-10">
      <form className="rounded-[16px] bg-bgComp px-5 py-[20px] xl:py-[30px] w-[350px] xl:w-[450px] 2xl:w-[600px] mx-auto my-auto grid gap-10 2xl:gap-14">
        <div className="w-full flex flex-col gap-3 2xl:gap-5 justify-center text-center items-center">
          <img className="size-[80px]" src={Logo} alt="" />
          <div className="text-center">
            <p className="text-[26px] text-txtClr">Register an account</p>
          </div>
        </div>

        <div className="grid gap-3">
          <Input
            type="text"
            value={formData?.firstName}
            placeholder="Last name"
          />
          <Input
            type="text"
            value={formData?.lastName}
            placeholder="First name"
          />
          <Input type="text" value={formData?.email} placeholder="Email" />
          <Input
            type="password"
            value={formData?.password}
            placeholder="Password"
          />
          <Input
            type="password"
            value={formData?.confirmPassword}
            placeholder="Confirm assword"
          />
        </div>

        <div className="grid gap-3">
          <Button text="Login" styles="hover:bg-[#0f57c4]" />
          <p className="text-[14px] font-[400] text-txtClr">
            Already have an account?
            <a className="text-blue-500 underline ml-2" href="#">
              Login
            </a>
          </p>
        </div>
      </form>
    </div>
  );
};

export default Register;
