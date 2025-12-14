"use server";
import { getServerSession } from "next-auth";
import { revalidatePath } from "next/cache";
import { authOptions } from "@/app/models/db/authOptions";
import {  newSetting } from "@/types";
import { addNewSetting, editSetting } from "@/app/models/db/lib/services/settings";

export async function editSettingAction(settingId:string,data:newSetting) {
  const session = await getServerSession(authOptions);
  const token = session?.user.token;
 
  // ❗ Not logged in
  if (!token) throw new Error("Please log in first.")  
  // ❗ Not admin
  if (session.user.role !== "admin") throw new Error("You are not allowed to perform this action.") 
  const result = await editSetting(settingId,data)

  
   // Successful Cearte
  revalidatePath(`/admin/dashboard/settings`);

  return  result
  
}
