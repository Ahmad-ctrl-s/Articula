import Container from 'react-bootstrap/Container';
import Nav from 'react-bootstrap/Nav';
import Navbar from 'react-bootstrap/Navbar';
import Offcanvas from 'react-bootstrap/Offcanvas';
import { Dropdown, Button } from 'react-bootstrap';
import { NavLink, Link } from 'react-router-dom';
import { FaFacebookF, FaInstagram, FaLinkedin, FaRegCircleUser, FaTwitter } from "react-icons/fa6";
import { VscAccount } from "react-icons/vsc";
import SignInBtn from './signin-btn';
import SignUpBtn from './signup-btn';
import RegisterationBar from './regestration-bar';
import { UserAuth } from '../main-pages/application-context/auth-context';
import { useContext } from 'react';
import '../assets/css/navbar.css';

function Navigation() {
  const { isAuthorized, setIsAuthorized } = useContext(UserAuth);

  return (
    <>
      <div className="navbar-wrapper">
        <Navbar expand="lg" className="p-0 flex-wrap">
          <Container fluid className="nav-container flex-wrap g-0">
            <Navbar.Toggle aria-controls="offcanvasNavbar" />


            <Navbar.Brand href="/" className="d-lg-none ms-0 d-flex justify-content-center align-items-center">
              <img alt="Logo" src="home-images/logo/graduation-cap.png" />
              <span className="text-white fw-bold">Articula</span>
            </Navbar.Brand>

            <Dropdown className="p-0 d-inline-flex d-lg-none">
              <Dropdown.Toggle id="dropdown-basic" className="p-0 bg-dark d-flex align-items-center navbar-dropdown-toggle">
                {/* <FaRegCircleUser className="p-0" /> */}
                <VscAccount />
              </Dropdown.Toggle>
              <Dropdown.Menu className="dropdown-menu-end">
                {!isAuthorized && (
                  <>
                    <Dropdown.Item as={Link} to="/login">
                      Signin
                    </Dropdown.Item>
                    <Dropdown.Item as={Link} to="/signup">
                      Create Account
                    </Dropdown.Item>
                  </>
                )}
                {isAuthorized && (
                  <>
                    <Dropdown.Item as={Link} to="/profile">
                      Profile
                    </Dropdown.Item>
                    <Dropdown.Item as={Link} to="/My_Articles">
                      My Articles
                    </Dropdown.Item>
                    <Dropdown.Item>
                      <Button
                        onClick={() => {
                          localStorage.clear();
                          setIsAuthorized(false);
                        }}
                        className="logout-btn p-0 m-0 text-white fw-0"
                        title="Logout"
                      >
                        Logout
                      </Button>
                    </Dropdown.Item>
                  </>
                )}
              </Dropdown.Menu>
            </Dropdown>

            <Navbar.Offcanvas
              id="offcanvasNavbar"
              aria-labelledby="offcanvasNavbarLabel"
              placement="start"
              className="bg-dark"
            >
              <Offcanvas.Header className='pb-0' closeButton>
              </Offcanvas.Header>
              <Offcanvas.Body className='pt-0'>
                <Nav className="d-flex w-100">
                  <NavLink to="/" end className="text-white nav-link"> Home</NavLink>
                  <NavLink to="/Articles" end className="text-white nav-link">Articles</NavLink>
                  <NavLink to="/Vacancies" end className="text-white nav-link">Vacancies</NavLink>
                  <NavLink to="/About" end className="text-white nav-link">About Us</NavLink>
                  <NavLink to="/Contact" end className="text-white nav-link">Contact</NavLink>
                  <div className="social-container d-flex me-5 me-lg-0 mt-3 mt-lg-0 mx-lg-0 ms-lg-auto gap-2 justify-content-between ">
                    <Nav.Link href="https://www.facebook.com/Tamkeen.developer/?locale=ar_AR" target="_blank" className="nav-link exclude">
                      <FaFacebookF className="facebook" />
                    </Nav.Link>
                    <Nav.Link href="https://www.instagram.com/tamkeen.dev/?hl=ar" target="_blank" className="nav-link exclude">
                      <FaInstagram className="instagram" />
                    </Nav.Link>
                    <Nav.Link href="https://sy.linkedin.com/company/tamkeen-dev" target="_blank" className="nav-link exclude">
                      <FaLinkedin className="linkedin" />
                    </Nav.Link>
                    <Nav.Link href="#twitter" target="_blank" className="nav-link exclude">
                      <FaTwitter className="twitter" />
                    </Nav.Link>
                  </div>
                </Nav>
              </Offcanvas.Body>
            </Navbar.Offcanvas>
          </Container>
        </Navbar>
      </div>

      <RegisterationBar inBtn={<SignInBtn />} upBtn={<SignUpBtn />} />
    </>
  );
}

export default Navigation;