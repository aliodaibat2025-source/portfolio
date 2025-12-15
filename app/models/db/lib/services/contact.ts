import pool from "..";
import { type NewEmail } from "@/types/index";

export const newEmail = async (data: NewEmail) => {
  try {
    const result = await pool.query(
      "insert into contact (first_name,last_name, email, phone_number, subject, description) values ($1,$2,$3,$4,$5,$6) ",
      [
        data.first_name,
        data.last_name,
        data.email,
        data.phone_number,
        data.subject,
        data.description,
      ]
    );
    return { data: result, message: "Email Sent Successfully", status: 201 };
  } catch (error) {
    return { data: error, message: "Error In Sending The Email", status: 500 };
  }
};

export const getAllEmails = async () => {
  try {
    const result = await pool.query<NewEmail>(
      `SELECT * FROM contact ORDER BY sent_at DESC`
    );
    return {
      data: result.rows,
      message: "Emails fetched successfully",
      status: 200,
    };
  } catch (error) {
    return { data: [], message: "Error fetching emails", status: 500 };
  }
};

export const getEmailById = async (id: string) => {
  try {
    const result = await pool.query(`SELECT * FROM contact WHERE id = $1`, [
      id,
    ]);
    if (result.rows.length === 0) {
      return { data: null, message: "Email not found", status: 404 };
    }
    return {
      data: result.rows[0],
      message: "Email fetched successfully",
      status: 200,
    };
  } catch (error) {
    return { data: error, message: "Error fetching email", status: 500 };
  }
};

export const deleteEmail = async (id: string) => {
  try {
    await pool.query(`delete  FROM contact WHERE id = $1`, [id]);

    return { data: null, message: "Email Deleted Successfully", status: 200 };
  } catch (error) {
    return { data: error, message: "Error Deleting email", status: 500 };
  }
};
