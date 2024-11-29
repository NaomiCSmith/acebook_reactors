const BACKEND_URL = import.meta.env.VITE_BACKEND_URL;

export async function getComments(token, postId, userId) {    
    const requestOptions = {
    method: "GET",
    headers: {
        Authorization: `Bearer ${token}`,
    },
    };
    const response = await fetch(`${BACKEND_URL}/comments/${postId}?userId=${userId}`, requestOptions);

    if (!response.ok) {
        throw new Error("Unable to fetch comments");
    }

    const data = await response.json();
    return data;
    }

export async function createComment(token, commentData) {
    const requestOptions = {
        method: "POST",
        headers: {
        Authorization: `Bearer ${token}`,
        'Content-Type': 'application/json',
        },
        body: JSON.stringify(commentData),
        };

        const response = await fetch(`${BACKEND_URL}/comments/createcomment`, requestOptions);

        if (response.status !== 201) {
            throw new Error("Unable to create comment");
        }
        const data = await response.json();
        
        return data;
}

export const deleteComment = async (token, commentId) => {
    const response = await fetch(`${BACKEND_URL}/comments/${commentId}`
, {
    method: "DELETE",
    headers: {
        "Content-Type": "application/json",
        "Authorization": `Bearer ${token}`,
    },
    });

    if (!response.ok) {
        const errorMessage = await response.json();
        console.error("Error deleting comment:", errorMessage);
        throw new Error("Failed to delete the comment.");
    }

    return response.json();
};


