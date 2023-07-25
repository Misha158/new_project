import { Button, Input } from "antd";
import { useState } from "react";

const defaultTodos = [
  { id: 1, text: "some text 1" },
  { id: 2, text: "some text 2" },
  { id: 3, text: "some text 3" },
];

const TodoList = ({ todos }) => {
  return todos.map((todo) => (
    <div
      style={{
        padding: "10px",
        margin: "10px 0",
        backgroundColor: "tomato",
        width: "300px",
      }}
    >
      <div style={{ marginBottom: "10px" }}>{todo.text}</div>
      <Button type="primary">Edit</Button>
      <Button type="primary" danger>
        Delete
      </Button>
      <div style={{ marginTop: "10px" }}>Todo id: {todo.id}</div>
    </div>
  ));
};

export const App = () => {
  const [todos, setTodos] = useState(defaultTodos);
  const [isShowAddNewTodoInput, setIsShowAddNewTodoInput] = useState(false);
  const [newTodoText, setNewTodo] = useState("");

  const onChangeNewTodo = (e) => {
    setNewTodo(e.target.value);
  };

  const onShowInputOrSaveNewTodo = () => {
    const newTodo = { id: todos.length + 1, text: newTodoText };

    if (isShowAddNewTodoInput) {
      setTodos((prev) => [...prev, newTodo]);
    }

    setIsShowAddNewTodoInput((prev) => !prev);
  };

  return (
    <div>
      <TodoList todos={todos} />
      {isShowAddNewTodoInput && (
        <Input value={newTodoText} onChange={onChangeNewTodo} />
      )}
      <Button type="primary" onClick={onShowInputOrSaveNewTodo}>
        {isShowAddNewTodoInput ? "Save new todo" : "Add new"}
      </Button>
    </div>
  );
};
