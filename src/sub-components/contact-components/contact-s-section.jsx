import { Container, Row, Col } from 'react-bootstrap';
import '../../assets/css/contact-compontents-style/contact-s-section.css'
import { useEffect, useState } from 'react';

function ContactSSection () {
    const [branches, setBranches] = useState([])
    useEffect(()=> {
        const branchesArr = [
            {id:"1", country:"Damascus, Syria", branchText:"Lorem Ipsum dollerDuis aute irure, No. 6548"},
            {id:"2", country:"Amman, Jordan", branchText:"Lorem Ipsum dollerDuis aute irure, No. 6548"},
            {id:"3", country:"Istanbul, Turkey", branchText:"Lorem Ipsum dollerDuis aute irure, No. 6548"},
            {id:"4", country:"Dubai. UAE", branchText:"Lorem Ipsum dollerDuis aute irure, No. 6548"}
        ]
        setBranches(branchesArr)
    },[])

    return (
        <Container fluid className="mt-5">
            <Row className="contact-s-section-row py-3">
                <Col xs={12}>
                    <div className="contact-second-text-wrapper text-center mb-4">
                        <h4 className="browse">Our branches all over the world.</h4>
                        <p className="contact-second-section-description mx-auto">
                            Phasellus sed quam eu eros faucibus cursus. Quisque mauris urna, 
                            imperdiet id leo quis, luctus auctor nisi.
                        </p>
                    </div>

                    <Row className="g-4">
                        {branches.map((card, index) => (
                            <Col xs={12} sm={6} lg={3} key={card.id} className="d-flex branch-column">
                                <div className="branch-card d-flex flex-fill flex-column align-items-center shadow-sm overflow-hidden">
                                    <div className="branch-img-wrapper">
                                        <img
                                            className="branch-img"
                                            src={`contact/second-section/${index + 1}.jpg`}
                                            alt={`Branch ${index + 1}`}
                                        />
                                    </div>
                                    <div className="branch-card-text text-center d-flex flex-column justify-content-center align-items-center">
                                        <h5 className="branch-country mb-2">{card.country}</h5>
                                        <p className="text-muted">{card.branchText}</p>
                                    </div>
                                </div>
                            </Col>
                        ))}
                    </Row>
                </Col>
            </Row>
        </Container>
    );
}
export default ContactSSection