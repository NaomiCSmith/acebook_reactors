import LikeButton from "../components/LikeButton"
import "./Post.css"
import CommentButton from "../components/CommentButton"
import {deletePost} from "../services/posts"

function Post(props) {
  const username = localStorage.getItem('username')
  const userID = localStorage.getItem('userID')
  const token = localStorage.getItem('token')

  const handleDelete = async () => {
    if (window.confirm("Are you sure you want to delete this post?")) {
        try {
            await deletePost(props.post._id);
            alert("Post deleted successfully");
            props.onPostDeleted(props.post._id);
        } catch (error) {
            console.error("Error deleting post:", error);
            alert("Failed to delete the post.");
        }
    }
};



  return (
  <div className="post">
  <div className="author-delete-container">
    {props.post.userId === userID && (
                <button className="delete" onClick={handleDelete}>Delete</button>
            )}
  <p className="author"><strong>Author: </strong>{username}</p>
  </div>
  <article key={props.post._id}>{props.post.message}</article>
  <div className="like-comment-container">
  <LikeButton className="like"post={props.post} userID={userID}/>
  <CommentButton className="comment" post={props.post} userID={userID} token={token}/>
  </div>
  <br />
  </div>
  )
}

export default Post;
