function Comment(props) {
    return (
    <div className="comment">
    <article key={props.comment._id}>{props.comment.message}</article>
    <br />
    </div>
)
}

export default Comment;
