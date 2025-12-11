
import { experienceColumns } from "@/components/columns/experience-columns";
import { DataTable } from "@/components/data-table";
import NavigationButton from "@/components/NavigationButton"
import { deleteExperienceAction } from "./(actions)/deleteExperience";
import { getAllExperiences } from "@/app/models/db/lib/services/experience";
import { NewExperience } from "@/types";
export default async function SettingsTable() {
  const experiences = await getAllExperiences();
  return (
    <main className="flex flex-col justify-center items-center ml-7 w-[88vw] md:w-[60vw] xl:w-[80vw]">
      {/* Header */}
      <div className="flex flex-col justify-start items-start mb-6 border-b border-gray-300 w-full">
        <h1 className="text-lg md:text-2xl font-bold">Experiences</h1>
        <h2 className="text-sm md:text-lg text-gray-600">
          A list of your Experiences.
        </h2>
      </div>
      {/* Table container */}
      <DataTable columns={experienceColumns} data={experiences.data as NewExperience[]} routeName="experience" deleteAction={deleteExperienceAction}/>
      <NavigationButton
            routeName="newExperience"
            value="Add New Experience"
          />
    </main>
  );
}
