import React from "react";
import { createExperienceAction } from "../(actions)/newExperience";
import CreateNewExperience from "@/components/experience/CreateNewExperience";

async function Page() {
  return (
    <>

      <CreateNewExperience action={createExperienceAction}  />
    </>
  );
}

export default Page;
