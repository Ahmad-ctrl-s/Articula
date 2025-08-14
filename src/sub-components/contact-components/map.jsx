import React from 'react';
import { Container, Row, Col } from 'react-bootstrap';
import '../../assets/css/contact-compontents-style/map.css';

function Map() {
    const openInMaps = () => {
        const locationUrl = "https://www.google.com/maps/embed?pb=!1m14!1m8!1m3!1d3326.1047451802465!2d36.2906605!3d33.5246622!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x1518e75dca645d81%3A0x209ed9082f3fe58a!2z2KfZhNmF2KjYsdmF2KzZiNmGIC0gSVhDb2RlcnM!5e0!3m2!1sen!2s!4v1751519695926!5m2!1sen!2s";
        window.open(locationUrl, '_blank');
    };

    return (
        <Container fluid className='p-0'>
            <Row className='map-row'>
                <Col xs={12}>
                    <iframe
                        title="IXCoders Location"
                        src="https://www.google.com/maps/embed?pb=!1m14!1m8!1m3!1d3326.1047451802465!2d36.2906605!3d33.5246622!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x1518e75dca645d81%3A0x209ed9082f3fe58a!2z2KfZhNmF2KjYsdmF2KzZiNmGIC0gSVhDb2RlcnM!5e0!3m2!1sen!2s!4v1751519695926!5m2!1sen!2s"
                        width="100%"
                        height="100%"
                        style={{ border: 0 }}
                        allowFullScreen=""
                        loading="lazy"
                        referrerPolicy="no-referrer-when-downgrade"
                    ></iframe>
                </Col>
            </Row>

        </Container>
    );
}

export default Map;