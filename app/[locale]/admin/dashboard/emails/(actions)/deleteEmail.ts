"use server";
import { getServerSession } from "next-auth";
import { revalidatePath } from "next/cache";
import { authOptions } from "@/app/models/db/authOptions";
import { deleteEmail } from "@/app/models/db/lib/services/contact";

export async function deleteEmailAction(emailId:string) {
  const session = await getServerSession(authOptions);
  const token = session?.user.token;
 
  if (!token)  throw new Error("Please Log In")
    if(session.user.role!=="admin")  throw new Error("Not Allowed")

  const result = await deleteEmail(emailId)

  if (result.status!== 200) throw new Error("Failed to delete Email");

  revalidatePath(`/dashboard/emails`);
  
}
