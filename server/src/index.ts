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

// Используем маршрутизатор для постов
app.use("/posts", postRouter);

app.listen(port, () => {
  console.log(`Сервер запущен на порту ${port}`);
});
