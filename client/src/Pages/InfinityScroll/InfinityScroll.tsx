import { useState, useEffect } from "react";
import InfiniteScroll from "react-infinite-scroll-component";
import { axios } from "../../services/config";

const style = {
  height: 30,
  border: "1px solid green",
  margin: 6,
  padding: 8,
};

interface Posts {
  id: number;
  title: string;
}

export const InfinityScroll = () => {
  const [items, setItems] = useState<Posts[]>([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [total, setTotal] = useState(0);

  useEffect(() => {
    const fetchData = async () => {
      const result = await axios.get("https://jsonplaceholder.typicode.com/posts?_limit=20");
      console.log("result", result);

      setItems(result.data);
      setTotal(+result.headers["x-total-count"]);
    };

    fetchData();
  }, []);

  const fetchMoreData = async () => {
    setTimeout(async () => {
      const result = await axios.get("https://jsonplaceholder.typicode.com/posts?_limit=20", {
        params: {
          _page: currentPage + 1,
        },
      });

      setItems((prev) => [...prev, ...result.data]);
      setCurrentPage((prev) => prev + 1);
    }, 1500);
  };

  return (
    <div>
      <h1>demo: react-infinite-scroll-component</h1>
      <hr />
      <InfiniteScroll dataLength={items.length} next={fetchMoreData} hasMore={currentPage * 20 < total} loader={<h4>Loading...</h4>}>
        {items.map((item, index) => (
          <div style={style} key={index}>
            id - #{item?.id}
          </div>
        ))}
      </InfiniteScroll>
    </div>
  );
};
