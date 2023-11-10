import React, { FormEvent, useState } from "react";
import { useNavigate } from "react-router";
import { Link } from "react-router-dom";
import { toast } from "react-toastify";
import { useSignupUserMutation } from "../redux/feature/user/userApiSlice";
export default function Signup() {
  const navigate = useNavigate();
  const [signupUser, { data, isLoading, isSuccess, isError }] =
    useSignupUserMutation();

  const successToast = data?.message;

  if (isSuccess) {
    toast.success(successToast, { toastId: "SignUpSuccess" });
    navigate("/login");
  }

  if (isError) {
    toast.error("Sign Up Failed!", { toastId: "SignUpError" });
  }

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
    signupUser(formData);
  };

  return (
    <section
      className="min-h-screen flex items-center"
      style={{
        background: "rgba(255, 194, 139, 0.30)",
      }}
    >
      <div className="flex container mx-auto">
        <div className="mx-auto">
          <div className="bg-white px-10 py-8 rounded shadow-lg text-black">
            <h2 className="mb-6 mt-4 text-xl text-center">Sign Up</h2>
            <form onSubmit={handleSubmit}>
              {/*----------- Label For Name ------------*/}
              <label className="label">
                <span className="label-text text-sm">First Name</span>
              </label>
              <input
                type="text"
                className="input input-bordered w-full pr-20"
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
                className="input input-bordered w-full pr-20"
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
                className="input input-bordered w-full pr-20"
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
                className="input input-bordered w-full pr-20"
                name="password"
                value={formData.user.password}
                onChange={handleChange}
                placeholder="examplePassword123"
              />
              {isLoading ? (
                <button className="px-4 w-full max-w-xs text-center py-3 rounded btn-accent text-white focus:outline-none my-4">
                  <span className="loading loading-spinner text-info"></span>
                </button>
              ) : (
                <button
                  type="submit"
                  className="w-full max-w-xs text-center py-4 rounded btn-accent text-white focus:outline-none my-4"
                >
                  SignUp
                </button>
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
