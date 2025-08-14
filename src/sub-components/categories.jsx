import { Container, Row, Col } from 'react-bootstrap';
import { FaLongArrowAltRight } from "react-icons/fa";
import { useState, useEffect } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import '../assets/css/categories.css';
function BrowseCategory () {
    const [category, setCategory] = useState([])
    const navigate = useNavigate();
    useEffect(()=> {
        setCategory([
        {id:"1", name:"Label", number:"62,470"}, 
        {id:"2", name:"Buisness", number:"52,470"}, 
        {id:"3", name:"Finance & Accounting", number:"33,470"}, 
        {id:"4", name:"IT & Software", number:"21,470"}, 
        {id:"5", name:"Personal Development", number:"12,470"}, 
        {id:"6", name:"Office Productivity", number:"41,470"}, 
        {id:"7", name:"Marketing", number:"55,470"},
        {id:"8", name:"Photography & Video", number:"89,470"}
        ]);
    },[])
    
    const categoryHandle = (categoryName)=> {
        navigate(`/Articles/${encodeURIComponent(categoryName)}`)
    }

    return (
        <>
            <Container fluid className='mt-5'>
                <Row>
                    <Col>
                        <span className='browse d-block w-100 text-center mb-3 mt-5'>Browse Top Categories</span>
                        <div onClick={()=> navigate("articles")} className="category-container d-flex flex-wrap justify-content-center align-items-center">
                            {category.map((card, index)=> (
                                <div key={card.id} className={`card-${index} text-nowrap  card-container p-2 d-flex flex-row my-3 gap-3`}>
                                    <img src={`home-images/category/${index+1}.png`} alt="category" />
                                    <div className='text-container d-flex flex-column align-items-start ms-1 my-2'>
                                        <p className='card-title'>{card.name}</p>
                                        <span className='card-count'>{card.number} Articles</span>
                                    </div>
                                </div>
                            ))}
                            <div className=" mt-4 mb-0 d-flex mx-auto justify-content-around job-card-footer">
                                <span className=' job-footer-text footer-text me-3'>We have more category & subcategory.</span>
                                <Link className='browse-link' to='../main-pages/articles.jsx'>Browse All<FaLongArrowAltRight/></Link> 
                            </div>
                        </div>
                    </Col>
                </Row>
            </Container>
        </>
    )
}
export default BrowseCategory