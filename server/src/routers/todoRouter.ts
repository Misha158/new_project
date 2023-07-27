import express from "express";
import TodoController from "../controllers/todoController";

const todoRouter = express.Router();

todoRouter.get("/todos", TodoController.getTodos);
todoRouter.post("/todos", TodoController.createTodo);
todoRouter.put("/todos/:id", TodoController.updateTodo);
todoRouter.delete("/todos/:id", TodoController.deleteTodo);

export default todoRouter;
