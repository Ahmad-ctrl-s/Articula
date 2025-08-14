import { Container, Row, Col } from 'react-bootstrap';
import '../../assets/css/about-components-style/fifth-section.css';

function FifthSection () {
    return (
        <>
            <Container fluid className='py-5'>
                <Row className='fifth-wection-wrapper'>
                    <Col>
                        <div className="fifth-container d-flex align-items-center gap-4">
                            <div className="fifth-child-container d-flex flex-column align-items-center">
                                <div className="fifth-child d-flex flex-column align-items-center p-2">
                                    <img src="about/fifth-section/double-quotes-r-1.png" alt="Notation" className="me-auto" />
                                    <span className="fifth-child-text">
                                    Eduguard fit us like a glove. 
                                    Their team curates fresh, 
                                    up-to-date courses from their marketplace and makes them available to customers.
                                    </span>
                                    <img src="public/About/Fifth-section/double-quotes-r-2.png" alt="Notation" className="ms-auto" />
                                </div>
                                <div className='mt-4'>Sundar Pichai</div>
                                <div>Chief Chairman of <a href="https://www.google.com">Google</a></div>
                            </div>
                            <div className="fifth-child-container d-flex flex-column align-items-center">
                                <div className="fifth-child d-flex flex-column align-items-center p-2">
                                    <img src="about/fifth-section/double-quotes-r-1.png" alt="Notation" className="me-auto" />
                                    <span className="fifth-child-text">
                                    Eduguard fit us like a glove. 
                                    Their team curates fresh, 
                                    up-to-date courses from their marketplace and makes them available to customers.
                                    </span>
                                    <img src="public/About/Fifth-section/double-quotes-r-2.png" alt="Notation" className="ms-auto" />
                                </div>
                                <div className='mt-4'>Satya Nadella</div>
                                <div>CEO of <a href="https://www.microsoft.com">Microsoft</a></div>
                            </div>
                            <div className="fifth-child-container d-flex flex-column align-items-center">
                                <div className="fifth-child d-flex flex-column align-items-center p-2">
                                    <img src="about/fifth-section/double-quotes-r-1.png" alt="Notation" className="me-auto" />
                                    <span className="fifth-child-text">
                                    Eduguard fit us like a glove. 
                                    Their team curates fresh, 
                                    up-to-date courses from their marketplace and makes them available to customers.
                                    </span>
                                    <img src="public/About/Fifth-section/double-quotes-r-2.png" alt="Notation" className="ms-auto" />
                                </div>
                                <div className='mt-4'>Ted Sarandos</div>
                                <div>Chief Executive Officer of <a href="https://www.netflix.com">Netflix</a></div>
                            </div>
                            
                        </div>
                    </Col>
                </Row>
            </Container>
        </>
    )
}
export default FifthSection