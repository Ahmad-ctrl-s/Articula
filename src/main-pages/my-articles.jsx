import Navigation from "../sub-components/navbar";
import { UserAuth } from '../main-pages/application-context/auth-context';
import { useContext, useEffect, useMemo, useState } from 'react';
import { useNavigate } from 'react-router';
import { Container, Row, Col, Card, Button, ButtonGroup, Modal } from "react-bootstrap";
import '../assets/css/my-articles-style/my-articles.css'
function MyArticles() {

    const { setIsAuthorized, isAuthorized, formData } = useContext(UserAuth);
    const credentials = useMemo(() => btoa(`${formData.name}:${formData.pass}`), [formData]);

    const [erroe, setError] = useState()
    const [articles, setArticles] = useState()
    const [pager, setPager] = useState()
    const [showModalDelete, setShowModalDelete] = useState(false)
    const [articleId, setArticleId] = useState()
    const [sessionToken, setSessionToken] = useState()
    const [loading, setLoading] = useState(false)

    const navigate = useNavigate()


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
        setLoading(true)
        if (!formData || !formData.name || !formData.pass || !formData.userID) {
            console.log("formData not available yet");
            console.log(formData)
            return;
        }
        fetch(`https://tamkeen-dev.com/api/blogs-api-current-user`, {
            headers: {
                'Content-Type': `application/json`,
                'Authorization': `Basic ${credentials}`,
            },

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
                console.log("articles", data.rows)
                setArticles(data.rows)
                setPager(data.pager)
            })
            .catch(err => {
                setError(err.message);
            })
            .finally(() => setTimeout(() => setLoading(false), 1000));
    }, [formData])


    function deleteArticle() {

        fetch(`https://tamkeen-dev.com/api/node/${articleId}?_format=json`, {
            method: 'DELETE',
            headers: {
                'Content-Type': `application/json`,
                'X-CSRF-Token': `${sessionToken}`,
                'Authorization': `Basic ${credentials}`,
            }
        })
            .then(response => {
                if (!response.ok) {
                    return response.json().then(serverError => {
                        throw new Error(serverError.message);
                    });
                }
                if (response.status === 204) {
                    return null;
                }
            })
            .then(data => {
                console.log(data)
                window.location.reload()
            })
            .catch(err => {
                setError(err.message);
                console.log(err.message)
            })
            .finally(console.log("Fetch Ended"));
    }


    function navToEditPage(id) {
        navigate(`/Edit_Article/${id}`)
    }

    function navToArticlePage(id) {
        navigate(`/Article/${id}`)
    }

    { console.log(articleId) }

    if (loading === true) return (<>
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
            <Container fluid className='mt-5'>
                <Row className="my-articles-row">
                    <Col>
                        <Row className="article-summary personal-articles-summary ms-0 mb-5">
                            Total Articles: {pager?.total_items}
                        </Row>

                        <Row >
                            {articles ? articles.map((article) => (

                                <Col xs={12} key={article.id} className='personal-article-card-col'>
                                    <Card className="mb-5 flex-row personal-article-card">

                                        <div className='personal-article-img-container'>
                                            <Card.Img className='personal-article-img p-1 '
                                                src={`https://tamkeen-dev.com${article.field_image}`}
                                            />
                                        </div>

                                        <Card.Body className='d-flex flex-column'>
                                            <Card.Title className='mb-3'>{article.title}</Card.Title>
                                            <Card.Subtitle className="mb-3 text-muted">{article.created}</Card.Subtitle>
                                            <Card.Text className=' my-xl-auto d-none d-md-block' dangerouslySetInnerHTML={{ __html: article.body.slice(0, 400) + "..." }} />
                                            <ButtonGroup aria-label="Basic example" className='mt-auto mt-xl-auto gap-3 personal-articles-btn-group'>
                                                <Button onClick={() => navToArticlePage(article.id)}>View Full Article</Button>
                                                <Button onClick={() => navToEditPage(article.id)}>Edit Article</Button>
                                                <Button className='delete-btn' onClick={() => { setShowModalDelete(true); setArticleId(article.id) }}>Delete Article</Button>
                                            </ButtonGroup>
                                        </Card.Body>
                                    </Card>
                                </Col>
                            )) : null}
                        </Row>



                        <Modal show={showModalDelete} onHide={() => setShowModalDelete(false)}>
                            <Modal.Header closeButton>
                                <Modal.Title>Are You Sure</Modal.Title>
                            </Modal.Header>
                            <Modal.Footer>
                                <Button onClick={() => setShowModalDelete(false)}>
                                    Cancel
                                </Button>
                                <Button className='delete-btn' onClick={() => deleteArticle()}>
                                    Delete
                                </Button>
                            </Modal.Footer>
                        </Modal>


                    </Col>
                </Row>
            </Container>


        </>
    )
}
export default MyArticles

