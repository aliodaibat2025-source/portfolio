'use client';

import React, { useEffect } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/all";
import { FaCalendarAlt } from "react-icons/fa";
import { ExperienceProps } from '@/app/components/experience';

gsap.registerPlugin(ScrollTrigger);

const ExperienceBody = ({ experience, locale }: ExperienceProps) => {
  useEffect(() => {
    // تحديد النوع الصحيح لـ item
    gsap.utils.toArray<HTMLElement>('.experience-card').forEach((item, index) => {
      const direction = index % 2 === 0 ? -200 : 200; 
      gsap.fromTo(
        item,
        {
          opacity: 0,
          x: direction,
            
        },
        {
          opacity: 1,
          x: 0,
          duration: 1,
          scrollTrigger: {
            trigger: item,
            start: 'top 80%',
            toggleActions: 'play none none none',
          },
        }
      );
    });
  }, []);

  return (
    <div className="min-h-screen px-6 py-20 relative">
      <div className="absolute inset-0 flex justify-center pt-16">
        <div className="w-0.5 bg-white/50 h-full" />
      </div>

      <div className="experience-grid flex flex-col items-center gap-60 mt-20 max-w-5xl mx-auto  overflow-x-hidden">
        {experience!.map((exp, index) => (
          <div
            key={exp.id}
            className={`experience-card relative flex ${index % 2 === 0 ? "ml-auto" : "mr-auto"} w-full sm:w-[90%] md:w-[48%]`}
          >
            <div className="experience-card-inner bg-gray-900 shadow-xl p-8 rounded-xl hover:shadow-2xl transition flex flex-col items-center text-center border border-gray-700">
              <h3 className="text-xl font-semibold mb-2 text-white">{exp.positions}</h3>
              <p className="text-gray-300 mb-2">{exp.description}</p>
             <div className="flex justify-center items-center gap-2">
  <FaCalendarAlt className="text-yellow-400" />
  <span className="text-gray-400 text-sm">
    {new Date(exp.start_date).getFullYear()} -{' '}
    {exp.end_date ? new Date(exp.end_date).getFullYear() : locale==="en" ?"Present":"حتى الأن"}
  </span>
</div>

              <span className="text-gray-400 text-sm">{exp.location}</span>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default ExperienceBody;
