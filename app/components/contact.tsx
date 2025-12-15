'use client';

import { useTranslations } from "next-intl";
import React, { useEffect, useState, useTransition } from "react";
import { FaEnvelope, FaPhone, FaLinkedin } from "react-icons/fa";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/all";
import { NewEmail } from "@/types";
import { toast } from "sonner";
gsap.registerPlugin(ScrollTrigger);
type dataType = {
  value: string | undefined;
  name: string | undefined;
};
interface Props {
  emailAction: (
    data: NewEmail
  ) => Promise<{ data: null; message: string; status: number } | undefined>;
  textContactSection: dataType | null;
}

export default function Contact({ emailAction,textContactSection }: Props) {

  const t = useTranslations(); // استخدام الترجمة العامة
  const [isPending, startTransition] = useTransition();

  // form state - split first / last name
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState("");
  const [subject, setSubject] = useState("");
  const [message, setMessage] = useState("");

  useEffect(() => {
    gsap.fromTo(
      ".contact-heading",
      { y: 50, opacity: 0 },
      {
        y: 0,
        opacity: 1,
        duration: 1,
        ease: "power3.out",
        scrollTrigger: {
          trigger: ".contact-heading",
          start: "top 80%",
          toggleActions: "play none none none",
        },
      }
    );

    gsap.fromTo(
      ".contact-text",
      { y: 30, opacity: 0 },
      {
        y: 0,
        opacity: 1,
        duration: 1,
        delay: 0.3,
        ease: "power3.out",
        scrollTrigger: {
          trigger: ".contact-text",
          start: "top 80%",
          toggleActions: "play none none none",
        },
      }
    );

    gsap.fromTo(
      ".contact-info",
      { y: 30, opacity: 0 },
      {
        y: 0,
        opacity: 1,
        duration: 1,
        stagger: 0.2,
        ease: "power3.out",
        scrollTrigger: {
          trigger: ".contact-info",
          start: "top 85%",
          toggleActions: "play none none none",
        },
      }
    );

    gsap.fromTo(
      ".contact-form",
      { y: 30, opacity: 0 },
      {
        y: 0,
        opacity: 1,
        duration: 1,
        delay: 0.5,
        ease: "power3.out",
        scrollTrigger: {
          trigger: ".contact-form",
          start: "top 85%",
          toggleActions: "play none none none",
        },
      }
    );
  }, []);

  const resetForm = () => {
    setFirstName("");
    setLastName("");
    setEmail("");
    setPhone("");
    setSubject("");
    setMessage("");
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    if (!firstName.trim() || !email.trim() || !message.trim() || !subject.trim()) {
      toast.error(t("contact.error_fill_fields")); // استخدم الترجمة هنا
      return;
    }

    const payload: NewEmail = {
      first_name: firstName.trim(),
      last_name: lastName.trim(),
      email: email.trim(),
      phone_number: phone.trim() || undefined,
      subject: subject.trim() || "Website Contact",
      description: message.trim(),
      sent_at: new Date(),
    };

    startTransition(async () => {
      try {
        await emailAction(payload);
        toast.success(t("contact.message_sent_success")); 
        resetForm();
      } catch (err) {
        let msg = t("contact.something_went_wrong"); 
        if (err instanceof Error) msg = err.message;
        toast.error(msg);
      }
    });
  };

  return (
    <section
      id="contact"
      className="min-h-screen flex flex-col items-center justify-center  bg-linear-to-br from-gray-800 via-black to-gray-800  px-6 py-20"
    >
      <h2 className="contact-heading text-4xl font-bold mb-8 text-white text-center">
        {t("contact.heading")}
      </h2>

      <p className="contact-text text-gray-300 text-center text-lg max-w-2xl mb-12">
        {textContactSection?.value} 
      </p>

      <div className="contact-info flex flex-col md:flex-row gap-8 mb-12 text-white " dir="ltr">
  <div className="flex items-center gap-3">
    <FaEnvelope className="text-xl text-yellow-400" />
    <span>{process.env.NEXT_PUBLIC_CONTACT_EMAIL}</span>
  </div>

  <div className="flex items-center gap-3">
    <FaPhone className="text-xl text-purple-400" />
    <span>{process.env.NEXT_PUBLIC_PHONE_NUMBER}</span>
  </div>

  <div className="flex items-center gap-3">
    <FaLinkedin className="text-xl text-blue-400" />
    <span>
      <a
        href={process.env.LINKEDIN_URL}
        target="_blank"
        rel="noreferrer"
        className="hover:underline"
      >
        {process.env.LINKEDIN_URL?.replace(/^https?:\/\//, '')}
      </a>
    </span>
  </div>
</div>


      <form
        onSubmit={handleSubmit}
        className="contact-form w-full max-w-xl bg-gray-900 p-8 rounded-xl shadow-xl flex flex-col gap-4 border border-gray-700"
      >
        {/* First + Last name inline */}
        <div className="flex gap-3 flex-col lg:flex-row">
          <input
            type="text"
            placeholder={t("contact.first_name")} 
            className="flex-1 border border-gray-700 rounded-lg p-3 bg-gray-800 text-white focus:outline-none focus:ring-2 focus:ring-gray-500"
            value={firstName}
            onChange={(e) => setFirstName(e.target.value)}
            disabled={isPending}
          />
          <input
            type="text"
            placeholder={t("contact.last_name")} 
            className="flex-1 border border-gray-700 rounded-lg p-3 bg-gray-800 text-white focus:outline-none focus:ring-2 focus:ring-gray-500"
            value={lastName}
            onChange={(e) => setLastName(e.target.value)}
            disabled={isPending}
          />
        </div>

        <input
          type="email"
          placeholder={t("contact.email")} 
          className="border border-gray-700 rounded-lg p-3 bg-gray-800 text-white focus:outline-none focus:ring-2 focus:ring-gray-500"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          disabled={isPending}
        />
        <input
          type="text"
          placeholder={t("contact.phone")} 
          className="border border-gray-700 rounded-lg p-3 bg-gray-800 text-white focus:outline-none focus:ring-2 focus:ring-gray-500"
          value={phone}
          onChange={(e) => setPhone(e.target.value)}
          disabled={isPending}
        />
        <input
          type="text"
          placeholder={t("contact.subject")} 
          className="border border-gray-700 rounded-lg p-3 bg-gray-800 text-white focus:outline-none focus:ring-2 focus:ring-gray-500"
          value={subject}
          onChange={(e) => setSubject(e.target.value)}
          disabled={isPending}
        />
        <textarea
          placeholder={t("contact.message")} 
          rows={5}
          className="border border-gray-700 rounded-lg p-3 bg-gray-800 text-white focus:outline-none focus:ring-2 focus:ring-gray-500"
          value={message}
          onChange={(e) => setMessage(e.target.value)}
          disabled={isPending}
        ></textarea>
        <button
          type="submit"
          className="bg-yellow-400 text-black px-6 py-3 rounded-lg font-medium hover:bg-yellow-300 transition"
          disabled={isPending}
        >
          {isPending ? t("contact.sending") : t("contact.send_message")}
        </button>
      </form>
    </section>
  );
}
