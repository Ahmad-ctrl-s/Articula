import { Container, Row, Col, Button } from 'react-bootstrap'
import { TfiEmail } from "react-icons/tfi";
import '../../assets/css/contact-compontents-style/contact-f-section.css'
function ContactFSection () {
    return (
        <>
            <div className="Fourth-section-wrapper contact-first-section-wrapper pt-5 bg-white">
                <Container fluid>
                    <Row className='Fourth-section-row'>
                        <Col xs={12} xl={5}>
                            <div className="about-first d-flex flex-column justify-content-center align-items-start gap-3">
                                <div className="fw-bold display-5">Connect With Us</div>
                                <div className="text-muted w-75">
                                    Want to chat? We'd love to hear from you! 
                                    Get in touch with our Customer Success Team to inquire about speaking events, 
                                    advertising rates, or just say hello.
                                </div>
                                <a className='btn d-flex justify-content-center align-items-center' href="mailto:someone@example.com"> 
                                    <TfiEmail className='mail-img me-2'/>
                                    <span>Copy Email</span> 
                                </a>
                            </div>
                        </Col>
                        <Col xs={12} xl={7} className='overflow-hidden'>
                            <img className='contact-first-img' src="contact/first-section/1.png" alt="working office" />
                        </Col>
                    </Row>
                </Container>
            </div>
        </>
    )
}
export default ContactFSection