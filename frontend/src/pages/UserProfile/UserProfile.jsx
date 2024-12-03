import { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import { getUserProfile, addFriend } from "../../services/users";
import Header from "../Header/Header";
import "./UserProfile.css"
import defaultAvatar from "../../assets/default-avatar.png";

export const UserProfile = () => {
    const { userId } = useParams();
    const token = localStorage.getItem('token');
    const loggedInUser = localStorage.getItem('userID');
    const [user, setUser] = useState(null);
    const [isFriend, setIsFriend] = useState(false)

    useEffect(() => {
    const fetchUser = async () => {
        try {
            const userData = await getUserProfile(token,userId);
            setUser(userData);
            if (userData.friends.includes(loggedInUser)) {
                setIsFriend(true);
            }
        } catch (error) {
            console.error("Error fetching user profile:", error);
        }
    };

    fetchUser();
    }, [token,userId, loggedInUser]);


    const handleAddFriend = async () => {
        try {
            await addFriend(token, userId, loggedInUser);
            setIsFriend(true);
        } catch (error) {
            console.error("Error adding friend:", error);
        }
    };

    if (!user) {
    return <p>Loading profile...</p>;
    }

    return (
        <div>
        <Header/>
        <h1>{user.username}</h1>
        <img className="user-photo" src={user.photo || defaultAvatar} alt="photo of user"/>
        <p>Email: {user.email}</p>
        <button className={isFriend ? "friend": "add-friend"} onClick={handleAddFriend} disabled={isFriend}>{isFriend ? "Already Friends" : "Add Friend"}</button>
    </div>
    );
};

