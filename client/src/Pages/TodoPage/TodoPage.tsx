import { Button, Input } from "antd";
import { TodoList } from "../../components/TodoList/TodoList";
import { useAddTodo, useTodos } from "./hooks/useTodoPage";

export const TodoPage = () => {
  const { todos, setTodos } = useTodos();
  // eslint-disable-next-line @typescript-eslint/ban-ts-comment
  // @ts-ignore
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
