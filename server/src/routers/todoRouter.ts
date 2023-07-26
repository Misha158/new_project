import express from "express";
import {
  getTodos,
  createTodo,
  updateTodo,
  deleteTodo,
} from "../controllers/todoController";

const todoRouter = express.Router();

todoRouter.get("/todos", getTodos);
todoRouter.post("/todos", createTodo);
todoRouter.put("/todos/:id", updateTodo);
todoRouter.delete("/todos/:id", deleteTodo);

export default todoRouter;
