import { Container, Row, Col} from 'react-bootstrap';
import '../../assets/css/about-components-style/second-section.css';
function SecondSection () {
    return (
        <>
            <Container fluid className='mt-5'>
                <Row>
                    <Col>
                        <div className="second-cards-container d-flex justify-content-between">
                            <div className="second-card d-flex flex-wrap">
                                <div className='d-flex justify-contnet-start w-100'>
                                    <img src="about/second-section/1.png" alt="" />
                                    <span className='display-6 fw-bold'>67.1k</span>
                                </div>
                                <div className='w-100 text-center text-muted'>Students</div>
                            </div>
                            <div className="second-card d-flex flex-wrap">
                                <div className='d-flex justify-contnet-start w-100'>
                                    <img src="about/second-section/2.png" alt="" />
                                    <span className='display-6 fw-bold'>26k</span>
                                </div>
                                <div className='w-100 text-center text-muted'>Certified Instructor</div>
                            </div>
                            <div className="second-card d-flex flex-wrap">
                                <div className='d-flex justify-contnet-start w-100'>
                                    <img src="about/second-section/3.png" alt="" />
                                    <span className='display-6 fw-bold'>72</span>
                                </div>
                                <div className='w-100 text-center text-muted'>Country Language</div>
                            </div>
                            <div className="second-card d-flex flex-wrap">
                                <div className='d-flex justify-contnet-start w-100'>
                                    <img src="about/second-section/4.png" alt="" />
                                    <span className='display-6 fw-bold'>99.9%</span>
                                </div>
                                <div className='w-100 text-center text-muted'>Success Rate</div>
                            </div>
                            <div className="second-card d-flex flex-wrap">
                                <div className='d-flex justify-contnet-start w-100'>
                                    <img src="about/second-section/5.png" alt="" />
                                    <span className='display-6 fw-bold'>57</span>
                                </div>
                                <div className='w-100 text-center text-muted'>Trusted Companies</div>
                            </div>
                        </div>
                    </Col>
                </Row>
            </Container>
        </>
    )
}
export default SecondSection