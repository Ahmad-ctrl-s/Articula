import { Container, Row, Col} from 'react-bootstrap';
import { useState, useEffect} from 'react';
import '../../assets/css/vacancies-components-style/vacancies-fo-section.css';

function VacanciesFoSection () {
    const [jobCred, setJobCred] = useState([])
    useEffect(()=> {
        const jobCards = [
        {   id:"1",
            image:'/home-images/job/4.png',
            badge:"FEATURED",
            salary:"$300 / Month",
            job_field:"System Analysis",
            experience:"2 Years Of Experrience",
            duration_part_img:'/home-images/job/part-time.png',
            duration_part:"Part Time",
            level:"Senior",
            level_img:'/home-images/job/level.png',
            duration_full_img:'/public/Home Images/Job/Full Time.png',
            duration_full:"Full Time"
        },
        {   id:"2",
            image:'/public/Home Images/Job/5.png',
            badge:"URGENT",
            salary:"$300 / Month",
            job_field:"System Analysis",
            experience:"2 Years Of Experrience",
            duration_part_img:'/public/Home Images/Job/Part Time.png',
            duration_part:"Part Time",
            level:"Senior",
            level_img:'/public/Home Images/Job/level.png',
            duration_full_img:'/public/Home Images/Job/Full Time.png',
            duration_full:"Full Time"
        },
        {   id:"3",
            image:'/public/Home Images/Job/4.png',
            badge:"FEATURED",
            salary:"$300 / Month",
            job_field:"System Analysis",
            experience:"2 Years Of Experrience",
            duration_part_img:'/public/Home Images/Job/Part Time.png',
            duration_part:"Part Time",
            level:"Senior",
            level_img:'/public/Home Images/Job/level.png',
            duration_full_img:'/public/Home Images/Job/Full Time.png',
            duration_full:"Full Time"
        },
        {   id:"4",
            image:'/public/Home Images/Job/7.png',
            badge:"",
            salary:"$300 / Month",
            job_field:"System Analysis",
            experience:"2 Years Of Experrience",
            duration_part_img:'/public/Home Images/Job/Part Time.png',
            duration_part:"Part Time",
            level:"Senior",
            level_img:'/public/Home Images/Job/level.png',
            duration_full_img:'/public/Home Images/Job/Full Time.png',
            duration_full:"Full Time"
            }
    ]
    setJobCred(jobCards)
    }, [])

    return (
        <>
            <Container fluid className='vacancies-fourth-container mb-5'>
                <Row className='gap-3 vacancies-fourth-section-row py-3'>
                    <Col xs={12} className='browse text-center mt-5 mb-3'>
                        Our all open positions {jobCred.length}
                    </Col>
                    {jobCred.map((ele, index)=> (
                    <Col xs={12} md={6} key={ele.id} className='vacancies-fourth-card-col'>
                        <Row className='vacancies-fourth-card-row'>
                            <Col xs={4} className='vacancies-fourth-card-img-container p-0'>
                                <img className='vacancies-fourth-card-img' src={`vacancies/fourth-section/${index+1}.png`} alt="image" />
                            </Col>
                            <Col xs={8} className='py-2 px-0 vacancies-fourth-card-text-container lh-lg'>
                                <Row className='justify-content-between g-0 ps-4'>
                                    <Col className={`vacancies-card-badge vacancies-card-badge-${index+1}`} xs={3}>
                                        <div className="h-100 d-flex justify-content-center align-items-center">
                                            {ele.badge}
                                        </div>
                                    </Col>
                                    <Col xs={3}>{ele.salary}</Col>
                                </Row>
                                <div className='job-field ps-4'>{ele.job_field}</div>
                                <div className='job-experience ps-4'>{ele.experience}</div>
                                <div className='hr-row'></div>
                                <Row className='ps-4 mt-auto align-items-end vacancies-fourth-card-footer'>
                                    <Col xs={4}>
                                        <Row>
                                            <Col xs={3}><img src="vacancies/fourth-section/part-time.png" alt="" /></Col>
                                            <Col xs={9}>{ele.duration_part}</Col>
                                        </Row>
                                    </Col>
                                    <Col xs={4}>
                                        <Row>
                                            <Col xs={3}><img src="vacancies/fourth-section/level.png" alt="" /></Col>
                                            <Col xs={9}>{ele.level}</Col>
                                        </Row>
                                    </Col>
                                    <Col xs={4}>
                                        <Row>
                                            <Col xs={3}><img src="vacancies/fourth-section/full-time.png" alt="" /></Col>
                                            <Col xs={9}>{ele.duration_part}</Col>
                                        </Row>
                                    </Col>
                                </Row>
                            </Col>
                        </Row>
                    </Col>
                    ))}
                </Row>
            </Container>
        </>
    )
}
export default VacanciesFoSection;