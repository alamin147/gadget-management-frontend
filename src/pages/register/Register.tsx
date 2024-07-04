import { Link, useNavigate } from "react-router-dom";

import { useForm } from "react-hook-form";
import { useState } from "react";
import { useCreateUserMutation } from "../../redux/features/user/userApi";

const Register = () => {
  const nav = useNavigate();
  const [createUser, { isLoading }] = useCreateUserMutation();
  const [showPass, setShowPass] = useState(false);
  const [errs, setErr] = useState("");
  const {
    handleSubmit,
    register,
    formState: { errors },
  } = useForm();
  const handleRegister = async (data: any) => {
    const response: any = await createUser(data);
    // console.log(r?.data?.mesage);
    if ((response?.data?.mesage as string) === "existing user") {
      setErr("Existing user, Please use an unique username!");
      return;
    } else {
      setErr("");
      nav("/login");
      return;
    }
  };

  return (
    <div className=" h-[800px] flex justify-center items-center">
      <div className="card w-96 bg-base-100 shadow-xl">
        <h1 className="text-center text-4xl font-bold">Register</h1>
        {isLoading && (
          <div className="text-center mt-4">
            <span className="loading loading-spinner text-primary text-center"></span>
          </div>
        )}
        {errs && <p className="text-red-500 mt-4 text-center">{errs}</p>}
        <form
          className="mt-6 text-center"
          onSubmit={handleSubmit(handleRegister)}
        >
          <input
            className="input input-bordered  w-full max-w-xs mt-6"
            {...register("name", { required: "Name is required" })}
            type="text"
            placeholder="Your Name"
          />
          {errors.name && (
            <p className="text-red-600">{errors.name?.message as string}</p>
          )}
          <br />

          <input
            className="input input-bordered  w-full max-w-xs mt-6"
            {...register("username", { required: "Username is required" })}
            type="text"
            placeholder="Your Username"
          />
          {errors.username && (
            <p className="text-red-600">{errors.username?.message as string}</p>
          )}
          <br />
          <input
            className="input input-bordered  w-full max-w-xs mt-6"
            {...register("imgUrl", { required: "ImgUrl is required" })}
            type="text"
            placeholder="Your ImgUrl"
          />
          {errors.imgUrl && (
            <p className="text-red-600">{errors.imgUrl?.message as string}</p>
          )}
          <br />

          <input
            className="input input-bordered  w-full max-w-xs mt-6"
            {...register("email", { required: "Email is required" })}
            type="email"
            placeholder="Your email"
          />
          {errors.email && (
            <p className="text-red-600">{errors.email?.message as string}</p>
          )}
          <br />
          <input
            className="input input-bordered  w-full max-w-xs mt-6"
            {...register("contactNo", { required: "contactNo is required" })}
            type="text"
            placeholder="Your contactNo"
          />
          {errors.contactNo && (
            <p className="text-red-600">
              {errors.contactNo?.message as string}
            </p>
          )}
          <br />

          <input
            className="input input-bordered w-full max-w-xs mt-6"
            type={showPass ? "text" : "password"}
            placeholder="Your Password"
            {...register("password", { required: "Password is required" })}
          />
          {errors.password && (
            <p className="text-red-600">{errors.password?.message as string}</p>
          )}

          <input
            className="btn w-full max-w-xs mt-6"
            value="Register"
            type="submit"
          />
        </form>

        <div className="flex mx-auto mt-8 items-center justify-around">
          <button onClick={() => setShowPass(!showPass)}>
            {showPass ? (
              <div className="flex items-center">
                <p className="me-3">Hide Password</p>
              </div>
            ) : (
              <div className="flex items-center">
                <p className="me-3">Show Password</p>
              </div>
            )}
          </button>
        </div>
        <h1 className="w-full text-center mt-3 pb-5">
          Have an account?
          <Link to="/login" className="text-primary pb-5 ms-1">
            Login here
          </Link>
        </h1>
      </div>
    </div>
  );
};
export default Register;
