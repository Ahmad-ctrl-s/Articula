import React from "react";
// import LoginForm from "../main-pages/Login-form";
import { Button } from "react-bootstrap";
import {Routes, Route, Link, useNavigate} from 'react-router-dom';
import { Navigate } from "react-router-dom";
import '../assets/css/signin-btn.css';
function SignInBtn ({className}) {
    const navigate = useNavigate();
    return (
        <>
            {/* <Link to="/login">
                <Button className="inbtn">Sign In</Button>
            </Link> */}
            <Button className={`inbtn ${className}`} onClick={() => navigate('/login')}>Sign In</Button>
        </>
    )
}
export default SignInBtn