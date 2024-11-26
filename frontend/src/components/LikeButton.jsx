// file: LikeButton.jsx

import React, { useState } from "react";
import "./LikeButton.css";

// like button so each post can be liked

const LikeButton = () => {

    // like state
    const [likes, setLikes] = useState(0);
    const [isLiked, setIsLiked] = useState(false)

    // change like status on post
    const changeLike = () => {
        if (isLiked) {
            setLikes(likes - 1);
            setIsLiked(false);
        } else {
            setLikes(likes + 1);
            setIsLiked(true);
        }
    };

    // returns like button with updated like count
    return (
        <div>
            <span>{likes} {likes === 1? 'like' : 'likes'}</span>
            <br></br>
            <button className={`LikeButton ${isLiked ? "isLiked" : ""}`} onClick={changeLike}>
                {isLiked ? 'Liked' : 'Like'}
            </button>
        </div>
    );
};

export default LikeButton;