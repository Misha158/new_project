import { Button, Input } from "antd";
import { useEffect, useState } from "react";
import axios from "axios";

const defaultTodos = [
  { id: 1, text: "some text 1" },
  { id: 2, text: "some text 2" },
  { id: 3, text: "some text 3" },
];

const TodoList = ({ todos, setTodos }) => {
  const [inputIdForShow, setInputIdForShow] = useState(0);
  const [newText, setNewText] = useState("");
  const onDeleteHandler = async (id) => {
    await axios.delete(`http://localhost:3000/deleteTodo/${id}`);

    setTodos((prevTodos) => prevTodos.filter((todo) => todo.id !== id));
  };

  const onEditHandler = (id) => {
    setInputIdForShow(id);
  };

  const onSaveHandler = async () => {
    await axios.put(`http://localhost:3000/updateTodo/${inputIdForShow}`, {
      text: newText,
    });

    setInputIdForShow(0);
  };

  return todos.map((todo) => (
    <div
      key={todo.id}
      style={{
        padding: "10px",
        margin: "10px 0",
        backgroundColor: "tomato",
        width: "300px",
      }}
    >
      <div style={{ marginBottom: "10px" }}>{todo.text}</div>
      <Button type="primary" onClick={() => onEditHandler(todo.id)}>
        Edit
      </Button>
      {inputIdForShow === todo.id && (
        <>
          <Input value={newText} onChange={(e) => setNewText(e.target.value)} />
          <Button onClick={onSaveHandler}>Save</Button>
        </>
      )}
      <Button type="primary" danger onClick={() => onDeleteHandler(todo.id)}>
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

  useEffect(() => {
    const fetchAllTodos = async () => {
      const result = await axios.get("http://localhost:3000/getAllTodos");

      setTodos(result.data);
    };

    fetchAllTodos();
  }, []);

  const onChangeNewTodo = (e) => {
    setNewTodo(e.target.value);
  };

  const onShowInputOrSaveNewTodo = async () => {
    if (isShowAddNewTodoInput) {
      const newTodoItem = await axios.post("http://localhost:3000/addNewTodo", {
        text: newTodoText,
      });

      setTodos((prev) => [...prev, newTodoItem.data]);
    }

    setIsShowAddNewTodoInput((prev) => !prev);
  };

  return (
    <div>
      <TodoList todos={todos} setTodos={setTodos} />
      {isShowAddNewTodoInput && (
        <Input value={newTodoText} onChange={onChangeNewTodo} />
      )}
      <Button type="primary" onClick={onShowInputOrSaveNewTodo}>
        {isShowAddNewTodoInput ? "Save new todo" : "Add new"}
      </Button>
    </div>
  );
};
