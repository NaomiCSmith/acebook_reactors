import { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import { getUserProfile, addFriend, getUserFriends } from "../../services/users";
import Header from "../Header/Header";
import "./UserProfile.css"
import defaultAvatar from "../../assets/default-avatar.png";

export const UserProfile = () => {
    const { userId } = useParams();
    const token = localStorage.getItem('token');
    const loggedInUser = localStorage.getItem('userID');
    const [user, setUser] = useState(null);
    const [isFriend, setIsFriend] = useState(false)
    const [friends, setFriends] = useState([])

    useEffect(() => {
    const fetchUser = async () => {
        try {
            const userData = await getUserProfile(token,userId);
            setUser(userData);

            userData.friends.forEach((friend) => {
                if(friend._id === loggedInUser)
                setIsFriend(true)
            }
            
            )
            
            const userFriends = await getUserFriends(token, userId);
            setFriends(userFriends);
        } catch (error) {
            console.error("Error fetching user profile:", error);
        }
    };

    fetchUser();
    }, [token,userId, loggedInUser, friends]);


    const handleAddFriend = async () => {
        try {
            await addFriend(token, userId, loggedInUser);
            setIsFriend(true);
        } catch (error) {
            console.error("Error adding follower:", error);
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
        {user._id != loggedInUser && (
        <button className={isFriend ? "friend": "add-friend"} onClick={handleAddFriend} disabled={isFriend}>{isFriend ? "Already Following" : "Follow"}</button>
        )}
        <h2>Followers</h2>
        {friends.length > 0 ? (
            <ul>
            {friends.map((friend) => (
                <li key={friend._id}>
                <img
                src={friend.photo || defaultAvatar}
                alt={`${friend.username}'s avatar`}
                className="friend-avatar"
                />
            <span>{friend.username}</span>
            </li>
            ))}
        </ul>
        ) : (
        <p>No followers yet.</p>
        )}
    </div>
    );
};

