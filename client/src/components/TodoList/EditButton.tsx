import React from "react";
import { Button, Input } from "antd";
import { useEditButton } from "./useEditButton";

export const EditButton = ({ todos, setTodos, todoId }) => {
  const { onEditHandler, onSaveHandler, inputIdForShow, newText, setNewText } = useEditButton({ todos, setTodos });

  return (
    <>
      <Button type="primary" onClick={() => onEditHandler(todoId)}>
        Edit
      </Button>
      {inputIdForShow === todoId && (
        <>
          <Input value={newText} onChange={(e) => setNewText(e.target.value)} />
          <Button onClick={onSaveHandler}>Save</Button>
        </>
      )}
    </>
  );
};
