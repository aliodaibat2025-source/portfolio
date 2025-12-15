"use client";

import { useTranslations } from "next-intl";

import React, { useEffect } from "react";
import { FaGraduationCap, FaCertificate } from "react-icons/fa";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/all";
import { EducationTranslated } from "@/types";
gsap.registerPlugin(ScrollTrigger);

type dataType = {
  value: string | undefined;
  name: string | undefined;
};

interface Props {
  textInEducation: dataType | null;
  education: EducationTranslated[] | undefined;
}
export default function Education({ textInEducation, education }: Props) {
  const t = useTranslations("settings");

  useEffect(() => {
    gsap.fromTo(
      ".education-heading",
      { y: 50, opacity: 0 },
      {
        y: 0,
        opacity: 1,
        duration: 1,
        ease: "power3.out",
        scrollTrigger: {
          trigger: ".education-heading",
          start: "top 80%",
          toggleActions: "play none none none",
        },
      }
    );

    gsap.fromTo(
      ".education-text",
      { y: 30, opacity: 0 },
      {
        y: 0,
        opacity: 1,
        duration: 1,
        delay: 0.3,
        ease: "power3.out",
        scrollTrigger: {
          trigger: ".education-text",
          start: "top 80%",
          toggleActions: "play none none none",
        },
      }
    );

    gsap.fromTo(
      ".education-card",
      { y: 50, opacity: 0 },
      {
        y: 0,
        opacity: 1,
        duration: 1,
        stagger: 0.2,
        ease: "power3.out",
        scrollTrigger: {
          trigger: ".education-card",
          start: "top 85%",
          toggleActions: "play none none none",
        },
      }
    );
  }, []);

  return (
    <section
      id="education"
      className="min-h-screen flex flex-col items-center justify-center  bg-linear-to-bl from-gray-800 via-black to-gray-800  px-6 py-20"
    >
      <h2 className="education-heading text-4xl font-bold mb-8 text-white text-center">
        {t("education&certifications")}
      </h2>

      <p className="education-text text-gray-300 text-center text-lg max-w-2xl mb-12">
        {textInEducation?.value}
      </p>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-8 max-w-5xl w-full">
        {education!.map((ele, i) => {
          return (
            <div
              key={i}
              className="education-card bg-gray-900 shadow-xl p-8 rounded-xl hover:shadow-2xl transition flex flex-col items-center text-center border border-gray-700"
            >
              <FaGraduationCap className="text-4xl text-yellow-400 mb-4" />
              <h3 className="text-xl font-semibold mb-2 text-white">
                {ele.title}
              </h3>
              <p className="text-gray-300">
                {ele.location}, {new Date(ele.start_date).getFullYear()} -{" "}
                {ele.end_date
                  ? new Date(ele.end_date).getFullYear()
                  : "Present"}
              </p>
              <p className="text-gray-300 mt-2 ">{ele.description}</p>
            </div>
          );
        })}
      </div>
    </section>
  );
}
