import { useNavigate } from "react-router-dom";
import "./LogoutButton.css"

function LogoutButton() {
  const navigate = useNavigate();

  function logOut() {
    localStorage.clear()
    navigate("/");
  }

  return <button onClick={logOut}>Log out</button>;
}

export default LogoutButton;
