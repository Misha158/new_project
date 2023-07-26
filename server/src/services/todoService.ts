import { pool } from "../index";

export const getAllTodosService = async () => {
  const sql = "SELECT * FROM todoTable";

  try {
    const [rows, fields] = await pool.promise().query(sql);

    return rows;
  } catch (err) {
    throw err;
  }
};
