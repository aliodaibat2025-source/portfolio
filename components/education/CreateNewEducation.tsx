"use client";

import React, { useState, useTransition } from "react";
import { useRouter } from "next/navigation";
import { NewEducation } from "@/types";
import { newEducationSchema } from "@/app/models/db/lib/schemas/educationSchema";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { toast } from "sonner";

interface Props {
  action: (data: NewEducation) => Promise<{
    status: number;
    message: string;
    data?: NewEducation;
  }>;
}

export default function CreateEducationForm({ action }: Props) {
  const router = useRouter();
  const [isPending, startTransition] = useTransition();

  const [form, setForm] = useState<
   NewEducation
  >({
    title_en: "",
    title_ar: "",
    description_en: "",
    description_ar: "",
    start_date: new Date(),
    end_date: new Date(),
    location_en: "",
    location_ar: "",
  });

  const [errors, setErrors] = useState<Record<string, string>>({});

  const handleInputChange = (
    e: React.ChangeEvent<
      HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement
    >
  ) => {
    const { name, value } = e.target as HTMLInputElement;

    setForm((prev) => ({ ...prev, [name]: value }));
    setErrors((prev) => ({ ...prev, [name]: "" }));
  };

  const handleMonthChange = (
    name: "start_date" | "end_date",
    value: string
  ) => {
    const date = value ? new Date(`${value}-01T00:00:00`) : null;
    setForm((prev) => ({ ...prev, [name]: date }));
    setErrors((prev) => ({ ...prev, [name]: "" }));
  };

  const handleFormSubmit = () => {
    const payloadForValidation = {
      ...form,
      start_date:
        form.start_date instanceof Date ? form.start_date : new Date(),
      end_date:  form.end_date instanceof Date
        ? form.end_date
        : new Date(),
    };

    const validation = newEducationSchema.safeParse(payloadForValidation);

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

    setErrors({});
    startTransition(async () => {
      try {
        const finalPayload: NewEducation = {
          title_en: form.title_en,
          title_ar: form.title_ar,
          description_en: form.description_en,
          description_ar: form.description_ar,
          start_date: form.start_date as Date,
          end_date:  (form.end_date as Date),
          location_en: form.location_en,
          location_ar: form.location_ar
        };

        const result = await action(finalPayload);
        if (result?.status !== 200) {
          toast.error(result.message || "Failed to create education.");
          return;
        }

        // Success
        toast.success("education created successfully!");
        
        setTimeout(() =>{
            router.replace("/admin/dashboard/education");
  router.refresh();
        }
            , 800);
      } catch (err) {
        console.error(err);
        toast.error("Something went wrong while creating education.");
      }
    });
  };

  return (
    <main className="ml-3 xl:ml-7 mb-10 text-gray-800">
      <div className="flex flex-col border-b border-gray-300 pb-3 w-[65vw] mb-8">
        <h1 className="text-2xl font-semibold text-black">New Education</h1>
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
            <CardTitle className="text-black">Education Details</CardTitle>
            <CardDescription>
              Fill in the education details below.
            </CardDescription>
          </CardHeader>

          <CardContent className="flex flex-col gap-6 mb-7">
            {/* Title */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {[
                {
                  label: "English Title",
                  name: "title_en",
                  value: form.title_en,
                },
                {
                  label: "Arabic Title",
                  name: "title_ar",
                  value: form.title_ar,
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
                    <p className="text-red-500 text-sm mt-1">
                      {errors[field.name]}
                    </p>
                  )}
                </div>
              ))}
            </div>

            {/* Locations */}
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
                    <p className="text-red-500 text-sm mt-1">
                      {errors[field.name]}
                    </p>
                  )}
                </div>
              ))}
            </div>

            {/* Dates */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 items-end">
              <div className="flex flex-col md:w-[90%]">
                <label className="text-sm font-medium text-gray-700 mb-1">
                  <span className="text-red-500">*</span> Start (Year &amp;
                  Month)
                </label>
                <input
                  disabled={isPending}
                  type="month"
                  name="start_date"
                  value={form.start_date?.toISOString().slice(0, 7) || ""}
                  onChange={(e) =>
                    handleMonthChange("start_date", e.target.value)
                  }
                  className="border border-gray-300 px-3 py-2 rounded-md text-gray-800 focus:outline-none focus:ring-2 focus:ring-black"
                />
                {errors.start_date && (
                  <p className="text-red-500 text-sm mt-1">
                    {errors.start_date}
                  </p>
                )}
              </div>

              <div className="flex flex-col md:w-[90%]">
                <div className="flex items-center justify-between mb-1">
                  <label className="text-sm font-medium text-gray-700">
                    End (Year &amp; Month)
                  </label>
                </div>

                <input
                  disabled={isPending}
                  type="month"
                  name="end_date"
                  value={ form.end_date!.toISOString().slice(0, 7)}
                  onChange={(e) =>
                    handleMonthChange("end_date", e.target.value)
                  }
                  className={`border border-gray-300 px-3 py-2 rounded-md text-gray-800 focus:outline-none focus:ring-2 focus:ring-black`}
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
                    <p className="text-red-500 text-sm mt-1">
                      {errors[field.name]}
                    </p>
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
                  onClick={() => router.replace("/admin/dashboard/education")}
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="px-5 py-2 rounded-md bg-black text-white cursor-pointer hover:bg-gray-800 transition"
                  disabled={isPending}
                >
                  {isPending ? "Adding..." : "Add Education"}
                </button>
              </div>
            </div>
          </CardContent>
        </Card>
      </form>
    </main>
  );
}
