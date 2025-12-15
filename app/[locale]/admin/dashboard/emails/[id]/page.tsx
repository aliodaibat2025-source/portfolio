import { notFound } from "next/navigation";
import EmailDetailsClient from "@/components/emails/EmailDetails";
import { getEmailById } from "@/app/models/db/lib/services/contact";
import { NewEmail } from "@/types";

type Props = { params: Promise<{ id: string }> };

export const dynamic = "force-dynamic";

export default async function Page({ params }: Props) {
    const id= (await params).id
  const res = await getEmailById(id); 
  console.log("res: ",res);
  
  const email = res?.data ?? null;

  if (!email) {
    notFound();
  }

  const emailForClient = {
  ...email,
  sent_at: email.sent_at
    ? new Date(new Date(email.sent_at).getTime() + 3 * 60 * 60 * 1000).toISOString()
    : null,
} as (NewEmail & { sent_at?: string | null });


  return (
    <main className="p-6">
      <div className="mx-auto max-w-6xl">
        <EmailDetailsClient email={emailForClient} />
      </div>
    </main>
  );
}
