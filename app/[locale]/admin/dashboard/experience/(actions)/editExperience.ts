"use server";
import { getServerSession } from "next-auth";
import { revalidatePath } from "next/cache";
import { authOptions } from "@/app/models/db/authOptions";
import { editExperience } from "@/app/models/db/lib/services/experience";
import { NewExperience } from "@/types";

export async function editExperienceAction(experienceId: string, data: NewExperience) {
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

  // ❗ Call the DB service
  const result = await editExperience(experienceId, data);

  // Database returned structured error
  if (!result || result?.status >= 400) {
    return {
      status: result?.status ?? 500,
      message:
        result?.message ??
        "An unexpected error occurred while updating the experience.",
    };
  }

  // Successful update
  revalidatePath(`/admin/dashboard/experience`);

  return {
    status: 200,
    message: "Experience updated successfully.",
    data: result.data,
  };
}
