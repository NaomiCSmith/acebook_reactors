import { useState, useEffect } from "react";
import { useNavigate, Link } from "react-router-dom";

import { getPosts } from "../../services/posts";
import Post from "../../components/Post";
import LogoutButton from "../../components/LogoutButton";
import Header from "../Header/Header";
// import Sidebar from "../Header/Sidebar";

import "./feedpage.css"; // Import the new CSS file

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

  return (
    <>
      <div>
        <Header />
        {/* <Sidebar /> */}
      </div>
      <div className="feed-container"> {/* Add a wrapper for the feed */}
        <h2 className="text-center">Posts</h2>
        <div className="action-buttons text-center">
          <Link to="/createpost">
            <button className="btn btn-primary">Write post</button>
          </Link>
        </div>
        <br />
        <div className="feed" role="feed">
          {posts.map((post) => (
            <div className="post-wrapper" key={post._id}>
              <Post post={post} />
            </div>
          ))}
        </div>
        <LogoutButton />
      </div>
    </>
  );
}
