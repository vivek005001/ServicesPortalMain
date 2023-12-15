import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import logo from "../images/Name_logo.png";
import { BsSearch, BsMic } from "react-icons/bs";

function Navbar() {
  const [isScrolled, setIsScrolled] = useState(false);

  const handleScroll = () => {
    const scrollPosition = window.scrollY;
    setIsScrolled(scrollPosition > 0);
  };

  useEffect(() => {
    window.addEventListener("scroll", handleScroll);
    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, []);

  // code to change nav clr on scroll
  const headerColor = isScrolled ? "bg-black" : "bg-transparent";
  const textColor = isScrolled ? "text-white" : "text-white";

  return (
    <header className={`sticky top-0 w-full ${headerColor} z-50`}>
      <div className={`flex items-center p-4 py-8 mb-10 mt-2 h-14 mx-auto max-w-7xl ${textColor}`}>
        <Link to="/" className="cursor-pointer">
          <img src={logo} alt="logo" className="w-40 pr-2 my-1 ml-2" />
        </Link>
        <div className="relative flex items-center">
          <button className={`rounded ml-2 ${textColor}`}>
            <BsMic />
          </button>
          <input
            type="text"
            placeholder="Search..."
            className={`mr-2 ml-2 h-8 w-96 p-2 rounded border bg-inherit relative border-color-gray-300 focus:outline-none focus:ring-1 focus:ring-red-500 focus:border-red-500 ${textColor}`}
          />
          <button
            className={`h-8 ml-0 px-2 py-1 rounded transition-transform transform active:scale-95 focus:outline-none ${textColor} bg-red-500`}
          >
            <BsSearch />
          </button>
        </div>
        <div className="flex justify-end items-center flex-grow ml-4">
          <Link
            to="/sell"
            className={`mx-2 h-8 px-6 py-1 rounded transition-transform transform hover:scale-90 active:scale-95 focus:outline-none ${textColor} bg-red-500`}
          >
            Add Service
          </Link>
          <Link
            to="/login"
            className={`mx-2 h-8 px-4 py-1 rounded hover:bg-red-500 transition-transform transform hover:scale-90 active:scale-95 focus:outline-none ${textColor}`}
          >
            Login
          </Link>
          <Link
            to="/signup"
            className={`mx-2 h-8 px-4 py-1 rounded hover:bg-red-500 transition-transform transform hover:scale-90 active:scale-95 focus:outline-none ${textColor}`}
          >
            SignUp
          </Link>
        </div>
      </div>
    </header>
  );
}

export default Navbar;
