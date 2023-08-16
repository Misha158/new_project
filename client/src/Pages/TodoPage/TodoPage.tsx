import { Button, Input } from "antd";
import { TodoList } from "../../shared/components/TodoList/TodoList";
import { useAddTodo, useTodos } from "./hooks/useTodoPage";
import { useState } from "react";

export const TodoPage = () => {
  const { todos, setTodos } = useTodos();
  // eslint-disable-next-line @typescript-eslint/ban-ts-comment
  // @ts-ignore
  const { newTodoText, isShowAddNewTodoInput, onChangeNewTodo, onShowInputOrSaveNewTodo } = useAddTodo({ setTodos });

  // DELETE LATER TEST FOR SONARQUBE
  const [test, setTest] = useState(false);

  if (test) {
    return <div>test</div>;
  }
  // DELETE LATER TEST FOR SONARQUBE

  return (
    <div>
      cat
      <TodoList todos={todos} setTodos={setTodos} />
      {isShowAddNewTodoInput && <Input value={newTodoText} onChange={onChangeNewTodo} />}
      <Button type="primary" onClick={onShowInputOrSaveNewTodo}>
        {isShowAddNewTodoInput ? "Save new todo" : "Add new"}
      </Button>
    </div>
  );
};
