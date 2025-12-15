"use server";
import { getServerSession } from "next-auth";
import { revalidatePath } from "next/cache";
import { authOptions } from "@/app/models/db/authOptions";
import { deleteSkillById } from "@/app/models/db/lib/services/skills";

export async function deleteSkillAction(skillId:string) {
  const session = await getServerSession(authOptions);
  const token = session?.user.token;
 
  // ❗ Not logged in
  if (!token)  

  // ❗ Not admin
  if (session?.user.role !== "admin") throw new Error("You are not allowed to perform this action.")

  const result = await deleteSkillById(skillId)

  if (result.status!== 200) throw new Error("Failed to delete Skill");

  revalidatePath(`/admin/dashboard/skills`);
  
}
