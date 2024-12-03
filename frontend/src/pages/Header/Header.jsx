import { Link, useNavigate } from "react-router-dom";
import "./header.css";
import Container from 'react-bootstrap/Container';
import Nav from 'react-bootstrap/Nav';
import Navbar from 'react-bootstrap/Navbar';

const Header = () => {
  const navigate = useNavigate();

  function handleLogout() {
    localStorage.clear()
    navigate("/"); // Redirect to the homepage or login page
  }

  return (
    <Navbar expand="md" className="bg-body-tertiary shadow-sm"> {/* Adjusted expand breakpoint */}
      <Container> {/* Use regular Container to constrain the width */}
        <Navbar.Brand as={Link} to="/">Acebook</Navbar.Brand>
        <Navbar.Toggle aria-controls="basic-navbar-nav" />
        <Navbar.Collapse id="basic-navbar-nav">
          <Nav className="me-auto">
            <Nav.Link as={Link} to="/posts">Home</Nav.Link>
            <Nav.Link as={Link} to="/profile">Profile</Nav.Link>
          </Nav>
          <Nav className="ms-auto">
            <Nav.Link onClick={handleLogout} style={{ cursor: "pointer" }}>
              Logout
            </Nav.Link>
          </Nav>
        </Navbar.Collapse>
      </Container>
    </Navbar>
  );
};

export default Header;
