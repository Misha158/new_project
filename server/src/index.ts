import express, { Request, Response } from "express";
import postRouter from "./routers/postRouter";
import mysql2 from "mysql2";

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

// Используем маршрутизатор для постов
app.use("/posts", postRouter);

app.listen(port, () => {
  console.log(`Сервер запущен на порту ${port}`);
});
