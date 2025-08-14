import { Container, Row, Col} from 'react-bootstrap';
import '../../assets/css/vacancies-components-style/vacancies-s-section.css';

function VacanciesSSection () {
    return (
        <>
            <Container fluid className='Vacancies-second-section-container py-5'>
                <Row className='vacancies-first-section-row align-items-center justify-content-between'>
                    
                    <Col xs={12} xl={6}>
                        <div className="d-flex overflow-hidden">
                            <img className='vacancies-second-section-img' src="vacancies/second-section/img.png" alt="" />
                        </div>
                    </Col>

                    <Col xs={12} xl={5} className='lh-4'>
                        <Row className='mb-3'>
                            <Col className='browse' xs={12}>
                                Why you will join our team
                            </Col>
                        </Row>

                        <Row className='mb-5'>
                            <Col className='text-muted' xs={12} xl={10}>
                                Quisque leo leo, suscipit sed arcu sit amet, iaculis feugiat felis. 
                                Vestibulum non consectetur tortor. Morbi at orci vehicula, vehicula mi ut, vestibulum odio. 
                            </Col>
                        </Row>

                        <Row className=' Vacancies-right-side-check-container mb-3 p-4'>
                            <Col xs={3} xl={1} className='p-0'>
                                <img src="vacancies/second-section/check-circle.png" alt="" />
                            </Col>
                            <Col xs={9} xl={11}>
                                <Row>
                                    <Col xs={12} className='vacancies-right-side-row-title'>
                                        Ut justo ligula, vehicula sed egestas vel.
                                    </Col>
                                </Row>
                                <Row>
                                    <Col xs={12} className='vacancies-right-side-row-desc'>
                                        Quisque leo leo, suscipit sed arcu sit amet, iaculis feugiat felis. 
                                        Vestibulum non consectetur tortor. Morbi at orci vehicula, vehicula mi ut, vestibulum odio. 
                                    </Col>
                                </Row>
                            </Col>
                        </Row>
                        <Row className='Vacancies-right-side-check-container p-4'>
                            <Col xs={3} xl={1} className='p-0'>
                                <img src="vacancies/second-section/check-circle.png" alt="" />
                            </Col>
                            <Col xs={9} xl={11}>
                                <Row>
                                    <Col xs={12} className='vacancies-right-side-row-title'>
                                        Ut justo ligula, vehicula sed egestas vel.
                                    </Col>
                                </Row>
                                <Row>
                                    <Col xs={12} className='vacancies-right-side-row-desc'>
                                        Quisque leo leo, suscipit sed arcu sit amet, iaculis feugiat felis. 
                                        Vestibulum non consectetur tortor. Morbi at orci vehicula, vehicula mi ut, vestibulum odio. 
                                    </Col>
                                </Row>
                            </Col>
                        </Row>
                    </Col>
                </Row>
            </Container>
        </>
    )
}
export default VacanciesSSection;