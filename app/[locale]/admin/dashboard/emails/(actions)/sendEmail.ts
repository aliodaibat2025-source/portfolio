
import { newEmail } from "@/app/models/db/lib/services/contact"
import { NewEmail } from "@/types"
import { Resend } from "resend"

const resend= new Resend(process.env.RESEND_API_KEY)
export const sendEmailAction= async (data:NewEmail)=>{

    try {
        const result = await newEmail(data)
        resend.emails.send({
            from:process.env.Email_From||"onboarding@resend.dev",
            to:process.env.EMAIL_ADMIN||"",
            subject:data.subject,
            html:""
        })
    } catch (error) {
        
    }
}