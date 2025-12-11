import {z} from "zod"
export const newExperienceSchema = z
  .object({
    positions_en: z.string().min(1, "English position is required"),
    positions_ar: z.string().min(1, "Arabic position is required"),
    description_en: z.string().min(1, "English description is required"),
    description_ar: z.string().min(1, "Arabic description is required"),
    start_date: z.date(),
    end_date: z.date().nullable().optional(),
    location_en: z.string().min(1, "English location is required"),
    location_ar: z.string().min(1, "Arabic location is required"),
    current_job: z.boolean(),
  })
  .refine(
    (data) =>
      data.current_job ||
      (data.end_date !== null &&
        data.end_date !== undefined &&
        data.end_date >= data.start_date),
    {
      message:
        "End date must be the same or after start date, or mark as current job",
      path: ["end_date"],
    }
  );