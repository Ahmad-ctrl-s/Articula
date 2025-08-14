import { Container, Row, Col, Button } from 'react-bootstrap';
import '../../assets/css/vacancies-components-style/vacancies-f-section.css';

function VacanciesFSection () {
    return (
        <>
            <Container fluid>
                <Row className='vacancies-first-section-row align-items-center justify-content-between reverse py-3 py-lg-0'>
                    <Col xs={12} xl={5}>
                        <Row className='gap-3'>
                            <Col className='browse lh-1' xs={12} xl={10}>
                                Join the most incredible & creative team.
                            </Col>

                            <Col className='text-muted' xs={12}>
                                Proin gravida enim augue, dapibus ultrices eros feugiat et. Pellentesque bibendum orci felis, 
                                sit amet efficitur felis lacinia ac. Mauris gravida justo ac nunc consectetur.
                            </Col>

                            <Col xs={12}>
                                <Button>View Open Positions</Button>
                            </Col>
                        </Row>
                    </Col>

                    <Col xs={12} xl={6}>
                        <div className="d-flex overflow-hidden">
                            <img className='vacancies-first-section-img' src="vacancies/first-section/img.png" alt="" />
                        </div>
                    </Col>
                </Row>
            </Container>
        </>
    )
}
export default VacanciesFSection;