import { Container, Row, Col, Button } from 'react-bootstrap'
import { FaLongArrowAltRight } from "react-icons/fa";
import '../assets/css/teaching.css'
function Teaching () {
    return (
        <>
            <div className='teaching-wrapper w-100 m-0 pb-5'>
                <Container fluid>
                    <Row className="teach-sec-wrapper my-5 mx-auto justify-content-center py-5 gap-3">
                        <Col xs={12} lg={6} className="teach-left d-flex justify-content-center align-items-center">
                            <div className="teach-text-wrap d-flex flex-column w-75 gap-3 p-4">
                                <span className="teaching-title">Become An Author</span>
                                <span className="text-muted">Authors from around the world teach millions of students on Udemy. We provide the tools and skills to teach what you love.</span>
                                <Button className='btn-start align-self-start'>Start Writing <FaLongArrowAltRight className='d-inline-block'/> </Button>
                            </div>
                            <div className="teach-img-wrap d-none d-sm-inline-block">
                                <img className='w-100' src="home-images/teaching/29bd96c472eab052ddcd508f02e69e7f0166dd61.png" alt="" />
                            </div>
                        </Col>

                        <Col xs={12} lg={6} className="teach-right d-flex flex-wrap justify-content-center align-items-start p-4">
                            <span className="earning-steps w-100 mb-0">Your teaching & earning steps</span>
                                <div className='functions d-flex flex-wrap mt-0 w-100 justify-content-center'>
                                    {[...Array(4)].map((_, i) => (
                                        <div key={i} className='d-flex align-items-center col-12 col-sm-6 my-1'>
                                        <span className={`d-flex justify-content-center align-items-center step step-${i+1} me-2`}> <span className='circle-number'>{i+1}</span> </span>
                                        <span className='f-text'>
                                            {["Apply to become author", "Build & edit your profile", "Create your new article", "Start teaching & earning"][i]}
                                        </span>
                                </div>
                                    ))}
                            </div>
                        </Col>
                    </Row>
                </Container>
            </div>
        </>
    )
}
export default Teaching