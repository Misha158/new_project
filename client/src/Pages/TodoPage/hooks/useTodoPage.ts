import { useEffect, useState } from "react";
import axios from "axios";

export const useAddTodo = ({ setTodos }) => {
  const [isShowAddNewTodoInput, setIsShowAddNewTodoInput] = useState(false);
  const [newTodoText, setNewTodo] = useState("");

  const onChangeNewTodo = (e) => {
    setNewTodo(e.target.value);
  };

  const onShowInputOrSaveNewTodo = async () => {
    if (isShowAddNewTodoInput) {
      const newTodoItem = await axios.post("http://localhost:3000/todos", {
        text: newTodoText,
      });

      setTodos((prev) => [...prev, newTodoItem.data]);
    }

    setIsShowAddNewTodoInput((prev) => !prev);
  };

  return { onChangeNewTodo, onShowInputOrSaveNewTodo, isShowAddNewTodoInput };
};

export const useTodos = () => {
  const [todos, setTodos] = useState([]);

  useEffect(() => {
    const fetchAllTodos = async () => {
      const result = await axios.get("http://localhost:3000/todos");

      setTodos(result.data);
    };

    fetchAllTodos();
  }, []);

  return { todos, setTodos };
};
