"use server";
import { getServerSession } from "next-auth";
import { revalidatePath } from "next/cache";
import { authOptions } from "@/app/models/db/authOptions";
import { deleteExperienceByDelete } from "@/app/models/db/lib/services/experience";

export async function deleteExperienceAction(experienceId:string) {
  const session = await getServerSession(authOptions);
  const token = session?.user.token;
 
  // ❗ Not logged in
  if (!token) {
    throw new Error("Please log in first.")
  }

  // ❗ Not admin
  if (session.user.role !== "admin") {
    throw new Error("You are not allowed to perform this action.")
  }

  const result = await deleteExperienceByDelete(experienceId)

  if (result.status!== 200) throw new Error("Failed to delete Experience");

  revalidatePath(`/admin/dashboard/experience`);
  
}
