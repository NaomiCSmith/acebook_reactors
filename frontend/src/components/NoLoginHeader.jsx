import { Link} from "react-router-dom";
import Container from 'react-bootstrap/Container';
import Navbar from 'react-bootstrap/Navbar';

const NoLoginHeader = () => {



return (
<Navbar expand="md" className="bg-body-tertiary shadow-sm"> 
    <Container> 
    <Navbar.Brand as={Link} to="/">Acebook</Navbar.Brand>
    </Container>
</Navbar>
);
};

export default NoLoginHeader;
