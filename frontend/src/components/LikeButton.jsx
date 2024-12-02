import { useState } from "react";
import "./LikeButton.css";
import { likePost, unLikePost } from "../services/posts";

const LikeButton = ({post, userID}) => {    
    const [likes, setLikes] = useState(post.likes || 0);
    const [isLiked, setIsLiked] = useState(post.likedBy.includes(userID))
    const [error, setError] = useState(null);

    const changeLike = async () => {   
        setError(null);     
        if (isLiked) {
            try {
                const response = await unLikePost(post._id, userID);
                if (response.message === "Post Un-liked") {
                    
                    setLikes(response.likes);
                    setIsLiked(false);
                } else {
                    setError(response.message || "Failed to un-like the post.");
                }
            } catch (error) {
                setError("Failed to un-like the post.");
            }
        } else {
            try {
                const response = await likePost(post._id, userID);
                console.log("RESPONSE HERE: ", response);
                
                if (response.message === "Post liked") {
                    setLikes(response.likes);
                    setIsLiked(true);
                } else {
                setError(response.message || "Failed to like the post.");
                }
            } catch (error) {
                setError("Failed to like the post.");
            }
        }
    };

    return (
        <div>
            <img src={isLiked ? './liked.png' : './unliked.png'} onClick={changeLike} alt="thumbs up button"/>
            <span> {likes} {likes === 1? 'like' : 'likes'}</span> 
            <br></br>
            {/* <button className={`LikeButton ${isLiked ? "isLiked" : ""}`} onClick={changeLike}>
                {isLiked ? 'Liked' : 'Like'}
            </button> */}
            {error && <p>{error}</p>}
        </div>
    );
};

export default LikeButton;