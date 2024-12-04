import { useState } from "react";
import { useNavigate } from "react-router-dom";

export function SignupPage() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [username, setUsername] = useState("");
  const [photo, setPhoto] = useState(null); // Handle file input
  const [errorMessage, setErrorMessage] = useState("");
  const navigate = useNavigate();

  const handleFileChange = (event) => {
    const file = event.target.files[0];
    setPhoto(file);
    console.log("File selected:", file); // Debug log
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
        console.log("Photo attached to formData:", photo.name); // Debug log
      }
  
      const response = await fetch("http://localhost:3000/users", {
        method: "POST",
        body: formData,
      });
  
      const data = await response.json();
      console.log("Response from server:", data); // Debug log
  
      if (response.ok) {
        console.log("Signup successful, redirecting...");
        navigate("/login");
      } else {
        if (data.message === "Email already in use") {
          setErrorMessage("This email is already registered. Please use a different email.");
        } else {
          console.error("Error response from server:", data);
          setErrorMessage(data.message || "Signup failed. Please try again.");
        }
      }
    } catch (error) {
      console.error("Error during signup:", error);
      setErrorMessage("An unexpected error occurred. Please try again.");
    }
// <<<<<<< post_username
//   }

//   localStorage.setItem("username", username);

//   function handleEmailChange(event) {
//     setEmail(event.target.value);
//   }

//   function handlePasswordChange(event) {
//     setPassword(event.target.value);
//   }

//   function handleUsernameChange(event) {
//     setUsername(event.target.value)
//   }
// =======
  };
  

  return (
    <>
      <h2>Signup</h2>
      {errorMessage && <p className="error-message">{errorMessage}</p>}
      <form onSubmit={handleSubmit} encType="multipart/form-data">
        <label htmlFor="username">Username:</label>
        <input
          id="username"
          type="text"
          value={username}
          onChange={(e) => setUsername(e.target.value)}
          required
        />
        <label htmlFor="email">Email:</label>
        <input
          id="email"
          type="email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          required
        />
        <label htmlFor="password">Password:</label>
        <input
          placeholder="Password"
          id="password"
          type="password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          required
          minLength={6}
        />
        <label htmlFor="photo">Profile Photo (optional):</label>
        <input id="photo" type="file" onChange={handleFileChange} />
        <input role="submit-button" id="submit" type="submit" value="Submit" />
      </form>
    </>
  );
}


// import { useState } from "react";
// import { useNavigate } from "react-router-dom";

// export function SignupPage() {
//   const [email, setEmail] = useState("");
//   const [password, setPassword] = useState("");
//   const [username, setUsername] = useState("");
//   const [photo, setPhoto] = useState(null); // Handle file input
//   const [errorMessage, setErrorMessage] = useState("");
//   const navigate = useNavigate();

//   // Handle the file input change
//   const handleFileChange = (event) => {
//     const file = event.target.files[0];
//     setPhoto(file);
//     console.log("File selected:", file); // Debug log
//   };

//   // Handle form submission
//   const handleSubmit = async (event) => {
//     event.preventDefault();
//     try {
//       setErrorMessage("");
  
//       const formData = new FormData();
//       formData.append("email", email);
//       formData.append("password", password);
//       formData.append("username", username);
//       if (photo) {
//         formData.append("photo", photo); // Attach the photo to the form data
//         console.log("Photo attached to formData:", photo.name); // Debug log
//       }
  
//       const response = await fetch("http://localhost:3000/users", {
//         method: "POST",
//         body: formData,
//       });
  
//       const data = await response.json();
//       console.log("Response from server:", data); // Debug log
  
//       if (response.ok) {
//         console.log("Signup successful, redirecting...");
//         navigate("/login");
//       } else {
//         if (data.message === "Email already in use") {
//           setErrorMessage("This email is already registered. Please use a different email.");
//         } else {
//           console.error("Error response from server:", data);
//           setErrorMessage(data.message || "Signup failed. Please try again.");
//         }
//       }
//     } catch (error) {
//       console.error("Error during signup:", error);
//       setErrorMessage("An unexpected error occurred. Please try again.");
//     }
//   };

//   return (
//     <>
//       <h2>Signup</h2>
//       {errorMessage && <p className="error-message">{errorMessage}</p>}
//       <form onSubmit={handleSubmit} encType="multipart/form-data">
//         <label htmlFor="username">Username:</label>
//         <input
//           id="username"
//           type="text"
//           value={username}
//           onChange={(e) => setUsername(e.target.value)}
//           required
//         />
//         <label htmlFor="email">Email:</label>
//         <input
//           id="email"
//           type="email"
//           value={email}
//           onChange={(e) => setEmail(e.target.value)}
//           required
//         />
//         <label htmlFor="password">Password:</label>
//         <input
//           placeholder="Password"
//           id="password"
//           type="password"
//           value={password}
//           onChange={(e) => setPassword(e.target.value)}
//           required
//           minLength={6}
//         />
//         <label htmlFor="photo">Profile Photo (optional):</label>
//         <input id="photo" type="file" onChange={handleFileChange} />
//         <input role="submit-button" id="submit" type="submit" value="Submit" />
//       </form>
//     </>
//   );
// }
