'use client'

import React, { useEffect } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/all";
import Image from "next/image";  

gsap.registerPlugin(ScrollTrigger);

export default function About() {

  useEffect(() => {
    gsap.fromTo(
      ".about-heading",
      { y: 50, opacity: 0 },
      { 
        y: 0, opacity: 1, duration: 1, ease: "power3.out",
        scrollTrigger: {
          trigger: ".about-heading",
          start: "top 80%",
          toggleActions: "play none none none",
        }
      }  
    );

    gsap.fromTo(
      ".about-text",
      { y: 30, opacity: 0 },
      {
        y: 0, opacity: 1, duration: 1, delay: 0.3, ease: "power3.out",
        scrollTrigger: {
          trigger: ".about-text",
          start: "top 80%",
          toggleActions: "play none none none",
        }
      }
    );

    gsap.fromTo(
      ".about-image",
      { y: 50, opacity: 0 },
      { 
        y: 0, opacity: 1, duration: 1, ease: "power3.out",
        scrollTrigger: {
          trigger: ".about-image",
          start: "top 80%",
          toggleActions: "play none none none",
        }
      }
    );
  }, []);

  return (
    <section
      id="about"
      className="min-h-screen flex flex-col md:flex-row items-center justify-center
                 bg-gradient-to-br from-black via-black to-gray-800 px-6 py-16 text-center md:text-left relative overflow-hidden"
    >


      <div className="max-w-6xl mx-auto flex flex-col md:flex-row items-center space-y-8 md:space-y-0 md:space-x-12 relative z-20">
        
        <div className="w-full md:w-1/2 about-image opacity-0 relative">
          <Image
            src="/keyboard.jpg"
            alt="Mohammad"
            width={500}
            height={500}
            className="w-full rounded-xl shadow-xl border border-gray-700"
            style={{ objectFit: "cover" }}
          />
        </div>

        <div className="w-full md:w-1/2 text-white">
          <h2 className="about-heading text-4xl font-bold mb-6">
            About Me
          </h2>

          <p className="about-text text-lg leading-relaxed mb-6 text-gray-100">
            I’m Mohammad, a dedicated <span className="font-semibold text-yellow-400">journalist</span> committed to delivering 
            accurate, thoughtful, and impactful stories. With a sharp eye for detail and a strong passion for 
            truth, I work to transform real events into meaningful narratives that connect with audiences.
          </p>

          <p className="about-text text-lg leading-relaxed text-gray-100">
            My work focuses on clarity, integrity, and the human element behind every story.  
            Whether reporting news, writing articles, or creating in-depth features,  
            I strive to bring authentic voices and perspectives to the forefront.
          </p>
        </div>
      </div>
    </section>
  );
}
