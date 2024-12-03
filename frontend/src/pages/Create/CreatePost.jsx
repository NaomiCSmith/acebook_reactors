import { useState } from "react";
import { Link } from "react-router-dom";
import {createPost} from "../../services/posts"
import Header from "../Header/Header";

export function CreatePost() {
const token = localStorage.getItem("token");
const userId = localStorage.getItem("userID");

    const [disabledPostButton, setDisabledPostButton] = useState(false);
    const [errorMsg, setErrorMsg] = useState(null)
    const [createdPost, setCreatedPost] = useState(false)
    const [postContent, setPostContent] = useState('')
    const [returnedPost, setReturnedPost] = useState(false)

    async function handleSubmit(event) {
        event.preventDefault();
        setDisabledPostButton(true);
    
        const postBody = {
            message: postContent,
            userId: userId
        };
    
        try {
            const data = await createPost(token, postBody);
            if (data.message === "Post created") {
                setCreatedPost(true);
                setReturnedPost(true);
                setPostContent('');
                setErrorMsg(null);
            } 
            else {
            
                setErrorMsg("Failed to create post. Please try again.");
            }
        } catch (error) {
            console.log("Error creating post: ", error);
            setErrorMsg("Something went wrong. Please try again.");
        } finally {
            setDisabledPostButton(false); 
        }
        }

    if(errorMsg){
        return <p>{errorMsg}</p>
    }

    return(
        <>
        <Header/>
        {createdPost ? <h2>Post successfully created!</h2> : null} 
        {returnedPost ? <Link to='/posts'><h3>Return to Posts</h3></Link> : null}
        <h1>Submit a post:</h1>
        <form onSubmit={handleSubmit}>
            <label htmlFor='post-body'>
            <br />
            <textarea id='post-body'
            value={postContent}
            onChange={(event) => setPostContent(event.target.value)} required>
            </textarea>
            </label>
            <br />
            <button disabled={disabledPostButton} type='submit'>Submit Post</button>
        </form>
        </>
    )
}
