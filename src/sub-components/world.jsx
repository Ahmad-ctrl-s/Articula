import { Container, Row, Col } from 'react-bootstrap'
import '../assets/css/world.css'
function World () {
    return (
        <>
            <div className='world-wrapper w-100 mt-5'>
                <Container fluid>
                    <Row className=' world-row py-5'>
                        <Col lg={4} xs={12} className='d-flex'>
                            <div className='world-title'>Start writing with 7.2k users around 
                                <span className='the-world'> the world</span>.    
                            </div> 
                        </Col>
                        <Col lg={8}>
                            <Row>
                                <Col lg={4} className=' cont d-flex flex-wrap justify-content-center'>
                                    <span className='world-title text-center w-100'>6.3k</span>
                                    <span className='cont-word text-center w-100'>Articles</span>
                                </Col>
                                <Col lg={4} className=' cont d-flex flex-wrap justify-content-center'>
                                    <span className='world-title text-center w-100'>26k</span>
                                    <span className='cont-word text-center w-100'>Certified authors</span>
                                </Col>
                                <Col lg={4} className=' cont d-flex flex-wrap justify-content-center'>
                                    <span className='world-title text-center w-100'>99.9%</span>
                                    <span className='cont-word text-center w-100'>Sucsses Rate</span>
                                </Col>  
                            </Row>
                        </Col>
                    </Row>
                </Container>
            </div>
        </>
    ) 
}
export default World