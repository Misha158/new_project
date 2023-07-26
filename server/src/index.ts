import express, { Request, Response } from "express";
import postRouter from "./routers/postRouter";
import mysql2 from "mysql2";
import cors from "cors";

const app = express();
const port = 3000;

const dbConfig = {
  host: "localhost",
  user: "root", // замените на имя пользователя MySQL
  password: "", // замените на пароль пользователя MySQL
  database: "misha", // замените на имя вашей базы данных MySQL
};

// Создаем пул подключения к базе данных
const pool = mysql2.createPool(dbConfig);

// Проверка подключения к базе данных
pool.getConnection((err, connection) => {
  if (err) {
    console.error("Ошибка подключения к базе данных:", err);
    return;
  }
  console.log("Успешное подключение к базе данных!");
  connection.release(); // Возвращаем соединение в пул
});

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
// Разрешаем запросы с разных доменов
app.use(cors());

app.get("/", (req: Request, res: Response) => {
  // Пример запроса к базе данных
  pool.query("SELECT * FROM mishatable", (err, results) => {
    if (err) {
      console.error("Ошибка при выполнении запроса:", err);
      res.status(500).send("Ошибка сервера");
    } else {
      res.json(results);
    }
  });

  // res.send("Привет, MISHA это простой сервер на Node.js с использованием Express и TypeScript!");
});

// Create table
app.get("/createTable", (req: Request, res: Response) => {
  // Пример запроса к базе данных
  pool.query(
    "CREATE TABLE todoTable (id INT AUTO_INCREMENT PRIMARY KEY, text VARCHAR(655))",
    (err, results) => {
      if (err) {
        console.error("Ошибка при выполнении запроса:", err);
        res.status(500).send("Ошибка сервера");
      } else {
        res.json(results);
      }
    }
  );
});

// Add data to table
app.get("/addDataToDB", (req: Request, res: Response) => {
  // Пример запроса к базе данных
  pool.query(
    "INSERT INTO todoTable (text) VALUES ('Запись 4'), ('Запись 5'), ('Запись 6'), ('Запись 7')",
    (err, results) => {
      if (err) {
        console.error("Ошибка при выполнении запроса:", err);
        res.status(500).send("Ошибка сервера");
      } else {
        res.json(results);
      }
    }
  );
});

// Add data to table
// app.post("/addNewTodo", (req: Request, res: Response) => {
//   const text = req.body.text;
//
//   // SQL-запрос для вставки новой записи
//   const sql = "INSERT INTO todoTable (text) VALUES (?)";
//
//   pool.query(sql, [text], (err, result) => {
//     if (err) {
//       console.error("Ошибка выполнения запроса: ", err);
//       res.status(500).send("Произошла ошибка при добавлении записи.");
//       return;
//     }
//
//     console.log("Новая запись успешно добавлена!");
//     res.status(200).send("Новая запись успешно добавлена!");
//   });
// });

app.post("/addNewTodo", (req: Request, res: Response) => {
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
});

// Get all todos
app.get("/getAllTodos", (req: Request, res: Response) => {
  // SQL-запрос для получения всех записей из todoTable
  const sql = "SELECT * FROM todoTable";

  pool.query(sql, (err, result) => {
    if (err) {
      console.error("Ошибка выполнения запроса: ", err);
      res.status(500).send("Произошла ошибка при получении записей.");
      return;
    }

    console.log("Записи успешно получены!");
    res.status(200).json(result);
  });
});

app.put("/updateTodo/:id", (req: Request, res: Response) => {
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
});

app.delete("/deleteTodo/:id", (req: Request, res: Response) => {
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
});

// Используем маршрутизатор для постов
app.use("/posts", postRouter);

app.listen(port, () => {
  console.log(`Сервер запущен на порту ${port}`);
});
