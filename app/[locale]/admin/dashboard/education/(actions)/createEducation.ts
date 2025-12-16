"use server";
import { getServerSession } from "next-auth";
import { revalidatePath } from "next/cache";
import { authOptions } from "@/app/models/db/authOptions";
import { addEducation } from "@/app/models/db/lib/services/education";
import { NewEducation } from "@/types";

export async function createEducationAction(data:NewEducation) {
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


  const result = await addEducation(data)

   if (!result || result?.status >= 400) {
    return {
      status: result?.status ?? 500,
      message:
        result?.message ??
        "An unexpected error occurred while updating the Education.",
    };
  }
   // Successful Cearte
  revalidatePath(`/admin/dashboard/education`);

  return {
    status: 200,
    message: "Education Added successfully.",
    data: result.data,
  };
  
}
