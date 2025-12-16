"use server";
import { getServerSession } from "next-auth";
import { revalidatePath } from "next/cache";
import { authOptions } from "@/app/models/db/authOptions";
import { editEducation } from "@/app/models/db/lib/services/education";
import { NewEducation } from "@/types";

export async function editEducationAction(educationId: string, data: NewEducation) {
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
  const result = await editEducation(educationId, data);

  // Database returned structured error
  if (!result || result?.status >= 400) {
    return {
      status: result?.status ?? 500,
      message:
        result?.message ??
        "An unexpected error occurred while updating the education.",
    };
  }

  // Successful update
  revalidatePath(`/admin/dashboard/education`);

  return {
    status: 200,
    message: "education updated successfully.",
    data: result.data,
  };
}
