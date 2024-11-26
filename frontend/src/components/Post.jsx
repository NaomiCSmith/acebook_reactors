import LikeButton from "../components/LikeButton"
import "./Post.css"

function Post(props) {
  return (
  <div className="post">
  <article key={props.post._id}>{props.post.message}</article>
  <LikeButton />
  <br />
  </div>
  )
}

export default Post;
