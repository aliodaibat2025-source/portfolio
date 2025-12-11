"use client";

import React, { useState, useTransition } from "react";
import { useRouter } from "next/navigation";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { toast } from "sonner";
import type { NewExperience } from "@/types";
import {newExperienceSchema} from "@/app/models/db/lib/schemas/experienceSchema"
interface Props {
  experience: NewExperience;
  action: (experienceId: string, data: NewExperience) => Promise<{
    status: number;
    message: string;
    data?: NewExperience;
  }>;
}



export default function EditExperienceForm({ experience, action }: Props) {
  const router = useRouter();
  const [isPending, startTransition] = useTransition();

  // initialize start/end as Date objects (or null)
  const initialStart =
    experience.start_date ? new Date(experience.start_date) : new Date();
  const initialEnd =
    experience.end_date && !experience.current_job
      ? new Date(experience.end_date)
      : new Date();

  const [form, setForm] = useState<
    Omit<NewExperience, "end_date"> & { end_date: Date | null }
  >({
    id: experience.id,
    positions_en: experience.positions_en ?? "",
    positions_ar: experience.positions_ar ?? "",
    description_en: experience.description_en ?? "",
    description_ar: experience.description_ar ?? "",
    start_date: initialStart,
    end_date: experience.current_job ? null : initialEnd,
    location_en: experience.location_en ?? "",
    location_ar: experience.location_ar ?? "",
    current_job: Boolean(experience.current_job),
  });

  const [errors, setErrors] = useState<Record<string, string>>({});

  // Generic input handler for text/textarea
  const handleInputChange = (
    e: React.ChangeEvent<
      HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement
    >
  ) => {
    const { name, value, type, checked } = e.target as HTMLInputElement;

    if (type === "checkbox" && name === "current_job") {
      const isCurrent = checked;
      setForm((prev) => ({
        ...prev,
        current_job: isCurrent,
        end_date: isCurrent ? null : prev.end_date ?? new Date(),
      }));
      setErrors((prev) => ({ ...prev, current_job: "" }));
      return;
    }

    setForm((prev) => ({ ...prev, [name]: value }));
    setErrors((prev) => ({ ...prev, [name]: "" }));
  };

  // Month input change (value looks like "2025-12")
  const handleMonthChange = (name: "start_date" | "end_date", value: string) => {
    const date = value ? new Date(`${value}-01T00:00:00`) : null;
    setForm((prev) => ({ ...prev, [name]: date }));
    setErrors((prev) => ({ ...prev, [name]: "" }));
  };

 const handleFormSubmit = () => {
  // -----------------------------------------
  // 1) Build clean payload for Zod validation
  // -----------------------------------------
  const payloadForValidation = {
    ...form,
    start_date:
      form.start_date instanceof Date ? form.start_date : new Date(),
    end_date:
      form.current_job
        ? null
        : form.end_date instanceof Date
        ? form.end_date
        : null,
    current_job: Boolean(form.current_job),
  };

  const validation = newExperienceSchema.safeParse(payloadForValidation);

  if (!validation.success) {
    const fieldErrors: Record<string, string> = {};

    validation.error.issues.forEach((err) => {
      const key = (err.path && err.path[0]) || "form";
      fieldErrors[String(key)] = err.message;
    });

    setErrors(fieldErrors);
    toast.error("Please fix the highlighted fields.");
    return;
  }

  // validation passed
  setErrors({});

  // -----------------------------------------
  // 2) Submit to server
  // -----------------------------------------
  startTransition(async () => {
    try {
      const finalPayload: NewExperience = {
        id: form.id,
        positions_en: form.positions_en,
        positions_ar: form.positions_ar,
        description_en: form.description_en,
        description_ar: form.description_ar,
        start_date: form.start_date as Date,
        end_date: form.current_job ? null : (form.end_date as Date | null),
        location_en: form.location_en,
        location_ar: form.location_ar,
        current_job: form.current_job,
      };

      const result = await action(form.id ?? "", finalPayload);
console.log("result: ",result);

      // -----------------------------------------
      // 3) Handle backend error responses
      // -----------------------------------------
      if (result?.status !== 200) {
        if (result.status === 400) {
          // Specific rule: user already has current job
          if (result.message?.toLowerCase().includes("current job")) {
            setErrors((prev) => ({
              ...prev,
              current_job: result.message,
            }));
          }
        }

        toast.error(result.message || "Failed to update experience.");
        return;
      }

      // -----------------------------------------
      // 4) Success
      // -----------------------------------------
      toast.success("Experience updated successfully!");

      setTimeout(() => {
        router.replace("/dashboard/experiences");
      }, 800);

    } catch (err) {
      console.error(err);
      toast.error("Something went wrong while updating.");
    }
  });
};


  return (
    <main className="ml-3 xl:ml-7 mb-10 text-gray-800">
      <div className="flex flex-col border-b border-gray-300 pb-3 w-[65vw] mb-8">
        <h1 className="text-2xl font-semibold text-black">Edit Experience</h1>
        <p className="text-sm text-gray-600 mt-1">ID: {experience.id}</p>
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
            <CardTitle className="text-black">Experience Details</CardTitle>
            <CardDescription>Update the experience details below.</CardDescription>
          </CardHeader>

          <CardContent className="flex flex-col gap-6 mb-7">
            {/* Positions */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {[
                {
                  label: "English Position",
                  name: "positions_en",
                  value: form.positions_en,
                },
                {
                  label: "Arabic Position",
                  name: "positions_ar",
                  value: form.positions_ar,
                },
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
                    className="border border-gray-300 px-3 py-2 rounded-md text-gray-800 focus:outline-none focus:ring-2 focus:ring-black"
                  />
                  {errors[field.name] && (
                    <p className="text-red-500 text-sm mt-1">{errors[field.name]}</p>
                  )}
                </div>
              ))}
            </div>

            {/* Location */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {[
                {
                  label: "English Location",
                  name: "location_en",
                  value: form.location_en,
                },
                {
                  label: "Arabic Location",
                  name: "location_ar",
                  value: form.location_ar,
                },
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
                    className="border border-gray-300 px-3 py-2 rounded-md text-gray-800 focus:outline-none focus:ring-2 focus:ring-black"
                  />
                  {errors[field.name] && (
                    <p className="text-red-500 text-sm mt-1">{errors[field.name]}</p>
                  )}
                </div>
              ))}
            </div>

            {/* Dates (month inputs) */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 items-end">
              <div className="flex flex-col md:w-[90%]">
                <label className="text-sm font-medium text-gray-700 mb-1">
                  <span className="text-red-500">*</span> Start (Year &amp; Month)
                </label>
                <input
                  disabled={isPending}
                  type="month"
                  name="start_date"
                  value={
                    form.start_date ? (form.start_date as Date).toISOString().slice(0, 7) : ""
                  }
                  onChange={(e) => handleMonthChange("start_date", e.target.value)}
                  className="border border-gray-300 px-3 py-2 rounded-md text-gray-800 focus:outline-none focus:ring-2 focus:ring-black"
                />
                {errors.start_date && (
                  <p className="text-red-500 text-sm mt-1">{errors.start_date}</p>
                )}
              </div>

              <div className="flex flex-col md:w-[90%]">
                <div className="flex items-center justify-between mb-1">
                  <label className="text-sm font-medium text-gray-700">End (Year &amp; Month)</label>
                  <div className="flex items-center gap-2">
                    <input
                      id="current_job"
                      name="current_job"
                      type="checkbox"
                      checked={form.current_job}
                      disabled={isPending}
                      onChange={handleInputChange}
                    />
                    <label htmlFor="current_job" className="text-sm text-gray-700">
                      Current Job
                    </label>
                  </div>
                </div>

                <input
                  disabled={isPending || form.current_job}
                  type="month"
                  name="end_date"
                  value={
                    form.end_date && !form.current_job
                      ? (form.end_date as Date).toISOString().slice(0, 7)
                      : ""
                  }
                  onChange={(e) => handleMonthChange("end_date", e.target.value)}
                  className={`border border-gray-300 px-3 py-2 rounded-md text-gray-800 focus:outline-none focus:ring-2 focus:ring-black ${
                    form.current_job ? "bg-gray-100 cursor-not-allowed" : ""
                  }`}
                />
                {errors.end_date && (
                  <p className="text-red-500 text-sm mt-1">{errors.end_date}</p>
                )}
              </div>
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
                    className="border border-gray-300 px-3 py-2 rounded-md text-gray-800 h-[12vh] resize-none focus:outline-none focus:ring-2 focus:ring-black"
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
                  onClick={() => router.replace("/admin/dashboard/experience")}
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="px-5 py-2 rounded-md bg-black text-white cursor-pointer hover:bg-gray-800 transition"
                  disabled={isPending}
                >
                  {isPending ? "Saving..." : "Save Changes"}
                </button>
              </div>
            </div>
          </CardContent>
        </Card>
      </form>
    </main>
  );
}
