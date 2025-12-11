
import { SkillColumns } from "@/components/columns/skills-columns";
import { DataTable } from "@/components/data-table";
import NavigationButton from "@/components/NavigationButton"
import { deleteSkillAction } from "./(actions)/deleteSkill";
import { getAllSkills } from "@/app/models/db/lib/services/skills";
import {  NewSkill } from "@/types";
export default async function SettingsTable() {
  const skills = await getAllSkills();
  return (
    <main className="flex flex-col justify-center items-center ml-7 w-[88vw] md:w-[60vw] xl:w-[80vw]">
      {/* Header */}
      <div className="flex flex-col justify-start items-start mb-6 border-b border-gray-300 w-full">
        <h1 className="text-lg md:text-2xl font-bold">Skils</h1>
        <h2 className="text-sm md:text-lg text-gray-600">
          A list of your Skills.
        </h2>
      </div>
      {/* Table container */}
      <DataTable columns={SkillColumns} data={skills.data as NewSkill[]} routeName="skills" deleteAction={deleteSkillAction}/>
      <NavigationButton
            routeName="newSkill"
            value="Add New Skill"
          />
    </main>
  );
}
