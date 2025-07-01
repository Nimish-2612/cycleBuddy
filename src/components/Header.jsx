import React from "react";
import { HeartHandshake } from "lucide-react";
import { useLocation, useNavigate } from "react-router-dom";
const Header = () => {
  const token = localStorage.getItem("token");
  const user = JSON.parse(localStorage.getItem("user"));
  const location = useLocation();
  const navigate = useNavigate();

  function handleLogout() {
    localStorage.removeItem("token");
    localStorage.removeItem("user"); // if you're storing user object
    navigate("/");
  }

  const isLoginPage = location.pathname === "/";

  return (
    <header className="h-20 bg-white flex justify-between items-center px-8 shadow-sm">
      <h1 className="text-3xl flex gap-2 font-bold">
        <HeartHandshake size="40" color="#e2b9e3" /> CycleBuddy
      </h1>

      {!isLoginPage && token && user && (
        <div className="flex items-center gap-12 ">
          {token && (
            <h1 className="p-3 text-pink-600 rounded-lg font-bold text-xl bg-[#e2b9e3]">
              Welcome {user.isBoyfriend ? user.name : "baby❤️"}
            </h1>
          )}

          {token && (
            <button
              onClick={handleLogout}
              className="font-semibold bg-pink-400 w-fit h-fit p-3 hover:bg-pink-500 cursor-pointer rounded-lg"
            >
              Logout
            </button>
          )}
        </div>
      )}
    </header>
  );
};

export default Header;
