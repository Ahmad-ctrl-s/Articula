import { Container, Row, Col, Form, Button, Toast } from "react-bootstrap";
import { FcImageFile } from "react-icons/fc";
import { CiText, CiTextAlignJustify, CiShoppingTag } from "react-icons/ci";
import { MdOutlineCategory } from "react-icons/md";
import { Swiper, SwiperSlide } from 'swiper/react';
import { Navigation as SwiperNavigation, Pagination } from 'swiper/modules';
import 'swiper/css';
import 'swiper/css/navigation';
import 'swiper/css/pagination';
import 'swiper/css/scrollbar';
import Navigation from "../../sub-components/navbar";
import '../../assets/css/create-article-style/create-article.css';
import BreadCrumb from '../../sub-components/bread-crumb';
import { useEffect, useState, useRef, useContext } from "react";
import { useNavigate } from "react-router";




function CreateArticle() {
    const [showToast, setShowToast] = useState(false);
    const [success, setSuccess] = useState(false)
    const [error, setError] = useState()
    const [dataType, setDataType] = useState("blog")

    const [sessionToken, setSessionToken] = useState("")

    const [blogTitle, setBlogTitle] = useState("")

    const [blogContent, setBlogContent] = useState("");

    const [blogImgId, setBlogImgId] = useState("")
    const [blogGalleryImgId, setBlogGalleryImgId] = useState([])


    const [blogImg, setBlogImg] = useState(null)
    const [previewUrl, setPreviewUrl] = useState(null);
    const [galleryPreviews, setGalleryPreviews] = useState([]);

    const [tags, setTags] = useState([])
    const [selectedTagsId, setSelectedTagsId] = useState([])
    const [selectedTagsName, setSelectedTagsName] = useState([])


    const [category, setCategory] = useState([])
    const [selectedCategoryId, setSelectedCategoryId] = useState()
    const [selectedCategoryName, setSelectedCategoryName] = useState()

    const navigate = useNavigate();

    const postArticle = (e) => {
        setSuccess(true)
        e.preventDefault()
        fetch('https://tamkeen-dev.com/api/node?_format=json', {
            method: 'Post',
            headers: {
                'Content-Type': 'application/json',
                'X-CSRF-Token': sessionToken,
                'Authorization': 'Basic ' + btoa(`${localStorage.getItem('username')}:${localStorage.getItem('password')}`),
            },
            body: JSON.stringify({
                "type": [{ "target_id": dataType }],
                "title": [{ "value": blogTitle }],
                "body": [{
                    "value": blogContent,
                    "format": "basic_html"
                }],
                "field_image": [{ "target_id": blogImgId }],
                "field_gallery": blogGalleryImgId,
                "field_tags": selectedTagsId,
                "field_category": [{ "target_id": selectedCategoryId }]
            })


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
                setShowToast(true);
                setSuccess(true)
            })
            .catch(err => setError(err.message))
            .finally(() => {
                setTimeout(() => { setSuccess(false); setShowToast(true) }, 1000);
            });
    }

    // Session-Token-Api
    useEffect(() => {
        fetch('https://tamkeen-dev.com/api/session/token', {
            method: 'POST',
        })
            .then((res) => res.text())
            .then((token) => {
                setSessionToken(token);
            })
            .catch((err) => console.error("Token Error:", err))
            .finally(() => {
                console.log("Session Token Fetch Ended");
            });
    }, []);


    // Get Main Blog Image ID Api
    const getBlogImgId = (e) => {
        const file = e.target.files[0];
        const imageUrl = URL.createObjectURL(file);
        setPreviewUrl(imageUrl);
        if (!file || !sessionToken) return;

        file.arrayBuffer().then((fileBinary) => {
            fetch('https://tamkeen-dev.com/api/file/upload/node/blog/field_image?_format=json', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/octet-stream',
                    'X-CSRF-Token': sessionToken,
                    'Authorization': 'Basic ' + btoa(`${localStorage.getItem('username')}:${localStorage.getItem('password')}`),
                    'Content-Disposition': `file; filename="${file.name}"`,
                },
                body: fileBinary
            })
                .then(response => {
                    if (!response.ok) {
                        return response.text().then(text => {
                            throw new Error(text);
                        });
                    }
                    return response.json();
                })
                .then(data => {
                    setBlogImgId(data.fid[0].value)
                })
                .catch(err => {
                    console.error("Error Uploading Image", err.message);
                    setError(err.message);
                })
                .finally(() => {
                    console.log("Blog Image Upload Ended");
                });
        });

    }


    // Get Gallery Blog Image IDs Api
    const getBlogGalleryImgId = (e) => {
        const files = e.target.files;
        if (!files || !sessionToken) return;
        Array.from(files).forEach((file) => {
            file.arrayBuffer().then((fileBinary) => {
                const imageUrl = URL.createObjectURL(file);
                setGalleryPreviews(prev => [...prev, imageUrl]);
                fetch('https://tamkeen-dev.com/api/file/upload/node/blog/field_gallery?_format=json', {
                    method: 'POST',
                    headers: {
                        'Content-Type': 'application/octet-stream',
                        'X-CSRF-Token': sessionToken,
                        'Authorization': 'Basic ' + btoa(`${localStorage.getItem('username')}:${localStorage.getItem('password')}`),
                        'Content-Disposition': `file; filename="${file.name}"`,
                    },
                    body: fileBinary
                })
                    .then(response => {
                        if (!response.ok) {
                            return response.text().then(text => {
                                throw new Error(text || 'Unknown upload error');
                            });
                        }
                        return response.json();
                    })
                    .then(data => {
                        setBlogGalleryImgId(prev => [...prev, { "target_id": data.fid[0].value }]);
                    })
                    .catch(err => console.error("Gallery image upload failed:", err.message));
            });
        });

    };




    // Blog-Tags-Api
    useEffect(() => {
        fetch('https://tamkeen-dev.com/api/terms/tags', {
            method: 'Get',
            headers: { 'Content-Type': 'application/json' },
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
                console.error(err.message);
            });
    }, [])


    // Blog-Categories-Api
    useEffect(() => {
        fetch('https://tamkeen-dev.com/api/terms/category', {
            method: 'Get',
            headers: { 'Content-Type': 'application/json' },
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
                setCategory(data);
            })
            .catch(err => {
                console.error(err.message);
            });
    }, [])


    // Controlling Toast State
    useEffect(() => {
        if (showToast) {
            const timer = setTimeout(() => setShowToast(false), 2000);
            return () => clearTimeout(timer);
        }
    }, [showToast]);

    if (!localStorage.getItem('username')) {
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
            <BreadCrumb />
            <Container fluid className="mt-5 create-article-container">
                <Toast
                    show={showToast}
                    autohide
                    delay={2000}
                    className="bg-success text-white position-fixed bottom-0 end-0 m-4"
                >
                    <Toast.Header className="bg-success text-white">
                        <strong className="me-auto">Success</strong>
                    </Toast.Header>
                    <Toast.Body className="text-white">Article successfully posted!</Toast.Body>
                </Toast>

                <Row>
                    <Col xs={9} xl={6} className="blog-form-col">
                        <Form onSubmit={(e) => postArticle(e)}>
                            <Col xs={12} className="mb-5">
                                <Form.Group >
                                    <Form.Label>Blog Title</Form.Label>
                                    <Form.Control required className='p-3'
                                        type="text"
                                        placeholder="Title"
                                        value={blogTitle}
                                        onInput={(e) => {
                                            setBlogTitle(e.target.value)
                                        }}
                                    />
                                </Form.Group>
                            </Col>

                            <Col xs={12} className="mb-5">
                                <Form.Group className="mb-3" controlId="exampleForm.ControlTextarea1">
                                    <Form.Label>Blog Content</Form.Label>
                                    <Form.Control required placeholder="Content"
                                        as="textarea"
                                        rows={5}
                                        className='p-3'
                                        value={blogContent}
                                        onInput={(e) => {
                                            setBlogContent(e.target.value)
                                        }}
                                    />
                                </Form.Group>
                            </Col>

                            <Col xs={12}>
                                <Form.Group className="mb-5" controlId="formBasicFieldImage">
                                    <Form.Label>Blog Image</Form.Label>
                                    <Form.Control required className='p-3'
                                        type="file"
                                        placeholder="Upload Image"
                                        onChange={getBlogImgId}
                                    />
                                </Form.Group>
                            </Col>

                            <Col xs={12} className="mb-5">
                                <Form.Group controlId="formFileMultiple">
                                    <Form.Label>Blog Gallery</Form.Label>
                                    <Form.Control onChange={getBlogGalleryImgId} className='p-3' type="file" multiple />
                                </Form.Group>
                            </Col>



                            <Col xs={12} className="mb-5">
                                <Form.Label>Blog Tags</Form.Label>
                                {tags.map((ele) => (
                                    <Form.Check
                                        type="switch"
                                        id={`custom-switch-${ele.id}`}
                                        key={ele.id}
                                        value={ele.id}
                                        label={ele.name}
                                        onChange={(e) => {

                                            const tagId = ele.id;
                                            const tagName = ele.name
                                            if (e.target.checked) {
                                                setSelectedTagsId(prev => [...prev, { 'target_id': tagId }]);
                                                setSelectedTagsName(prev => [...prev, tagName]);
                                            } else {
                                                setSelectedTagsId(prev => prev.filter(id => id !== ({ 'target_id': tagId })));
                                                setSelectedTagsName(prev => prev.filter(name => name !== tagName))
                                            }
                                        }}
                                    />
                                ))}
                            </Col>

                            <Col xs={12} className="mb-2">
                                <Form.Group controlId="categorySelect">
                                    <Form.Label>Blog Category</Form.Label>
                                    <Form.Select required
                                        aria-label="Default select example"
                                        onChange={(e) => {
                                            const selectedOption = e.target.options[e.target.selectedIndex];
                                            const value = e.target.value;
                                            const name = selectedOption.innerHTML;

                                            setSelectedCategoryId(value);
                                            setSelectedCategoryName(name);
                                        }}
                                        className='p-3'
                                    >
                                        <option value="">No Category Selected</option>
                                        {category.map((ele) => (
                                            <option key={ele.id} value={ele.id}>
                                                {ele.name}
                                            </option>
                                        ))}
                                    </Form.Select>
                                </Form.Group>
                            </Col>


                            <Col>
                                <Button className="p-3 w-25 h-auto mx-auto mb-3 mt-0" type="submit">
                                    {success ? "Posting" : "Post"}
                                </Button>
                            </Col>
                        </Form>

                    </Col>






                    <Col xs={12} xl={6} className="mx-auto mb-5">
                        <div className="blog-preview-card p-4 bg-white">


                            <h2 className="blog-title mb-5"><CiText /> {blogTitle || "Blog Title"}</h2>


                            <Row className="align-items-center mb-4">
                                <Col md={6}>
                                    <p className="blog-content">
                                        <CiTextAlignJustify /> {blogContent || "Blog content goes here..."}
                                    </p>
                                </Col>
                                <Col md={6}>
                                    <img src={previewUrl || "signup-page/placeholder.png"} className="img-fluid rounded-3 border" alt="Blog Preview" />
                                </Col>
                            </Row>


                            <div className="gallery-header mb-3">
                                <h4 className="fw-bold mb-1"><FcImageFile /> Image Gallery</h4>
                                <p className="text-muted">A visual companion to your blog</p>
                            </div>


                            <Swiper
                                modules={[SwiperNavigation, Pagination]}
                                pagination={{ clickable: false }}
                                spaceBetween={0}
                                slidesPerView={1}
                                className="gallery-swiper"
                            >
                                {galleryPreviews.map((src, idx) => (
                                    <SwiperSlide key={idx} className="gallery-swiper-slide">
                                        <img className="gallery-swiper-slide-img"
                                            src={src}
                                            alt={`Gallery ${idx}`}
                                        />
                                    </SwiperSlide>
                                ))}
                            </Swiper>


                            <div className="blog-tags mt-4">
                                <h5 className="fw-semibold"><CiShoppingTag /> Tags:</h5>
                                <div className="d-flex flex-wrap gap-2 mt-2">
                                    {selectedTagsName.length > 0 ? (
                                        selectedTagsName.map((tag, idx) => (
                                            <span key={idx} className={`badge badge-${tag} rounded px-3 py-2`}>
                                                {tag}
                                            </span>
                                        ))
                                    ) : (
                                        <span className="text-muted">No tags selected</span>
                                    )}
                                </div>
                            </div>


                            <div className="blog-category mt-4">
                                <h5 className="fw-semibold"><MdOutlineCategory /> Category:</h5>
                                <p className="mt-2 badge rounded px-3 py-2">{selectedCategoryName || "No category selected"}</p>
                            </div>
                        </div>
                    </Col>


                </Row>
            </Container>
        </>
    )
}
export default CreateArticle





