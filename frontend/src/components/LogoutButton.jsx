import { useNavigate } from "react-router-dom";

function LogoutButton() {
  const navigate = useNavigate();

  function logOut() {
    localStorage.removeItem("token");
    localStorage.removeItem("email");
    localStorage.removeItem("userID");
    localStorage.removeItem("userId");
    navigate("/");
  }

  return <button onClick={logOut}>Log out</button>;
}

export default LogoutButton;
