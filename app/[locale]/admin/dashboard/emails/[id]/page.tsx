// app/admin/dashboard/emails/[id]/page.tsx
import React from "react";
import { notFound } from "next/navigation";
import EmailDetailsClient from "@/components/emails/EmailDetails";
import { getEmailById } from "@/app/models/db/lib/services/contact";
import { NewEmail } from "@/types";

type Props = { params: Promise<{ id: string }> };

export const dynamic = "force-dynamic";

export default async function Page({ params }: Props) {
    const id= (await params).id
  const res = await getEmailById(id); // expected to return { data: NewEmail | null, ... }
  const email = res?.data ?? null;

  if (!email) {
    // If not found, render 404 page
    notFound();
  }

  // Serialize the email for the client:
  // - convert Date fields to string (ISO) so Next can pass them as props
  const emailForClient = {
    ...email,
    // change `sent_id` to a string name that's clearer for client
    sent_at: email.sent_id ? new Date(email.sent_id).toISOString() : null,
  } as (NewEmail & { sent_at?: string | null });

  return (
    <main className="p-6">
      <div className="mx-auto max-w-6xl">
        <EmailDetailsClient email={emailForClient} />
      </div>
    </main>
  );
}
