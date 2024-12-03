import { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import { getUserProfile } from "../../services/users";

export const UserProfile = () => {
    const { userId } = useParams();
    const token = localStorage.getItem('token');
    
    const [user, setUser] = useState(null);

    useEffect(() => {
    const fetchUser = async () => {
        try {
            const userData = await getUserProfile(token,userId);
            
            setUser(userData);
        } catch (error) {
            console.error("Error fetching user profile:", error);
        }
    };

    fetchUser();
    }, [token,userId]);

    if (!user) {
    return <p>Loading profile...</p>;
    }

    return (
    <div>
        <h1>{user.username}</h1>
        <p>Email: {user.email}</p>
        <button>Add Friend</button>
    </div>
    );
};

