import { Breadcrumb, Container, Row, Col } from "react-bootstrap";
import { useLocation } from "react-router-dom";
import '../assets/css/bread-crumb.css'
function BreadCrumb () {
    const location = useLocation()
    const pathname = location.pathname.slice(1,location.pathname.length+1)
    return (
        <>
        <div className="breadcrumb-wrapper p-3">
                <Container fluid>
                    <Row>
                        <Col className="g-0">
                            <Breadcrumb>
                                <div className="w-100 breadcrumb-container d-flex flex-column align-items-center flex-wrap ">
                                    <div className="h4">{(pathname === 'faqs'? pathname.slice(0, 3).toUpperCase() + pathname.charAt(3).toLowerCase() : pathname === 'Create_article'? pathname.replace(/_/g, " ") :pathname)}</div>
                                    <div className="path d-flex justify-centent-center">
                                        <Breadcrumb.Item className="text-muted text-center" href="/">Home</Breadcrumb.Item>
                                        <Breadcrumb.Item href={location.pathname} className="text-dark text-center">
                                            {pathname.replace(/_/g, " ")}
                                        </Breadcrumb.Item>
                                    </div>
                                </div>
                            </Breadcrumb>
                        </Col>
                    </Row>
                </Container>
            </div>
        </>
    )
}
export default BreadCrumb