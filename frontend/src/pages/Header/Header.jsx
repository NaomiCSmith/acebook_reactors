import { useNavigate } from "react-router-dom";
import "./header.css";
import Container from 'react-bootstrap/Container';
import Nav from 'react-bootstrap/Nav';
import Navbar from 'react-bootstrap/Navbar';
// import NavDropdown from 'react-bootstrap/NavDropdown';

const Header = () => {

  const navigate = useNavigate();

  function handleLogout() {
    localStorage.removeItem("token"); // Remove the token to log out
    navigate("/"); // Redirect to the homepage or login page
  }

    return (
        <div>
            
          <Navbar expand="lg" className="bg-body-tertiary">
            <Container>
              <Navbar.Brand href="#home">Acebook</Navbar.Brand>
              <Navbar.Toggle aria-controls="basic-navbar-nav" />
              <Navbar.Collapse id="basic-navbar-nav">
                {/* Navigation links */}
                <Nav className="me-auto">
                  <Nav.Link href="#home">Home</Nav.Link>
                  <Nav.Link href="#profile">Profile</Nav.Link>
                </Nav>
                {/* Logout link aligned to the right */}
                <Nav className="ms-auto">
                <Nav.Link onClick={handleLogout} style={{ cursor: "pointer" }}>Logout</Nav.Link>                  
                </Nav>
              </Navbar.Collapse>
            </Container>
          </Navbar>

        </div>
    )
}

export default Header