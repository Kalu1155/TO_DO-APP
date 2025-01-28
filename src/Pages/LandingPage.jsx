import React from "react";
import NavOne from "../Component/Nav/NavOne";
import img from "../assets/download.webp";
import { Github, Laptop2, Twitter } from "lucide-react";
import { FaTelegram, FaWhatsapp, FaInstagram } from "react-icons/fa";
import { MdEmail } from "react-icons/md";
import { AiOutlineTikTok } from "react-icons/ai";

const LandingPage = () => {
  return (
    <>
      <NavOne />
      <p className="text-3xl text-center p-7 my-28 indent-8 tracking-wide">
        Lorem, ipsum dolor sit amet consectetur adipisicing elit. Repudiandae
        soluta repellendus tenetur fuga quas unde magnam magni quam earum animi
        beatae, eaque eveniet possimus quia ex cum culpa, non quidem Lorem
        ipsum, dolor sit amet consectetur adipisicing elit. Debitis laudantium,
        perspiciatis maiores mollitia odio
      </p>
      <div className="flex items-stretch mx-9 my-32">
        <div className="w-screen h-full rounded-3xl self-center">
          <img src={img} className="container rounded-xl" alt="" />
        </div>
      </div>
      <div className="flex justify-around">
        <div className="grid grid-cols-2 gap-2 ">
          <div className="flex justify-around items-center p-3 h-[200px] border-2 border-slate-800 rounded-xl">
            <Laptop2 />
            <p className="text-xl p-2">
              <span className="text-3xl font-semibold">
                Your lists, everywhere.
              </span>
              <br />
              Get list,task and reminders on all your devices.
            </p>
          </div>
          <div className="flex justify-around items-center p-3 h-[200px] border-2 border-slate-800 rounded-xl -indent-1">
            <Laptop2 />
            <p className="text-xl p-6">
              <span className="text-3xl font-semibold ">
                Work seamlessly with other apps.
              </span>
              <br />
              Add task dynamically.
            </p>
          </div>
        </div>
      </div>
      <div className="flex justify-around">
        <div className="flex justify-around items-center h-[200px] border-2 border-slate-800 rounded-xl my-14 w-fit p-3">
          <Laptop2 />
          <p className="text-xl p-3">
            <span className="text-3xl font-semibold leading-10">
              Smart daily planning.
            </span>
            <br />
            My day and it smart suggestions, help your focus <br />
            on what 
            <span className="capitalize font-semibold underline text-xl ">   MATTERS.
            </span>
          </p>
        </div>
      </div>
      <p className="text-3xl text-center p-7 my-28 indent-8 tracking-wide">
        Lorem, ipsum dolor sit amet consectetur adipisicing elit. Repudiandae
        soluta repellendus tenetur fuga quas unde magnam magni quam earum animi
        beatae, eaque eveniet possimus quia ex cum culpa, non quidem Lorem
        ipsum, dolor sit amet consectetur adipisicing elit. Debitis laudantium,
        perspiciatis maiores mollitia odio
      </p>
      <div className="flex items-stretch my-32">
        <div className="w-screen h-full rounded-3xl self-center">
          <img src={img} className="container w-screen rounded-xl " alt="" />
        </div>
      </div>

      <footer>
        <div className="flex text-white bg-[#262648f3] p-9 w-[1204] h-32 justify-around text-center rounded-t-xl">
          <p>
            <FaWhatsapp />
            Whatsapp
          </p>
          <p>
            <FaTelegram />
            Telegram
          </p>
          <p>
            <MdEmail />
            Email
          </p>
          <p>
            <AiOutlineTikTok />
            Tiktok
          </p>
          <p>
            <FaInstagram />
            Instagram
          </p>
          <p>
            <Github />
            Github
          </p>
          <p>
            <Twitter />
            Twittwe(X)
          </p>
        </div>
      </footer>
    </>
  );
};

export default LandingPage;
