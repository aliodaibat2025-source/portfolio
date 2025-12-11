"use client";
import { useState, useEffect } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/all";
gsap.registerPlugin(ScrollTrigger);

export default function Header() {
  const [open, setOpen] = useState(false);

  const handleClick = (id: string) => {
    setOpen(false);
    const section = document.getElementById(id);
    if (section) section.scrollIntoView({ behavior: "smooth" });
  };

  useEffect(() => {
    const nav = document.querySelector(".nav");
    const about = document.getElementById("about");

    gsap.set(nav, { backgroundColor: "transparent" });

    gsap.fromTo(
      ".nav",
      { y: -100, opacity: 0 },
      { y: 0, opacity: 1, duration: 1, ease: "power3.out" }
    );

    ScrollTrigger.create({
      trigger: "body",
      start: "top top",
      end: "max",
      onUpdate: () => {
        const scroll = window.scrollY;
        const aboutTop = about?.offsetTop || 0;

        if (scroll === 0) {
          gsap.to(nav, { backgroundColor: "transparent", duration: 0.3 });
        } else if (scroll > 0 && scroll < aboutTop) {
          gsap.to(nav, { backgroundColor: "#000000", duration: 0.3 });
        } else if (scroll >= aboutTop) {
          gsap.to(nav, { backgroundColor: "#151c28", duration: 0.3 });
        }
      },
    });
  }, []);

  return (
    <header className="nav w-full fixed top-0 left-0 z-50 transition-colors duration-300">
      <div className="max-w-6xl mx-auto flex items-center justify-between py-6 px-4 md:justify-self-center">
        <nav className="hidden md:flex gap-8 font-medium text-white">
          {["home","about","skills","experience","education","activities","contact"].map((section) => (
            <button key={section} onClick={() => handleClick(section)} className="hover:scale-110 duration-300 transition-all">
              {section.charAt(0).toUpperCase() + section.slice(1)}
            </button>
          ))}
        </nav>

        <button
          className="md:hidden text-3xl mx-10 md:mx-0"
          onClick={() => setOpen(!open)}
          aria-label="Toggle Menu"
        >
          {open ? "✖" : "☰"}
        </button>
      </div>

      {open && (
        <nav className="md:hidden bg-gray-800 shadow-md py-4 px-6 flex flex-col items-center gap-4 text-whitetext-lg font-medium">
          {["home","about","skills","experience","education","activities","contact"].map((section) => (
            <button key={section} onClick={() => handleClick(section)}>
              {section.charAt(0).toUpperCase() + section.slice(1)}
            </button>
          ))}
        </nav>
      )}
    </header>
  );
}
