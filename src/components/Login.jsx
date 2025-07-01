import React from "react";
import { useState } from "react";
import { useNavigate } from "react-router-dom";

const Login = () => {
  const [name, setName] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();

  const handleLogin = async (e) => {
    e.preventDefault();

    try {
      const res = await fetch("https://cyclebuddy-backend.onrender.com/api/auth/login", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ name, password }),
      });
      const data = await res.json();

      if (!res.ok) {
        throw new Error(data.message || "Login Failed");
      }
      localStorage.setItem("token", data.token);
      localStorage.setItem("user", JSON.stringify(data.user));
      navigate("/dashboard");
    } catch (error) {
      alert(error.message);
    }
  };

  return (
    <main className="h-80 my-24 md:mx-13 flex justify-center min-w-[332px]  ">
      <div className="bg-white w-3/5 border border-gray-400 rounded-md min-w-[332px] shadow-sm ">
        <h1 className="text-4xl font-bold w-full flex justify-center mt-4 ">
          Login Here
        </h1>
        <form onSubmit={handleLogin} className="flex flex-col  mx-3">
          <div className="flex justify-between mx-3 my-8">
            <label htmlFor="" className="text-2xl font-bold">
              Name:
            </label>
            <input
              type="text"
              id="name"
              name="name"
              value={name}
              onChange={(e) => setName(e.target.value)}
              className="rounded-md bg-purple-100 w-3/5 px-3 py-2 mx-3"
            />
          </div>
          <div className="flex justify-between mx-3 mt-5">
            <label htmlFor="" className="text-2xl font-bold">
              Password:
            </label>
            <input
              type="password"
              id="password"
              name="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="rounded-md bg-purple-100 w-3/5 px-3 py-2 mx-3"
            />
          </div>
          <div className="flex justify-center">
            <button
              type="submit"
              className="mt-4  bg-pink-400 w-fit h-fit p-3 hover:bg-pink-500 cursor-pointer rounded-lg"
            >
              Let's Enter
            </button>
          </div>
        </form>
      </div>
    </main>
  );
};

export default Login;
