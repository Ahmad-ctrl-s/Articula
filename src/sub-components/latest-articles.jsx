import { Container, Row, Col, Card } from 'react-bootstrap'
import '../assets/css/latest-articles.css'
import { useState, useEffect } from 'react'
import { useNavigate } from 'react-router';
function LatestArticles () {
    const [blogList, setBlogList] = useState([]);
    const [blogListPag, setBlogListPag] = useState();
    const [blogListfield_tags, setBlogListfield_tags] = useState([]);
    const navigate = useNavigate()
    const blogField_tags = [
        {field_tags: "Design"},
        {field_tags: "Development"},
        {field_tags: "Business"},
        {field_tags: "Marketing"},
        {field_tags: "IT & Software"},
        {field_tags: "Music"},
        {field_tags: "Marketing"},
        {field_tags: "Health & Fitness"},
        {field_tags: "Design"},
        {field_tags: "Lifestyle"},      
    ]
    const username = 'tamkeen';
    const password = '123456';
    const credentials = btoa(`${username}:${password}`);
    useEffect(() => {
        fetch(`https://tamkeen-dev.com/api/blogs-api`, {
            headers: {
                'Authorization': `Basic ${credentials}`
            }
        })
        .then(response=>{
            if(!response.ok) {
                // throw new Error("something went wrong")
                return response.json().then(serverError=>{
                    throw new Error(serverError.message)
                })
            }
                return response.json()
            })

        .then(data => {
            setBlogList(data.rows)
            setBlogListPag(data.pager)
            setBlogListfield_tags(blogField_tags)
        })

        .catch( err => {
            err.message
        })
        .finally(()=>{
            console.log('fetch completed')
        })

        },[credentials])
        console.log(blogList)
        console.log(blogListPag)
        console.log(blogListfield_tags)
    




    return (
        <>
            <div className='articles-wrapper w-100 mt-5'>
                <Container fluid>
                    <Row>
                        <Col>
                            <div className="category-container d-flex flex-wrap justify-content-center align-items-center gap-y-2">
                                <span className='browse w-100 text-center my-5'>Latest Articles</span>
                                    {blogList.map((card, index)=> (
                                        <Card key={card.id} className='article-container' >
                                            <Card.Img variant="top" src={`home-images/latest-articles/${(index) + 1}.png`} /> 
                                            <div className="card-created d-flex justify-content-between align-items-center px-2 py-0">
                                                <img src='home-images/latest-articles/vector.png' alt='Time'></img> 
                                                <span className='ms-2'> {card.created}</span>
                                            </div>
                                            <Card.Body className='d-flex align-items-center flex-wrap '>
                                                <div className= {`d-block p-1 card-category ${blogListfield_tags[index].field_tags.toLowerCase().replace(/&/g, '').replace(/-+/g, '-').replace(/\s+/g, '-').replace(/-+/g, '-')}`}> {blogListfield_tags[index].field_tags} </div>
                                                <Card.Title>2021 Complete Python Bootcamp From Zero to Hero...</Card.Title>
                                            </Card.Body>
                                            <Card.Footer>
                                                <img className='me-2' src="home-images/latest-articles/account-circle.png" alt="" />
                                                <small className="text-muted text-start">{card.author}</small>
                                            </Card.Footer>
                                        </Card>
                                    ))}
                            </div>
                        </Col>
                    </Row>
                </Container>
            </div>
        </>
    )
}
export default LatestArticles