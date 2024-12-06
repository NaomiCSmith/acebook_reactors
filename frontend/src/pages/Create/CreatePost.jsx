import { useState } from "react";
import { Link } from "react-router-dom";
import {createPost} from "../../services/posts"
import Header from "../Header/Header";
import "./CreatePost.css"

export function CreatePost() {
const token = localStorage.getItem("token");
const userId = localStorage.getItem("userID");

    const [disabledPostButton, setDisabledPostButton] = useState(false);
    const [errorMsg, setErrorMsg] = useState(null)
    const [createdPost, setCreatedPost] = useState(false)
    const [postContent, setPostContent] = useState('')
    const [returnedPost, setReturnedPost] = useState(false)
    const [image, setImage] = useState(null);

    const handleImageChange = (e) => {
        const file = e.target.files[0];
        setImage(file);
    };

    async function handleSubmit(event) {
        event.preventDefault();
        setDisabledPostButton(true);
    
        const formData = new FormData();
        formData.append("message", postContent);
        formData.append("userId", userId);
        if (image) formData.append("image", image);
    
        try {
            const data = await createPost(token, formData);
            if (data.message === "Post created") {
                setCreatedPost(true);
                setReturnedPost(true);
                setPostContent('');
                setImage(null);
                setErrorMsg(null);
            } else {
                setErrorMsg("Failed to create post. Please try again.");
            }
        } catch (error) {
            console.log("Error creating post: ", error);
            setErrorMsg("Something went wrong. Please try again.");
        } finally {
            setDisabledPostButton(false);
        }
    }
    
    if (errorMsg) {
        return <p>{errorMsg}</p>;
    }
    
    return (
    <>
        <video autoPlay muted loop id="bgvid">
        <source src="../acebook-background3.mp4" type="video/mp4" />
        </video>
        <Header />
        {createdPost ? <h2 className="post-created">Post successfully created!</h2> : null}
        {returnedPost ? <Link to='/posts'><h3 className="return">Click here to return to posts</h3></Link> : null}
        <form className="post-form" onSubmit={handleSubmit}>
        <p>Submit a post:</p>
        <label htmlFor='post-body'>
            <br />
            <textarea
            id='post-body'
            value={postContent}
            onChange={(event) => setPostContent(event.target.value)}
            required
            ></textarea>
        </label>
        <br />
        
        <label htmlFor="image">Upload an Image</label>
        <input
            type="file"
            id="image"
            accept="image/*"
            onChange={handleImageChange}
        />
        <br />
        
        <button disabled={disabledPostButton} type="submit" className="submit-post">
            Submit Post
        </button>
        </form>
    </>
    );
    }