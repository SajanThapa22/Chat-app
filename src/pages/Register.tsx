import Input from "../components/Input";
import Logo from "../assets/img/messenger.png";
import Button from "../components/Button";

const Register = () => {
  return (
    <div className="w-full h-screen flex items-center bg-bgClr px-10">
      <form className="rounded-[16px] bg-bgComp px-5 py-[40px] xl:py-[60px] w-[350px] xl:w-[450px] 2xl:w-[600px] mx-auto my-auto grid gap-10 2xl:gap-14">
        <div className="w-full flex flex-col gap-3 2xl:gap-5 justify-center text-center items-center">
          <img className="size-[80px]" src={Logo} alt="" />
          <div className="text-center">
            <p className="text-[26px] text-txtClr">Register an account</p>
          </div>
        </div>

        <div className="grid gap-3">
          <Input type="text" placeholder="Email" />
          <Input type="password" placeholder="Password" />
          <Input type="password" placeholder="Confirm assword" />
        </div>

        <div className="grid gap-3">
          <Button text="Login" styles="hover:bg-[#0f57c4]" />
          <p className="text-[14px]">
            Already have an account?{" "}
            <a className="text-blue-500 underline" href="#">
              Login
            </a>
          </p>
        </div>
      </form>
    </div>
  );
};

export default Register;
