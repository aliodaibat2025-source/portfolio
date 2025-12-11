'use client'

import React, { useEffect } from "react";
import { FaBriefcase, FaNewspaper, FaMicrophone } from "react-icons/fa";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/all";
gsap.registerPlugin(ScrollTrigger);

export default function Experience() {

  useEffect(() => {
    gsap.fromTo(
      ".experience-heading",
      { y: 50, opacity: 0 },
      {
        y: 0, opacity: 1, duration: 1, ease: "power3.out",
        scrollTrigger: {
          trigger: ".experience-heading",
          start: "top 80%",
          toggleActions: "play none none none"
        }
      }
    );

    gsap.fromTo(
      ".experience-text",
      { y: 30, opacity: 0 },
      {
        y: 0, opacity: 1, duration: 1, delay: 0.3, ease: "power3.out",
        scrollTrigger: {
          trigger: ".experience-text",
          start: "top 80%",
          toggleActions: "play none none none"
        }
      }
    );

    gsap.fromTo(
      ".experience-card",
      { y: 50, opacity: 0 },
      {
        y: 0, opacity: 1, duration: 1, stagger: 0.2, ease: "power3.out",
        scrollTrigger: {
          trigger: ".experience-card",
          start: "top 85%",
          toggleActions: "play none none none"
        }
      }
    );
  }, []);

  return (
    <section
      id="experience"
      className="min-h-screen flex flex-col items-center justify-center bg-gradient-to-br from-gray-800 via-black to-gray-800 px-6 py-20"
    >
      <h2 className="experience-heading text-4xl font-bold mb-8 text-white text-center">
        Experience
      </h2>

      <p className="experience-text text-gray-300 text-center text-lg max-w-2xl mb-12">
        Professional experience highlighting my career as a journalist, reporter, and media contributor.
      </p>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-5xl w-full">
        {/* بطاقة 1 */}
        <div className="experience-card bg-gray-900 shadow-xl p-8 rounded-xl hover:shadow-2xl transition flex flex-col items-center text-center border border-gray-700">
          <FaNewspaper className="text-4xl text-yellow-400 mb-4" />
          <h3 className="text-xl font-semibold mb-2 text-white">Reporter</h3>
          <p className="text-gray-300 mb-2">Daily News Agency</p>
          <span className="text-gray-400 text-sm">2019 - 2021</span>
        </div>

        {/* بطاقة 2 */}
        <div className="experience-card bg-gray-900 shadow-xl p-8 rounded-xl hover:shadow-2xl transition flex flex-col items-center text-center border border-gray-700">
          <FaMicrophone className="text-4xl text-purple-400 mb-4" />
          <h3 className="text-xl font-semibold mb-2 text-white">Radio Host</h3>
          <p className="text-gray-300 mb-2">City FM</p>
          <span className="text-gray-400 text-sm">2021 - 2023</span>
        </div>

        {/* بطاقة 3 */}
        <div className="experience-card bg-gray-900 shadow-xl p-8 rounded-xl hover:shadow-2xl transition flex flex-col items-center text-center border border-gray-700">
          <FaBriefcase className="text-4xl text-blue-400 mb-4" />
          <h3 className="text-xl font-semibold mb-2 text-white">Freelance Journalist</h3>
          <p className="text-gray-300 mb-2">Various Publications</p>
          <span className="text-gray-400 text-sm">2023 - Present</span>
        </div>
      </div>
    </section>
  );
}
