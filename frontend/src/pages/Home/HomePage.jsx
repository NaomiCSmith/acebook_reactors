import { Link } from "react-router-dom";
import logo from "../../assets/logo-acebook.svg";
import { useState } from 'react'
import "./HomePage.css";

export function HomePage() {
  return (
    <>
 
    <div className="home">
      <div className="welcome-container">
        <img src={logo} alt="Acebook Logo" className="logo" />
        <p className="tagline">Connect and share with the devs in your life, Acebook style.</p>
      </div>
      <div className="button-container">
        <Link to="/signup" className="signup-button">Create New Account</Link>
        <Link to="/login" className="login-button">Log In</Link>
      </div>
    </div>
    </>
  );
}