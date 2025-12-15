'use client';

import React, { useEffect } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/all";
import Image from "next/image";
import VideoPlayer from "./VideoPlayer";

import { useTranslations } from "next-intl";

type dataType={
  value:string|undefined,
  name:string|undefined
} 

interface Props {
  textInAbout: dataType |null
  imageInAbout:dataType |null
 video:dataType |null
}
gsap.registerPlugin(ScrollTrigger);



 





export default function About({textInAbout,imageInAbout,video}:Props) {
   const t = useTranslations("settings");
  useEffect(() => {
    // Animations
    gsap.fromTo(
      ".about-heading",
      { y: 50, opacity: 0 },
      { y: 0, opacity: 1, duration: 1, ease: "power3.out", scrollTrigger: { trigger: ".about-heading", start: "top 80%" } }
    );
    gsap.fromTo(
      ".about-text",
      { y: 30, opacity: 0 },
      { y: 0, opacity: 1, duration: 1, delay: 0.3, ease: "power3.out", scrollTrigger: { trigger: ".about-text", start: "top 80%" } }
    );
    gsap.fromTo(
      ".about-media",
      { y: 50, opacity: 0 },
      { y: 0, opacity: 1, duration: 1, stagger: 0.2, ease: "power3.out", scrollTrigger: { trigger: ".about-media", start: "top 80%" } }
    );
  }, []);

  return (
    <section
      id="about"
      className="w-full flex flex-col items-center justify-center bg-linear-to-br from-black via-black to-gray-800 px-6 py-20"
    >
      <div className="max-w-7xl w-full flex flex-col gap-16">

        <div className="flex flex-col md:flex-row items-start md:items-center gap-12 w-full flex-wrap">
          <div className="about-media relative w-full md:w-1/2 h-64 sm:h-80 md:h-96 rounded-xl overflow-hidden shadow-2xl border border-gray-700 shrink-0">
            <Image
              src={imageInAbout?.value??""}
              alt="Mohammad"
              fill
              style={{ objectFit: "cover" }}
              className="rounded-xl"
            />
          </div>

          <div className="md:w-1/2 flex flex-col gap-4 text-white flex-1 min-w-[250px]">
            <h2 className="about-heading text-4xl font-bold">   {t("aboutme")}</h2>
            <p className="about-text text-lg leading-relaxed mb-6 text-gray-100 wrap-break-word text-justify">
           {textInAbout?.value}
          </p>
          </div>
        </div>

        <VideoPlayer src={video?.value??""} title= {t("watchmyworkinaction")} />

      </div>
    </section>
  );
}
