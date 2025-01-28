import React from "react";
// import { RiCloseLine, RiMenu2Line } from '@remixicon/react';
import { useState } from 'react'
import { Globe, LucideSidebarClose } from "lucide-react";
import { Link } from "react-router-dom";
import { RiMenuFold2Line } from "react-icons/ri";

const NavOne = () => {
  const [menu, openMenu] = useState(false);
  const [showMenu, setShowmenu] = useState(true);
  const [closeMenu, setClosemenu] = useState(true);


  return (
    <>
    <nav className="flex flex-wrap px-10 pt-2 p-2  w-full bg-white justify-between md:items-center md:px-20 fixed top-0 left-0 right-0 shadow-md rounded-md ">
      
        <div className="text-3xl font-extrabold ">
        <Link to='/'>
          <span className="text-[#262648f3] p-1">TO</span>
          <span className="text-white bg-[#262648f3] rounded p-1">DO</span>
        </Link>
        </div>
        <ul className={`${menu ? "block" : "hidden"
        } mx-24 p-y2 mt-4 font-semibold md:mt-5 bg-black px-2 rounded-xl bg-opacity-30 md:border-none text-center md:bg-transparent md:static md:mx-0 md:flex gap-6`}>
          <li className="pt-2 px-3 "><Globe /></li>
          <li className="bg-[#262648f3] text-white p-2 rounded-xl hover:bg-white hover:text-black hover:border-2  hover:border-slate-800  focus:ring focus:ring[#262648f3] active:bg-blue-900 p"><Link to='/sign-in'>Sign In</Link></li>
          <li className="bg-white border-2 border-slate-800 rounded-xl p-2 hover:bg-[#262648f3] hover:border-2 hover:text-white mx-3"><Link to='sign-up'>Sign Up</Link></li>
        </ul>
        {showMenu ? (
                <RiMenuFold2Line size={30} className='md:hidden absolute right-10 top-6 transition-all duration-300' onClick={() => { openMenu(!menu); setShowmenu(!showMenu); }} />
            ) : <LucideSidebarClose size={30} className='md:hidden absolute right-10 top-6 transition-all duration-300'onClick={() => { openMenu(!menu); setClosemenu(!closeMenu); }} />}
    </nav>
    </>
  );
};

export default NavOne;
