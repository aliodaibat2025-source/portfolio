'use client';

import { useEffect } from 'react';
import { ExperienceProps } from './experience';
import gsap from 'gsap';

const ExperienceHeader = ({ textInExperience }: ExperienceProps) => {
  
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
  }, []);
  
  return (
    <div className="text-center mb-16 pt-32">
      <h2 className="experience-heading text-4xl font-bold text-white mb-4">
        Experience
      </h2>
      <p className="experience-text text-gray-300 text-center text-lg max-w-2xl mx-auto">
        {textInExperience?.value}
      </p>
    </div>
  );
};

export default ExperienceHeader;
