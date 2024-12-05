import { Link } from "react-router-dom";
import { useEffect, useState } from "react";

import "./WelcomePage.css";
import Header from "../Header/Header";
const BACKEND_URL = import.meta.env.VITE_BACKEND_URL;



export function WelcomePage() {
    const userId = localStorage.getItem('userID')
    const [user, setUser] = useState(null);
    useEffect(() => {
        const fetchUser = async () => {
            try {
            const response = await fetch(`${BACKEND_URL}/users/findById/${userId}`);
            if (!response.ok) {
                throw new Error("Failed to fetch user data");
            }
            const userData = await response.json();
            
            setUser(userData);
            } catch (error) {
            console.error("Error fetching user data:", error);
            }
        };
    
        if (userId) {
            fetchUser();
        }
        }, [userId]);



    return (
        <>
        <div className="header">
            <Header />
        </div>
        <div className="welcome">
            <h1>Welcome, {user ? user.username : "developer"}!</h1>
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

