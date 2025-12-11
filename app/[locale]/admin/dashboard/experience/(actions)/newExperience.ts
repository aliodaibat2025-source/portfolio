"use server";
import { getServerSession } from "next-auth";
import { revalidatePath } from "next/cache";
import { authOptions } from "@/app/models/db/authOptions";
import { addExperience } from "@/app/models/db/lib/services/experience";
import { NewExperience } from "@/types";

export async function createExperienceAction(data:NewExperience) {
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


  const result = await addExperience(data)

   if (!result || result?.status >= 400) {
    return {
      status: result?.status ?? 500,
      message:
        result?.message ??
        "An unexpected error occurred while updating the experience.",
    };
  }
   // Successful Cearte
  revalidatePath(`/dashboard/experience`);

  return {
    status: 200,
    message: "Experience Added successfully.",
    data: result.data,
  };
  
}
