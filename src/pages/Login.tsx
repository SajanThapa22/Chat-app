import Logo from "../assets/img/messenger.png";
import Button from "../components/Button";
import { useForm } from "react-hook-form";
import { useState } from "react";
import { Link } from "react-router-dom";
import axios from "axios";
import api from "../services/api";

interface FormData {
  username: string;
  password: string;
}

interface Tokens {
  access: string;
  refresh: string;
}

const Login = () => {
  const [tokens, setTokens] = useState<Tokens>();

  const {
    register,
    handleSubmit,
    formState: { errors, isValid },
  } = useForm<FormData>({ mode: "all" });

  const onSubmit = async (data: FormData) => {
    if (isValid) {
      api
        .post<Tokens>(`/token/`, data, {
          headers: {
            "Content-Type": "application/json",
          },
        })
        .then((res) => {
          localStorage.setItem("accessToken", res.data.access);
          localStorage.setItem("refreshToken", res.data.refresh);
        })
        .catch((err) => console.log(err.message));
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
              id="username"
              {...register("username", { required: true })}
              className="border border-[#cbcaca] px-4 py-2 rounded-[12px] text-txtClr focus:outline-none focus:border-primary w-full bg-bgComp"
              placeholder="Username"
              type="text"
            />
            {errors.username?.type === "required" && (
              <p className="text-red-700">Please enter your username</p>
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
