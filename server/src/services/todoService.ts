import { pool } from "../index";

class TodoService {
  getAllTodos = async () => {
    const sql = "SELECT * FROM todoTable";

    try {
      const [rows, fields] = await pool.promise().query(sql);

      return rows;
    } catch (err) {
      throw err;
    }
  };

  createTodo = async (text: string) => {
    const sqlInsert = "INSERT INTO todoTable (text) VALUES (?)";
    const sqlSelect = "SELECT * FROM todoTable WHERE id = LAST_INSERT_ID()";

    try {
      await pool.promise().query(sqlInsert, [text]);
      const [rows, fields] = await pool.promise().query(sqlSelect);
      // @ts-ignore
      return rows[0];
    } catch (err) {
      throw err;
    }
  };

  updateTodo = async (text: string, id: string) => {
    const sqlUpdate = "UPDATE todoTable SET text = ? WHERE id = ?";
    const sqlSelect = `SELECT * FROM todoTable WHERE id = ${id}`;

    try {
      await pool.promise().query(sqlUpdate, [text, id]);
      const [rows, fields] = await pool.promise().query(sqlSelect);
      // @ts-ignore
      return rows[0];
    } catch (err) {
      throw err;
    }
  };

  deleteTodo = async (id: string) => {
    const sqlDelete = "DELETE FROM todoTable WHERE id = ?";
    const sqlSelect = `SELECT * FROM todoTable WHERE id = ${id}`;

    try {
      const [rows, fields] = await pool.promise().query(sqlSelect);
      await pool.promise().query(sqlDelete, [id]);
      // @ts-ignore
      return rows[0];
    } catch (err) {
      throw err;
    }
  };
}

export default new TodoService();
