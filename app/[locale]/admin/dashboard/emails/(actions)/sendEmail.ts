"use server"
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
             html: `
  <!doctype html>
  <html lang="en">
  <head>
    <meta charset="utf-8" />
    <meta name="viewport" content="width=device-width,initial-scale=1" />
    <title>New message from website</title>
    <style>
      /* Simple, safe inline styles for most email clients */
      body { margin:0; padding:0; font-family: -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, "Helvetica Neue", Arial, sans-serif; background-color:#f5f7fa; color:#0f172a; }
      .container { width:100%; max-width:680px; margin:24px auto; padding:20px; }
      .card { background:#ffffff; border-radius:12px; box-shadow:0 6px 18px rgba(15,23,42,0.08); overflow:hidden; }
      .header { background:linear-gradient(90deg,#111827,#1f2937); color:#fff; padding:18px 20px; }
      .header h1 { margin:0; font-size:18px; letter-spacing:0.2px; }
      .meta { display:flex; gap:12px; margin-top:8px; font-size:13px; color:rgba(255,255,255,0.85); }
      .content { padding:20px; }
      .section { margin-bottom:16px; }
      .label { font-size:12px; font-weight:600; color:#334155; margin-bottom:6px; display:block; }
      .value { background:#f8fafc; border:1px solid #e6eef6; padding:12px; border-radius:8px; color:#0f172a; font-size:14px; }
      .message-box { background:#0f172a; color:#fff; padding:16px; border-radius:8px; line-height:1.45; }
      .footer { padding:16px 20px; font-size:13px; color:#475569; background:#fbfdff; text-align:center; }
      a.button { display:inline-block; padding:10px 14px; border-radius:8px; background:#111827; color:#fff; text-decoration:none; font-weight:600; }
      @media (max-width:480px){ .container{ padding:12px } .header h1{ font-size:16px } }
    </style>
  </head>
  <body>
    <div class="container">
      <div class="card">
        <div class="header">
          <h1>New message from your website</h1>
          <div class="meta">
            <div>📬 <strong>${data.subject}</strong></div>
            <div>🕒 ${data.sent_at}</div>
          </div>
        </div>

        <div class="content">
          <div class="section" aria-labelledby="sender">
            <span class="label" id="sender">Sender</span>
            <div class="value">
              <div><strong>${data.first_name + data.last_name || "Guest"}</strong></div>
              <div style="margin-top:6px;"><a href="mailto:${data.email}" style="color:#0f172a; text-decoration:underline;">${data.email}</a>${data.phone_number ? ` • ${data.phone_number}` : ""}</div>
            </div>
          </div>

          <div class="section" aria-labelledby="message">
            <span class="label" id="message">Message</span>
            <div class="message-box">${data.description || "<em>(no message)</em>"}</div>
          </div>

          <div class="section" aria-labelledby="quick-actions">
            <span class="label" id="quick-actions">Quick actions</span>
            <div style="display:flex; gap:10px; flex-wrap:wrap;">
              <a class="button" href="mailto:${data.email}?subject=Re: ${encodeURIComponent(data.subject)}">Reply to sender</a>
              
            </div>
          </div>
        </div>

        <div class="footer">
          <div>Received from your website contact form</div>
          <div style="margin-top:6px; font-size:12px; color:#94a3b8">This message was sent by a site visitor. For privacy, please handle personal data carefully.</div>
        </div>
      </div>
    </div>
  </body>
  </html>
  `,
        })

        return result
    } catch (error) {
        throw new Error("Error In Sending The Email")
    }
}