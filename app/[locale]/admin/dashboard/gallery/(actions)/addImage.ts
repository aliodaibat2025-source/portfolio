"use server";
import { getServerSession } from "next-auth";
import { revalidatePath } from "next/cache";
import { authOptions } from "@/app/models/db/authOptions";
import {  addImage} from "@/app/models/db/lib/services/gallery";
import { gallery } from "@/types";

export async function AddImageAction(data:gallery) {
  const session = await getServerSession(authOptions);
 
  // ❗ Not logged in
  if (!session) {
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


  const result = await addImage(data)

   if (!result || result?.status >= 400) {
    return {
      status: result?.status ?? 500,
      message:
        result?.message ??
        "An unexpected error occurred while updating the gallery.",
    };
  }
   // Successful Cearte
  revalidatePath(`/admin/dashboard/gallery`);

  return {
    status: 200,
    message: "gallery Added successfully.",
    data: result.data,
  };
  
}
