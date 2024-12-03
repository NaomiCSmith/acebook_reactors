import { useState, useEffect } from "react";
import { useNavigate, Link } from "react-router-dom";

import { getPosts } from "../../services/posts";
import Post from "../../components/Post";
import LogoutButton from "../../components/LogoutButton";
import Header from "../Header/Header";
import "./feedpage.css"; 

export function FeedPage() {
  const [posts, setPosts] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    const token = localStorage.getItem("token");
    const loggedIn = token !== null;
    if (loggedIn) {
      getPosts(token)
        .then((data) => {
          setPosts(data.posts);
          localStorage.setItem("token", data.token);
        })
        .catch((err) => {
          console.error(err);
          navigate("/login");
        });
    }
  }, [navigate]);

  const token = localStorage.getItem("token");
  if (!token) {
    navigate("/login");
    return;
  }

const handlePostDeleted = (postId) => {
    setPosts((prevPosts) => prevPosts.filter((post) => post._id !== postId));
};
  return (
    <>
      <div>
        <Header />
      </div>
      <div className="feed-container">
        <h2 className="text-center">Posts</h2>
        <div className="action-buttons text-center">
          <Link to="/createpost">
            <button className="btn create-post">Write post</button>
          </Link>
        </div>
        <br />
        <div className="feed" role="feed">
          {posts.map((post) => (
            <div className="post-wrapper" key={post._id}>
              <Post post={post} onPostDeleted={handlePostDeleted} />
            </div>
          ))}
        </div>
        <LogoutButton />
      </div>
    </>
  );
}
