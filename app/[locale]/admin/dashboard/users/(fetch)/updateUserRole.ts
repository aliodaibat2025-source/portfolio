"use server";
import { getServerSession } from "next-auth";
import { revalidatePath } from "next/cache";
import { authOptions } from "@/app/models/db/authOptions";
import { editUser } from "@/app/models/db/lib/services/users";

export async function updateUserRole(formData: FormData) {
  const session = await getServerSession(authOptions);
  const userId = formData.get("userId") as string;
  const role = formData.get("newRole") as string;

  // ❗ Not logged in
   if (!session)  throw new Error("please Login.")

  // ❗ Not admin
  if (session?.user.role !== "admin") throw new Error("You are not allowed to perform this action.")

   await editUser(userId, role);

  revalidatePath(`/admin/dashboard/skills`);
}
