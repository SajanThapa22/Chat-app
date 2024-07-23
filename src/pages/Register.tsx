import { useForm } from "react-hook-form";

import Button from "../components/Button";
import Logo from "../assets/img/messenger.png";

interface FormData {
  fullName: string;
  email: string;
  password: string;
  confirmPassword: string;
}

const Register = () => {
  const {
    register,
    handleSubmit,
    reset,
    watch,
    formState: { errors, isValid },
  } = useForm<FormData>();

  // Watch the password field value
  const password = watch("password");

  const onSubmit = (data: FormData) => {
    const { confirmPassword, ...rest } = data;
    console.log(rest);
    if (isValid) {
      fetch("/register", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(rest),
      })
        .then((response) => response.json())
        .then((data) => {
          if (data.success) {
            alert("registration successfull");
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
              id="fullName"
              {...register("fullName", { required: true, minLength: 3 })}
              className="border border-[#cbcaca] px-4 py-2 rounded-[12px] text-txtClr focus:outline-none focus:border-primary w-full bg-bgComp"
              placeholder="Full name"
              type="text"
            />
            {errors.fullName?.type === "required" && (
              <p className="text-red-700">Please enter your full name</p>
            )}
            {errors.fullName?.type === "minLength" && (
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
          <Button text="register" type="submit" />
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
