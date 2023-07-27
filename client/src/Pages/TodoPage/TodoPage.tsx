import React from "react";
import { Button, Input } from "antd";
import { TodoList } from "../../components/TodoList/TodoList";
import { useAddTodo, useTodos } from "./hooks/useTodoPage";

export const TodoPage = () => {
  const { todos, setTodos } = useTodos();
  const { newTodoText, isShowAddNewTodoInput, onChangeNewTodo, onShowInputOrSaveNewTodo } = useAddTodo({ setTodos });

  return (
    <div>
      <TodoList todos={todos} setTodos={setTodos} />
      {isShowAddNewTodoInput && <Input value={newTodoText} onChange={onChangeNewTodo} />}
      <Button type="primary" onClick={onShowInputOrSaveNewTodo}>
        {isShowAddNewTodoInput ? "Save new todo" : "Add new"}
      </Button>
    </div>
  );
};
