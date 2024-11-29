import LikeButton from "../components/LikeButton"
import "./Post.css"
import CommentButton from "../components/CommentButton"

function Post(props) {
  const userID = localStorage.getItem('userID')
  const token = localStorage.getItem('token')
  return (
  <div className="post">
  <article key={props.post._id}>{props.post.message}</article>
  <LikeButton post={props.post} userID={userID}/>
  <CommentButton post={props.post} userID={userID} token={token}/>
  <br />
  </div>
  )
}

export default Post;
