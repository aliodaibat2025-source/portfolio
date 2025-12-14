// Experience.tsx

import ExperienceHeader from './ExperienceHeader'; 
import ExperienceBody from './ExperienceBody';    

type dataType={
  value:string|undefined,
  name:string|undefined
} 



export type ExperienceProps  ={
  experience?: Array<{
    id: string;
    positions: string;
    description: string;
    start_date: string;
    end_date: string;
    location: string;
  }>;
   textInExperience?:dataType |null
  
};



const Experience = ({ experience,textInExperience}: ExperienceProps) => {
  return (
    <section className="min-h-screen bg-linear-to-br from-gray-800 via-black to-gray-800 px-6 py-20">
      <ExperienceHeader  textInExperience={textInExperience}/>  {/* استدعاء مكون الهيدر */}
      <ExperienceBody experience={experience}  />  {/* استدعاء مكون الجسم */}
    </section>
  );
};

export default Experience;
