import { Request, Response } from "express";
import { pool } from "../index";
import { getAllTodosService } from "../services/todoService";

export async function getTodos(req: Request, res: Response) {
  try {
    const todos = await getAllTodosService();

    res.status(200).json(todos);
  } catch (err) {
    res.status(500).send("Произошла ошибка при получении записей.");
  }
}

export async function createTodo(req: Request, res: Response) {
  const text = req.body.text;

  // SQL-запрос для вставки новой записи
  const sqlInsert = "INSERT INTO todoTable (text) VALUES (?)";
  const sqlSelect = "SELECT * FROM todoTable WHERE id = LAST_INSERT_ID()";

  pool.query(sqlInsert, [text], (err, result) => {
    if (err) {
      console.error("Ошибка выполнения запроса: ", err);
      res.status(500).send("Произошла ошибка при добавлении записи.");
      return;
    }

    pool.query(sqlSelect, (err, result) => {
      if (err) {
        console.error("Ошибка выполнения запроса: ", err);
        res.status(500).send("Произошла ошибка при получении новой записи.");
        return;
      }

      // @ts-ignore
      const newTodo = result[0];
      console.log("Новая запись успешно добавлена!");
      res.status(200).send(newTodo); // Возвращаем новую запись в ответе
    });
  });
}

export async function updateTodo(req: Request, res: Response) {
  const id = req.params.id;

  // const { id, text, age, status } = req.body;

  const { text } = req.body;
  console.log("text", text);
  // Проверяем, есть ли обязательное поле id в запросе
  if (!id) {
    res.status(400).send("Не указан обязательный параметр id.");
    return;
  }

  // Генерируем динамический SQL-запрос для обновления записи по указанному id
  // const sql = "UPDATE todoTable SET text = ?, age = ?, status = ? WHERE id = ?";
  const sql = "UPDATE todoTable SET text = ? WHERE id = ?";

  pool.query(sql, [text, id], (err, result) => {
    if (err) {
      console.error("Ошибка выполнения запроса: ", err);
      res.status(500).send("Произошла ошибка при обновлении записи.");
      return;
    }

    // @ts-ignore
    if (result.affectedRows === 0) {
      res.status(404).send("Запись с указанным id не найдена.");
      return;
    }

    console.log("Запись успешно обновлена!");
    res.status(200).send("Запись успешно обновлена!");
  });
}

export async function deleteTodo(req: Request, res: Response) {
  const id = req.params.id;

  // Проверяем, есть ли обязательное параметр id в запросе
  if (!id) {
    res.status(400).send("Не указан обязательный параметр id.");
    return;
  }

  // SQL-запрос для удаления записи по указанному id
  const sql = "DELETE FROM todoTable WHERE id = ?";

  pool.query(sql, [id], (err, result) => {
    if (err) {
      console.error("Ошибка выполнения запроса: ", err);
      res.status(500).send("Произошла ошибка при удалении записи.");
      return;
    }

    // @ts-ignore
    if (result.affectedRows === 0) {
      res.status(404).send("Запись с указанным id не найдена.");
      return;
    }

    console.log("Запись успешно удалена!");
    res.status(200).send("Запись успешно удалена!");
  });
}
