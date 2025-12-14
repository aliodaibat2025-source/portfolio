import { revalidateTag, unstable_cache } from "next/cache";
import pool from "..";
import { type NewExperience,ExperienceTranslated } from "@/types/index";

type Locale = "en" | "ar";


export const addExperience = async (data: NewExperience) => {
  try {
    const result = await pool.query(
      `INSERT INTO experience 
        (positions_en, positions_ar, description_en, description_ar, start_date, end_date, location_en, location_ar, current_job) 
       VALUES 
        ($1,$2,$3,$4,$5,$6,$7,$8,$9)
       RETURNING *`,
      [
        data.positions_en,
        data.positions_ar,
        data.description_en,
        data.description_ar,
        data.start_date,
        data.end_date,
        data.location_en,
        data.location_ar,
        data.current_job
      ]
    );
   revalidateTag("experiences","max");

    return {
      data: result.rows,
      message: "Experience Has Been Added Successfully",
      status: 201,
    };

  } catch (error: any) {
    console.log("SQL Error:", error);

    // Only one current job
    if (error.code === "23505" && error.constraint === "only_one_current_job") {
      return {
        data: null,
        message: "You already have a current job. Please end it before adding a new one.",
        status: 400,
      };
    }

    return {
      data: error,
      message: "Error in Adding the Experience",
      status: 500,
    };
  }
};


export const getAllExperiences = unstable_cache(
  async () => {
    try {
      const result = await pool.query<NewExperience>(
        "SELECT * FROM experience ORDER BY start_date ASC"
      );
      return { data: result.rows, message: "All Experiences", status: 200 };
    } catch (error) {
      return {
        data: error,
        message: "Error In Getting All Experiences",
        status: 500,
      };
    }
  },
  ["all-experiences"],
  { tags: ["experiences"], revalidate: 3600 }
);

export const getAllExperienceById = async (id: string) => {
  try {
    const result = await pool.query<NewExperience>("select * from experience where id=$1", [
      id,
    ]);
    return { data: result.rows[0], message: "All Experiences", status: 200 };
  } catch (error) {
    return {
      data: error,
      message: "Error In Getting All Experiences",
      status: 500,
    };
  }
};

export const deleteExperienceByDelete = async (id: string) => {
  try {
    const result = await pool.query("DELETE  from experience where id=$1", [
      id,
    ]);
    revalidateTag("experiences","max");
    return {
      data: result.rows,
      message: "Experience Deleted Successfully",
      status: 200,
    };
  } catch (error) {
    return {
      data: error,
      message: "Error In Deleteing Experience",
      status: 500,
    };
  }
};

export const editExperience = async (
  id: string,
  modifiedexperience: Partial<NewExperience>
) => {
  try {
    const isValidId = await pool.query("SELECT * FROM experience WHERE id=$1", [
      id,
    ]);

    if (isValidId.rows.length === 0) {
      return {
        data: null,
        message: "Experience Not Found",
        status: 404,
      };
    }

    const result = await pool.query<NewExperience>(
      `UPDATE experience 
       SET 
        positions_en = COALESCE($2, positions_en),
        positions_ar = COALESCE($3, positions_ar),
        description_en = COALESCE($4, description_en),
        description_ar = COALESCE($5, description_ar),
        start_date = COALESCE($6, start_date),
        end_date = COALESCE($7, end_date),
        location_en = COALESCE($8, location_en),
        location_ar = COALESCE($9, location_ar),
        current_job = COALESCE($10, current_job)
       WHERE id = $1
       RETURNING *`,
      [
        id,
        modifiedexperience.positions_en,
        modifiedexperience.positions_ar,
        modifiedexperience.description_en,
        modifiedexperience.description_ar,
        modifiedexperience.start_date,
        modifiedexperience.end_date,
        modifiedexperience.location_en,
        modifiedexperience.location_ar,
        modifiedexperience.current_job,
      ]
    );

   revalidateTag("experiences","max");

    return {
      data: result.rows,
      message: "Experience Updated Successfully",
      status: 201,
    };

  } catch (error: any) {
    console.log("SQL Error:", error);

    // 🌟 Unique constraint violation (Only one current job)
    if (error.code === "23505" && error.constraint === "only_one_current_job") {
      return {
        data: null,
        message: "You already have another current job. End it before setting this one as current.",
        status: 400,
      };
    }

    return {
      data: error,
      message: "Error In Editing The Experience",
      status: 500,
    };
  }
};



export const getExperiencebyLocale = async (locale: Locale) => {
  const result = await getAllExperiences();

  if (!result || !result.data) return null;

  const localizedExperience = result.data.map((experience: ExperienceTranslated) => ({
    ...experience, 
    positions: locale === "ar" ? experience.positions_ar : experience.positions_en,
    description: locale === "ar" ? experience.description_ar : experience.description_en,

    location: locale === "ar" ? experience.location_ar : experience.location_en,
  }));

  return {
    data: localizedExperience,
    message: result.message,
    status: result.status,
  };
};
