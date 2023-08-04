import { Button, Input } from "antd";
import { useEditButton } from "./useEditButton";

// eslint-disable-next-line @typescript-eslint/ban-ts-comment
// @ts-ignore
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
