import SignUpBtn from './signup-btn';
import { Link } from 'react-router-dom';
import { Navigate, useNavigate } from 'react-router-dom';
import { Button, Col, Row, Container } from 'react-bootstrap';
import heroImage from '../assets/IMGS/Hero.jpg'; //Edit
import '../assets/css/hero-section.css';
function HeroSection () {
    const navigate = useNavigate()
    return (
        <>
                    <Container fluid className='g-0 hero-container'>
                        <Row className='reverse'>
                            <Col xs={12} xl={6}>
                                <div className="left-side d-flex ms-5 ps-4 flex-column justify-content-center align-items-start gap-3">
                                    <div className='first display-5 mb-2'>Learn with expert anytime anywhere</div>
                                    <div className='second'>Our mission is to help people to find the best source online and learn with expert anytime, anywhere.</div>
                                    <div className='third d-flex justify-content-start align-items-center gap-2'>
                                        <Button className="read-btn" onClick={() => navigate('/Articles')}>Start Reading</Button>
                                        <Button className="up-btn" onClick={() => navigate('/signup')}>Create Account</Button>
                                    </div>
                                </div>
                            </Col>
                            <Col xs={12} xl={6}>
                                <div className="right-side">
                                    <img className='hero-img'  src="home-images/hero/hero.jpg" alt="Hero Image" />
                                </div>
                            </Col>
                        </Row>
                    </Container>

        </>
    )
}
export default HeroSection