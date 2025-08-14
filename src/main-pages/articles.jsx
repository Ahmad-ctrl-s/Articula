import Navigation from "../sub-components/navbar";
import { UserAuth } from '../main-pages/application-context/auth-context';
import { useContext, useEffect, useMemo, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Container, Row, Col, Button, Form, Card } from 'react-bootstrap';
import { Link } from 'react-router';
import { Pagination } from 'react-bootstrap';
import '../assets/css/Articles.css';
import Footer from '../sub-components/foot';

function Articles() {
    const baseUrl = "https://tamkeen-dev.com"
    const [currentPage, setCurrentPage] = useState("0")
    const [itemsPerPage, setItemsPerPage] = useState("10")
    const [totalItems, setTotalItems] = useState()
    const [totalPages, setTotalPages] = useState()

    const { isAuthorized, formData } = useContext(UserAuth);
    const navigate = useNavigate();

    const [blogList, setBlogList] = useState([]);
    const [author, setAuthor] = useState()
    const [search, setSearch] = useState("");
    const [tag, setTag] = useState("");
    const [category, setCategory] = useState("");
    const [sortBy, setSortBy] = useState("created_date");
    const [sortOrder, setSortOrder] = useState("DESC");

    const credentials = useMemo(() => btoa(`${formData.name}:${formData.pass}`), [formData]);

    const [categories, setCategories] = useState([]);
    const [tags, setTags] = useState([]);

    const [error, setError] = useState();
    const [loading, setLoading] = useState(false)


    function navToArticlePage(id) {
        navigate(`/Article/${id}`)
    }

    useEffect(() => {
        const seachUrl = `https://tamkeen-dev.com/api/blogs-api?sort_by=${sortBy}&sort_order=${sortOrder}&page=${currentPage}&search=${search}&items_per_page=${itemsPerPage}`
        let url = ''
        if (!isAuthorized || !formData.name || !formData.pass) return;

        setLoading(true);

        if (search != "") {
            console.log("Search Filter Activated")
            url = seachUrl
        } else if (category != "" && tag != "") {
            url = `https://tamkeen-dev.com/api/blogs-api?category=${category}&tag=${tag}&page=${currentPage}&items_per_page=${itemsPerPage}`
            console.log("tag + category activated");
        } else if (category != "") {
            url = `https://tamkeen-dev.com/api/blogs-api?category=${category}&page=${currentPage}&items_per_page=${itemsPerPage}`
            console.log("category activated");
        } else if (tag != "") {
            url = `
            https://tamkeen-dev.com/api/blogs-api?tag=${tag}&sort_by=${sortBy}&sort_order=${sortOrder}&page=${currentPage}&items_per_page=${itemsPerPage}`
            console.log("tag activated");
        } else {
            url = `
            https://tamkeen-dev.com/api/blogs-api?sort_by=${sortBy}&sort_order=${sortOrder}&page=${currentPage}&items_per_page=${itemsPerPage}`

            console.log("no Filters activated");
        }

        console.log(url)

        fetch(url, {
            headers: {
                'Authorization': `Basic ${credentials}`
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
                setBlogList(data.rows)
                setTotalItems(data.pager?.total_items || 0);
                setTotalPages(data.pager?.total_pages || 1);

            })
            .catch(err => {
                setError(err.message);
            })
            .finally(() => setTimeout(() => setLoading(false), 500));
    }, [credentials, itemsPerPage, currentPage, search, category, tag, sortOrder]);

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
            <Container fluid className='blog-list-container'>
                <Row className="mb-5 articles-filter py-4 justify-content-between">
                    <Col xs={12} md={2} className="mb-3 mb-md-0">
                        <Form.Group >
                            <Form.Label className='w-100 '>Search</Form.Label>
                            <Form.Control className='p-3'
                                type="text"
                                placeholder="Search articles..."
                                value={search}
                                onChange={(e) => { setCategory(""); setTag(""); setSearch(e.target.value); setCurrentPage(0) }}
                            />
                        </Form.Group>
                    </Col>

                    <Col xs={12} md={2} className="mb-3 mb-md-0">
                        <Form.Group>
                            <Form.Label className='w-100 '>Category</Form.Label>
                            <Form.Select className='p-3' value={category} onChange={(e) => { setSearch(""); setCategory(e.target.value); setCurrentPage(0) }}>
                                <option value="">ALL</option>
                                {categories.map((cat, index) => (
                                    <option key={index} value={cat.id}>{cat.name}</option>
                                ))}
                            </Form.Select>
                        </Form.Group>
                    </Col>

                    <Col xs={12} md={2} className="mb-3 mb-md-0">
                        <Form.Group>
                            <Form.Label className='w-100 '>Tags</Form.Label>
                            <Form.Select className='p-3' value={tag} onChange={(e) => { setSearch(""); setTag(e.target.value); setCurrentPage(0) }}>
                                <option value="">ALL</option>
                                {tags.map((tag, index) => (
                                    <option key={index} value={tag.id}>{tag.name}</option>
                                ))}
                            </Form.Select>
                        </Form.Group>
                    </Col>

                    <Col xs={12} md={2} className="mb-3 mb-md-0">
                        <Form.Group>
                            <Form.Label className='w-100 '>Sort By</Form.Label>
                            <Form.Select className='p-3' value={sortOrder} onChange={(e) => { setSortBy("created_date"); setSortOrder(e.target.value); setCurrentPage(0) }}>
                                <option value="DESC">Newest To Oldest</option>
                                <option value="ASC">Oldest To Newest</option>

                            </Form.Select>
                        </Form.Group>
                    </Col>

                    <Col xs={12} md={2} className="mb-3 mb-md-0">
                        <Form.Group>
                            <Form.Label className='w-100 '>Items Per Page</Form.Label>
                            <Form.Select className='p-3' value={itemsPerPage} onChange={(e) => { setItemsPerPage(e.target.value); setCurrentPage(0) }}>
                                <option value={5}>5</option>
                                <option value={10}>10</option>
                                <option value={15}>15</option>
                                <option value={20}>20</option>
                                <option value={25}>25</option>
                                <option value={30}>30</option>
                                <option value={35}>35</option>
                                <option value={40}>40</option>
                                <option value={45}>45</option>
                                <option value={50}>50</option>
                            </Form.Select>
                        </Form.Group>
                        {console.log(itemsPerPage)}
                    </Col>
                    <Col xs={12} md={2} className="d-flex align-items-end">
                        <Button as={Link} to='/Create_Article' className="w-100 h-auto p-3">Create New Article</Button>
                    </Col>
                </Row>


                {loading && (
                    <>
                        <div className="d-flex justify-content-center align-items-center spinner-container">
                            <div className="spinner-border " role="status">
                                <span className="visually-hidden">Loading...</span>
                            </div>
                        </div>
                    </>
                )}



                {!loading && (
                    <>
                        <div className='articles-card-wrapper mb-5'>
                            <Row>
                                <Col>
                                    <Row className='justify-content-between mb-5'>
                                        <Col xs={6}>
                                            <h2 className="">Articles</h2>
                                        </Col>

                                        <Col xs={6}>
                                            <p className="article-summary">
                                                Total Articles <span className="article-count">{totalItems}</span>
                                            </p>
                                        </Col>
                                    </Row>

                                    <Row className="g-4 cards-row">
                                        {blogList.map((article, index) => (
                                            <Col xs={12} sm={6} lg={3} key={article.id} className='article-col' onClick={() => {navToArticlePage(article.id); localStorage.setItem("author", article.author)} }>
                                                <Card className="rounded-0 article-card">
                                                    <Card.Img className='rounded-0 article-card-image' variant="top" src={article?.field_image ? (baseUrl + article.field_image) : "Public/Profile/placeholder.png"}
                                                        loading='lazy' alt='Card Image' />
                                                    <div className="blog-created d-flex align-items-center m-2 px-2 py-0">
                                                        <img src='home-images/latest-articles/vector.png' alt='Time' />
                                                        <span className='ms-2 text-white'>{article.created}</span>
                                                    </div>
                                                    <div className='d-flex flex-wrap mt-3 ms-2'>{article.field_tags.map((ele, index) => (<span key={index + 1} className={`m-1 p-1 rounded card-category-${ele.trim().replace(/ /g, '')}`}>{ele}</span>))}</div>
                                                    <Card.Body>
                                                        <Card.Title>{article.title}</Card.Title>
                                                    </Card.Body>
                                                    <Card.Footer>
                                                        <small className="text-muted">{article.author}</small>
                                                    </Card.Footer>
                                                </Card>
                                            </Col>
                                        ))}
                                        {blogList.length === 0 && (
                                            <div className="text-muted text-center">No articles match your criteria.</div>
                                        )}
                                    </Row>



                                </Col>
                            </Row>
                        </div>


                        <Row>
                            <Col xs={12}>
                                <Pagination className='justify-content-center p-3'>

                                    <Pagination.Prev className={`p-2 circle`} disabled={currentPage === 0 || totalPages === 1 ? true : false} onClick={() => setCurrentPage(currentPage - 1)} />

                                    <Pagination.Item className='p-2 rounded' active={currentPage == 0 ? true : false} onClick={() => setCurrentPage(0)}>{1}</Pagination.Item>
                                    <Pagination.Item className={`p-2 rounded ${(totalPages <= 1 ? "d-none" : "d-inline-block")}`} active={currentPage == 1 ? true : false} onClick={() => setCurrentPage(1)}>2</Pagination.Item>
                                    <Pagination.Item className={`p-2 rounded ${(totalPages <= 2 ? "d-none" : "d-inline-block")}`} active={currentPage == 2 ? true : false} onClick={() => setCurrentPage(2)}>3</Pagination.Item>

                                    <Pagination.Ellipsis className={`p-2 rounded ${(totalPages <= 3 ? "d-none" : "d-inline-block")}`} />

                                    <Pagination.Item className={`p-2 rounded ${(totalPages <= 3 ? "d-none" : "d-inline-block")}`} active={currentPage === totalPages - 1 ? true : false} onClick={() => setCurrentPage(totalPages - 1)}>{totalPages}</Pagination.Item>

                                    <Pagination.Next className='p-2 rounded' disabled={currentPage === totalPages - 1 || totalPages === 1 ? true : false} onClick={() => setCurrentPage(prev => prev + 1)} />

                                </Pagination>

                            </Col>
                        </Row>
                    </>
                )}
            </Container>
            <Footer className="mt-auto" />

            {console.log(author)}
        </>
    );
}

export default Articles;