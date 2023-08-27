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

app.listen(port, () => {
  console.log(`Сервер запущен на порту ${port}`);
});
