import { useState } from "react";
import usePosts from "./hooks/usePosts";

const PostList = () => {
  const [selectedUserId, setSelectedUserId] = useState<number>();
  const { data: posts, error, isLoading } = usePosts(selectedUserId);

  if (isLoading) return <p>...loading</p>;

  if (error) return <p>{error.message}</p>;

  return (
    <>
      <select
        id=""
        className="form-select mb-3"
        value={selectedUserId}
        onChange={(event) => setSelectedUserId(parseInt(event.target.value))}
      >
        <option value=""></option>
        <option value="1">user 1</option>
        <option value="2">user 2</option>
        <option value="3">user 3</option>
        <option value="4">user 4</option>
      </select>

      <ul className="list-group">
        {posts?.map((post) => (
          <li key={post.id} className="list-group-item">
            {post.title}
          </li>
        ))}
      </ul>
    </>
  );
};

export default PostList;
