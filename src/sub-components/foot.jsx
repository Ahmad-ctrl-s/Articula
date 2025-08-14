import { Container, Row, Col } from 'react-bootstrap'
import { FaFacebookF, FaInstagram, FaLinkedin, FaTwitter, FaYoutube} from "react-icons/fa6";
import { MdOutlineArrowRightAlt } from "react-icons/md";
import { Link } from 'react-router-dom';
// import Home from '../main-pages/home';
import '../assets/css/foot.css'
function Footer () {
    return (
        <>
            <div className="footer-wrapper pt-5">
                <Container fluid>
                    <Row className='footer-row'>
                        <Col xl={4} xs={12}>
                            <div className="d-flex flex-column align-items-start gap-3 footer-upper">
                                <Link to='/' className='d-flex w-100 logo-link'>
                                    <img src="home-images/logo/graduation-cap.png" alt="Articula" />
                                    <span className='h2 fw-bold ms-1 text-white'>Articula</span>
                                </Link>
                                <span className='f-u-logo'>Aliquam rhoncus ligula est, non pulvinar elit
                                convallis nec. Donec mattis odio at.</span>
                                <div className="footer-social-container d-flex gap-4">
                                    <a className='footer-icon' href="https://www.facebook.com">
                                        <FaFacebookF/>
                                    </a>
                                    <a className='footer-icon' href="https://www.instagram.com">
                                        <FaInstagram/>
                                    </a>
                                    <a className='footer-icon' href="https://www.linkedin.com">
                                        <FaLinkedin/>
                                    </a>
                                    <a className='footer-icon' href="https://www.twitter.com">
                                        <FaTwitter/>
                                    </a>
                                    <a className='footer-icon' href="https://www.youtube.com">
                                        <FaYoutube/>
                                    </a>
                                </div>
                            </div>
                        </Col>
                        <Col xl={2} sm={6} xs={12}  className='ms-auto'>
                            <div className=" first-ul mx-2 ul-container d-flex flex-column">
                                <span className="h6">TOP 4 CATEGORY</span>
                                <ul className='footer-ul d-flex flex-column align-items-start ps-0 gap-1 justify-content-end'>
                                    <li>
                                        <a href="">Development<MdOutlineArrowRightAlt className='footer-li-arrow'/></a>
                                    </li>
                                    <li>
                                        <a href="">Finance & Accounting<MdOutlineArrowRightAlt className='footer-li-arrow'/></a>
                                    </li>
                                    <li>
                                        <a href="">Design<MdOutlineArrowRightAlt className='footer-li-arrow'/></a>
                                    </li>
                                    <li>
                                        <a href="">Buisness<MdOutlineArrowRightAlt className='footer-li-arrow'/></a>
                                    </li>
                                </ul>
                            </div>
                        </Col>
                        <Col xl={2} sm={6} xs={12}>
                            <div className="second-ul mx-2 ul-container d-flex flex-column">
                                <span className="h6">QUICK LINKS</span>
                                <ul className='footer-ul d-flex flex-column align-items-start ps-0 gap-1 justify-content-end'>
                                    <li>
                                        <a href="">About<MdOutlineArrowRightAlt className='footer-li-arrow'/></a>
                                    </li>
                                    <li>
                                        <a href="">Became an Author <MdOutlineArrowRightAlt className='footer-li-arrow'/> </a>
                                    </li>
                                    <li>
                                        <a href="">Contact<MdOutlineArrowRightAlt className='footer-li-arrow'/></a>
                                    </li>
                                    <li>
                                        <a href="">Career<MdOutlineArrowRightAlt className='footer-li-arrow'/></a>
                                    </li>
                                </ul>
                            </div>
                        </Col>
                        <Col xl={2} sm={6} xs={12}>
                            <div className="mx-2 ul-container d-flex flex-column ">
                                <span className="h6">SUPPORT</span>
                                <ul className='footer-ul d-flex flex-column align-items-start ps-0 gap-1 justify-content-end'>
                                    <li>
                                        <a href="">Help Center<MdOutlineArrowRightAlt className='footer-li-arrow'/></a>
                                    </li>
                                    <li>
                                        <Link to="/FAQs">FAQs<MdOutlineArrowRightAlt className='footer-li-arrow'/></Link>
                                    </li>
                                    <li>
                                        <a href="">Terms & Conditions<MdOutlineArrowRightAlt className='footer-li-arrow'/></a>
                                    </li>
                                    <li>
                                        <a href="">Privacy Policy<MdOutlineArrowRightAlt className='footer-li-arrow'/></a>
                                    </li>
                                </ul>
                            </div>
                        </Col>
                        <Col xl={2} sm={6} xs={12}>
                            <div className="mx-2 ul-container d-flex flex-column">
                                <span className="h6">DOWNLOAD OUR APP</span>
                                <ul className='footer-ul d-flex flex-column align-items-start ps-0 gap-1 justify-content-end'>
                                    <li className='download'>
                                        <img className='ms-0' src="home-images/foot/app-store.png" alt="App Store" />
                                    </li>
                                    <li className='download'>
                                        <img src="home-images/foot/play-store.png" alt="Play Store" />
                                    </li>
                                </ul>
                            </div>
                        </Col>

                    </Row>
                    <Row className='py-3 mt-5 rights-container'>
                        <Col xs={12}>
                            <span className=' d-inline-block text-center w-100'>
                                © 2025 - All rights reserved
                            </span>
                        </Col>
                    </Row>
                </Container>
            </div>
        </>
    )
}
export default Footer