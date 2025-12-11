import { revalidateTag, unstable_cache } from "next/cache";
import pool from ".."; 
import { NewSkill } from "@/types/index";


export const addSkill = async (data: NewSkill) => {
  try {
    const result = await pool.query(
      `INSERT INTO skills 
        (name_en, name_ar, description_en, description_ar) 
       VALUES ($1,$2,$3,$4)
       RETURNING *`,
      [data.name_en, data.name_ar, data.description_en, data.description_ar]
    );

    revalidateTag("skills");

    return {
      data: result.rows[0],
      message: "Skill has been added successfully",
      status: 201,
    };

  } catch (error) {
    console.log("SQL Error:", error);

    return {
      data: error,
      message: "Error in adding skill",
      status: 500,
    };
  }
};


export const getAllSkills = unstable_cache(
  async () => {
    try {
      const result = await pool.query<NewSkill>(
        "SELECT * FROM skills "
      );
      return { data: result.rows, message: "All Skills", status: 200 };
    } catch (error) {
      return { data: error, message: "Error in getting all skills", status: 500 };
    }
  },
  ["all-skills"],
  { tags: ["skills"], revalidate: 3600 }
);


export const getSkillById = async (id: string) => {
  try {
    const result = await pool.query<NewSkill>(
      "SELECT * FROM skills WHERE id=$1",
      [id]
    );
    if (!result.rows.length) {
      return { data: null, message: "Skill not found", status: 404 };
    }
    return { data: result.rows[0], message: "Skill fetched", status: 200 };
  } catch (error) {
    return { data: error, message: "Error in getting skill", status: 500 };
  }
};


export const deleteSkillById = async (id: string) => {
  try {
    const result = await pool.query("DELETE FROM skills WHERE id=$1 RETURNING *", [
      id,
    ]);
    revalidateTag("skills");

    if (!result.rows.length) {
      return { data: null, message: "Skill not found", status: 404 };
    }

    return {
      data: result.rows[0],
      message: "Skill deleted successfully",
      status: 200,
    };
  } catch (error) {
    return { data: error, message: "Error in deleting skill", status: 500 };
  }
};

export const editSkill = async (
  id: string,
  modifiedSkill: Partial<NewSkill>
) => {
  try {
    const isValidId = await pool.query("SELECT * FROM skills WHERE id=$1", [id]);
    if (!isValidId.rows.length) {
      return { data: null, message: "Skill not found", status: 404 };
    }

    const result = await pool.query<NewSkill>(
      `UPDATE skills 
       SET 
         name_en = COALESCE($2, name_en),
         name_ar = COALESCE($3, name_ar),
         description_en = COALESCE($4, description_en),
         description_ar = COALESCE($5, description_ar)
       WHERE id=$1
       RETURNING *`,
      [
        id,
        modifiedSkill.name_en,
        modifiedSkill.name_ar,
        modifiedSkill.description_en,
        modifiedSkill.description_ar,
      ]
    );

    revalidateTag("skills");

    return { data: result.rows[0], message: "Skill updated successfully", status: 200 };

  } catch (error) {

    return { data: null, message: "Error in editing skill", status: 500 };
  }
};
