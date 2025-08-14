import { Container, Row, Col} from 'react-bootstrap';
import '../../assets/css/about-components-style/fourth-section.css';

function FourthSection () {
    return (
        <>
            <div className="Fourth-section-wrapper py-5">
                <Container fluid>
                    <Row className='pt-5 Fourth-section-row '>
                        <Col xs={12} xl={5}>
                            <div className="about-first d-flex flex-column justify-content-center align-items-start">
                                <div className="billion">OUR GALLERY</div>
                                <div className="display-6 fw-bold">We've been here almost 15 years</div>
                                <div className="text-muted w-75">
                                    Fusce lobortis leo augue, sit amet tristique nisi commodo in. 
                                    Aliquam ac libero quis tellus venenatis imperdiet. 
                                    Sed sed nunc libero. Curabitur in urna ligula.  
                                    torquent per conubia nostra.
                                </div>
                            </div>
                        </Col>
                        <Col xs={12} xl={7} className='overflow-hidden'>
                            <img className='Fourth-img' src="about/fourth-section/gallery.png" alt="working office" />
                        </Col>
                    </Row>
                </Container>
            </div>
        </>
    )
}
export default FourthSection