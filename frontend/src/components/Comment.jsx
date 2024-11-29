import {deleteComment} from "../services/comments";
function Comment(props) {
    const handleDelete = async () => {
        if (window.confirm("Are you sure you want to delete this comment?")) {
            try {
                await deleteComment(props.token, props.comment._id);
                alert("Comment deleted successfully");
                props.onCommentDeleted(props.comment._id);
            } catch (error) {
                console.error("Error deleting comment:", error);
                alert("Failed to delete the comment.");
            }
        }
        };
    
    return (
    <div className="comment">
    <article key={props.comment._id}>{props.comment.message}</article>
    <p><strong>Author: </strong>{props.comment.userId}</p>
    {props.comment.userId === props.userID && (
        <button className="delete" onClick={handleDelete}>Delete</button>
    )}
    <br />
    </div>
)
}

export default Comment;
