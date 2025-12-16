"use server";
import { getServerSession } from "next-auth";
import { revalidatePath } from "next/cache";
import { authOptions } from "@/app/models/db/authOptions";
import { removeUser } from "@/app/models/db/lib/services/users";
export async function deleteUser(userId: string) {
  try {
    const session = await getServerSession(authOptions);
   if (!session)  throw new Error("please Login.")

  // ❗ Not admin
  if (session?.user.role !== "admin") throw new Error("You are not allowed to perform this action.")

     await removeUser(userId);
    revalidatePath(`/admin/dashboard/users`);
   
    
  } catch (error) {
    throw new Error("Failed to delete Skill");
  }
}
