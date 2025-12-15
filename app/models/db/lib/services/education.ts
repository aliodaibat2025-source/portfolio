import { revalidateTag, unstable_cache } from "next/cache";
import pool from "..";
import { NewEducation,EducationTranslated } from "@/types/index";
type Locale = "en" | "ar";

export const addEducation = async (data: NewEducation) => {
  try {
    const result = await pool.query(
      `INSERT INTO education 
        (title_en, title_ar, description_en, description_ar, start_date, end_date, location_en, location_ar) 
       VALUES 
        ($1,$2,$3,$4,$5,$6,$7,$8)
       RETURNING *`,
      [
        data.title_en,
        data.title_ar,
        data.description_en,
        data.description_ar,
        data.start_date,
        data.end_date,
        data.location_en,
        data.location_ar,
      ]
    );

    revalidateTag("education", "default");


    return {
      data: result.rows[0],
      message: "Education Has Been Added Successfully",
      status: 201,
    };

  } catch (error) {

    return {
      data: error,
      message: "Error in Adding the Education",
      status: 500,
    };
  }
};


export const getAllEducations = unstable_cache(
  async () => {
    try {
      const result = await pool.query<NewEducation>(
        "SELECT * FROM education ORDER BY start_date ASC"
      );
      
      return { data: result.rows, message: "All Educations", status: 200 };
    } catch (error) {
      return {
        data: [],
        message: "Error In Getting All Educations",
        status: 500,
      };
    }
  },
  ["all-educations"],
  { tags: ["education"], revalidate: 3600 }
);

export const getEducationById = async (id: string) => {
  try {
    const result = await pool.query<NewEducation>("select * from education where id=$1", [
      id,
    ]);
    return { data: result.rows[0], message: "All Educations", status: 200 };
  } catch (error) {
    return {
      data: error,
      message: "Error In Getting All Educations",
      status: 500,
    };
  }
};

export const deleteEducationsByDelete = async (id: string) => {
  try {
    const result = await pool.query("DELETE  from education where id=$1", [
      id,
    ]);
    revalidateTag("education", "default");

    return {
      data: result.rows,
      message: "Education Deleted Successfully",
      status: 200,
    };
  } catch (error) {
    return {
      data: error,
      message: "Error In Deleteing Education",
      status: 500,
    };
  }
};

export const editEducation = async (
  id: string,
  modifiedEducation: Partial<NewEducation>
) => {
  try {
    const isValidId = await pool.query("SELECT * FROM education WHERE id=$1", [
      id,
    ]);

    if (isValidId.rows.length === 0) {
      return {
        data: null,
        message: "Education Not Found",
        status: 404,
      };
    }

    const result = await pool.query<NewEducation>(
      `UPDATE education 
       SET 
        title_en = COALESCE($2, title_en),
        title_ar = COALESCE($3, title_ar),
        description_en = COALESCE($4, description_en),
        description_ar = COALESCE($5, description_ar),
        start_date = COALESCE($6, start_date),
        end_date = COALESCE($7, end_date),
        location_en = COALESCE($8, location_en),
        location_ar = COALESCE($9, location_ar)
       WHERE id = $1
       RETURNING *`,
      [
        id,
        modifiedEducation.title_en,
        modifiedEducation.title_ar,
        modifiedEducation.description_en,
        modifiedEducation.description_ar,
        modifiedEducation.start_date,
        modifiedEducation.end_date,
        modifiedEducation.location_en,
        modifiedEducation.location_ar,
      ]
    );

    revalidateTag("education", "default");
    return {
      data: result.rows[0],
      message: "Education Updated Successfully",
      status: 201,
    };

  } catch (error) {
    console.log("errpr: ",error);
    
    return {
      data: null,
      message: "Error In Editing The Eduaction",
      status: 500,
    };
  }
};


export const getEducationByLocale = async (locale: Locale) => {
  const result = await getAllEducations();

  if (!result || !result.data) return null;

  const localizedEducation = result.data.map((education: NewEducation) => ({
    start_date:education.start_date,
    end_date:education.end_date, 
    title: locale === "ar" ? education.title_ar : education.title_en,
    description: locale === "ar" ? education.description_ar : education.description_en,
    location: locale === "ar" ? education.location_ar : education.location_en,
  }));

  return {
    data: localizedEducation as EducationTranslated[] ,
    message: result.message,
    status: result.status,
  };
};
