import {deleteComment, updateComment} from "../services/comments";
import "./Comment.css"
import {useState} from "react"
import { useNavigate } from "react-router-dom";

function Comment(props) {
    const [currentComment, setCurrentComment] = useState(props.comment.message)
    const [disabledButton, setDisabledbutton] = useState(true)
    const token = localStorage.getItem('token')
    const navigate = useNavigate();

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

    const handleEdit = () =>{
        setDisabledbutton(false)
    }

    const handleAmend = async () =>{
        try {
            await updateComment(token, props.comment._id, currentComment);
            alert("Comment updated successfully!");
            setDisabledbutton(true)
        } catch (error) {
            console.error("Error updating comment:", error);
            alert("Failed to update the comment.");
        }
        
    }

    const handleAuthorClick = () => {
        navigate(`/userprofile/${props.comment.userId}`);
    };
    
    return (
    <div className="comment">
    <p onClick={handleAuthorClick} className="comment-author"><strong>Author: </strong>{props.comment.userId}</p>
    <textarea
    key={props.comment._id}
    className="comment-data"
    value={currentComment}
    disabled={disabledButton}
    onChange={(event) => setCurrentComment(event.target.value)}>
    </textarea>
    {props.comment.userId === props.userID && (
        <div className="edit-delete-container">
            <p className="text-click" onClick={handleDelete}>Delete</p>
            <p className="text-click" onClick={handleEdit}>{disabledButton ? 'Edit' : ''}</p>
            {!disabledButton && (<p className="text-click" onClick={handleAmend}>Save</p>)}
        </div>
        )}
    
    </div>
)
}

export default Comment;
