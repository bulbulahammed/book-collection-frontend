/* eslint-disable @typescript-eslint/no-explicit-any */
import React, { FormEvent, useEffect, useState } from "react";
import { useNavigate } from "react-router";
import { Link } from "react-router-dom";
import { toast } from "react-toastify";
import { setUser } from "../redux/feature/user/authSlice";
import { useSigninUserMutation } from "../redux/feature/user/userApiSlice";
import { useAppDispatch } from "../redux/hook";

export default function Login() {
  const dispatch = useAppDispatch();
  const navigate = useNavigate();
  const [signinUser, { data, isLoading, isError, isSuccess }] =
    useSigninUserMutation();

  useEffect(() => {
    if (isSuccess) {
      dispatch(
        setUser({
          token: data.data.token,
          user: {
            email: data.data.user.email,
          },
        })
      );
      localStorage.setItem("token", data.data.token);
      localStorage.setItem("email", data.data.user.email);
      navigate("/");
      toast.success("Login Successfully ✌", { toastId: "LoginSuccess" });
    }

    if (isError) {
      toast.error("Login Failed!", { toastId: "LoginError" });
    }
  }, [isSuccess, isError, data, dispatch, navigate]);

  const [formData, setFormData] = useState({
    user: {
      email: "",
      password: "",
    },
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({
      ...prevData,
      user: {
        ...prevData.user,
        [name]: value,
      },
    }));
  };

  const handleSubmit = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    signinUser(formData);
  };
  return (
    <section
      className="min-h-screen flex items-center"
      style={{
        background: "rgba(255, 194, 139, 0.30)",
      }}
    >
      <div className="container mx-auto">
        <div className="container max-w-sm mx-auto flex-1 flex flex-col items-center justify-center px-2">
          <div className="bg-white px-6 py-8 rounded shadow-md text-black w-full">
            <h1 className="mb-10 text-xl text-center">Login</h1>
            <form onSubmit={handleSubmit}>
              {/*----------- Label For Email ------------*/}
              <label className="label">
                <span className="label-text text-sm">Email</span>
              </label>
              <input
                type="email"
                className="input input-bordered w-full max-w-xs"
                name="email"
                value={formData.user.email}
                onChange={handleChange}
                placeholder="example@mail.com"
              />
              {/*----------- Label For Password ------------*/}
              <label className="label">
                <span className="label-text text-sm">Password</span>
              </label>
              <input
                type="password"
                className="input input-bordered w-full max-w-xs"
                name="password"
                value={formData.user.password}
                onChange={handleChange}
                placeholder="examplePassword123"
              />
              {isLoading ? (
                <button className="w-full max-w-xs text-center py-3 rounded btn-accent text-white focus:outline-none my-4">
                  <span className="loading loading-spinner text-info"></span>
                </button>
              ) : (
                <button
                  type="submit"
                  className="w-full max-w-xs text-center py-3 rounded btn-accent text-white focus:outline-none my-4"
                >
                  Login
                </button>
              )}
            </form>
            <p className="text-xs">
              Don't Have An Account?
              <Link to="/signup" className="text-secondary">
                Sign Up
              </Link>
            </p>
          </div>
        </div>
      </div>
    </section>
  );
}
