"use server";
import { getServerSession } from "next-auth";
import { revalidatePath } from "next/cache";
import { authOptions } from "@/app/models/db/authOptions";
import { deleteImageById } from "@/app/models/db/lib/services/gallery";

export async function deleteImageAction(imageId:string) {
  const session = await getServerSession(authOptions);
 
  // ❗ Not logged in
  if (!session) {
     throw new Error("Please log in first.");
  }

  // ❗ Not admin
  if (session.user.role !== "admin") {
    throw new Error("You are not allowed to perform this action.");
  }

  const result = await deleteImageById(imageId)

  if (result.status!== 200) throw new Error("Failed to delete Image");

  revalidatePath(`/admin/dashboard/gallery`);
  
}
