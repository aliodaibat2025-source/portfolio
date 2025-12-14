"use client";

import  { useState } from "react";
import Link from "next/link";
import { Calendar, Copy, ArrowLeft } from "lucide-react";
import { NewEmail } from "@/types";
import { useRouter } from "next/navigation";

type EmailForClient = NewEmail & {
  sent_at?: string | null;
};

interface Props {
  email: EmailForClient;
}

export default function EmailDetailsClient({ email }: Props) {
  const router = useRouter();
  const [copied, setCopied] = useState(false);

  const formatJordanTime = (iso?: string | null) => {
    if (!iso) return "—";
    try {
      const d = new Date(iso);
      return new Intl.DateTimeFormat("en-GB", {
        dateStyle: "medium",
        timeStyle: "short",
        timeZone: "Asia/Amman",
      }).format(d);
    } catch {
      return new Date(iso).toLocaleString();
    }
  };

  const sentAtDisplay = formatJordanTime(email.sent_at ?? null);

  const handleCopyId = async () => {
    try {
      await navigator.clipboard.writeText(String(email.id ?? ""));
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    } catch {
      setCopied(false);
    }
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-start justify-between gap-6">
        <div className="flex items-center gap-4">
          <Link
            href="/admin/dashboard/emails"
            className="text-gray-500 hover:text-gray-700"
          >
            <ArrowLeft className="w-6 h-6" />
          </Link>

          <div className="flex items-center gap-4">
            <div className="flex h-16 w-16 items-center justify-center rounded-full bg-black text-white text-2xl font-semibold">
              {((email.first_name ?? " ") + " " + (email.last_name ?? " "))
                .split(" ")
                .map((s) => s[0] ?? "")
                .slice(0, 2)
                .join("")
                .toUpperCase() || "?"}
            </div>

            <div>
              <h1 className="text-xl font-bold text-gray-900">
                {email.first_name} {email.last_name}
              </h1>
              <p className="text-sm text-gray-600">{email.subject}</p>
              <div className="mt-2 text-xs text-gray-500 flex items-center gap-2">
                <Calendar className="w-4 h-4" />
                <span>{sentAtDisplay}</span>
              </div>
            </div>
          </div>
        </div>
      </div>

      <div className="grid grid-cols-1 gap-2 lg:grid-cols-5">
        <section className="lg:col-span-3">
          <div className="rounded-lg border bg-white shadow-sm">
            <div className="px-6 py-4 border-b">
              <h2 className="text-lg font-semibold">Message</h2>
            </div>

            <div className="p-6">
              <p className="whitespace-pre-wrap text-gray-800">
                {email.description}
              </p>

              <div className="mt-6 flex flex-wrap gap-3">
                <a
                  href={`mailto:${email.email}`}
                  className="text-sm text-gray-600 hover:underline"
                >
                  Send mail
                </a>

                {email.phone_nmuber && (
                  <a
                    href={`tel:${email.phone_nmuber}`}
                    className="text-sm text-gray-600 hover:underline"
                  >
                    Call
                  </a>
                )}
              </div>
            </div>
          </div>
        </section>

        {/* Sidebar metadata (span 2 on lg to be wider) */}
        <aside className="lg:col-span-2 space-y-4">
          <div className="rounded-lg border bg-white shadow-sm">
            <div className="px-6 py-4 border-b">
              <h3 className="font-medium">Details</h3>
            </div>
            <div className="p-6 space-y-4 text-sm text-gray-700">
              <div className="flex items-start justify-between">
                <div>
                  <div className="text-xs text-gray-500">Email</div>
                  <a
                    href={`mailto:${email.email}`}
                    className="text-sm text-gray-700 hover:underline"
                  >
                    {email.email}
                  </a>
                </div>
              </div>

              <div className="flex items-start justify-between">
                <div>
                  <div className="text-xs text-gray-500">Phone</div>
                  <div className="text-sm">{email.phone_nmuber ?? "—"}</div>
                </div>
              </div>

              <div className="flex items-start justify-between">
                <div>
                  <div className="text-xs text-gray-500">Sent (Jordan)</div>
                  <div className="text-sm">{sentAtDisplay}</div>
                </div>
              </div>

              <div className="flex items-center justify-between">
                <div>
                  <div className="text-xs text-gray-500">Message ID</div>
                  <div className="text-sm break-all">{email.id}</div>
                </div>

                <div>
                  <button
                    onClick={handleCopyId}
                    className="inline-flex items-center gap-2 rounded-md border px-3 py-1  ml-2 text-xs"
                  >
                    <Copy className="w-4 h-4" />
                    {copied ? "Copied" : "Copy"}
                  </button>
                </div>
              </div>
            </div>
          </div>

          {/* Quick actions */}
          <div className="rounded-lg border bg-white shadow-lg p-4 flex flex-col gap-3">
            <button
              onClick={() =>
                (window.location.href = `mailto:${
                  email.email
                }?subject=Re:%20${encodeURIComponent(email.subject)}`)
              }
              className="w-full rounded-md bg-black px-4 py-2 text-white font-medium shadow-md transform transition duration-300 ease-in-out hover:scale-105 hover:shadow-xl hover:bg-gray-800"
            >
              Reply
            </button>

            <button
              onClick={() => router.push("/admin/dashboard/emails")}
              className="w-full rounded-md bg-white px-4 py-2 text-black border-2 border-black font-medium shadow-md transform transition duration-300 ease-in-out hover:bg-black hover:text-white hover:scale-105 hover:shadow-lg"
            >
              Back
            </button>
          </div>
        </aside>
      </div>
    </div>
  );
}
