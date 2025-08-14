import { Container, Row, Col, Button } from "react-bootstrap";
import Navigation from "../sub-components/navbar";
import { Link } from "react-router";
import "../assets/css/error.css"
import { useNavigate } from "react-router";
function ErrorPage() {
    const navi = useNavigate();

    return (
        <div className="d-flex flex-column min-vh-100">
            <Navigation />
            <Container fluid className="flex-grow-1 d-flex flex-column">
                <div className="flex-grow-1 d-flex align-items-center">
                    <Row className="w-100 justify-content-center align-items-center error-page-first-row">
                        <Col xs={12} xl={6}>
                            <Row className="gap-1">
                                <Col xs={12} xl={7} className="error-404 ms-auto">
                                    Error 404
                                </Col>
                                <Col xs={12} xl={7} className="oops ms-auto">
                                    Oops! page not found
                                </Col>
                                <Col xs={12} xl={7} className="went-wrong ms-auto">
                                    Something went wrong. It's look that your requested could not be found.
                                </Col>
                                <Col xs={12} xl={7} className="mt-3 ms-auto">
                                    <Button className="py-2 px-4 h-auto" onClick={() => navi("/Home")}>Go Back</Button>
                                </Col>
                            </Row>
                        </Col>
                        <Col xs={12} xl={6} className="error-page-img-col text-center">
                            <img src="error/404.png" alt="404" className="img-fluid" />
                        </Col>
                    </Row>
                </div>
                <Row className="mt-auto py-3 bg-light text-center border-top">
                    <Col xs={12} xl={6} className="ms-auto ">
                        <p>© 2021 - Eduguard. Designed by <span className="fw-bold">Templatecookie.</span> All rights reserved</p>
                    </Col>

                    <Col xs={12} xl={6}>
                        <ul class="list-group">
                            <li><Link to={"/FAQs"}>FAQs</Link></li>
                        </ul>
                    </Col>
                </Row>
            </Container>
        </div>
    );
}
export default ErrorPage
