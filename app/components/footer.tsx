"use client";

import { FaFacebookF, FaLinkedin, FaEnvelope, FaWhatsapp } from "react-icons/fa";
import { useTranslations } from "next-intl";

export default function Footer() {
  const t = useTranslations("settings");

  return (
    <footer className="w-full bg-black backdrop-blur-lg shadow-md py-8">
      <div className="max-w-6xl mx-auto px-6 flex flex-col items-center gap-4 text-gray-700">

        <div className="flex gap-6 text-2xl text-white">
          {/* Facebook */}
          <a
            href={process.env.NEXT_PUBLIC_FACEBOOK_URL}
            target="_blank"
            rel="noopener noreferrer"
            className="hover:scale-110 duration-300 transition-all"
            aria-label="Facebook"
          >
            <FaFacebookF />
          </a>

          {/* WhatsApp */}
          <a
            href={`https://wa.me/${process.env.NEXT_PUBLIC_PHONE_NUMBER}`}
            target="_blank"
            rel="noopener noreferrer"
            className="hover:scale-110 duration-300 transition-all"
            aria-label="WhatsApp"
          >
            <FaWhatsapp />
          </a>

          {/* LinkedIn */}
          <a
            href={process.env.LINKEDIN_URL}
            target="_blank"
            rel="noopener noreferrer"
            className="hover:scale-110 duration-300 transition-all"
            aria-label="LinkedIn"
          >
            <FaLinkedin />
          </a>

          {/* Email */}
          <a
            href={`mailto:${process.env.NEXT_PUBLIC_CONTACT_EMAIL}`}
            className="hover:scale-110 duration-300 transition-all"
            aria-label="Email"
          >
            <FaEnvelope />
          </a>
        </div>

        <hr className="w-full border-t border-gray-300 my-4" />

        <p className="text-sm text-white">&copy; {new Date().getFullYear()} {t("rights")}</p>
      </div>
    </footer>
  );
}
