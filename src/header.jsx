import React from "react";
import { Navbar, NavLink, Nav, Container, Col, Row } from "react-bootstrap";
import './Header.css'
import Navigation from "./sub-components/navbar";


function Header () {
    return (
        <>
            <header>
                <div className="navbar-wrapper">
                    <Container fluid>
                        <Row>
                            <Col>
                                <Navigation></Navigation>
                            </Col>
                        </Row>
                    </Container>
                </div>
            </header>
        </>
    )
}
export default Header