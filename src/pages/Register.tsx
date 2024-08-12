import Button from "../components/Button";
import Logo from "../assets/img/messenger.png";
import api from "../services/api";

import { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useForm } from "react-hook-form";
import { useAuth } from "../context/AuthContext";
import Spinner from "../components/Spinner";

interface FormData {
  username: string;
  email: string;
  password: string;
  confirmPassword: string;
}

interface Error {
  username: string;
  email: string;
}
const Register = () => {
  const { isLoggedIn } = useAuth();
  const [isLoading, setIsLoading] = useState<boolean>(false);

  useEffect(() => {
    const checkAuth = async () => {
      const result = await isLoggedIn();
      if (result) {
        navigate("/");
      }
    };

    checkAuth();
  }, [isLoggedIn]);

  const [error, setError] = useState<Error>();
  const navigate = useNavigate();

  const {
    register,
    handleSubmit,
    watch,
    formState: { errors, isValid },
  } = useForm<FormData>();

  // Watch the password field value
  const password = watch("password");

  const onSubmit = (data: FormData) => {
    setIsLoading(true);
    const { confirmPassword, ...rest } = data;
    if (isValid) {
      api
        .post(`/auth/register/`, rest, {
          headers: {
            "Content-Type": "application/json",
          },
        })
        .then((response) => {
          if (response.status === 201) {
            navigate("/login");
            setIsLoading(false);
            setError({ ...error, email: "", username: "" });
          }
        })
        .catch((err) => {
          setIsLoading(false);
          setError(err.response.data);
        });
    }
  };

  return (
    <div className="w-full min-h-screen flex items-center bg-bgClr px-10">
      <form
        onSubmit={handleSubmit(onSubmit)}
        className="rounded-[16px] bg-bgComp px-5 py-[20px] xl:py-[30px] w-[350px] xl:w-[450px] 2xl:w-[600px] mx-auto my-auto grid gap-10 2xl:gap-14"
      >
        <div className="w-full flex flex-col gap-3 2xl:gap-5 justify-center text-center items-center">
          <img className="size-[80px]" src={Logo} alt="" />
          <div className="text-center">
            <p className="text-[26px] text-txtClr">Register an account</p>
          </div>
        </div>

        <div className="grid gap-3">
          <div>
            <input
              id="userName"
              {...register("username", { required: true, minLength: 3 })}
              className="border border-[#cbcaca] px-4 py-2 rounded-[12px] text-txtClr focus:outline-none focus:border-primary w-full bg-bgComp"
              placeholder="User name"
              type="text"
            />
            {errors.username?.type === "required" && (
              <p className="text-red-700">Please enter your username</p>
            )}

            {error?.username && (
              <p className="text-red-700">{error.username}</p>
            )}

            {errors.username?.type === "minLength" && (
              <p className="text-red-700">Enter atleast 3 characters</p>
            )}
          </div>

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
            {error?.email && <p className="text-red-700">{error.email}</p>}
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

          <div>
            <input
              id="confirmPassword"
              {...register("confirmPassword", {
                required: true,
                minLength: 7,
                validate: (value) =>
                  value === password || "Passwords do not match",
              })}
              className="border border-[#cbcaca] px-4 py-2 rounded-[12px] text-txtClr focus:outline-none focus:border-primary w-full bg-bgComp"
              placeholder="Confirm password"
              type="password"
            />
            {errors.confirmPassword?.type === "required" && (
              <p className="text-red-700">Please re-enter the password</p>
            )}
            {errors.confirmPassword?.type === "validate" && (
              <p className="text-red-700">{errors.confirmPassword.message}</p>
            )}
          </div>
        </div>

        <div className="grid gap-3">
          <Button type="submit">
            {isLoading ? (
              <>
                <Spinner /> <div className="ml-3">Signing up...</div>
              </>
            ) : (
              "Sign up"
            )}
          </Button>
          <p className="text-[14px] font-[400] text-txtClr">
            Already have an account?
            <Link className="text-blue-500 underline ml-2" to="/">
              Login
            </Link>
          </p>
        </div>
      </form>
    </div>
  );
};

export default Register;
