function Comment(props) {
    return (
    <div className="comment">
    <article key={props.comment._id}>{props.comment.message}</article>
    <p><strong>Author: </strong>{props.comment.userId}</p>
    <br />
    </div>
)
}

export default Comment;
