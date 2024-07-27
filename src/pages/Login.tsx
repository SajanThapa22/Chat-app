import Logo from "../assets/img/messenger.png";
import Button from "../components/Button";
import { useForm } from "react-hook-form";
import { useState } from "react";
import { Link } from "react-router-dom";

interface FormData {
  email: string;
  password: string;
}

const Login = () => {
  const [aceessToken, setAccessToken] = useState();
  const [refreshToken, setRefreshToken] = useState();

  const {
    register,
    handleSubmit,
    formState: { errors, isValid },
  } = useForm<FormData>({ mode: "all" });

  const onSubmit = (data: FormData) => {
    console.log(data);
    if (isValid) {
      fetch("/login", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(data),
      })
        .then((response) => response.json())
        .then((data) => {
          if (data.success) {
            alert("registration successfull");
            setAccessToken(data.access);
            setRefreshToken(data.refresh);
          } else {
            alert("Registration failed: " + data.message);
          }
        })
        .catch((error) => {
          console.error("Error: ", error);
        });
    }
  };

  return (
    <div className="w-full h-screen flex items-center bg-bgClr px-10">
      <form
        onSubmit={handleSubmit(onSubmit)}
        className="rounded-[16px] bg-bgComp px-5 py-[30px] w-[350px] xl:w-[400px] 2xl:w-[600px] mx-auto my-auto grid gap-10 2xl:gap-14"
      >
        <div className="w-full flex flex-col gap-3 2xl:gap-5 justify-center text-center items-center">
          <img className="size-[80px]" src={Logo} alt="" />
          <div className="text-center">
            <p className="text-[26px] text-txtClr">Login to get started</p>
          </div>
        </div>

        <div className="grid gap-3">
          <div>
            <input
              id="email"
              {...register("email", { required: true })}
              className="border border-[#cbcaca] px-4 py-2 rounded-[12px] text-txtClr focus:outline-none focus:border-primary w-full bg-bgComp"
              placeholder="Email"
              type="text"
            />
            {errors.email?.type === "required" && (
              <p className="text-red-700">Please enter your email address</p>
            )}
          </div>

          <div>
            <input
              id="password"
              {...register("password", { required: true, minLength: 7 })}
              className="border border-[#cbcaca] px-4 py-2 rounded-[12px] text-txtClr focus:outline-none focus:border-primary w-full bg-bgComp"
              placeholder="Password"
              type="password"
            />
            {errors.password?.type === "required" && (
              <p className="text-red-700">Please enter the password</p>
            )}
            {errors.password?.type === "minLength" && (
              <p className="text-red-700">Password must be 7 characters long</p>
            )}
          </div>
        </div>
        <div className="grid gap-3">
          <Button text="Login" styles="hover:bg-[#0f57c4]" />
          <p className="text-[14px] font-[300] text-txtClr">
            Don't have an account yet?
            <Link className="text-blue-500 underline ml-2" to="/register">
              Sign up
            </Link>
          </p>
        </div>
      </form>
    </div>
  );
};

export default Login;
