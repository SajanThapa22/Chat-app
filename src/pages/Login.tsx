import Input from "../components/Input";
import Logo from "../assets/img/messenger.png";
import Button from "../components/Button";

const Login = () => {
  return (
    <div className="w-full h-screen flex items-center bg-bgClr">
      <form className="rounded-[16px] bg-bgComp px-5 py-[30px] w-[400px] mx-auto my-auto grid gap-3">
        <div className="w-full grid justify-center text-center items-center">
          <img className="size-[80px]" src={Logo} alt="" />
        </div>
        <div className="text-center">
          <p className="text-[26px] text-txtClr">Login to get started</p>
        </div>
        <div className="grid gap-3 mt-6 mb-3">
          <Input type="text" placeholder="Email" />
          <Input type="password" placeholder="Password" />
        </div>
        <Button text="Login" styles="hover:bg-[#0f57c4]" />
      </form>
    </div>
  );
};

export default Login;
