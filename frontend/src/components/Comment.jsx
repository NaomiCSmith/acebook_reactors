import {deleteComment, updateComment} from "../services/comments";
import "./Comment.css"
import {useState, useEffect} from "react"
import { useNavigate } from "react-router-dom";
const BACKEND_URL = import.meta.env.VITE_BACKEND_URL;
import defaultAvatar from "../assets/default-avatar.png"

function Comment(props) {
    const [currentComment, setCurrentComment] = useState(props.comment.message)
    const [disabledButton, setDisabledbutton] = useState(true)
    const token = localStorage.getItem('token')
    const navigate = useNavigate();
    const [user, setUser] = useState(null);

    const date = new Date(props.comment.createdAt);

    const formattedDate = date.toLocaleString('en-US', {
        weekday: 'short',      
        year: 'numeric', 
        month: 'long', 
        day: 'numeric', 
        hour: 'numeric', 
        minute: '2-digit', 
        hour12: true   
    });


    useEffect(() => {
        const fetchUser = async () => {
            try {
            const response = await fetch(`${BACKEND_URL}/users/findById/${props.comment.userId}`);
            if (!response.ok) {
                throw new Error("Failed to fetch user data");
            }
            const userData = await response.json();
            
            setUser(userData);
            } catch (error) {
            console.error("Error fetching user data:", error);
            }
        };
    
        if (props.comment.userId) {
            fetchUser();
        }
        }, [props.comment.userId]);

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
        <div className="author-container">
        <p onClick={handleAuthorClick} className="comment-author"><strong>Author: </strong>{user ? user.username : props.comment.userid}</p>
        <img onClick={handleAuthorClick} className="author-image" src={user ? user.photo : defaultAvatar} />

    </div>
    <textarea
    key={props.comment._id}
    className="comment-data"
    value={currentComment}
    disabled={disabledButton}
    onChange={(event) => setCurrentComment(event.target.value)}>
    </textarea>
    <div className="comment-date-time">
        <p>Commented on: {formattedDate}</p>
    </div>
    {props.comment.userId === props.userID && (
        <div className="edit-delete-container">
            <p className="text-click-delete" onClick={handleDelete}>Delete</p>
            <p className="text-click" onClick={handleEdit}>{disabledButton ? 'Edit' : ''}</p>
            {!disabledButton && (<p className="text-click" onClick={handleAmend}>Save</p>)}
        </div>
        )}
    
    </div>
)
}

export default Comment;
