import React, { useState } from 'react';
import { Container, Form, Row, Col, Button } from 'react-bootstrap';
import { PiPaperPlaneRightLight } from "react-icons/pi";
import '../../assets/css/contact-compontents-style/contact-t-section.css';

function ContactTSection () {
    return (
        <>
            <Container fluid className='mt-5 contact-third-section-container'> 
                <Row className='contact-third-section-row py-5'>
                    <Col xs={12} className='contact-third-section-col'>
                        <Row className='mb-5'>
                            <Col xs={12} className='text-center'>
                                <div className='contact-intro browse'>Contact Us</div>
                            </Col>
                        </Row>
                        <Row className='justify-content-between gx-0'>
                            <Col xs={12} xl={4}>
                                <Row className='mb-3'>
                                    <Col xs={12} className='contact-form-intro'>
                                        Will you be in Los Angeles or any other branches any time soon? Stop by the office! We'd love to meet.
                                    </Col>
                                </Row>
                                <Row className='contact-information-container justify-content-between py-5'>
                                    <Col xs={4} className='information-title'>Address</Col>
                                    <Col xs={8} className='information-description'>Excepteur sint occaecat cupidatat non proiden. Excepteur sint occaecat.</Col>
                                </Row>
                                <Row className='contact-information-container justify-content-between py-5'>
                                    <Col xs={4} className='information-title'>Phone Number</Col>
                                    <Col xs={8} className='information-description'>
                                        <a href="tel:+9639500001" className='d-block text-decoration-none text-dark'>(963) 950-0001</a>
                                        <a href="tel:+9735323214" className='d-block text-decoration-none text-dark'>(973) 532-3214</a>
                                    </Col>
                                </Row>
                                <Row className='contact-information-container justify-content-between py-5'>
                                    <Col xs={4} className='information-title'>Email address</Col>
                                    <Col xs={8} className='information-description'>
                                        <a className='d-block text-decoration-none text-dark' href="mailto:Info@articula.com">Info@articula.com</a>
                                        <a className='text-decoration-none text-dark' href="mailto:career@articula.com">career@articula.com</a>   
                                    </Col>
                                </Row>


                            </Col>

                            <Col className='contact-right-col py-5 px-3' xs={12} xl={6}>
                                <Row className='mb-3'>
                                    <Col xs={12} className='contact-form-intro'>
                                        <div className='contact-form-intro'>Get In touch</div>
                                        <div className='text-muted'>Feel free contact with us, we love to make new partners & friends</div>
                                    </Col>
                                </Row>
                                <Form onSubmit={undefined}>
                                    <Row className='gap-x-3'>
                                        <Col xs={12} xl={6}>
                                            <Form.Group controlId="formFirstName">
                                                <Form.Label>First Name</Form.Label>
                                                <Form.Control
                                                    type="text"
                                                    name="firstName"
                                                    value={undefined}
                                                    onChange={undefined}
                                                    required
                                                />
                                            </Form.Group>
                                        </Col>
                                        <Col xs={12} xl={6}>
                                            <Form.Group controlId="formFirstName">
                                                <Form.Label>Last Name</Form.Label>
                                                <Form.Control
                                                    type="text"
                                                    name="lastName"
                                                    value={undefined}
                                                    onChange={undefined}
                                                    required
                                                />
                                            </Form.Group>
                                        </Col>
                                    </Row>

                                    <Row>
                                        <Col xs={12}>
                                            <Form.Group className="mb-3" controlId="formEmail">
                                                <Form.Label>Email</Form.Label>
                                                <Form.Control
                                                    type="email"
                                                    name="email"
                                                    value={undefined}
                                                    onChange={undefined}
                                                    required
                                                />
                                            </Form.Group>
                                        </Col>
                                    </Row>
                                    <Row>
                                        <Col xs={12}>
                                            <Form.Group className="mb-3" controlId="formSubject">
                                                <Form.Label>Subject</Form.Label>
                                                <Form.Control
                                                    type="text"
                                                    name="subject"
                                                    value={undefined}
                                                    onChange={undefined}
                                                    required
                                                />
                                            </Form.Group>
                                        </Col>
                                    </Row>
                                    <Row>
                                        <Col xs={12}>
                                            <Form.Group className="mb-3" controlId="formMessage">
                                                <Form.Label>Message</Form.Label>
                                                <Form.Control
                                                    as="textarea"
                                                    rows={5}
                                                    name="message"
                                                    value={undefined}
                                                    onChange={undefined}
                                                    required
                                                />
                                            </Form.Group>
                                        </Col>
                                    </Row>
                                    <Button className='contact-btn' type="submit">
                                        Send Message <PiPaperPlaneRightLight />
                                    </Button>
                                </Form>

                            </Col>
                        </Row>
                    </Col>
                </Row>
            </Container>
        </>
    )
}
export default ContactTSection;