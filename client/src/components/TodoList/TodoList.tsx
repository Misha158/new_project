import { Button } from "antd";
import axios from "axios";
import { EditButton } from "./EditButton";
import { Card, TodoText, TodoId } from "./styled";

export const TodoList = ({ todos, setTodos }) => {
  const onDeleteHandler = async (id) => {
    await axios.delete(`http://localhost:3000/todos/${id}`);

    setTodos((prevTodos) => prevTodos.filter((todo) => todo.id !== id));
  };

  return todos.map((todo) => (
    <Card key={todo.id}>
      <TodoText>{todo.text}</TodoText>
      <EditButton todoId={todo.id} setTodos={setTodos} todos={todos} />
      <Button type="primary" danger onClick={() => onDeleteHandler(todo.id)}>
        Delete
      </Button>
      <TodoId>Todo id: {todo.id}</TodoId>
    </Card>
  ));
};
