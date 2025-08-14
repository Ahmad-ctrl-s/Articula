import RegisterationBar from "../sub-components/regestration-bar";
import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';
import { Container, Row, Col, Toast, ToastContainer } from "react-bootstrap";
import '../assets/css/signup-form.css';
import { useState, useEffect, useContext, useRef } from 'react';
import { FaLongArrowAltRight } from "react-icons/fa";
import { MdDangerous } from "react-icons/md";
import { FaRegCheckCircle } from "react-icons/fa";
import { Link } from 'react-router-dom';

function SignupForm() {
    const [confirmPass, setConfirmPass] = useState("")
    const [isPassMatched, setIsPassMatched] = useState(false);
    const [showToast, setShowToast] = useState(false);
    const [formData, setFormData] = useState({
        "name": {
            "value": ""
        },
        "field_name": {
            "value": ""
        },
        "field_surname": {
            "value": ""
        },
        "mail": {
            "value": ""
        },
        "field_mobile": {
            "value": ""
        },
        "field_gender": {
            "target_id": 9
        },
        "pass": {
            "value": ""
        }
    })
    const [name, setName] = useState("");
    const [error, setError] = useState()
    const [loading, setLoading] = useState(false)


    function handleSignupForm(e) {
        e.preventDefault()
        setShowToast(false)
        setError(null)
        setLoading(true)
        fetch('https://tamkeen-dev.com/api/user/registerpass?_format=json', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(formData)
        })
            .then(response => {
                if (!response.ok) {
                    return response.json().then(serverError => {
                        throw new Error(serverError.message || "Registraion Failed");
                    });
                }
                return response.json();
            })
            .then(data => {
                setName(data.name[0].value)
                setFormData({
                    "name": {
                        "value": ""
                    },
                    "field_name": {
                        "value": ""
                    },
                    "field_surname": {
                        "value": ""
                    },
                    "mail": {
                        "value": ""
                    },
                    "field_mobile": {
                        "value": ""
                    },
                    "field_gender": {
                        "target_id": 9
                    },
                    "pass": {
                        "value": ""
                    }
                })
                setConfirmPass("")
                setShowToast(true)
            })
            .catch(err => setError(err.message))
            .finally(() => { setLoading(false); });
    }

    useEffect(() => {
        const password = formData.pass?.value;
        const confirm = confirmPass;

        if (!password || !confirm) {
            setIsPassMatched(null);
        } else if (password === confirm) {
            setIsPassMatched(true);
        } else {
            setIsPassMatched(false);
        }
    }, [confirmPass, formData.pass?.value]);

    return (
        <>
            <RegisterationBar />
            <Container fluid className="p-0">
                <Row>
                    <Col xs={12} md={6} className="signup-lef-side d-none d-md-block">
                        <img className="signup-img" src="signup-page/left-side.png" alt="Signup Image" />
                    </Col>

                    <Col xs={12} md={6}>
                        <Row className="justify-content-center align-content-center signup-cred-container gap-5 mt-2">

                            <Col xs={12} className="browse mt-4 text-center">
                                Create your account
                            </Col>
                            <Col xs={12}>
                                <Form className="w-75 mx-auto" onSubmit={handleSignupForm}>
                                    <Form.Group className="mb-4 d-flex flex-wrap align-items-center w-100 gap-2" controlId="formFullName">
                                        <Form.Label className='w-100'>Full name</Form.Label>
                                        <Form.Control required className=" full-name-control signup-control p-3" type="text" placeholder="First Name"
                                            onInput={(e) =>
                                                setFormData(
                                                    {
                                                        ...formData,
                                                        "field_name": {
                                                            ...formData.field_name,
                                                            "value": e.target.value
                                                        }
                                                    }
                                                )
                                            }
                                            value={formData.field_name.value} />
                                        <Form.Control required className=" full-name-control signup-control p-3" type="text" placeholder="Last Name"
                                            onInput={(e) => setFormData(
                                                {
                                                    ...formData,
                                                    "field_surname": {
                                                        ...formData.field_surname,
                                                        "value": e.target.value
                                                    }
                                                }
                                            )}
                                            value={formData.field_surname.value} />
                                    </Form.Group>
                                    <Form.Group className="mb-4 d-flex flex-wrap align-items-center w-100 gap-2" controlId="formTel">
                                        <Form.Label className='w-100'>Mobile</Form.Label>
                                        <Form.Control required className="signup-control p-3" type="tel" placeholder="ex: 963 000 0000"
                                            onInput={(e) => setFormData(
                                                {
                                                    ...formData,
                                                    "field_mobile": {
                                                        ...formData.field_mobile,
                                                        "value": e.target.value
                                                    }
                                                }
                                            )}
                                            value={formData.field_mobile.value} />
                                    </Form.Group>
                                    <Form.Group className="mb-4 d-flex flex-wrap align-items-center w-100 gap-2" controlId="formUserName">
                                        <Form.Label className='w-100'>Username</Form.Label>
                                        <Form.Control required className="signup-control p-3" type="text" placeholder="Username..."
                                            onInput={(e) => setFormData(
                                                {
                                                    ...formData,
                                                    "name": {
                                                        ...formData.name,
                                                        "value": e.target.value
                                                    }
                                                }
                                            )}
                                            value={formData.name.value} />
                                    </Form.Group>
                                    <Form.Group className="mb-4 d-flex flex-wrap align-items-center w-100 gap-2" controlId="formEmail">
                                        <Form.Label className='w-100'>Email</Form.Label>
                                        <Form.Control required className="signup-control p-3" type="email" placeholder="Email address"
                                            onInput={(e) => setFormData(
                                                {
                                                    ...formData,
                                                    "mail": {
                                                        ...formData.mail,
                                                        "value": e.target.value
                                                    }
                                                }
                                            )}
                                            value={formData.mail.value} />
                                    </Form.Group>
                                    <Form.Group className="mb-5 d-flex flex-wrap align-items-center w-100 gap-2" controlId="formGender">
                                        <Form.Label className='w-100'>Gender</Form.Label>
                                        <Form.Select className="signup-control p-3" aria-label="Default select example" onChange={(e) => {
                                            setFormData(
                                                {
                                                    ...formData,
                                                    "field_gender":
                                                    {
                                                        ...formData.field_gender,
                                                        "target_id": e.target.value
                                                    }
                                                }
                                            ); console.log(e.target.value)
                                        }}>
                                            <option value={9}>Male</option>
                                            <option value={10}>Female</option>
                                        </Form.Select>
                                    </Form.Group>
                                    <Row>
                                        <Col xs={12} xl={3}>
                                            <img src="signup-page/placeholder.png" alt="" />
                                        </Col>
                                        <Col xs={12} xl={9}>
                                            <Form.Group className="mb-4 d-flex flex-wrap align-items-center w-100 gap-2" controlId="formImage">
                                                <Form.Label className='w-100'>Please upload square image, size less than 800 kb</Form.Label>
                                                <Form.Control className="signup-control image-control p-3" type="file" />
                                            </Form.Group>
                                        </Col>
                                    </Row>
                                    <Form.Group className="mb-4 d-flex flex-wrap align-items-center w-100 gap-2" controlId="formPassword">
                                        <Row className="w-100 g-0 justify-content-between">
                                            <Col xs={12} lg={6} className="password-col">
                                                <Form.Label className='w-100'>Password</Form.Label>
                                                <Form.Control required className="w-100 signup-control p-3" type="password" placeholder="Create Password"
                                                    onInput={(e) => setFormData(
                                                        {
                                                            ...formData,
                                                            "pass": {
                                                                ...formData.pass,
                                                                "value": e.target.value
                                                            }
                                                        }
                                                    )}
                                                    value={formData.pass.value} />
                                            </Col>
                                            <Col xs={12} lg={6} className="password-col">
                                                <Form.Label className='w-100'>Confirm Password</Form.Label>
                                                <Form.Control required className="w-100 signup-control p-3" type="password" placeholder="Confirm Password"
                                                    onInput={(e) => setConfirmPass(e.target.value)}
                                                    value={confirmPass} />
                                            </Col>
                                        </Row>
                                        {formData && (
                                            <>
                                                <Row>
                                                    <Col xs={12}>
                                                        {isPassMatched === false && (
                                                            <div className=" d-flex justify-content-center align-items-center bg-danger p-3 rounded"><MdDangerous className="me-3 vertical-align-middle" /> <span>Passwords Are Not Matched</span></div>
                                                        )}
                                                        {isPassMatched === true && (
                                                            <div className="d-flex justify-content-center align-items-center bg-success p-3 rounded"><FaRegCheckCircle className="me-3 vertical-align-middle" /> <span>Passwords Matched</span></div>
                                                        )}
                                                    </Col>
                                                </Row>
                                            </>
                                        )}

                                    </Form.Group>
                                    <Row>
                                        <Col xs={12} lg={9} className="my-auto h-auto">
                                            <Form.Check type="checkbox" required label="I Agree with all of your Terms & Conditions" className='chk-box' />
                                        </Col>
                                        <Col xs={12} lg={3}>
                                            <Button className="d-inline-block signup-btn p-2" type="submit"
                                                disabled={
                                                    !formData.pass?.value ||
                                                    !formData.name?.value ||
                                                    !formData.mail?.value ||
                                                    !isPassMatched ||
                                                    !confirmPass ||
                                                    loading
                                                }>
                                                {loading ? <i>Signing Up</i> : "Create Account"} <FaLongArrowAltRight className='arrow' />
                                            </Button>
                                        </Col>
                                    </Row>
                                    <Row>
                                        <Col xs={12}>
                                            {(error ? <Col xs={12} className="bg-danger p-2 text-white mt-5 server-error"> Error: <div>{error}</div> </Col> : "")}
                                        </Col>
                                    </Row>

                                </Form>
                                <div className='d-flex justify-content-center align-items-center gap-2 mt-5 mb-3 w-75 mx-auto'>
                                    <span className='flex-grow-1 s-1'></span>
                                    <span className='text-center'>SIGN UP WITH</span>
                                    <span className='flex-grow-1 s-3'></span>
                                </div>

                                <div className='login-with w-75 mx-auto mb-5'>
                                    <Link className="btn-container d-flex align-items-center text-decoration-none">
                                        <span className='icon-container'>
                                            <img src="login-page/google.png" alt="Google" />
                                        </span>
                                        <span className='btn-text mx-auto'>Google</span>
                                    </Link>

                                    <Link className="btn-container d-flex align-items-center text-decoration-none">
                                        <span className='icon-container'>
                                            <img src="login-page/facebook.png" alt="Facebook" />
                                        </span>
                                        <span className='btn-text mx-auto'>Facebook</span>
                                    </Link>

                                    <Link className="btn-container d-flex align-items-center text-decoration-none">
                                        <span className='icon-container'>
                                            <img src="login-page/apple.png" alt="Apple" />
                                        </span>
                                        <span className='btn-text mx-auto'>Apple</span>
                                    </Link>
                                </div>
                            </Col>
                        </Row>
                    </Col>
                </Row>
                {showToast && (
                    <ToastContainer position="bottom-end" className="p-3" style={{
                        zIndex: 9999,
                        position: 'fixed',
                        bottom: '1rem',
                        right: '1rem'
                    }}>
                        <Toast bg="success" onClose={() => setShowToast(false)} show={showToast} delay={10000} autohide>
                            <Toast.Header>
                                <strong className="me-auto">Registration Succeeded</strong>
                            </Toast.Header>
                            <Toast.Body className="text-white">
                                {`${name} Thank you for registering! Please check your email inbox to confirm your account.`}
                            </Toast.Body>
                        </Toast>
                    </ToastContainer>
                )}
            </Container >
        </>
    )
}
export default SignupForm