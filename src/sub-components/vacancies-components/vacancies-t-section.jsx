import { Container, Row, Col} from 'react-bootstrap';
import { useState, useEffect } from 'react';
import '../../assets/css/vacancies-components-style/vacancies-t-section.css';

function VacanciesTSection () {
    const [category, setCategory] = useState([])
    useEffect(()=> {
        setCategory([
            {id:"1", name:"Healthy Food & Snacks"}, 
            {id:"2", name:"Personal Career Growth"}, 
            {id:"3", name:"Vacation & Paid Time Off"}, 
            {id:"4", name:"Special Allowance & Bonuse"}, 
            {id:"5", name:"Competitive Salary"}, 
            {id:"6", name:"Well-being memberships"}, 
            {id:"7", name:"Maternity/Paternity Benefits"},
            {id:"8", name:"Eduguard Annual Events"},
        ]);
    },[])
    return (
        <>
            <Container fluid className='py-5'>
                <Row className='vacancies-third-section-row'>
                    <Col xs={12}>
                        <Row className='mb-3'>
                            <Col xs={12} className='text-center browse'>
                                Our Perks & Benefits
                            </Col>
                        </Row>
                        <Row className='gap-3'>
                            {category.map((ele, index)=> (
                                <Col xs={12} md={6} lg={4} xl={3} key={ele.id} className={`vacancies-card-col vacancies-card-${index+1} p-4 `}>
                                    <Row>
                                        <Col xs={12}>
                                            <img className='mb-5' src={`vacancies/third-section/${index+1}.png`} alt="" />
                                        </Col>
                                    </Row>
                                    <Row>
                                        <Col xs={12}>
                                            <div className='vacancies-card-col-text'>{ele.name}</div>
                                        </Col>
                                    </Row>
                                </Col>
                            ))}
                        </Row>
                    </Col>
                </Row>

            </Container>
        </>
    )
}
export default VacanciesTSection;