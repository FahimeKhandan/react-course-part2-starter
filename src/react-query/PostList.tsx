import { useState } from "react";
import usePosts from "./hooks/usePosts";

const PostList = () => {
  const pageSize = 10;
  const [page, setpage] = useState(1);

  const { data: posts, error, isLoading } = usePosts({ page, pageSize });

  if (isLoading) return <p>...loading</p>;

  if (error) return <p>{error.message}</p>;

  return (
    <>
      <ul className="list-group">
        {posts?.map((post) => (
          <li key={post.id} className="list-group-item">
            {post.title}
          </li>
        ))}
      </ul>

      <button
        className="btn btn-primary me-2 my-3"
        disabled={page === 1}
        onClick={() => setpage(page - 1)}
      >
        Prev
      </button>

      <button
        className="btn btn-primary my-3"
        onClick={() => setpage(page + 1)}
      >
        Next
      </button>
    </>
  );
};

export default PostList;
