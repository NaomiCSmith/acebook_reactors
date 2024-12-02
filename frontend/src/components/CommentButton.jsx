import { useState } from "react";
import "./CommentButton.css";
import { getComments, createComment } from "../services/comments";
import Comment from "../components/Comment";

const CommentButton = ({ post, userID, token }) => {
    const [viewComments, setViewComments] = useState(false);
    const [commentsData, setCommentsData] = useState([]);
    const [error, setError] = useState(null);

    const [addComment, setAddComment] = useState(false);
    const [disabledPostButton, setDisabledPostButton] = useState(false);
    const [commentContent, setCommentContent] = useState('');

    const toggleCommentForm = () => {
        setAddComment(!addComment);
    };

    const seeComments = async () => {
        setViewComments(!viewComments);
        if (!viewComments) {
            try {
                const response = await getComments(token, post._id, userID);
                
                if (response) {
                    setCommentsData(response.comments);
                    setError(null); 
                }
            } catch (error) {
                setError("Failed to fetch comments.");
            }
        }
    };

    const handleAddComment = async (event) => {
        event.preventDefault();
        setDisabledPostButton(true);

        const commentBody = {
            postId: post._id,
            userId: userID,
            message: commentContent
        };

        try {
            const data = await createComment(token, commentBody);
            if (data.message === "OK") {
                setCommentContent('');
                setError(null);

                setCommentsData([...commentsData, { _id: new Date().toISOString(), message: commentContent, userId: userID }]);
                post.commentCount += 1; 
            } else {
                setError("Failed to create comment. Please try again.");
            }
        } catch (error) {
            console.log("Error creating comment: ", error);
            setError("Something went wrong. Please try again.");
        } finally {
            setDisabledPostButton(false);
            setAddComment(false); 
        }
    };

    const handleCommentDeleted = (commentId) => {
        setCommentsData(prevComments => prevComments.filter(comment => comment._id !== commentId));
        post.commentCount -= 1; 
    };

    return (
        <div>
            <img
                src="../chat.png"
                alt="comment speech bubble"
                onClick={seeComments}
            />
            {/* {post.commentCount === 1 ? " Comment" : " Comments"} {post.commentCount} */}
            {post.commentCount}
            {viewComments &&
                <div>
                    {commentsData.length > 0 ? (
                        commentsData.map((comment) => (
                            <div className="comment-container" key={comment._id}>
                                <Comment comment={comment} userID={userID} token={token} onCommentDeleted={handleCommentDeleted}/>
                            </div>
                        ))
                    ) : (
                        <p>No comments yet. Be the first to comment!</p>
                    )}

                    <button className="add-comment" onClick={toggleCommentForm}>
                        {addComment ? "Cancel" : "Add a Comment"}
                    </button>

                    {addComment && (
                        <form onSubmit={handleAddComment}>
                            <label htmlFor="comment-body">
                                <textarea
                                    id="comment-body"
                                    value={commentContent}
                                    onChange={(event) => setCommentContent(event.target.value)}
                                    required
                                />
                            </label>
                            <br />
                            <button
                                disabled={disabledPostButton}
                                className="post-comment"
                                type="submit"
                            >
                                Post Comment
                            </button>
                        </form>
                    )}
                </div>
            }

            {error && <p>{error}</p>}
        </div>
    );
};

export default CommentButton;
