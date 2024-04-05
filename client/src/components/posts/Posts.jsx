import Post from "../post/Post";
import "./posts.css";

export default function Posts({ posts }) {
  return (
    <div className="posts">
      {posts.map((p, pIndex) => (
        <Post key={pIndex} post={p} />
      ))}
    </div>
  );
}
