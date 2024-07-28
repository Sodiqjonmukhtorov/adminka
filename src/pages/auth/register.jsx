import React from "react";
import { useForm } from "react-hook-form";
import { request } from "../../config/request";
import { Link, useNavigate } from "react-router-dom";
import { FiUser } from "react-icons/fi";
import { RiLockPasswordFill } from "react-icons/ri";
import { TfiEmail } from "react-icons/tfi";

export const Register = () => {
  const {
    handleSubmit,
    register,
    setError,
    formState: { errors },
  } = useForm();
  const navigate = useNavigate();
  const submit = (data) => {
    request
      .post("/register", data)
      .then((res) => {
        if (res.data) {
          navigate("/login");
        }
      })
      .catch((error) => {
        setError("email", { message: "This email is already taken" });
      });
  };
  return (
    <div className="absolute inset-0 flex justify-center items-center bg-gradient-to-r from-green-400 via-blue-500 to-purple-600 animate-gradient-x">
      <div className="w-[600px] p-6 bg-white bg-opacity-20 backdrop-filter backdrop-blur-lg rounded-lg shadow-xl transform transition-transform duration-500 hover:scale-105">
        <h1 className="text-4xl font-extrabold mb-6 text-center text-white animate-bounce">Register</h1>

        <form onSubmit={handleSubmit(submit)} className="space-y-6">
        <FiUser />
          <input
            {...register("name", { required: true })}
            placeholder="Name"
            className="block w-full p-4 my-2 rounded-lg border border-gray-300 focus:outline-none focus:ring-4 focus:ring-blue-500 transition-all duration-300"
            type="text"
          />
           <TfiEmail />
          <input
            {...register("email", { required: true })}
            placeholder="Email"
            className="block w-full p-4 my-2 rounded-lg border border-gray-300 focus:outline-none focus:ring-4 focus:ring-blue-500 transition-all duration-300"
            type="email"
          />
          {errors.email && <p className="text-red-500 text-sm mt-1">{errors.email.message}</p>}
          <RiLockPasswordFill />
          <input
            {...register("password", { required: true })}
            placeholder="Password"
            className="block w-full p-4 my-2 rounded-lg border border-gray-300 focus:outline-none focus:ring-4 focus:ring-blue-500 transition-all duration-300"
            type="password"
          />
          <button
            type="submit"
            className="font-bold w-full p-4 bg-purple-700 text-center text-white rounded-lg transition-all duration-500 transform hover:scale-110 hover:bg-purple-900"
          >
            Send
          </button>
        </form>
        <Link
          className="font-bold text-yellow-300 block text-start mt-6 animate-pulse"
          to={"/login"}
        >
          Login va Parolim bor!
        </Link>
      </div>
    </div>
  );
};
