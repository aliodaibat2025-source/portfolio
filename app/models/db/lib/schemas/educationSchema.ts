import {z} from "zod"
export const newEducationSchema = z
  .object({
    title_en: z.string().min(1, "English Title is required"),
    title_ar: z.string().min(1, "Arabic Title is required"),
    description_en: z.string().min(1, "English description is required"),
    description_ar: z.string().min(1, "Arabic description is required"),
    start_date: z.date(),
    end_date: z.date().nullable().optional(),
    location_en: z.string().min(1, "English location is required"),
    location_ar: z.string().min(1, "Arabic location is required"),
  })
 