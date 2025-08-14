import { Container, Row, Col, Card } from 'react-bootstrap'
import { Link, useNavigate } from 'react-router-dom';
import '../assets/css/writers.css';
import { useEffect, useState } from 'react';
import { Navigate } from 'react-router-dom';
import { FaLongArrowAltRight } from "react-icons/fa";
import { Swiper, SwiperSlide} from 'swiper/react';
import { Navigation, Pagination, Scrollbar, A11y } from 'swiper/modules';
import 'swiper/css';
import 'swiper/css/navigation';
import 'swiper/css/pagination';
import 'swiper/css/scrollbar';

function Writers () {
    const [topWriters, setTopWriters] = useState([])
    const navigate = useNavigate()
    useEffect(()=> {
        const writersCards = [
        {   id:"1",
            image:'/public/Home Images/Writers/Devon Lane.png',
            name:"Devon Lane",
            job_field:"France Expert",
            rate : {
                rateImg:'/home-images/writers/star.png',
                rateNum: "4.6"
            },
            articlesCount: "30"
        },
        {   id:"2",
            image:'/public/Home Images/Writers/Darrell Steward.png',
            name:"Darrell Steward",
            job_field:"Digital Product",
            rate : {
                rateImg:'/home-images/writers/star.png',
                rateNum: "4.9"
            },
            articlesCount: "17"
        },
        {   id:"3",
            image:'/public/Home Images/Writers/Jane Cooper.png',
            name:"Jane Cooper",
            job_field:"UI/UX Designer",
            rate : {
                rateImg:'/home-images/writers/star.png',
                rateNum: "4.8"
            },
            articlesCount: "5"
        },
        {   id:"4",
            image:'/public/Home Images/Writers/Albert Flores.png',
            name:"Albert Flores",
            job_field:"Management",
            rate : {
                rateImg:'/home-images/writers/star.png',
                rateNum: "4.7"
            },
            articlesCount: "13"
            },
        {   id:"5",
            image:'/public/Home Images/Writers/Kathryn Murphy.png',
            name:"Kathryn Murphy",
            job_field:"Lead Developer",
            rate : {
                rateImg:'/home-images/writers/star.png',
                rateNum: "4.2"
            },
            articlesCount: "41"
            },
        {   id:"6",
            image:'/public/Home Images/Writers/Devon Lane.png',
            name:"Devon Lane",
            job_field:"France Expert",
            rate : {
                rateImg:'/home-images/writers/star.png',
                rateNum: "4.6"
            },
            articlesCount: "30"
        },
        {   id:"7",
            image:'/public/Home Images/Writers/Darrell Steward.png',
            name:"Darrell Steward",
            job_field:"Digital Product",
            rate : {
                rateImg:'/home-images/writers/star.png',
                rateNum: "4.9"
            },
            articlesCount: "17"
        },
        {   id:"8",
            image:'/public/Home Images/Writers/Jane Cooper.png',
            name:"Jane Cooper",
            job_field:"UI/UX Designer",
            rate : {
                rateImg:'/home-images/writers/star.png',
                rateNum: "4.8"
            },
            articlesCount: "5"
        },
        {   id:"9",
            image:'/public/Home Images/Writers/Albert Flores.png',
            name:"Albert Flores",
            job_field:"Management",
            rate : {
                rateImg:'/home-images/writers/star.png',
                rateNum: "4.7"
            },
            articlesCount: "13"
            },
        {   id:"10",
            image:'/public/Home Images/Writers/Kathryn Murphy.png',
            name:"Kathryn Murphy",
            job_field:"Lead Developer",
            rate : {
                rateImg:'/home-images/writers/star.png',
                rateNum: "4.2"
            },
            articlesCount: "41"
            },
    ]
    setTopWriters(writersCards)
    }, [])

    const WriterHandle = (writerInfo)=> {
        navigate(`/Articles/${encodeURIComponent(writerInfo)}`)
    }

    

    

    return (
        <>
        <div className="writer-wrapper p-5">
            <Container fluid>
                <Row className='writer-row'>
                    <Col>
                        <div className="title h2 fw-bold w-100 text-center mb-5">Top Writers</div>
                        <Swiper className='w-100 p-1' 
                            modules={[Navigation, Pagination, Scrollbar, A11y]}
                            spaceBetween={50}
                            slidesPerView={5}
                            navigation={{
                                nextEl: '.swiper-button-next',
                                prevEl: '.swiper-button-prev',
                                }}
                            onSwiper={(swiper) => console.log(swiper)}
                            onSlideChange={() => console.log('slide change')}>
                            
                            {topWriters.map((ele, index)=>(
                                <SwiperSlide key={ele.id} className='text-center' onClick={()=>WriterHandle(topWriters.name)}>
                                    <Card className='writer-container'>
                                            {/* API: {card.image} */}
                                            <Card.Img variant="top" src={`home-images/writers/${(index) + 1}.png`} /> 
                                            <Card.Body className='d-flex flex-wrap align-items-center justify-content-center'>
                                                <Card.Title className='w-100'>{ele.name}</Card.Title>
                                                <div className="job-field text-muted">{ele.job_field}</div>
                                            </Card.Body>
                                            <Card.Footer className='d-flex justify-content-between'>
                                                <div className="d-flex justify-content-center">
                                                    <img src={ele.rate.rateImg} alt="star" />
                                                    <small className='text-muted'>{ele.rate.rateNum}</small>
                                                </div>
                                                <small className="text-muted">{ele.articlesCount} Articles</small>
                                            </Card.Footer>
                                        </Card>
                                </SwiperSlide>
                            ))}
                        </Swiper>
                            <div className="swiper-button-prev"></div>
                            <div className="swiper-button-next"></div>

                        <div className=" my-5 d-flex mx-auto justify-content-center job-card-footer">
                            <span className=' job-footer-tex me-3 footer-text'>We have more job Opportunities</span>
                            <Link className='browse-link' to='../Main Pages/Articles.jsx'>Browse All<FaLongArrowAltRight/></Link> 
                        </div>

                    </Col>
                </Row>
            </Container>
            </div>
        </>
    )
}
export default Writers