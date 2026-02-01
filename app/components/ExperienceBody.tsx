'use client';

import React, { useEffect, useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { FaCalendarAlt } from "react-icons/fa";
import { ExperienceProps } from '@/app/components/experience';

gsap.registerPlugin(ScrollTrigger);

const ExperienceBody = ({ experience, locale }: ExperienceProps) => {
  const lineRef = useRef(null);

  useEffect(() => {
    // أنيميشن نمو الخط العمودي مع السكرول
    gsap.fromTo(
      lineRef.current,
      { scaleY: 0 },
      {
        scaleY: 1,
        ease: "none",
        scrollTrigger: {
          trigger: ".experience-grid",
          start: "top 20%",
          end: "bottom 80%",
          scrub: true,
        },
      }
    );

    // أنيميشن ظهور البطاقات
    const cards = gsap.utils.toArray<HTMLElement>('.experience-card');
    cards.forEach((card, index) => {
      const isEven = index % 2 === 0;
      gsap.fromTo(
        card,
        { 
          opacity: 0, 
          x: isEven ? -50 : 50 
        },
        {
          opacity: 1,
          x: 0,
          duration: 0.8,
          ease: "power2.out",
          scrollTrigger: {
            trigger: card,
            start: 'top 85%',
            toggleActions: 'play none none none',
          },
        }
      );
    });

    return () => ScrollTrigger.getAll().forEach(t => t.kill());
  }, []);

  return (
    <div className="min-h-screen px-6 py-24 relative overflow-x-hidden">
      
      {/* الخط الأساسي (باهت) */}
      <div className="absolute left-1/2 transform -translate-x-1/2 w-[2px] bg-white/10 h-full hidden md:block top-0" />
      
      {/* الخط المتحرك (GSAP Animated Line) */}
      <div 
        ref={lineRef}
        className="absolute left-1/2 transform -translate-x-1/2 w-[2px] bg-yellow-400 h-full hidden md:block top-0 origin-top"
      />

      <div className="experience-grid max-w-6xl mx-auto flex flex-col gap-16 relative">
        {experience?.map((exp, index) => {
          const isEven = index % 2 === 0;

          return (
            <div 
              key={`${exp.id ?? "experience"}-${index}`} 
              className={`experience-card relative flex items-center justify-between w-full ${
                isEven ? "md:flex-row" : "md:flex-row-reverse"
              }`}
            >
              {/* المحتوى (البطاقة) */}
              <div className="w-full md:w-[44%] relative">
                <div className="bg-gray-900 border border-gray-700 p-7 rounded-xl shadow-2xl relative">
                  
                  {/* السهم الصغير (Arrow) المشير للخط */}
                  <div className={`hidden md:block absolute top-1/2 -translate-y-1/2 w-4 h-4 bg-gray-900 border-t border-l border-gray-700 rotate-45 ${
                    isEven ? "-right-2 border-t-transparent border-l-transparent border-b border-r" : "-left-2"
                  }`} />

                  <h3 className="text-xl font-bold mb-3 text-white">
                    {exp.positions}
                  </h3>

                  <p className="text-gray-400 mb-5 text-sm leading-relaxed">
                    {exp.description}
                  </p>

                  <div className="flex flex-wrap items-center justify-between gap-4 mt-auto pt-4 border-t border-gray-800">
                    <div className="flex items-center gap-2">
                      <FaCalendarAlt className="text-yellow-400" />
                      <span className="text-gray-400 text-xs font-medium uppercase tracking-wider">
                        {new Date(exp.start_date).getFullYear()} -{" "}
                        {exp.end_date
                          ? new Date(exp.end_date).getFullYear()
                          : locale === "en" ? "Present" : "حتى الآن"}
                      </span>
                    </div>
                    <span className="text-gray-500 text-xs font-light">{exp.location}</span>
                  </div>
                </div>
              </div>

              {/* النقطة الزمنية (Indicator Dot) */}
              <div className="absolute left-1/2 transform -translate-x-1/2 w-5 h-5 rounded-full bg-gray-900 border-2 border-yellow-400 z-30 hidden md:flex items-center justify-center">
                <div className="w-1.5 h-1.5 bg-yellow-400 rounded-full animate-pulse" />
              </div>

              {/* مساحة فارغة للموازنة */}
              <div className="hidden md:block md:w-[44%]" />
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default ExperienceBody;