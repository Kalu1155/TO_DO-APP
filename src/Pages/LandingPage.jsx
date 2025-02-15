import React from "react";
import NavOne from "../Component/Nav/NavOne";
import img from "../assets/download.webp";
import { Github, Laptop2, Twitter } from "lucide-react";
import { FaTelegram, FaWhatsapp, FaInstagram, FaGithub, FaTwitter } from "react-icons/fa";
import { MdEmail } from "react-icons/md";
import { AiOutlineTikTok } from "react-icons/ai";

const LandingPage = () => {
  // Feature Card Component
const FeatureCard = ({ icon, title, description }) => (
  <div className="flex items-center gap-4 p-5 h-[200px] border-2 border-slate-800 rounded-xl">
    {icon}
    <div>
      <h3 className="text-3xl font-semibold">{title}hey</h3>
      <p className="text-xl">{description}</p>
    </div>
  </div>
);

// Social Link Component
const SocialLink = ({ icon, text }) => (
  <div className="flex flex-col items-center">
    {icon}
    <p className="text-lg">{text}</p>
  </div>
);
  return (
    <>
      <NavOne />
      
      {/* Hero Section */}
      <p className="text-3xl text-center p-7 my-28 indent-8 tracking-wide">
        Lorem ipsum dolor sit amet, consectetur adipisicing elit. Repudiandae
        soluta repellendus tenetur fuga quas unde magnam magni quam earum animi
        beatae, eaque eveniet possimus quia ex cum culpa, non quidem.
      </p>

      {/* Image Section */}
      <div className="flex justify-center my-32">
        <div className="w-full max-w-4xl rounded-3xl overflow-hidden">
          <img src={img} className="w-full h-auto rounded-xl object-cover" alt="Landing Page" />
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4 px-9">
        <FeatureCard 
          icon={<Laptop2 />} 
          title="Your lists, everywhere." 
          description="Get lists, tasks, and reminders on all your devices." 
        />
        <FeatureCard 
          icon={<Laptop2 />} 
          title="Work seamlessly with other apps." 
          description="Add tasks dynamically and integrate effortlessly." 
        />
      </div>

      <div className="flex justify-center my-14">
        <FeatureCard 
          icon={<Laptop2 />} 
          title="Smart daily planning." 
          description={`My day and its smart suggestions help you focus on what matters.`} 
        />
      </div>

      <p className="text-3xl text-center p-7 my-28 indent-8 tracking-wide">
        Lorem ipsum dolor sit amet, consectetur adipisicing elit. Debitis
        laudantium, perspiciatis maiores mollitia odio.
      </p>

      <div className="flex justify-center my-32">
        <div className="w-full max-w-4xl rounded-3xl overflow-hidden">
          <img src={img} className="w-full h-auto rounded-xl object-cover" alt="Landing Page" />
        </div>
      </div>

      <footer className="bg-[#262648f3] text-white p-9 text-center rounded-t-xl">
        <div className="flex flex-wrap justify-center gap-6">
          <SocialLink icon={<FaWhatsapp />} text="WhatsApp" />
          <SocialLink icon={<FaTelegram />} text="Telegram" />
          <SocialLink icon={<MdEmail />} text="Email" />
          <SocialLink icon={<AiOutlineTikTok />} text="TikTok" />
          <SocialLink icon={<FaInstagram />} text="Instagram" />
          <SocialLink icon={<FaGithub />} text="GitHub" />
          <SocialLink icon={<FaTwitter />} text="Twitter (X)" />
        </div>
      </footer>
    </>
  );
};



export default LandingPage;
