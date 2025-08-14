import { Container, Row, Col, Breadcrumb, Form, Button } from "react-bootstrap";
import { useState, useEffect, useContext, useMemo, useRef } from "react";
import { UserAuth } from '../application-context/auth-context';
import { useLocation, useParams, useNavigate } from "react-router";
import Footer from "../../sub-components/foot";
import Navigation from "../../sub-components/navbar";
import '../../assets/css/edit-article-style/edit-article.css';

function EditArticle() {

    const [isEditing, setIsEditing] = useState(false)
    const [isBodyClicked, setIsBodyClicked] = useState(false)
    const [isGalleryClicked, setIsGalleryClicked] = useState(false)
    const [isTagsClicked, setIsTagsClicked] = useState(false)

    const navigate = useNavigate();


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

    const [sessionToken, setSessionToken] = useState("")

    const [blogGalleryImgId, setBlogGalleryImgId] = useState([])
    const [previewUrl, setPreviewUrl] = useState(null);
    const [galleryPreviews, setGalleryPreviews] = useState([]);

    const [success, setSuccess] = useState(false)
    const [galleryValue, setGalleryValue] = useState(false)
    // const [view, setView] = useState(false)
    const [blogContent, setBlogContent] = useState("")


    const location = useLocation()


    const inputRef = useRef(null);

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

    useEffect(() => {
        if (isEditing && inputRef.current) {
            inputRef.current.focus();
        }
    }, [isEditing]);

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

    const getBlogGalleryImgId = (e) => {
        setGalleryValue(true)
        const files = e.target.files;
        if (!files || !sessionToken) return;
        if (files) {
            setIsGalleryClicked(true);
            setIsEditing(true);
        } else {
            setIsGalleryClicked(true);
            setIsEditing(true);
        }
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

    const editArticle = (e) => {
        setSuccess(true)

        fetch(`https://tamkeen-dev.com/api/node/${id}?_format=json`, {
            method: 'PATCH',
            headers: {
                'Content-Type': 'application/json',
                'X-CSRF-Token': sessionToken,
                'Authorization': 'Basic ' + btoa(`${localStorage.getItem('username')}:${localStorage.getItem('password')}`),
            },
            body: JSON.stringify({
                "type": [{ "target_id": "blog" }],
                "body": [{
                    "value": blogContent || body,
                    "format": "basic_html"
                }],
                "field_gallery": blogGalleryImgId,
                "field_tags": "",
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
                setSuccess(true)
            })
            .catch(err => setError(err.message))
            .finally(() => {
                setTimeout(() => { setSuccess(false); }, 1000);
            });
    }


    {
        loading && (
            <>
                <div className="d-flex justify-content-center align-items-center spinner-container">
                    <div className="spinner-border " role="status">
                        <span className="visually-hidden">Loading...</span>
                    </div>
                </div>
            </>
        )
    }

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

    if (error) return <p style={{ color: "red" }}>Error: {error}</p>;
    if (!blogData || loading) return (<>
        <div className="d-flex justify-content-center align-items-center spinner-container">
            <div className="spinner-border " role="status">
                <span className="visually-hidden"></span>
            </div>
        </div>
    </>)

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


                <Row className="article-row mx-auto">

                    <Col xs={12} xl={9}>
                        <div className="blog-image-container mb-3">
                            <img className="blog-image" src={blogImg||"signup-page/placeholder.png"} alt="Blog Image" />
                        </div>
                        <h1>{title || "Untitled Article"}</h1>

                        {isBodyClicked ?
                            (
                                <Form.Group className="mb-3" controlId="exampleForm.ControlTextarea1">
                                    <Form.Control required placeholder="Content"
                                        ref={inputRef}
                                        as="textarea"
                                        rows={5}
                                        className='p-3 mh-25'
                                        value={blogContent}
                                        onInput={(e) => {
                                            setBlogContent(e.target.value)

                                        }}
                                        onBlur={() => { setIsBodyClicked(false); setIsEditing(false) }}
                                    />
                                </Form.Group>


                            ) : (
                                <div onClick={() => { setIsBodyClicked(true); setIsEditing(true) }} className="mb-5 editable-section" dangerouslySetInnerHTML={{ __html: blogContent || body }} />
                            )
                        }



                        <Row>
                            {isGalleryClicked ?
                                (
                                    <Form.Group className="mb-3" controlId="exampleForm.ControlGallery">
                                        <Form.Control required placeholder="Gallery"
                                            multiple
                                            type="file"
                                            className='p-3'
                                            onChange={getBlogGalleryImgId}
                                        />
                                    </Form.Group>
                                ) : (
                                    gallery.map((obj, idx) => (
                                        <Col xs={12} md={6} xl={4} key={idx} onClick={() => { setIsGalleryClicked(true); setIsEditing(true) }}>
                                            <div className="gallery-image-container mb-4">
                                                {obj.url ? (
                                                    <img className="gallery-image" src={obj.url} alt="Blog Image" />
                                                ) : 'No Image To Preview'}
                                            </div>
                                        </Col>
                                    ))
                                )
                            }
                        </Row>
                    </Col>


                    <Col xs={12} xl={3} className="h-auto ms-0 tags">
                        <Row className="gap-3">
                            <Col xs={12}>
                                <h4 className="article-summary ms-0">
                                    Paper Type:
                                    <span className="article-count">{type}</span>
                                </h4>
                            </Col>
                            <Col xs={12}>
                                <h4 className="article-summary ms-0">
                                    Post Date:
                                    <span className="article-count">{createdDate}</span>
                                </h4>
                            </Col>
                            <Col xs={12}>
                                <h4 className="article-summary ms-0">
                                    Update Date:
                                    <span className="article-count">{changedDate}</span>
                                </h4>
                            </Col>
                            <Col xs={12}>
                                <h4 className="article-summary text-start ms-0">
                                    Article Tags:
                                    <span className="article-count">
                                        {tags && fetchedTagsIds != "" ? (
                                            tags
                                                .filter(tag => fetchedTagsIds.some(tagObj => tagObj.target_id == tag.id))
                                                .map(tag => (
                                                    <span key={tag.id} className={`d-inline-block p-2 rounded`}>{tag.name}</span>
                                                ))
                                        ) : (
                                            <div>No Tags To View</div>
                                        )}
                                    </span>
                                </h4>
                            </Col>

                            <Col xs={12}>
                                <h4 className="article-summary text-start ms-0">
                                    Article Category:
                                    <span className="article-count">
                                        {categories && fetchedCategoryId !== "" ? (
                                            categories
                                                .filter(ele => ele.id == fetchedCategoryId)
                                                .map(ele => (
                                                    <span key={ele.id}>{ele.name}</span>
                                                ))
                                        ) : (
                                            <div>No Category To View</div>
                                        )}
                                    </span>
                                </h4>
                            </Col>
                            <Col xs={12}>
                                <Button disabled={!blogContent && !galleryValue} onClick={() => { editArticle() }}>Update</Button>
                            </Col>
                        </Row>

                    </Col>
                </Row>
            </Container>
            <Footer />
        </>
    );
}
export default EditArticle
