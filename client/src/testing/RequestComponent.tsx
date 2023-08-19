import { useEffect, useState } from "react";
import axios from "axios";

interface User {
  title: string;
}

export const RequestComponent = () => {
  const [posts, setPosts] = useState<User[]>([]);

  useEffect(() => {
    const fetchData = async () => {
      const { data } = await axios.get<User[]>("https://jsonplaceholder.typicode.com/posts");

      setPosts(data);
    };

    fetchData();
  }, []);

  return (
    <div>
      {posts.map((post) => (
        <div>{post.title}</div>
      ))}
    </div>
  );
};
