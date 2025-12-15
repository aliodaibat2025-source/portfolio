"use client";


import { FaGithub, FaLinkedin, FaEnvelope } from "react-icons/fa";

import { useTranslations } from "next-intl";



export default function Footer() {


 const t = useTranslations("settings");


  return (
    <footer className="w-full bg-black backdrop-blur-lg shadow-md py-8">
      <div className="max-w-6xl mx-auto px-6 flex flex-col items-center gap-4 text-gray-700">

 
        <div className="flex gap-6 text-2xl text-white">
          <a 
            href="https://github.com" 
            target="_blank" 
            rel="noopener noreferrer" 
            className="hover:scale-110 duration-300 transition-all"
            aria-label="GitHub"
          >
            <FaGithub />
          </a>

          <a 
            href="https://linkedin.com" 
            target="_blank" 
            rel="noopener noreferrer" 
            className="hover:scale-110 duration-300 transition-all"
            aria-label="LinkedIn"
          >
            <FaLinkedin />
          </a>

          <a 
            href="mailto:email@example.com" 
            className="hover:scale-110 duration-300 transition-all"
            aria-label="Email"
          >
            <FaEnvelope />
          </a>
        </div>


        <hr className="w-full border-t border-gray-300 my-4" />

       
        <p className="text-sm text-white">&copy; {new Date().getFullYear()}    {t("rights")}</p>
      </div>
    </footer>
  );
}
