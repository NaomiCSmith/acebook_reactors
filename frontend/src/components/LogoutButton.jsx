import { useNavigate } from "react-router-dom";

function LogoutButton() {
  const navigate = useNavigate();

  function logOut() {
    localStorage.clear()
    navigate("/");
  }

  return <button onClick={logOut}>Log out</button>;
}

export default LogoutButton;
