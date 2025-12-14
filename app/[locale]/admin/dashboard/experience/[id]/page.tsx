import React from "react";
import { editExperienceAction } from "../(actions)/editExperience";
import EditExperienceForm from "@/components/experience/EditExperience";
import { getExperienceById } from "@/app/models/db/lib/services/experience";
import { NewExperience } from "@/types";

async function Page(prop: { params: Promise<{ id: string }> }) {
  const params = await prop.params;
  const experience = await getExperienceById(params.id);
  console.log("experience: ",experience);
  
  return (
    

      <main>
        <EditExperienceForm experience={experience.data as NewExperience} action={editExperienceAction} />
      </main>
  );
}

export default Page;
