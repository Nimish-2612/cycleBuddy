import React from "react";
import { Navigate, useNavigate } from "react-router-dom";
const Oops = () => {
  const navigate = useNavigate();

  return (
    <button
      onClick={() => navigate("/")}
      className="font-bold text-5xl mx-[35rem] my-[15rem] border border-pink-800 bg-pink-300 p-4 w-fit rounded-lg"
    >
      Please Login First
    </button>
  );
};

export default Oops;
