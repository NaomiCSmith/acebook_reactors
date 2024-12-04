import LikeButton from "../components/LikeButton"
import "./Post.css"
import CommentButton from "../components/CommentButton"
import {deletePost, updatePost} from "../services/posts"
import {useState} from "react"
import { useNavigate } from "react-router-dom";


function Post(props) {
  const [currentPost, setCurrentPost] = useState(props.post.message)
  const [disabledButton, setDisabledbutton] = useState(true)
  const userID = localStorage.getItem('userID')
  const token = localStorage.getItem('token')
  const postAuthor = props.post.postAuthor.username
  const navigate = useNavigate();

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


const handleEdit = () =>{
  setDisabledbutton(false)
}

const handleAmend = async () =>{
  try {
      await updatePost(token, props.post._id, currentPost);
      alert("Post updated successfully!");
      setDisabledbutton(true)
  } catch (error) {
      console.error("Error updating post:", error);
      alert("Failed to update the post.");
  }
  
}

const handleAuthorClick = () => {
  navigate(`/userprofile/${props.post.userId}`);
};


  return (
  <div className="post">
  <div className="author-delete-container">
  <p onClick={handleAuthorClick} className="author"><strong>Author: </strong>{postAuthor}</p>
    {props.post.userId === userID && (
      <>
        <p className="text-click-delete" onClick={handleDelete}>Delete</p>
        <p className="text-click" onClick={handleEdit}>{disabledButton ? 'Edit' : ''}</p>
        {!disabledButton && (<p className="text-click" onClick={handleAmend}>Save</p>)}
      </>
            )}

  </div>

<textarea
    key={props.post._id}
    className="post-data"
    value={currentPost}
    disabled={disabledButton}
    onChange={(event) => setCurrentPost(event.target.value)}>
    </textarea>

  <div className="like-comment-container">
  <LikeButton className="like"post={props.post} userID={userID}/>
  <CommentButton className="comment" post={props.post} userID={userID} token={token}/>
  </div>
  <br />
  </div>
  )
}

export default Post;
