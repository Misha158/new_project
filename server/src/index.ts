import express from "express";
import cors from "cors";

import postRouter from "./routers/postRouter";
import advertisementRouter from "./routers/advertisementRouter";
import { Sequelize } from "sequelize-typescript";
import Campaign from "./Models/Campaign";
import LineItem from "./Models/LineItem";
import Ad from "./Models/Ad";
import { sequelizeConfig } from "./config";

const app = express();
const port = 3000;

export const sequelize = new Sequelize(sequelizeConfig);

const connectToDataBase = async () => {
  try {
    await sequelize.authenticate();
    console.log("Connection has been established successfully.");
  } catch (error) {
    console.error("Unable to connect to the database:", error);
  }
};

connectToDataBase();

sequelize.addModels([Campaign, LineItem, Ad]); // Добавление модели в список моделей Sequelize

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
// Разрешаем запросы с разных доменов
app.use(cors());

// Используем маршрутизатор для постов
app.use("/posts", postRouter);
app.use("/advertisement", advertisementRouter);

const defaultOptions = [
  {
    value: "jack-1",
    label: "Jack-1",
  },
  {
    value: "lucy-1",
    label: "Lucy-1",
  },
  {
    value: "tom-1",
    label: "Tom-1",
  },
];

app.get("/options", (req, res) => {
  const search = req.query?.search as string;

  if (search) {
    setTimeout(() => {
      res.json(defaultOptions.filter((option) => option.value.includes(search)));
    }, 1000); // Задержка в миллисекундах (1 секунда)
    return;
  }

  setTimeout(() => {
    res.json(defaultOptions);
  }, 1000); // Задержка в миллисекундах (1 секунда)
});

app.listen(port, () => {
  console.log(`Сервер запущен на порту ${port}`);
});
