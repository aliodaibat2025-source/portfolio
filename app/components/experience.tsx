// Experience.tsx

import React from 'react';
import ExperienceHeader from './ExperienceHeader';  // استيراد مكون الهيدر
import ExperienceBody from './ExperienceBody';      // استيراد مكون الجسم (الكارد + العمود)

export type ExperienceProps = {
  experience: Array<{
    id: string;
    positions: string;
    description: string;
    start_date: string;
    end_date: string;
    location: string;
  }>;
};

const Experience = ({ experience }: ExperienceProps) => {
  return (
    <section className="min-h-screen bg-gradient-to-br from-gray-800 via-black to-gray-800 px-6 py-20">
      <ExperienceHeader />  {/* استدعاء مكون الهيدر */}
      <ExperienceBody experience={experience} />  {/* استدعاء مكون الجسم */}
    </section>
  );
};

export default Experience;
