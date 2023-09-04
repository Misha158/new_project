import { useAppSelector, useAppDispatch } from "../../../store/hooks";
import { decrement, increment, incrementByAmount } from "../../../store/slices/counterSlice";
import { Button } from "antd";
import { fetchPosts } from "../../../store/thunks/fetchPosts";

export const ReduxCounter = () => {
  // The `state` arg is correctly typed as `RootState` already
  const count = useAppSelector((state) => state.counter.value);
  const posts = useAppSelector((state) => state.posts.posts);
  const dispatch = useAppDispatch();

  return (
    <div>
      <Button onClick={() => dispatch(increment())}>Increment</Button>
      <Button onClick={() => dispatch(decrement())}>Decrement</Button>
      <Button onClick={() => dispatch(incrementByAmount(5))}>incrementByAmount</Button>
      <Button onClick={() => dispatch(fetchPosts())}>
        <strong>Fetch users</strong>{" "}
      </Button>
      <div>Redux count: {count}</div>
      <h4>Users</h4>
      {posts.length ? (
        posts.map((post) => (
          <div style={{ display: "flex" }}>
            <div>
              <strong>{post.id}.</strong>
            </div>
            <div>{post.title}</div>
          </div>
        ))
      ) : (
        <div>No users</div>
      )}
    </div>
  );
  // omit rendering logic
};
