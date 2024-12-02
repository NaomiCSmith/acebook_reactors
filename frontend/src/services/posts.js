// docs: https://vitejs.dev/guide/env-and-mode.html
const BACKEND_URL = import.meta.env.VITE_BACKEND_URL;

export async function getPosts(token) {
  const requestOptions = {
    method: "GET",
    headers: {
      Authorization: `Bearer ${token}`,
    },
  };

  const response = await fetch(`${BACKEND_URL}/posts`, requestOptions);

  if (response.status !== 200) {
    throw new Error("Unable to fetch posts");
  }

  const data = await response.json();
  return data;
}

export async function createPost(token, postData) {
  
  
  const requestOptions = {
    method: "POST",
    headers: {
      Authorization: `Bearer ${token}`,
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(postData),
  };

  const response = await fetch(`${BACKEND_URL}/posts/createpost`, requestOptions);

  if (response.status !== 201) {
    throw new Error("Unable to create post");
  }

  const data = await response.json();
  
  return data;
}

export async function likePost(postId, userID) {
  const token = localStorage.getItem("token");
  
  const requestOptions = {
    method: "PUT",
    headers: {
      Authorization: `Bearer ${token}`,
      "Content-Type": "application/json",
      userid: userID
    },
  };

  const response = await fetch(`${BACKEND_URL}/posts/like/${postId}`, requestOptions);
  
  if (!response.ok) {
    throw new Error("Failed to like the post");
  }

  const data = await response.json();
  return data;
}

export async function unLikePost(postId, userID) {
  const token = localStorage.getItem("token");
  
  const requestOptions = {
    method: "PUT",
    headers: {
      Authorization: `Bearer ${token}`,
      "Content-Type": "application/json",
      userid: userID
    },
  };

  const response = await fetch(`${BACKEND_URL}/posts/unlike/${postId}`, requestOptions);
  
  if (!response.ok) {
    throw new Error("Failed to un-like the post");
  }

  const data = await response.json();
  return data;
}

export async function deletePost(postId) {
  const token = localStorage.getItem("token");

  const response = await fetch(`${BACKEND_URL}/posts/${postId}`, {
      method: "DELETE",
      headers: {
          Authorization: `Bearer ${token}`,
      },
  });

  if (!response.ok) {
      throw new Error("Failed to delete post");
  }

  return await response.json();
}

export const updatePost = async (token, postId, newPost) => {
  const response = await fetch(`${BACKEND_URL}/posts/${postId}`, {
  method: "PUT",
  headers: {
      "Content-Type": "application/json",
      "Authorization": `Bearer ${token}`,
  },
  body: JSON.stringify({ message: newPost }),
  });

  if (!response.ok) {
  const errorMessage = await response.json();
  console.error("Error updating post:", errorMessage);
  throw new Error("Failed to update the post.");
  }

  return response.json();
};