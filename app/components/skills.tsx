'use client';

import { useEffect } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/all";
import type { SkillTranslated } from "@/types";

import { useTranslations } from "next-intl";



gsap.registerPlugin(ScrollTrigger);

type dataType={
  value:string|undefined,
  name:string|undefined
} 



type SkillsProps = {
  skills:SkillTranslated[]|undefined;
  textInSkills:dataType|null
};

export default function Skills({ skills,textInSkills }: SkillsProps) {

  const t = useTranslations("settings");


  useEffect(() => {
    gsap.fromTo(
      ".skills-heading",
      { y: 50, opacity: 0 },
      {
        y: 0,
        opacity: 1,
        duration: 1,
        ease: "power3.out",
        scrollTrigger: {
          trigger: ".skills-heading",
          start: "top 80%",
        },
      }
    );

    gsap.fromTo(
      ".skills-text",
      { y: 30, opacity: 0 },
      {
        y: 0,
        opacity: 1,
        duration: 1,
        delay: 0.3,
        ease: "power3.out",
        scrollTrigger: {
          trigger: ".skills-text",
          start: "top 80%",
        },
      }
    );

    gsap.fromTo(
      ".skill-tag",
      { y: 30, opacity: 0 },
      {
        y: 0,
        opacity: 1,
        duration: 1,
        stagger: 0.2,
        ease: "power3.out",
        scrollTrigger: {
          trigger: ".skill-tag",
          start: "top 85%",
        },
      }
    );
  }, []);

  return (
    <section
      id="skills"
      className="min-h-screen flex flex-col items-center justify-center bg-linear-to-bl from-gray-800 via-black to-gray-800 px-6 py-20"
    >
      <h2 className="skills-heading text-4xl font-bold mb-8 text-white text-center">
           {t("skills")}
      </h2>

      <p className="skills-text text-gray-300 text-center text-lg max-w-2xl mb-12">
       {textInSkills?.value}
      </p>

      <div className="flex flex-wrap justify-center gap-4 max-w-4xl">
        {skills!.map((skill, index) => (
          <span
            key={index}
            className="skill-tag bg-gray-900 text-white shadow-lg px-5 py-2 rounded-full font-medium hover:bg-gray-700 transition cursor-default"
          >
            {skill.name}
          </span>
        ))}
      </div>
    </section>
  );
}







