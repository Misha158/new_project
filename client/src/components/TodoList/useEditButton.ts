import { useState } from "react";
import axios from "axios";

export const useEditButton = ({ todos, setTodos }) => {
  const [inputIdForShow, setInputIdForShow] = useState(0);
  const [newText, setNewText] = useState("");

  const onEditHandler = (id) => {
    setInputIdForShow(id);
    setNewText(todos.find((todo) => todo.id === id).text);
  };

  const onSaveHandler = async () => {
    const newUpdatedTodo = await axios.put(`http://localhost:3000/todos/${inputIdForShow}`, {
      text: newText,
    });

    const modifiedTodos = todos.map((todo) => {
      if (todo.id === newUpdatedTodo.data.id) {
        return newUpdatedTodo.data;
      }

      return todo;
    });

    setInputIdForShow(0);
    setTodos(modifiedTodos);
  };

  return {
    onEditHandler,
    onSaveHandler,
    inputIdForShow,
    setNewText,
    newText,
  };
};
