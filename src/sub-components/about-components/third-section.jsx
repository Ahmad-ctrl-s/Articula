import { Container, Row, Col } from 'react-bootstrap';
import '../../assets/css/about-components-style/third-section.css';

function ThirdSection () {
    return (
        <>
        <div className="third-section-wrapper">
                <Container fluid className='mt-5'>
                    <Row className='pt-3 third-section-row'>
                        <Col xs={12} xl={6} >
                            <img className='third-img' src="about/third-section/two-business-partners-working-office-1.png" alt="working office" />
                        </Col>
                        <Col xs={12} xl={6}>
                            <div className="about-first d-flex flex-column justify-content-center align-items-start ">
                                <div className="billion">OUR ONE BILLION MISSION</div>
                                <div className="display-6 fw-bold">Our one billion mission sounds bold, We agree.</div>
                                <div className="text-muted w-75">
                                    "We cannot solve our problems with the same thinking we used when we created them."—Albert Einstein. 
                                    Institutions are slow to change. Committees are where good ideas and innovative thinking go to die. 
                                    Choose agility over dogma. Embrace and drive change. 
                                    We need to wipe the slate clean and begin with bold, radical thinking.  
                                </div>
                            </div>
                        </Col>
                    </Row>
                </Container>
            </div>
        </>
    )
}
export default ThirdSection