import { Navbar, Container, Row, Col, Button, Dropdown, ButtonGroup } from 'react-bootstrap';
import { useLocation, useNavigate } from 'react-router-dom';
import { CiLogout } from 'react-icons/ci';
import { UserAuth } from '../main-pages/application-context/auth-context';
import { useContext, Link } from 'react';
import '../assets/css/Navbar.css';
import '../assets/css/registeration-bar.css';

function RegisterationBar({ inBtn, upBtn }) {
    const {isAuthorized,setIsAuthorized, formData } = useContext(UserAuth);
    const logoutToken = formData.logoutToken;
    let location = useLocation();
    let path = location.pathname
    const navigate = useNavigate();
    const handleNavigate = (target) => {
        navigate(target);
    };

    function logoutFunction() {
        fetch(`https://tamkeen-dev.com/api/user/logout?_format=json&token=${logoutToken}`, {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' }
        })
        localStorage.clear()
        setIsAuthorized(false)
        navigate('/')
        window.location.reload()
    }


    return (
        <>
            <div className={`w-100 regbar-wrapper d-lg-flex d-none `}>
                <Container fluid>
                    <Row className='overflow-visible'>
                        <Col>
                            <div className=' regbar-container d-flex justify-content-between my-3 '>
                                <Navbar.Brand href="/">
                                    <img alt="Logo" src="home-images/logo/logo.png" className="d-inline-block align-top" />
                                </Navbar.Brand>

                                <div className="btns-container d-flex ms-auto gap-2 ">
                                    {path === '/login' && (
                                        <>
                                            <div className='d-flex align-items-center'>
                                                <span className="me-2 pb-0 mb-0">Don't have an account?</span>
                                                <button className="btn" onClick={() => handleNavigate('/signup')}>
                                                    Create Account
                                                </button>
                                            </div>
                                        </>
                                    )}
                                    {path === '/signup' && (
                                        <>
                                            <div className='d-flex align-items-center'>
                                                <span className="me-2">Already have an account?</span>
                                                <button className="btn btn-outline-light" onClick={() => handleNavigate('/login')}>
                                                    Login
                                                </button>
                                            </div>
                                        </>
                                    )}
                                    {path !== '/login' && path !== '/signup' && (

                                        (localStorage.getItem("username") ?
                                            <div className='d-flex gap-1 welcoming-logout-container align-items-center'>
                                                <div className='d-flex justify-content-center'>
                                                    <img className='user-img' src="user/user-img.jpg" alt="User Image" />
                                                </div>
                                                <div className='welocming-message'>
                                                    <Dropdown className="d-inline mx-2">
                                                        <Dropdown.Toggle id="dropdown-autoclose-true" className='dropdown-toggle-btn'>
                                                            {localStorage.getItem("username")}
                                                        </Dropdown.Toggle>

                                                        <Dropdown.Menu>
                                                            <Dropdown.Item href="/profile">
                                                                My Account
                                                            </Dropdown.Item>
                                                            <Dropdown.Item href="/My_Articles">My Articles</Dropdown.Item>
                                                            <Dropdown.Divider className='bg-white dropdown-divider mx-2' />
                                                            <Dropdown.Item className='logout-btn py-0' as={Button} onClick={logoutFunction}>Logout</Dropdown.Item>
                                                        </Dropdown.Menu>
                                                    </Dropdown>

                                                </div>

                                            </div>
                                            : <>
                                                {inBtn}
                                                {upBtn}
                                            </>)


                                    )}
                                </div>
                            </div>
                        </Col>
                    </Row>
                </Container>
            </div>
        </>
    )
}
export default RegisterationBar