import React, { FormEvent, useState } from "react";
import { Link } from "react-router-dom";
import { useSignupUserMutation } from "../redux/feature/user/userApiSlice";
export default function Signup() {
  const [signupUser, { data, isLoading }] = useSignupUserMutation();

  console.log(data, isLoading);

  const [formData, setFormData] = useState({
    user: {
      firstName: "",
      lastName: "",
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
    console.log(formData);
    signupUser(formData);
  };
  return (
    <section>
      <div className="bg-grey-lighter min-h-screen flex flex-col">
        <div className="container max-w-sm mx-auto flex-1 flex flex-col items-center justify-center px-2">
          <div className="bg-white px-6 py-8 rounded shadow-md text-black w-full">
            <h1 className="mb-10 text-xl text-center">Sign Up</h1>
            <form onSubmit={handleSubmit}>
              {/*----------- Label For Name ------------*/}
              <label className="label">
                <span className="label-text text-sm">First Name</span>
              </label>
              <input
                type="text"
                className="input input-bordered w-full max-w-xs"
                name="firstName"
                value={formData.user.firstName}
                onChange={handleChange}
                placeholder="First Name"
              />
              <label className="label">
                <span className="label-text text-sm">Last Name</span>
              </label>
              <input
                type="text"
                className="input input-bordered w-full max-w-xs"
                name="lastName"
                value={formData.user.lastName}
                onChange={handleChange}
                placeholder="Last Name"
              />
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
              <button
                type="submit"
                className="w-full max-w-xs text-center py-3 rounded btn-accent text-white hover:bg-green-dark focus:outline-none my-1"
              >
                Sign Up
              </button>
              {isLoading && (
                <span className="loading loading-spinner text-success"></span>
              )}
            </form>
            <p className="text-xs">
              Already Have An Account?
              <Link to="/login" className="text-secondary">
                Log In
              </Link>
            </p>
          </div>
        </div>
      </div>
    </section>
  );
}
