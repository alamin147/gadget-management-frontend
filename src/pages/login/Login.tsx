import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";

import { useForm } from "react-hook-form";
import { useLoginMutation } from "../../redux/features/auth/authApi";
import { setUser } from "../../redux/features/auth/authSlice";
import { useAppDispatch } from "../../redux/hooks";
import { verifyToken } from "../../utils/verifyToken";

const Login = () => {
  const nav = useNavigate();
  const dispatch = useAppDispatch();
  const [showPass, setShowPass] = useState(false);

  const {
    handleSubmit,
    register,
    formState: { errors },
  } = useForm();

  const [login, { isLoading }] = useLoginMutation();
  const [errs, setErr] = useState("");
  const handleLogin = async (data: any) => {
    const res = await login(data).unwrap();
    const accessToken = res?.accessToken;
    const imgUrl = res?.imgUrl;
    // console.log("res",res);

    if (accessToken) {
      const user = verifyToken(accessToken);
      // console.log("user123",user);
      dispatch(setUser({ user: user, token: accessToken,imgUrl }));
      if (user) {
        nav("/");
      }
    } else {
      if (res?.mesage === "user not found") setErr("User not found");
      else if (res?.mesage === "wrong password") setErr("Wrong password");
      return;
    }
  };

  return (
    <div className=" h-[800px] flex justify-center items-center">
      <div className="card w-96 bg-base-100 shadow-xl">
        <h1 className="text-center text-4xl font-bold">Login</h1>
        {errs && <p className="text-red-500 mt-4 text-center">{errs}</p>}
        <form className="mt-6 text-center" onSubmit={handleSubmit(handleLogin)}>
          <input
            onFocus={() => setErr("")}
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
            onFocus={() => setErr("")}
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
            value="Login"
            type="submit"
          />
        </form>
        {isLoading && (
          <div className="text-center mt-2">
            <span className="loading loading-spinner text-primary text-center"></span>
          </div>
        )}

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
          {" "}
          New here?{" "}
          <Link to="/register" className="text-primary pb-5">
            Create an account
          </Link>
        </h1>
      </div>
    </div>
  );
};

export default Login;
