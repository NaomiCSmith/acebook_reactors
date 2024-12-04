import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { signupUser } from "../../services/users"; 

export function SignupPage() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [username, setUsername] = useState("");
  const [photo, setPhoto] = useState(null); 
  const [errorMessage, setErrorMessage] = useState("");
  const navigate = useNavigate();

  const handleFileChange = (event) => {
    const file = event.target.files[0];
    setPhoto(file); 
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    try {
      setErrorMessage("");

      const formData = new FormData();
      formData.append("email", email);
      formData.append("password", password);
      formData.append("username", username);
      if (photo) {
        formData.append("photo", photo); 
      }

      const data = await signupUser(formData); 

      console.log("Signup successful:", data);
      navigate("/login"); 
    } catch (error) {
      console.error("Error during signup:", error);
      setErrorMessage(error.message); 
    }
  };

  return (
    <div>
      <h2>Signup</h2>
      {errorMessage && <p className="error-message">{errorMessage}</p>}
      <form onSubmit={handleSubmit}>
        <label htmlFor="username">Username:</label>
        <input
          id="username"
          type="text"
          value={username}
          onChange={(e) => setUsername(e.target.value)}
          required
        />
        <br/>
        <br/>
        <label htmlFor="email">Email:</label>
        <input
          id="email"
          type="email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          required
        />
        <br/>
        <br/>
        <label htmlFor="password">Password:</label>
        <input
          id="password"
          type="password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          required
          minLength={6}
        />
        <br/>
        <br/>
        <label htmlFor="photo">Profile Photo (optional):</label>
        <input id="photo" type="file" onChange={handleFileChange} />
        <button type="submit">Sign Up</button>
      </form>
    </div>
  );
}

