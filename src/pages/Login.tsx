import Logo from "../assets/img/messenger.png";
import Button from "../components/Button";
import { useForm } from "react-hook-form";
import { Link, useNavigate } from "react-router-dom";
import api from "../services/api";
import { useEffect, useState } from "react";
import { useAuth } from "../context/AuthContext";
import Spinner from "../components/Spinner";

interface FormData {
  username: string;
  password: string;
}

interface Tokens {
  access: string;
  refresh: string;
}

const Login = () => {
  const { isLoggedIn, login } = useAuth();
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const navigate = useNavigate();

  const [error, setError] = useState<string>("");

  useEffect(() => {
    const checkAuth = async () => {
      const result = await isLoggedIn();
      if (result) {
        navigate("/");
      }
    };

    checkAuth();
  }, [isLoggedIn]);

  const {
    register,
    handleSubmit,
    formState: { errors, isValid },
  } = useForm<FormData>({ mode: "all" });

  const onSubmit = async (data: FormData) => {
    setIsLoading(true);
    if (isValid) {
      api
        .post<Tokens>(`/auth/token/`, data, {
          headers: {
            "Content-Type": "application/json",
          },
        })
        .then((res) => {
          if (res.status === 200) {
            setError("");
            const { access, refresh } = res.data;
            login(access, refresh);
            setIsLoading(false);
          }
        })
        .catch((err) => {
          setIsLoading(false);
          console.log(err.message);
          if (err.response.status === 401) {
            setError("Invalid username or password");
          }
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

        <div className="grid gap-3 text-center">
          {error && <p className="text-red-700 text-[18px]">{error}</p>}
          <div>
            <input
              id="username"
              {...register("username", { required: true })}
              className="border border-[#cbcaca] px-4 py-2 rounded-[12px] text-txtClr autofill:bg-transparent focus:outline-none focus:border-primary w-full bg-bgComp"
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
          </div>
        </div>
        <div className="grid gap-3">
          <Button type="submit" styles="hover:bg-[#0f57c4]">
            {isLoading ? (
              <>
                <Spinner /> <div className="ml-3">Logging...</div>
              </>
            ) : (
              "Login"
            )}
          </Button>
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
