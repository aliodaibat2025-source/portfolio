"use client";

import React, { useState, useTransition } from "react";
import { useRouter } from "next/navigation";
import { toast } from "sonner";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import type { NewSkill } from "@/types";
import { newSkillSchema } from "@/app/models/db/lib/schemas/skillsSchema";

interface Props {
  action: (data: NewSkill) => Promise<{
    status: number;
    message: string;
    data?: NewSkill;
  }>;
}

export default function CreateSkillForm({ action }: Props) {
  const router = useRouter();
  const [isPending, startTransition] = useTransition();

  const [form, setForm] = useState<Omit<NewSkill, "id">>({
    name_en: "",
    name_ar: "",
    description_en: "",
    description_ar: "",
  });

  const [errors, setErrors] = useState<Record<string, string>>({});

  const handleInputChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>
  ) => {
    const { name, value } = e.target;
    setForm((prev) => ({ ...prev, [name]: value }));
    setErrors((prev) => ({ ...prev, [name]: "" }));
  };

  const handleFormSubmit = () => {
    const validation = newSkillSchema.safeParse(form);

    if (!validation.success) {
      const fieldErrors: Record<string, string> = {};
      validation.error.issues.forEach((issue) => {
        const key = issue.path[0] ?? "form";
        fieldErrors[String(key)] = issue.message;
      });
      setErrors(fieldErrors);
      toast.error("Please fill the highlighted fields.");
      return;
    }

    setErrors({});
    startTransition(async () => {
      try {
        const finalPayload: NewSkill = {
          name_en: form.name_en,
          name_ar: form.name_ar,
          description_en: form.description_en,
          description_ar: form.description_ar,
        };

        const result = await action(finalPayload);
        console.log("create skill result:", result);

        // Handle backend errors (same pattern used in your other forms)
        if (result?.status !== 200 && result?.status !== 201) {
          const msg = result.message ?? "Failed to create skill.";
          const newErrors: Record<string, string> = {};
          if (Object.keys(newErrors).length) {
            setErrors((prev) => ({ ...prev, ...newErrors }));
          }
          toast.error(msg);
          return;
        }
        toast.success("Skill created successfully!");
        setTimeout(() => {
          router.push("/admin/dashboard/skills");
        }, 800);
      } catch (err) {
        console.error(err);
        toast.error("Error In Adding The Skill");
      }
    });
  };

  return (
    <main className="ml-3 xl:ml-7 mb-10 text-gray-800">
      <div className="flex flex-col border-b border-gray-300 pb-3 w-[65vw] mb-8">
        <h1 className="text-2xl font-semibold text-[#676e32]">New Skill</h1>
      </div>

      <form
        onSubmit={(e) => {
          e.preventDefault();
          handleFormSubmit();
        }}
        className="h-full w-full lg:w-[65vw] flex flex-col gap-6"
      >
        <Card className="w-full shadow-md hover:shadow-lg transition-all duration-300">
          <CardHeader>
            <CardTitle className="text-[#676e32]">Skill Details</CardTitle>
            <CardDescription>Fill in the skill details below.</CardDescription>
          </CardHeader>

          <CardContent className="flex flex-col gap-6 mb-7">
            {/* Names */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {[
                { label: "English Name", name: "name_en", value: form.name_en },
                { label: "Arabic Name", name: "name_ar", value: form.name_ar },
              ].map((field) => (
                <div key={field.name} className="flex flex-col md:w-[90%]">
                  <label className="text-sm font-medium text-gray-700 mb-1">
                    <span className="text-red-500">*</span> {field.label}
                  </label>
                  <input
                    disabled={isPending}
                    type="text"
                    name={field.name}
                    value={field.value}
                    onChange={handleInputChange}
                    className="border border-gray-300 px-3 py-2 rounded-md text-gray-800 focus:outline-none focus:ring-2 focus:ring-[#676e32]"
                  />
                  {errors[field.name] && (
                    <p className="text-red-500 text-sm mt-1">{errors[field.name]}</p>
                  )}
                </div>
              ))}
            </div>

            {/* Descriptions */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {[
                {
                  label: "English Description",
                  name: "description_en",
                  value: form.description_en,
                },
                {
                  label: "Arabic Description",
                  name: "description_ar",
                  value: form.description_ar,
                },
              ].map((field) => (
                <div key={field.name} className="flex flex-col md:w-[90%]">
                  <label className="text-sm font-medium text-gray-700 mb-1">
                    <span className="text-red-500">*</span> {field.label}
                  </label>
                  <textarea
                    disabled={isPending}
                    name={field.name}
                    value={field.value}
                    onChange={handleInputChange}
                    className="border border-gray-300 px-3 py-2 rounded-md text-gray-800 h-[12vh] resize-none focus:outline-none focus:ring-2 focus:ring-[#676e32]"
                  />
                  {errors[field.name] && (
                    <p className="text-red-500 text-sm mt-1">{errors[field.name]}</p>
                  )}
                </div>
              ))}
            </div>

            {/* Buttons */}
            <div className="flex justify-center mt-8">
              <div className="flex gap-4">
                <button
                  disabled={isPending}
                  type="button"
                  className="px-5 py-2 rounded-md border border-gray-400 cursor-pointer text-gray-700 hover:bg-gray-100 transition"
                  onClick={() => router.replace("/admin/dashboard/skills")}
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="px-5 py-2 rounded-md bg-[#676e32] text-white cursor-pointer hover:bg-[#7b8444] transition"
                  disabled={isPending}
                >
                  {isPending ? "Adding..." : "Add Skill"}
                </button>
              </div>
            </div>
          </CardContent>
        </Card>
      </form>
    </main>
  );
}
