import { Request, Response } from "express";
import TodoService from "../services/todoService";

class TodoController {
  getTodos = async (req: Request, res: Response) => {
    try {
      const todos = await TodoService.getAllTodos();

      res.status(200).json(todos);
    } catch (err) {
      res.status(500).send("Произошла ошибка при получении записей.");
    }
  };

  createTodo = async (req: Request, res: Response) => {
    const text = req.body.text;

    try {
      const newTodo = await TodoService.createTodo(text);
      res.status(200).json(newTodo);
    } catch (err) {
      res.status(500).send("Произошла ошибка при добавлении записи.");
    }
  };

  updateTodo = async (req: Request, res: Response) => {
    const id = req.params.id;
    const { text } = req.body;

    try {
      const updatedTodo = await TodoService.updateTodo(text, id);
      res.status(200).json(updatedTodo);
    } catch (err) {
      res.status(500).send(`Произошла ошибка при обновлении записи. ${(err as Error).message}`);
    }
  };

  deleteTodo = async (req: Request, res: Response) => {
    const id = req.params.id;

    try {
      const updatedTodo = await TodoService.deleteTodo(id);
      res.status(200).json(updatedTodo);
    } catch (err) {
      res.status(500).send("Произошла ошибка при удалении записи.");
    }
  };
}

export default new TodoController();
