import { Container, Row, Col } from 'react-bootstrap'
import { Link } from 'react-router'
import '../assets/css/companies.css';

function Companies () {
    return (
        <>
            <Container fluid>
                <Row className='company-container p-3'>
                    <Col xs={12} lg={4}>
                        <div className="company-title d-flex flex-wrap">
                            <div className="w-100 earning-steps">6.3k trusted companies</div>
                            <span className='text-muted w-75'>Nullam egestas tellus at enim ornare tristique. Class aptent taciti sociosqu ad litora torquent per conubia nostra.</span>
                        </div>
                    </Col>

                    <Col xs={12} lg={8}>
                        <div className=" w-100 companies-logo-container d-flex flex-wrap gap-2 justify-content-end">
                            <a className='' href="https://www.amg.com/" target='blank'>
                                <img src="home-images/companies/amg.png" alt="Amg" />
                            </a>
                            <a className='' href="https://www.youtube.com/" target='blank'>
                                <img src="home-images/companies/youtube.png" alt="Youtube" />
                            </a>
                            <a className='' href="https://www.google.com/" target='blank'>
                                <img src="home-images/companies/google.png" alt="Google" />
                            </a>
                            <a className='' href="https://www.lenovo.com//" target='blank'>
                                <img src="home-images/companies/lenovo.png" alt="Lenovo" />
                            </a>
                            <a className='' href="https://www.slack.com/" target='blank'>
                                <img src="home-images/companies/slack.png" alt="Slack" />
                            </a>
                            <a className='' href="https://www.verizon.com/" target='blank'>
                                <img src="home-images/companies/verizon.png" alt="Verizon" />
                            </a>
                            <a className='' href="https://www.Lexmark.com/" target='blank'>
                                <img src="home-images/companies/lexmark.png" alt="Lexmark" />
                            </a>
                            <a className='' href="https://www.Microsoft.com/" target='blank'>
                                <img src="home-images/companies/microsoft.png" alt="Microsoft" />
                            </a>
                            
                        </div>
                    </Col>
                </Row>
            </Container>
        </>
    )
}
export default Companies
