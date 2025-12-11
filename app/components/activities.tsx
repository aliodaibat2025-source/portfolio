'use client'

import React, { useEffect } from "react";
import { FaPenNib, FaUsers, FaMicrophoneAlt } from "react-icons/fa";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/all";
gsap.registerPlugin(ScrollTrigger);

export default function Activities() {

  useEffect(() => {
    gsap.fromTo(
      ".activities-heading",
      { y: 50, opacity: 0 },  
      { 
        y: 0, opacity: 1, duration: 1, ease: "power3.out",
        scrollTrigger: {
          trigger: ".activities-heading",
          start: "top 80%",
          toggleActions: "play none none none"
        }
      }  
    );

    gsap.fromTo(
      ".activities-desc",
      { y: 30, opacity: 0 },
      {
        y: 0, opacity: 1, duration: 1, delay: 0.2, ease: "power3.out",
        scrollTrigger: {
          trigger: ".activities-desc",
          start: "top 80%",
          toggleActions: "play none none none"
        }
      }
    );

    gsap.fromTo(
      ".activity-card",
      { y: 50, opacity: 0 },
      {
        y: 0, opacity: 1, duration: 1, stagger: 0.2, ease: "power3.out",
        scrollTrigger: {
          trigger: ".activity-card",
          start: "top 85%",
          toggleActions: "play none none none"
        }
      }
    );

  }, []);

  return (
    <section
      id="activities"
      className="min-h-screen flex flex-col items-center justify-center  bg-gradient-to-br from-gray-800 via-black to-gray-800  px-6 py-20"
    >
      <h2 className="activities-heading text-4xl font-bold mb-10 text-white text-center">
        Activities
      </h2>

      <p className="activities-desc text-gray-300 max-w-2xl text-center text-lg mb-12">
        Highlights of my work beyond journalism — including volunteering,
        community participation, media projects, and collaborations.
      </p>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-5xl w-full">
        <div className="activity-card bg-gray-900 shadow-xl p-8 rounded-xl text-center border border-gray-700 hover:shadow-2xl transition">
          <FaPenNib className="text-4xl text-yellow-400 mx-auto mb-4" />
          <h3 className="text-xl font-semibold mb-2 text-white">Writing Workshops</h3>
          <p className="text-gray-300">
            Conducting writing and storytelling workshops for young aspiring journalists.
          </p>
        </div>

        <div className="activity-card bg-gray-900 shadow-xl p-8 rounded-xl text-center border border-gray-700 hover:shadow-2xl transition">
          <FaUsers className="text-4xl text-purple-400 mx-auto mb-4" />
          <h3 className="text-xl font-semibold mb-2 text-white">Community Engagement</h3>
          <p className="text-gray-300">
            Participating in community events, awareness campaigns, and social activities.
          </p>
        </div>

        <div className="activity-card bg-gray-900 shadow-xl p-8 rounded-xl text-center border border-gray-700 hover:shadow-2xl transition">
          <FaMicrophoneAlt className="text-4xl text-blue-400 mx-auto mb-4" />
          <h3 className="text-xl font-semibold mb-2 text-white">Media Participation</h3>
          <p className="text-gray-300">
            Collaborating with media platforms for interviews, podcasts, and reporting.
          </p>
        </div>
      </div>
    </section>
  );
}
