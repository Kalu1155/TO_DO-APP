import React, { useState } from "react";
import { Globe, LucideSidebarClose } from "lucide-react";
import { Link } from "react-router-dom";
import { RiMenuFold2Line } from "react-icons/ri";

const NavOne = () => {
  const [menu, setMenu] = useState(false);

  return (
    <nav className="flex flex-wrap items-center justify-between px-10 py-4 bg-white shadow-md fixed top-0 left-0 right-0 w-full rounded-md md:px-20 ">
      
      {/* Logo */}
      <div className="text-3xl font-extrabold">
        <Link to="/">
          <span className="text-[#262648f3] p-1">TO</span>
          <span className="text-white bg-[#262648f3] rounded p-1">DO</span>
        </Link>
      </div>

      {/* Navigation Menu */}
      <ul className={`absolute md:relative top-16 md:top-0 left-0 right-0 md:flex bg-black md:bg-transparent bg-opacity-30 rounded-b-lg md:rounded-none text-center md:mx-0 ${menu ? "block" : "hidden"} md:flex gap-6 p-4 md:p-0`}>
        <li className="pt-2 px-3 md:relative md:block hidden">
          <Globe />
        </li>
        <li className="absolute md:relative md:ml-0 ml-16 ">
          <Link to="/sign-in" className="bg-[#262648f3] text-white px-4 py-2 rounded-xl hover:bg-white hover:text-black border-2 border-[#262648f3] focus:ring focus:ring-[#262648f3] ">
            Sign In
          </Link>
        </li>
        <li className=" md:ml-0 ml-40 ">
          <Link to="/sign-up" className="bg-white border-2 border-slate-800 px-4 py-2 rounded-xl hover:bg-[#262648f3] hover:text-white">
            Sign Up
          </Link>
        </li>
      </ul>

      {/* Mobile Menu Button */}
      <button onClick={() => setMenu(!menu)} className="md:hidden absolute right-10 top-6 transition-all duration-300">
        {menu ? <LucideSidebarClose size={30} /> : <RiMenuFold2Line size={30}/>}
      </button>
      
    </nav>
  );
};

export default NavOne;
