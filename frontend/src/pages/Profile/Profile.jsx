import { useEffect, useState } from "react";
import Header from "../Header/Header";
import "./profile.css";
import defaultAvatar from "../../assets/default-avatar.png";
import { getUserFriends, uploadProfilePhoto } from "../../services/users";

export const Profile = () => {
  const [user, setUser] = useState(null);
  const [isEditing, setIsEditing] = useState(false);
  const [hover, setHover] = useState(false);
  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("******");
  const [photo, setPhoto] = useState("");
  const token = localStorage.getItem("token");
  const [friends, setFriends] = useState([]);

  const userID = localStorage.getItem("userID");

  useEffect(() => {
    const fetchUser = async () => {
      try {
        const response = await fetch(`http://localhost:3000/users/findById/${userID}`);
        const data = await response.json();
        
        setUser(data);
        setUsername(data.username);
        setEmail(data.email);
        setPassword("******"); // Mask password for display
        setPhoto(data.photo || defaultAvatar); // Set photo or default avatar

        const userFriends = await getUserFriends(token, userID);
        setFriends(userFriends);
      } catch (error) {
        console.error("Error fetching user data:", error);
      }
    };
    fetchUser();
  }, [userID, token]);

  const handleFileChange = async (event) => {
    const file = event.target.files[0];
    if (!file) return;

    const formData = new FormData();
    formData.append("file", file);
    formData.append("userId", userID);

    try {
      const response = await uploadProfilePhoto(file, userID)

      if (response && response.user) {
        setPhoto(response.user.photo);
        alert("Photo updated successfully!");
      } else {
        console.error("Error response from server:", response);
        alert("Failed to upload photo.");
      }
    } catch (error) {
      console.error("Error uploading file:", error);
    }
  };

  const handleSave = async () => {
    try {
      const response = await fetch(`http://localhost:3000/users/${userID}`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          username,
          email,
          password,
        }),
      });

      const data = await response.json();
      if (response.ok) {
        setIsEditing(false);
        setUser(data);
        alert("Profile updated successfully!");
      } else {
        console.error("Error updating profile:", data);
        alert("Failed to update profile.");
      }
    } catch (error) {
      console.error("Error saving profile:", error);
    }
  };

  if (!user) {
    return <p>Loading...</p>; // Loading state
  }

  return (
    <>
      <Header />
      <div className="container-fluid mt-5">
        <div className="row justify-content-center">
          <div className="col-md-10 col-lg-8 profile-wrapper">
            <div className="card shadow-lg">
              <div className="card-header text-center bg-light">
                <div
                  className={`profile-photo-wrapper ${hover ? "hover" : ""}`}
                  onMouseEnter={() => setHover(true)}
                  onMouseLeave={() => setHover(false)}
                >
                  <img
                    src={photo || defaultAvatar}
                    alt="Profile"
                    className="profile-photo"
                  />
                  <label htmlFor="file-input" className="overlay">
                    Change Image
                  </label>
                  <input
                    id="file-input"
                    type="file"
                    accept="image/*"
                    style={{ display: "none" }}
                    onChange={handleFileChange}
                  />
                </div>
              </div>
              <div className="card-body">
                {isEditing ? (
                  <>
                    <div className="mb-3">
                      <label htmlFor="username" className="form-label">
                        Username:
                      </label>
                      <input
                        id="username"
                        type="text"
                        className="form-control"
                        value={username}
                        onChange={(e) => setUsername(e.target.value)}
                      />
                    </div>
                    <div className="mb-3">
                      <label htmlFor="email" className="form-label">
                        Email:
                      </label>
                      <input
                        id="email"
                        type="email"
                        className="form-control"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                      />
                    </div>
                    <div className="mb-3">
                      <label htmlFor="password" className="form-label">
                        Password:
                      </label>
                      <input
                        id="password"
                        type="text"
                        className="form-control"
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                      />
                    </div>
                    <div className="text-center mt-4">
                      <button className="btn btn-success me-2" onClick={handleSave}>
                        Save
                      </button>
                      <button
                        className="btn btn-secondary"
                        onClick={() => setIsEditing(false)}
                      >
                        Cancel
                      </button>
                    </div>
                  </>
                ) : (
                  <>
                    <h2 className="card-title text-center mb-4">{user.username}</h2>
                    <ul className="list-group list-group-flush">
                      <li className="list-group-item">
                        <strong>Email:</strong> {user.email}
                      </li>
                      <li className="list-group-item">
                        <strong>Password:</strong> ******
                      </li>
                    </ul>
                    <p><strong>Followers</strong></p>
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
                    <div className="text-center mt-4">
                      <button className="btn btn-lg edit-button" onClick={() => setIsEditing(true)}>
                        Edit Profile
                      </button>
                    </div>
                  </>
                )}
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};
