import { Link } from "react-router-dom";

import "./WelcomePage.css";
import Header from "../Header/Header";
import LogoutButton from "../../components/LogoutButton";
import { getPosts } from "../../services/posts";


export function WelcomePage() {
    return (
        <>
        <div className="header">
            <Header />
        </div>
        <div className="welcome">
            <h1>Welcome, developer!</h1>
            <h2>What would you like to do?</h2>
        </div>
        <div className="button-container">
            <Link to="/profile"><button className="profile-button">View Your Profile</button></Link>
            <Link to="/posts"><button className="posts-button">View All Posts</button></Link>
            <Link to="/createpost"><button className="create-post-button">Create a Post</button></Link>
        </div>
        </>
    );
}

