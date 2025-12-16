"use server";
import { getServerSession } from "next-auth";
import { revalidatePath } from "next/cache";
import { authOptions } from "@/app/models/db/authOptions";
import { deleteEducationsByDelete } from "@/app/models/db/lib/services/education";

export async function deleteEducationAction(educationId:string) {
  const session = await getServerSession(authOptions);
 
  // ❗ Not logged in
  if (!session) {
     throw new Error("Please log in first.");
  }

  // ❗ Not admin
  if (session.user.role !== "admin") {
    throw new Error("You are not allowed to perform this action.");
  }

  const result = await deleteEducationsByDelete(educationId)

  if (result.status!== 200) throw new Error("Failed to delete Education");

  revalidatePath(`/admin/dashboard/education`);
  
}
