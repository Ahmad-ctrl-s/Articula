import { Container, Row, Col, Breadcrumb, Button } from "react-bootstrap";
import { UserAuth } from '../main-pages/application-context/auth-context';
import { useLocation, useParams, useNavigate } from "react-router";
import { useState, useEffect, useContext, useMemo, useRef } from "react";
import Footer from '../sub-components/foot';
import Navigation from "../sub-components/navbar";
import { SlCalender } from "react-icons/sl";
import { RiArticleLine } from "react-icons/ri";
import { FiEdit2 } from "react-icons/fi";
import { TbCategory2 } from "react-icons/tb";
import { IoPricetagsOutline } from "react-icons/io5";

import { Navigation as SwiperNavigation, Pagination, Scrollbar, A11y } from 'swiper/modules';

import { Swiper, SwiperSlide } from 'swiper/react';
import { useSwiper } from 'swiper/react';

// Import Swiper styles
import 'swiper/css';
import 'swiper/css/navigation';
import 'swiper/css/pagination';
import 'swiper/css/scrollbar';

import '../assets/css/article-page.css';


function Article() {
    const swiper = useSwiper();
    const { isAuthorized, formData } = useContext(UserAuth);
    const credentials = useMemo(() => btoa(`${formData.name}:${formData.pass}`), [formData]);
    const { id } = useParams();

    const [blogData, setBlogData] = useState(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    const [title, setTitle] = useState("")
    const [body, setBody] = useState("")
    const [blogImg, setBlogImg] = useState("")
    const [gallery, setGallery] = useState([])

    const [type, setType] = useState();
    const [createdDate, setCreatedDate] = useState()
    const [changedDate, setChangedDate] = useState()

    const [fetchedTagsIds, setFetchedTagsIds] = useState([])
    const [fetchedCategoryId, setFetchedCategoryId] = useState()

    const [categories, setCategories] = useState([]);
    const [tags, setTags] = useState([]);

    const navigate = useNavigate();

    const location = useLocation()

    useEffect(() => {
        setLoading(true);
        setError(null);
        fetch(`https://tamkeen-dev.com/api/node/${id}?_format=json`, {
            headers: {
                "Content-Type": "application/json",
                'Authorization': `Basic ${credentials}`
            }
        })
            .then(response => {
                if (!response.ok) {
                    return response.json().then(serverError => {
                        throw new Error(serverError.message);
                    });
                }
                return response.json();
            })
            .then(data => {
                setBlogData(data);
                setTitle(data.title[0].value)
                setBody(data.body[0].value)
                setBlogImg(data.field_image[0].url)
                setGallery(data.field_gallery)
                setType(data.type[0].target_id)
                setCreatedDate(data.created[0].value.split('T')[0])
                setChangedDate(data.changed[0].value.split('T')[0])
                setFetchedTagsIds(data.field_tags)
                setFetchedCategoryId(data.field_category[0].target_id)

            })
            .catch(err => setError(err.message))
            .finally(() => setTimeout(() => setLoading(false), 2000));
    }, [id, credentials]);

    useEffect(() => {
        fetch('https://tamkeen-dev.com/api/terms/tags', {
            headers: {
                'Content-Type': 'application/json'
            }
        })
            .then(response => {
                if (!response.ok) {
                    return response.json().then(serverError => {
                        throw new Error(serverError.message);
                    });
                }
                return response.json();
            })
            .then(data => {
                setTags(data);
            })
            .catch(err => {
                setError(err.message);
            });
    }, []);

    useEffect(() => {
        fetch('https://tamkeen-dev.com/api/terms/category', {
            headers: {
                'Content-Type': 'application/json'
            }
        })
            .then(response => {
                if (!response.ok) {
                    return response.json().then(serverError => {
                        throw new Error(serverError.message);
                    });
                }
                return response.json();
            })
            .then(data => {
                setCategories(data);
            })
            .catch(err => {
                setError(err.message);
            });
    }, []);




    if (!blogData || loading) return (<>
        <div className="d-flex justify-content-center align-items-center spinner-container">
            <div className="spinner-border " role="status">
                <span className="visually-hidden"></span>
            </div>
        </div>
    </>)

    if (!isAuthorized) {
        return (
            <div className="d-flex flex-column justify-content-center align-items-center text-center p-5" style={{ backgroundColor: '#F9FAFB', minHeight: '100vh' }}>
                <h2 className="browse">Knowledge awaits you!</h2>
                <p className="mb-4" style={{ maxWidth: '600px', color: '#4F4F4F', fontSize: '1.1rem' }}>
                    Signin or Signup to start exploring valuable content!
                </p>
                <div className="d-flex gap-3">
                    <Button className="px-4 py-3 h-auto" onClick={() => navigate('/login')}>
                        Sign In
                    </Button>
                    <Button className="px-4 py-3 h-auto" onClick={() => navigate('/signup')}>
                        Create Account
                    </Button>
                </div>
            </div>
        );
    }

    return (

        <>
            <Navigation />
            <Container fluid className="article-page-container mb-5">
                <Row>
                    <Col className="g-0">
                        <Breadcrumb>
                            <div className="w-100 breadcrumb-container article-breadcrumb-container d-flex flex-column align-items-center justify-content-center flex-wrap ">
                                <div className="h4">Article</div>
                                <div className="path d-flex justify-centent-center">
                                    <Breadcrumb.Item href={location.pathname} className="text-dark text-center ">
                                        {location.pathname.replace(/\//g, " ").trim()}
                                    </Breadcrumb.Item>
                                </div>
                            </div>
                        </Breadcrumb>
                    </Col>
                </Row>


                <Row className="justify-content-between mt-5 article-row">
                    <Col xs={12} lg={5} className="p-0">
                        <div className="blog-image-container mb-5">
                            <img className="blog-image" src={blogImg} alt="Blog Image" />
                        </div>
                    </Col>

                    <Col xs={12} lg={6}>
                        <h1 className="bolder article-title">{title || "Untitled Article"}</h1>
                        <Row className="article-info-row mt-3">
                            <div className="d-inline-flex align-items-center">
                                <RiArticleLine className="me-1 article-info-row-icon" />
                                <small>{type.slice(0, 1).toUpperCase() + type.slice(1, type.length)}</small>
                            </div>
                            <div className="d-inline-flex align-items-center">
                                <SlCalender className="me-1 article-info-row-icon" />
                                <small>{createdDate}</small>
                            </div>
                            <div className="d-inline-flex align-items-center">
                                <FiEdit2 className="me-1 article-info-row-icon" />
                                <small>{changedDate}</small>
                            </div>
                            <div className="d-inline-flex align-items-center">
                                <TbCategory2 className="me-1 article-info-row-icon" />
                                {categories && fetchedCategoryId !== "" ? (
                                    categories
                                        .filter(ele => ele.id == fetchedCategoryId)
                                        .map(ele => (
                                            <span key={ele.id}>{ele.name}</span>
                                        ))
                                ) : (
                                    <div>No Category To View</div>
                                )}
                            </div>
                            <div className="d-inline-flex align-items-center w-100">
                                <IoPricetagsOutline className="me-1 article-info-row-icon" />
                                {tags && fetchedTagsIds != "" ? (
                                    tags
                                        .filter(tag => fetchedTagsIds.some(tagObj => tagObj.target_id == tag.id))
                                        .map(tag => (
                                            <span key={tag.id} className={`d-inline-block p-2 rounded`}>{tag.name}</span>
                                        ))
                                ) : (
                                    <div>No Tags To View</div>
                                )}
                            </div>
                        </Row>

                        <Row>
                            <div className="d-flex align-items-center mt-3">
                                <img className="rounded-circle author-img me-3 verticla-middle" src="profile/user-img.jpg" alt="Author Photo" />
                                <p className="my-auto bolder fs-4">{localStorage.getItem("author")}</p>
                            </div>
                        </Row>

                        <Row className="mt-5">
                            <div className="fs-3" dangerouslySetInnerHTML={{ __html: body }} />
                        </Row>

                        <Row className="mt-5">
                            <Swiper
                                // install Swiper modules
                                modules={[SwiperNavigation, Pagination, A11y]}
                                spaceBetween={10}
                                slidesPerView={3}
                                SwiperNavigation
                                pagination={{ clickable: true }}
                                onSwiper={(swiper) => console.log(swiper)}
                                onSlideChange={() => console.log('slide change')}
                            >
                                {/* <button onClick={() => swiper.slideNext()}>Slide to the next slide</button> */}
                                {gallery.map((obj, idx) => (
                                    <SwiperSlide>
                                        <div className="gallery-image-container mb-4">
                                            {obj.url ? (
                                                <img className="gallery-image" src={obj.url} alt="Blog Image" loading="lazy"/>
                                            ) : 'No Image To Preview'}
                                        </div>
                                    </SwiperSlide>
                                ))}
                                {/* <button onClick={() => swiper.slidePrev()}>Slide to the next slide</button> */}
                            </Swiper>
                        </Row>
                    </Col>
                </Row>
            </Container>
            <Footer />
        </>
    );
}

export default Article;