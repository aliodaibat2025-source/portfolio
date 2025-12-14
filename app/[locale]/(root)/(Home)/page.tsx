import Hero from "@/app/components/hero";

import About from "@/app/components/about";
import Skills from "@/app/components/skills";
import Experience from "@/app/components/experience";
import Education from "@/app/components/education";
import Activities from "@/app/components/activities";
import Contact from "@/app/components/contact";
import { sendEmailAction } from "@/app/[locale]/admin/dashboard/emails/(actions)/sendEmail";
import { getSkillsbyLocale } from "@/app/models/db/lib/services/skills";
import { getExperiencebyLocale } from "@/app/models/db/lib/services/experience";

type Locale = "en" | "ar";

interface PageProps {
  params: {
    locale: Locale;
  };
}

export default async function Home({ params }: PageProps) {
  const { locale } = await params;

  const skillsdata = await getSkillsbyLocale(locale);
  const skills = skillsdata?.data;
  const experiencedata=await getExperiencebyLocale(locale)
    const experience = experiencedata?.data;


  return (
    <main className=" scroll-smooth text-black">
      <Hero />
      <About />
      <Skills skills={skills} />
      <Experience  experience={experience} />
      <Education />
      <Activities />
      <Contact emailAction={sendEmailAction} />
    </main>
  );
}
