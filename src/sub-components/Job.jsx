import { Container, Row, Col } from 'react-bootstrap'
import { Link, useNavigate } from 'react-router-dom';
import '../assets/css/job.css';
import { useEffect, useState } from 'react';
import { Navigate } from 'react-router-dom';
import { FaLongArrowAltRight } from "react-icons/fa";
function Job () {
    const [jobCred, setJobCred] = useState([])
    const navigate = useNavigate()
    useEffect(()=> {
        const jobCards = [
        {   id:"1",
            image:'home-images/job/4.png',
            badge:"FEATURED",
            salary:"$300 / Month",
            job_field:"System Analysis",
            experience:"2 Years Of Experrience",
            duration_part_img:'home-images/job/part-time.png',
            duration_part:"Part Time",
            level:"Senior",
            level_img:'home-images/job/level.png',
            duration_full_img:'home-images/job/full-time.png',
            duration_full:"Full Time"
        },
        {   id:"2",
            image:'home-images/job/5.png',
            badge:"URGENT",
            salary:"$300 / Month",
            job_field:"System Analysis",
            experience:"2 Years Of Experrience",
            duration_part_img:'home-images/job/part-time.png',
            duration_part:"Part Time",
            level:"Senior",
            level_img:'home-images/job/level.png',
            duration_full_img:'home-images/job/full-time.png',
            duration_full:"Full Time"
        },
        {   id:"3",
            image:'home-images/job/4.png',
            badge:"FEATURED",
            salary:"$300 / Month",
            job_field:"System Analysis",
            experience:"2 Years Of Experrience",
            duration_part_img:'home-images/job/part-time.png',
            duration_part:"Part Time",
            level:"Senior",
            level_img:'home-images/job/level.png',
            duration_full_img:'home-images/job/full-time.png',
            duration_full:"Full Time"
        },
        {   id:"4",
            image:'home-images/job/7.png',
            badge:"",
            salary:"$300 / Month",
            job_field:"System Analysis",
            experience:"2 Years Of Experrience",
            duration_part_img:'home-images/job/part-time.png',
            duration_part:"Part Time",
            level:"Senior",
            level_img:'home-images/job/level.png',
            duration_full_img:'home-images/job/full-time.png',
            duration_full:"Full Time"
            }
    ]
    setJobCred(jobCards)
    }, [])

    const jobHandle = (jobName)=> {
        navigate(`/vacancies`)
    }

    

    

    return (
        <>
        <div className="job-wrapper p-5">
            <Container fluid>
                <Row>
                    <Col>
                        <div className="d-flex align-items-center flex-wrap job-container">
                            <div className="upper d-flex flex-wrap justify-content-between w-100 mb-3">
                                <div className="browse title">Our Job Opprtunities</div>
                                <div className="sub-title w-25 text-wrap text-muted lh-1">Vestibulum sed dolor sed diam mollis maximus vel nec dolor. Donec varius purus et eleifend porta.</div>
                            </div>

                            <div className='job-cards-wrapper d-flex w-100 flex-wrap justify-content-between mb-3'>
                                    { jobCred.map((ele, index)=> (
                                    <div onClick={()=> jobHandle(ele.job_field)} className={`job-card-container d-flex m-1`} key={ele.id}>
                                        <img className='job-img' src={ele.image} alt='image'/>
                                        <div className='text-wrapper d-flex flex-column flex-grow-1 m-1 p-3 w-100'>
                                            <div className='first-row d-flex justify-content-between'>
                                                <span className={`p-2 badge text-dark badge${index+1}`}>{ele.badge}</span>
                                                <span className='salary ms-auto'>{ele.salary}</span>
                                            </div>
                                            <div className="second-row d-flex flex-column">
                                                <span className='job-field'>{ele.job_field}</span>
                                                <span className='job-experience'>{ele.experience}</span>
                                            </div>
                                            <hr className='full-width-hr'/>
                                            <div className='d-flex justify-content-between align-items-end mt-3'>
                                                <span><img src={ele.duration_part_img} alt="image"/> {ele.duration_part}</span>
                                                <span> <img src={ele.level_img} alt="image"/> {ele.level}</span>
                                                <span><img src={ele.duration_full_img} alt="image"/> {ele.duration_full}</span>
                                            </div>
                                        </div>
                                    </div>
                                    ))}
                            </div>
                            <div className=" mt-4 mb-0 d-flex mx-auto justify-content-around job-card-footer align-items-end">
                                <span className='me-3'>We have more job Opportunities</span>
                                <Link className='browse-link' to='../Main Pages/Articles.jsx'>Browse All<FaLongArrowAltRight/></Link> 
                            </div>
                        </div>
                    </Col>
                </Row>
            </Container>
            </div>
        </>
    )
}
export default Job