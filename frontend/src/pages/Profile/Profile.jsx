import React, { useEffect, useState } from 'react';
import Header from "../Header/Header";
import "./profile.css";
import defaultAvatar from "../../assets/default-avatar.png"; // Import the avatar

export const Profile = () => {
  // Placeholder user data
  const userID = localStorage.getItem("userID");
  const email = localStorage.getItem("email");
  const username = localStorage.getItem("username");

  const user = {
    username: username,
    email: email,
    password: "*******", // Obscured password
    photo: "", // Leave blank for default avatar
  };

  

  // Fallback to default avatar if no photo is provided
  const profilePhoto = user.photo || defaultAvatar;

  return (
    <>
      <Header />
      <div className="container-fluid mt-5"> {/* Full-width container */}
        <div className="row justify-content-center">
          <div className="col-md-10 col-lg-8 profile-wrapper"> {/* Add custom class */}
            <div className="card shadow-lg"> {/* Added shadow for modern look */}
              <div className="card-header text-center bg-light">
                <img
                  src={profilePhoto}
                  alt="Profile"
                  className="rounded-circle border"
                  style={{ width: "150px", height: "150px", objectFit: "cover" }}
                />
              </div>
              <div className="card-body">
                <h2 className="card-title text-center mb-4">{user.username}</h2>
                <ul className="list-group list-group-flush">
                  <li className="list-group-item">
                    <strong>Email:</strong> {user.email}
                  </li>
                  <li className="list-group-item">
                    <strong>Password:</strong> {user.password}
                  </li>
                </ul>
                <div className="text-center mt-4">
                  <button
                    className="btn btn-primary btn-lg"
                    onClick={() => {
                      alert("Edit Profile Clicked!");
                    }}
                  >
                    Edit Profile
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}