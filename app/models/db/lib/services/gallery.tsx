import { revalidateTag, unstable_cache } from "next/cache";
import pool from "..";
import { gallery } from "@/types/index";

export const addImage = async (data: gallery) => {
  try {
    const result = await pool.query(
      `INSERT INTO gallery
        (image) 
       VALUES ($1)
       RETURNING *`,
      [data.image]
    );

    revalidateTag("gallery", "max");
    return {
      data: result.rows[0],
      message: "Image has been added successfully",
      status: 201,
    };
  } catch (error) {
    console.log("SQL Error:", error);

    return {
      data: error,
      message: "Error in adding image",
      status: 500,
    };
  }
};

// الحصول على جميع الصور
export const getAllImages = unstable_cache(
  async () => {
    try {
      const result = await pool.query<gallery>("SELECT * FROM gallery");
      return { data: result.rows, message: "All gallery images", status: 200 };
    } catch (error) {
      return {
        data: [],
        message: "Error in getting gallery images",
        status: 500,
      };
    }
  },
  ["All-gallery-images"],
  { tags: ["gallery"], revalidate: 3600 }
);

export const getImageById = async (id: string) => {
  try {
    const result = await pool.query<gallery>(
      "SELECT * FROM gallery WHERE id=$1",
      [id]
    );
    if (!result.rows.length) {
      return { data: null, message: "Image not found", status: 404 };
    }
    return { data: result.rows[0], message: "Image fetched", status: 200 };
  } catch (error) {
    return { data: error, message: "Error in getting image", status: 500 };
  }
};

// حذف صورة حسب الـ ID
export const deleteImageById = async (id: string) => {
  try {
    const result = await pool.query(
      "DELETE FROM gallery WHERE id=$1 RETURNING *",
      [id]
    );
    revalidateTag("gallery", "max");
    if (!result.rows.length) {
      return { data: null, message: "Image not found", status: 404 };
    }

    return {
      data: result.rows[0],
      message: "Image deleted successfully",
      status: 200,
    };
  } catch (error) {
    return { data: error, message: "Error in deleting image", status: 500 };
  }
};
