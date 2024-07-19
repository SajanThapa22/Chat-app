import { useForm } from "react-hook-form";

interface FormData {
  firstName: string;
  lastName: string;
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
    formState: { errors, isValid, touchedFields, dirtyFields },
  } = useForm<FormData>({ mode: "all" });

  // Watch the password field value
  const password = watch("password");

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

  return (
    <div className="w-full min-h-screen flex items-center bg-bgClr px-10">
      <form
        onSubmit={handleSubmit((data: FormData) => {
          console.log(data);
        })}
        className="rounded-[16px] bg-bgComp px-5 py-[20px] xl:py-[30px] w-[350px] xl:w-[450px] 2xl:w-[600px] mx-auto my-auto grid gap-10 2xl:gap-14"
      >
        <div className="grid gap-3">
          <div>
            <input
              id="firstName"
              {...register("firstName", { required: true, minLength: 2 })}
              className="border border-[#cbcaca] px-4 py-2 rounded-[12px] text-txtClr focus:outline-none focus:border-primary w-full bg-bgComp"
              placeholder="First name"
              type="text"
            />
            {errors.firstName?.type === "required" && (
              <p className="text-red-700">Please enter the first name</p>
            )}
            {errors.firstName?.type === "minLength" && (
              <p className="text-red-700">Enter atleast 3 characters</p>
            )}
          </div>

          <div>
            <input
              id="lastName"
              {...register("lastName", { required: true, minLength: 2 })}
              className="border border-[#cbcaca] px-4 py-2 rounded-[12px] text-txtClr focus:outline-none focus:border-primary w-full bg-bgComp"
              placeholder="Last name"
              type="text"
            />
            {errors.lastName?.type === "required" && (
              <p className="text-red-700">Please enter the last name</p>
            )}
            {errors.lastName?.type === "minLength" && (
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
          <button
            type="submit"
            className="bg-primary text-white px-4 py-2 rounded-lg"
          >
            Register
          </button>

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
