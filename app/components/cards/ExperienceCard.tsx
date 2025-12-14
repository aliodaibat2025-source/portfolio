'use client';

import React, { useEffect, useState } from "react";
import { FaCalendarAlt } from "react-icons/fa";
import type { ExperienceTranslated } from "@/types"; 

type ExperienceCardProps = {
  experience: ExperienceTranslated;
};

export default function ExperienceCard({ experience }: ExperienceCardProps) {
  const [formattedStartDate, setFormattedStartDate] = useState<string | null>(null);
  const [formattedEndDate, setFormattedEndDate] = useState<string | null>(null);

  useEffect(() => {
   
    if (typeof window !== 'undefined') {
      const startDate = experience.start_date ? new Date(experience.start_date) : null;
      const endDate = experience.end_date ? new Date(experience.end_date) : null;

      if (startDate) {
        const startFormatted = new Intl.DateTimeFormat("default", {
          year: "numeric",
          month: "long",
          day: "numeric",
        }).format(startDate);
        setFormattedStartDate(startFormatted);
      }

      if (endDate) {
        const endFormatted = new Intl.DateTimeFormat("default", {
          year: "numeric",
          month: "long",
          day: "numeric",
        }).format(endDate);
        setFormattedEndDate(endFormatted);
      } else {
        setFormattedEndDate("Present");
      }
    }
  }, [experience.start_date, experience.end_date]); 

  return (
    <div className="experience-card bg-gray-900 shadow-xl p-8 rounded-xl hover:shadow-2xl transition flex flex-col items-center text-center border border-gray-700">
      <h3 className="text-xl font-semibold mb-2 text-white">{experience.positions}</h3>
      <p className="text-gray-300 mb-2">{experience.description}</p>
      <div className="flex justify-center items-center gap-2">
        <FaCalendarAlt className="text-yellow-400" />
        <span className="text-gray-400 text-sm">
          {formattedStartDate} - {formattedEndDate}
        </span>
      </div>
      <span className="text-gray-400 text-sm">{experience.location}</span>
    </div>
  );
}
