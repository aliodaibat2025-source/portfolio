import React from "react";
import { createSkillAction } from "../(actions)/addSkill";
import CreateSkillForm from "@/components/skills/CreateNewSkill";

async function Page() {
  return (
    <>

      <CreateSkillForm action={createSkillAction}  />
    </>
  );
}

export default Page;
