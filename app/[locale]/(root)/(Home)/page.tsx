import Hero from "@/app/components/hero";

import About from "@/app/components/about";
import Skills from "@/app/components/skills";
import Experience from "@/app/components/experience";
import Education from "@/app/components/education";
import Activities from "@/app/components/activities";
import Contact from "@/app/components/contact";
import {sendEmailAction} from "@/app/[locale]/admin/dashboard/emails/(actions)/sendEmail"
export default function Home() {
  return (
    <main className=" scroll-smooth text-black">
      <Hero />
      <About />
      <Skills />
      <Experience />
      <Education />
      <Activities />
      <Contact   emailAction={sendEmailAction} />
    </main>
  );
}
