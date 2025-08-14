import { Container, Row, Col } from 'react-bootstrap'
import '../../assets/css/about-components-style/first-section.css'
function AboutFComponent () {
    return (
        <>
            <div className="about-first-wrapper mb-5">
                <Container fluid>
                    <Row className='py-5 about-first-row'>
                        <Col xl={6} xs={12}>
                            <div className="about-first d-flex flex-column justify-content-center align-items-start gap-3">
                                <div className="display-1 text-muted">2011-2015</div>
                                <div className="display-5 fw-bold">We share knowledge with the world</div>
                                <div className="text-muted w-75">
                                    Interdum et malesuada fames ac ante ipsum primis in faucibus. Praesent fermentum quam mauris. 
                                    Fusce tempor et augue a aliquet. Donec non ipsum non risus egestas tincidunt at vitae nulla.  
                                </div>
                            </div>
                        </Col>
                        <Col xl={6} xs={12}>
                        <div className="d-flex overflow-hidden">
                            <img className='first-section-img' src="about/first-section/Images.png" alt="" />
                        </div>
                        </Col>
                    </Row>
                </Container>
            </div>
        </>
    )
}
export default AboutFComponent