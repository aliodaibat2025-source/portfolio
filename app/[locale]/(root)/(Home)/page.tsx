import Hero from "@/app/components/hero";

import About from "@/app/components/about";
import Skills from "@/app/components/skills";
import Experience from "@/app/components/experience";
import Education from "@/app/components/education";

import Contact from "@/app/components/contact";
import { sendEmailAction } from "@/app/[locale]/admin/dashboard/emails/(actions)/sendEmail";
import { getSkillsbyLocale } from "@/app/models/db/lib/services/skills";
import { getExperiencebyLocale } from "@/app/models/db/lib/services/experience";
import { getSettingbyLocale } from "@/app/models/db/lib/services/settings";
import { getEducationByLocale } from "@/app/models/db/lib/services/education";
type Locale = "en" | "ar";

interface PageProps {
  params: 
    Promise<{locale: Locale}>
  
}

export default async function Home({ params }: PageProps) {
  const { locale } = await params;

  const skillsdata = await getSkillsbyLocale(locale);
  const skills = skillsdata?.data;
  const experiencedata=await getExperiencebyLocale(locale)
  const experience = experiencedata?.data;
  const educationData= await getEducationByLocale(locale)
  const education= educationData?.data
  const position= await getSettingbyLocale(locale,"position_in_header")
 const bioInHeader= await getSettingbyLocale(locale,"bio_in_header")
 const textInAbout= await getSettingbyLocale(locale,"text_about_section")
  const imageInAbout= await getSettingbyLocale("en","image_in_about")
    const imageInHero= await getSettingbyLocale("en","image_in_header")
    const video= await getSettingbyLocale("en","video")
    const textInSkills= await getSettingbyLocale(locale,"text_skill_section")
  const textInExperience= await getSettingbyLocale(locale,"text_experience_section")
    const textInEducation= await getSettingbyLocale(locale,"text_education_section")
    const nameInHeader= await getSettingbyLocale(locale,"name_in_header")
    const textContactSection= await getSettingbyLocale(locale,"text_contact_section")



  return (
    <main className=" scroll-smooth text-black">
      <Hero position={position} bioInHeader={bioInHeader} imageInHero={imageInHero} nameInHeader={nameInHeader}/>
      <About textInAbout={textInAbout} imageInAbout={imageInAbout} video={video}/>
      <Skills skills={skills} textInSkills={textInSkills} />
      <Experience  experience={experience}  textInExperience={textInExperience} locale={locale}/>
      <Education textInEducation={textInEducation}  education={education}/>
      <Contact emailAction={sendEmailAction} textContactSection={textContactSection} />
    </main>
  );
}
