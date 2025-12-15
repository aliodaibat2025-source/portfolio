// Experience.tsx

import ExperienceHeader from "./ExperienceHeader";
import ExperienceBody from "./ExperienceBody";
import { ExperienceTranslated } from "@/types";

type dataType = {
  value: string | undefined;
  name: string | undefined;
};
type Locale = "en" | "ar";


export type ExperienceProps = {
  experience?: ExperienceTranslated[];
  textInExperience?: dataType | null;
  locale?:Locale
};

const Experience = ({ experience, textInExperience, locale}: ExperienceProps) => {
  return (
    <section
      id="experience"
      className="min-h-screen bg-linear-to-br from-gray-800 via-black to-gray-800 px-6 py-20"
    >
      <ExperienceHeader textInExperience={textInExperience} />
      <ExperienceBody experience={experience}  locale={locale}/>
    </section>
  );
};

export default Experience;
