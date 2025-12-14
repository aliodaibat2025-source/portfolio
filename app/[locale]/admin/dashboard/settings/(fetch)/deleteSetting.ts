"use server";
import { getServerSession } from "next-auth";
import { revalidatePath } from "next/cache";
import { authOptions } from "@/app/models/db/authOptions";
import { deleteSettings } from "@/app/models/db/lib/services/settings";

export async function deleteSettingAction(settingId: string) {
  const session = await getServerSession(authOptions);
  const token = session?.user.token;

  // ❗ Not logged in
  if (!token) throw new Error("Please log in first.");
  // ❗ Not admin
  if (session.user.role !== "admin")
    throw new Error("You are not allowed to perform this action.");
  await deleteSettings(settingId);
  // Successful Cearte
  revalidatePath(`/admin/dashboard/settings`);
}
