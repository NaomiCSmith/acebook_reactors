const BACKEND_URL = import.meta.env.VITE_BACKEND_URL;

export async function getUserByEmail(token, email) {
        const requestOptions = {
            method: "GET",
            headers: {
            Authorization: `Bearer ${token}`,
            "Content-Type": "application/json"
            },
        };
            const response = await fetch(`${BACKEND_URL}/users/find/${email}`, requestOptions);
    

    if (!response.ok) {
        throw new Error(`User not found or error: ${response.statusText}`);
    }

        const user = await response.json();
        return user;
    } 

export async function getUserByUsername(token, username) {
        const requestOptions = {
            method: "GET",
            headers: {
            Authorization: `Bearer ${token}`,
            "Content-Type": "application/json"
            },
        };
            const response = await fetch(`${BACKEND_URL}/users/find/${username}`, requestOptions);
    
    if (!response.ok) {
        throw new Error(`User not found or error: ${response.statusText}`);
    }
        const user = await response.json();
        return user;
    } 

export async function getUserProfile(token, userId) {
    const requestOptions = {
        method: "GET",
        headers: {
        Authorization: `Bearer ${token}`,
        "Content-Type": "application/json"
        },
    };
        const response = await fetch(`${BACKEND_URL}/users/${userId}`, requestOptions);
    
if (!response.ok) {
    throw new Error(`User not found or error: ${response.statusText}`);
}
    const user = await response.json();
    return user;
} 

export async function addFriend(token, userId, loggedInUser) {
    const requestOptions = {
        method: "POST",
        headers: {
        Authorization: `Bearer ${token}`,
        "Content-Type": "application/json"
    },
        body: JSON.stringify({ userId: loggedInUser })
    };

    const response = await fetch(`${BACKEND_URL}/users/addFriend/${userId}`, requestOptions);
    
    if (!response.ok) {
        throw new Error(`Failed to add friend: ${response.statusText}`);
    }

    const data = await response.json();
    return data;
}


export async function getUserFriends(token, userId) {
    
    const requestOptions = {
        method: "GET",
        headers: {
        "Content-Type": "application/json",
        "Authorization": `Bearer ${token}`,
        },
    };

    const response = await fetch(`${BACKEND_URL}/users/${userId}`, requestOptions);

    if (!response.ok) {
        throw new Error(`Error: ${response.statusText}`);
    }

    const userData = await response.json();
    return userData.friends;
    }

export const uploadProfilePhoto = async (file, userId) => {
    const formData = new FormData();
    formData.append('file', file);
    formData.append('userId', userId);
    
    const response = await fetch('http://localhost:3000/users/profilePhoto', {
        method: 'POST',
        body: formData,
    });
    
    if (!response.ok) {
        throw new Error('Failed to upload photo');
    }
    
    return response.json(); 
    };

export const signupUser = async (formData) => {
    try {
        const response = await fetch('http://localhost:3000/users', {
        method: 'POST',
        body: formData,
        });
    
        const data = await response.json();
        if (response.ok) {
        return data; 
        } else {
        throw new Error(data.message || 'Signup failed');
        }
    } catch (error) {
        console.error('Error during signup:', error);
        throw error;
    }
    };
    