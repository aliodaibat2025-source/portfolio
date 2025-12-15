"use client";

import React, { useEffect } from "react";
import Image from "next/image";
import gsap from "gsap";

type dataType = {
  value: string | undefined;
  name: string | undefined;
};

interface Props {
  position: dataType | null;
  bioInHeader: dataType | null;
  imageInHero: dataType | null;
}
export default function Hero({ position, bioInHeader, imageInHero }: Props) {
  useEffect(() => {
    const tl = gsap.timeline({ defaults: { ease: "power3.out" }, delay: 0.2 });

    tl.fromTo(".overlay", { opacity: 0 }, { opacity: 1, duration: 1 });

    tl.fromTo(
      ".hero-image",
      { x: 200, opacity: 0 },
      { x: 0, opacity: 1, duration: 1 },
      "-=0.5"
    );

    tl.fromTo(
      ".hero-text",
      { x: -100, opacity: 0 },
      { x: 0, opacity: 1, duration: 1, stagger: 0.2 },
      "-=0.5"
    );

    const mm = gsap.matchMedia();
    mm.add("(max-width: 767px)", () => {
      gsap.to(".hero-border", {
        boxShadow: `
          0 0 4px rgba(255,255,255,0.5),
          0 0 10px rgba(255,255,255,0.7),
          0 0 18px rgba(255,255,255,1)
        `,
        repeat: -1,
        yoyo: true,
        duration: 1.8,
        ease: "power1.inOut",
      });
    });
  }, []);


  return (
    <section
      id="home"
      className="min-h-screen flex flex-col-reverse md:flex-row items-center justify-center
                 px-4 sm:px-6 md:px-20 pt-28 bg-black relative overflow-hidden"
    >
      <div
        className="overlay absolute top-0 left-0 w-full h-full 
                     bg-linear-to-br from-black via-gray-800 to-black 
                      z-0 pointer-events-none select-none opacity-0"
      ></div>

      <div
        className="absolute left-0 bottom-0 w-full h-[30%] bg-linear-to-b
                      from-transparent to-black z-10"
      ></div>

      <div className="hero-text relative z-20 md:w-1/2 text-left space-y-6 text-white mt-4 md:mt-0">
        <h1 className="text-4xl sm:text-5xl md:text-7xl font-extrabold leading-tight">
          Mohammad
        </h1>

        <h2 className="text-2xl sm:text-3xl font-medium text-gray-300 tracking-wide">
          {position?.value}
        </h2>

        <p className="text-gray-300 text-lg sm:text-xl leading-relaxed max-w-xl">
          {bioInHeader?.value}
        </p>

        <div className="flex flex-col sm:flex-row gap-4 mt-4">
          <a
            href="#projects"
            className="px-6 py-3 bg-white text-black rounded-lg text-lg sm:text-xl font-medium 
                       hover:bg-gray-200 transition transform hover:-translate-y-1"
          >
            View My Work
          </a>

          <a
            href="#contact"
            className="px-6 py-3 border border-gray-400 text-gray-300 rounded-lg text-lg sm:text-xl font-medium 
                       hover:bg-gray-800 transition transform hover:-translate-y-1"
          >
            Contact Me
          </a>
        </div>
      </div>

      <div
        className="hero-image hero-border relative z-30
                   w-60 h-60 sm:w-72 sm:h-72 md:w-[550px] md:h-[550px]
                   overflow-hidden mb-0 md:mb-0 
                   rounded-full md:rounded-none
                   border-4 border-white md:border-0
                   p-3 sm:p-4 md:p-0 opacity-0"
      >
        <img
          src={imageInHero?.value ?? ""}
          alt="Mohammad"
         

          className="object-cover rounded-full md:rounded-none"
        />

        <div
          className="absolute bottom-0 left-0 w-full h-24 
                     bg-linear-to-t from-black to-transparent 
                     hidden md:block"
        ></div>
      </div>
    </section>
  );
}
