import React from "react";
import { editSkillAction } from "../(actions)/editSkill";
import EditSkill from "@/components/skills/EditSkill";
import {  NewSkill } from "@/types";
import {  getSkillById } from "@/app/models/db/lib/services/skills";

async function Page(prop: { params: Promise<{ id: string }> }) {
  const params = await prop.params;
  const skill = (await getSkillById(params.id));
  console.log("experience: ",skill);
  
  return (
    

      <main>
        <EditSkill skill={skill.data as NewSkill} action={editSkillAction} />
      </main>
  );
}

export default Page;
