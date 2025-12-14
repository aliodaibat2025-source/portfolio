'use client';

import React, { useEffect } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/all";
import Image from "next/image";
import VideoPlayer from "./VideoPlayer";

gsap.registerPlugin(ScrollTrigger);

export default function About() {
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
      className="w-full flex flex-col items-center justify-center bg-gradient-to-br from-black via-black to-gray-800 px-6 py-20"
    >
      <div className="max-w-7xl w-full flex flex-col gap-16">

        {/* ===== سطر 1: صورة + نص ===== */}
        <div className="flex flex-col md:flex-row items-start md:items-center gap-12 w-full flex-wrap">
          {/* الصورة */}
          <div className="about-media relative w-full md:w-1/2 h-64 sm:h-80 md:h-96 rounded-xl overflow-hidden shadow-2xl border border-gray-700 flex-shrink-0">
            <Image
              src="/keyboard.jpg"
              alt="Mohammad"
              fill
              style={{ objectFit: "cover" }}
              className="rounded-xl"
            />
          </div>

          {/* النص */}
          <div className="md:w-1/2 flex flex-col gap-4 text-white flex-1 min-w-[250px]">
            <h2 className="about-heading text-4xl font-bold">About Me</h2>
            <p className="about-text text-lg leading-relaxed text-gray-100 break-words">
              I’m Mohammad, a dedicated <span className="font-semibold text-yellow-400">journalist</span> committed to delivering 
              accurate, thoughtful, and impactful stories.
            </p>
            <p className="about-text text-lg leading-relaxed text-gray-100 break-words">
              My work focuses on clarity, integrity, and the human element behind every story.  
              Whether reporting news, writing articles, or creating in-depth features,  
              I strive to bring authentic voices and perspectives to the forefront.
            </p>
          </div>
        </div>

        {/* ===== سطر 2: الفيديو ===== */}
        <VideoPlayer src="/vvv.mp4" title="Watch My Work in Action" />

      </div>
    </section>
  );
}
