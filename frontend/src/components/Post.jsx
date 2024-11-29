import LikeButton from "../components/LikeButton"
import "./Post.css"
import CommentButton from "../components/CommentButton"

function Post(props) {
  
  const userID = localStorage.getItem('userID')
  const token = localStorage.getItem('token')
  return (
  <div className="post">
  <p><strong>Author: </strong>{props.post.userId}</p>
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
