"use client";

import { useState } from "react";
import { useLocale, useTranslations } from "next-intl";
import Hamburger from "hamburger-react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import LanguageSwitcher from "./language-switcher";

const navLinks = [
  { key: "home", href: "/" },
  { key: "about", href: "/about" },
  { key: "services", href: "/services" },
  { key: "missionvision", href: "/mission-vision" },
  { key: "projects", href: "/projects" },
  { key: "contact", href: "/contact" },
];

export default function SlideSidebar() {
  const [isOpen, setOpen] = useState(false);
  const locale = useLocale(); // مثلا "ar" أو "en"
  const pathname = usePathname();
  const t = useTranslations("Navbar");

  const isArabic = locale.startsWith("ar");

  const positionClass = isArabic ? "left-0" : "right-0";
  const translateClass = isOpen
    ? "translate-x-0"
    : isArabic
    ? "-translate-x-full"
    : "translate-x-full";

  return (
    <>
      {/* Hamburger Button */}
      <header className="flex items-center justify-between px-4 h-16 z-50 relative bg-transparent">
        <Hamburger toggled={isOpen} toggle={setOpen} size={26} />
      </header>

      {/* Sidebar */}
      <aside
        className={`fixed top-26 ${positionClass} h-auto w-full bg-[#212529] backdrop-blur-md shadow-xl z-40
        px-6 py-4 flex flex-col justify-center items-center gap-6 text-lg
        transform transition-transform duration-300
        ${translateClass}`}
      >
        {navLinks.map((link) => (
          <Link key={link.href} href={link.href} onClick={() => setOpen(false)}>
            <span
              className={`relative transition-all duration-300 cursor-pointer
              ${pathname === link.href ? "text-[#e1b261]" : "text-white"}`}
            >
              {t(link.key)}
              <span
                className={`absolute left-0 -bottom-2.5 h-1 rounded-2xl bg-[#e1b261] transition-all duration-300
                ${pathname === link.href ? "w-full" : "w-0"}`}
              ></span>
            </span>
          </Link>
        ))}
        <LanguageSwitcher/>
      </aside>

      {/* Overlay */}
      {isOpen && (
        <div
          onClick={() => setOpen(false)}
          className="fixed inset-0  z-30"
        ></div>
      )}
    </>
  );
}
