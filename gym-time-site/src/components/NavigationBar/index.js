import logo from '../../assets/logo.jpg';
import { Navbar, Nav, NavDropdown } from 'react-bootstrap';
import './NavigationBar.scss';

const NavigationBar = () => {

  return (
    <div>
        <Navbar className="nav-container" expand="lg" variant="light">
            <Navbar.Brand href="/">
            <img
                alt=""
                src={logo}
                width="40"
                height="40"
                className="d-inline-block align-top"
            />{' '}
            </Navbar.Brand>
            <Navbar.Toggle aria-controls="responsive-navbar-nav" />
            <Navbar.Collapse id="responsive-navbar-nav">
              <Nav
                className="mr-auto my-2 my-lg-0"
                style={{ maxHeight: '100px' }}
                navbarScroll
              >
              <NavDropdown title="Why Gym Time?" id="navbarScrollingDropdown">
                <NavDropdown.Item href="/locations">Locations</NavDropdown.Item>
                <NavDropdown.Item href="/pricing">Pricing</NavDropdown.Item>
                <NavDropdown.Item href="/benefits">Benefits</NavDropdown.Item>
              </NavDropdown>
              <Nav.Link href="/staff">Staff</Nav.Link>
              <Nav.Link href="/merchandise">Merchandise</Nav.Link>
              </Nav>
            </Navbar.Collapse>
        </Navbar>
    </div>
  );
}

export default NavigationBar;