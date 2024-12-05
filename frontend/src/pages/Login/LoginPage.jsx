import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { login } from "../../services/authentication";
import { getUserByEmail } from "../../services/users";
import NoLoginHeader from "../../components/NoLoginHeader"
import "../Login/LoginPage.css"

export function LoginPage() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();

  async function handleSubmit(event) {
    event.preventDefault();
    try {
      const token = await login(email, password);
      const userID = await getUserByEmail(token,email)
      localStorage.setItem("token", token);
      localStorage.setItem("userID", userID._id);
      localStorage.setItem("email", email);
      localStorage.setItem("password", password);
      navigate("/welcome");
    } catch (err) {
      console.error(err);
      navigate("/login");
    }
  }

  function handleEmailChange(event) {
    setEmail(event.target.value);
  }

  function handlePasswordChange(event) {
    setPassword(event.target.value);
  }

  return (
    <>
    <NoLoginHeader />
      <h2>Login</h2>
      <form onSubmit={handleSubmit}>
        <label htmlFor="email">Email:</label>
        <input
          id="email"
          type="text"
          value={email}
          onChange={handleEmailChange}
        />
        <br/>
        <br/>
        <label htmlFor="password">Password:</label>
        <input
          id="password"
          type="password"
          value={password}
          onChange={handlePasswordChange}
        />
        <br/>
        <br/>
        <input className="login-submit"role="submit-button" id="submit" type="submit" value="Submit" />
      </form>
    </>
  )
}
