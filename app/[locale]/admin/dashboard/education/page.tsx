
import { educationColumns } from "@/components/columns/education-columns";
import { DataTable } from "@/components/data-table";
import NavigationButton from "@/components/NavigationButton"
import { deleteEducationAction } from "./(actions)/deleteEducation";
import { NewEducation } from "@/types";
import { getAllEducations } from "@/app/models/db/lib/services/education";
export default async function SettingsTable() {
  const educations = await getAllEducations();
  console.log("educations: ",educations);
  
  return (
    <main className="flex flex-col justify-center items-center ml-7 w-[88vw] md:w-[60vw] xl:w-[80vw]">
      {/* Header */}
      <div className="flex flex-col justify-start items-start mb-6 border-b border-gray-300 w-full">
        <h1 className="text-lg md:text-2xl font-bold">Educations</h1>
        <h2 className="text-sm md:text-lg text-gray-600">
          A list of your Educations.
        </h2>
      </div>
      {/* Table container */}
      <DataTable columns={educationColumns} data={educations.data as NewEducation[]} routeName="education" deleteAction={deleteEducationAction}/>
      <NavigationButton
            routeName="newEducation"
            value="Add New Education"
          />
    </main>
  );
}
