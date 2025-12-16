"use server";
import { getServerSession } from "next-auth";
import { revalidatePath } from "next/cache";
import { authOptions } from "@/app/models/db/authOptions";
import { newSetting } from "@/types";
import { addNewSetting } from "@/app/models/db/lib/services/settings";

export async function createSettingAction(data: newSetting) {
  const session = await getServerSession(authOptions);

  // ❗ Not logged in
  if (!session) throw new Error("Please log in first.");

  // ❗ Not admin
  if (session.user.role !== "admin")
    throw new Error("You are not allowed to perform this action.");
  const result = await addNewSetting(data);

  // Successful Cearte
  revalidatePath(`/admin/dashboard/settings`);

  return result;
}
