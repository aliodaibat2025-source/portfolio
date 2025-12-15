"use server";
import { getServerSession } from "next-auth";
import { revalidatePath } from "next/cache";
import { authOptions } from "@/app/models/db/authOptions";
import {  NewSkill } from "@/types";
import { addSkill } from "@/app/models/db/lib/services/skills";

export async function createSkillAction(data:NewSkill) {
  const session = await getServerSession(authOptions);
  const token = session?.user.token;
 
  // ❗ Not logged in
  if (!token) {
    return {
      status: 401,
      message: "Please log in first.",
    };
  }

  // ❗ Not admin
  if (session.user.role !== "admin") {
    return {
      status: 403,
      message: "You are not allowed to perform this action.",
    };
  }


  const result = await addSkill(data)

  revalidatePath(`/admin/dashboard/skills`);

  return {
    status: 200,
    message: "Skill Added successfully.",
    data: result.data,
  };
  
}
