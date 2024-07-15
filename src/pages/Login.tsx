import Input from "../components/Input";
import Logo from "../assets/img/messenger.png";
import Button from "../components/Button";

const Login = () => {
  return (
    <div className="w-full h-screen flex items-center bg-bgClr px-10">
      <form className="rounded-[16px] bg-bgComp px-5 py-[30px] w-[350px] xl:w-[400px] 2xl:w-[600px] mx-auto my-auto grid gap-10 2xl:gap-14">
        <div className="w-full flex flex-col gap-3 2xl:gap-5 justify-center text-center items-center">
          <img className="size-[80px]" src={Logo} alt="" />
          <div className="text-center">
            <p className="text-[26px] text-txtClr">Login to get started</p>
          </div>
        </div>

        <div className="grid gap-3">
          <Input type="text" placeholder="Email" />
          <Input type="password" placeholder="Password" />
          <p>sajan thapa</p>
        </div>
        <Button text="Login" styles="hover:bg-[#0f57c4]" />
      </form>
    </div>
  );
};

export default Login;
