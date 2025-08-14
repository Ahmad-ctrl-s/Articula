import { Container, Row, Col, Button, Modal, Form } from "react-bootstrap"
import Navigation from "../sub-components/navbar";
import Footer from '../sub-components/foot';
import { useEffect, useContext, useState, useMemo } from "react"
import { UserAuth } from '../main-pages/application-context/auth-context';
import '../assets/css/profile-style/profile.css'
import { useNavigate } from "react-router";
function MyAccount() {
    const navigate = useNavigate()
    const { setIsAuthorized, isAuthorized, formData } = useContext(UserAuth);
    const credentials = useMemo(() => btoa(`${formData.name}:${formData.pass}`), [formData]);

    const [userInformation, setUserInformation] = useState({})
    const [totalArticles, setTotalArticles] = useState()
    const [sessionToken, setSessionToken] = useState("")
    const [name, setName] = useState("")
    const [surName, setSurName] = useState("")
    const [profilePhotoImg, setProfilePhotoImg] = useState()
    const [previewUrl, setPreviewUrl] = useState()

    const [error, setError] = useState()
    const [showModalEdit, setShowModalEdit] = useState(false)
    const [showModalDelete, setShowModalDelete] = useState(false)

    const [givenPass, setGivenPass] = useState("")
    const [givenDelete, setGivenDelete] = useState("")

    useEffect(() => {
        if (!formData || !formData.name || !formData.pass || !formData.userID) {
            console.log("formData not available yet");
            return;
        }
        fetch(`https://tamkeen-dev.com/api/user/${formData.userID}?_format=json`, {
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
                console.log(data)
                setUserInformation(data)
            })
            .catch(err => {
                setError(err.message);
            })
            .finally(console.log("Fetch Ended"));
    }, [formData])

    useEffect(() => {
        if (!formData || !formData.name || !formData.pass || !formData.userID) {
            console.log("formData not available yet");
            return;
        }
        fetch(`https://tamkeen-dev.com/api/blogs-api-current-user`, {
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
                setTotalArticles(data.pager.total_items)
            })
            .catch(err => {
                setError(err.message);
            })
            .finally(console.log("Fetch Ended"));
    }, [formData])

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















    const postUserPhoto = (e) => {
        const file = e.target.files[0];
        const imageUrl = URL.createObjectURL(file);
        setPreviewUrl(imageUrl);
        if (!file || !sessionToken) return;

        file.arrayBuffer().then((fileBinary) => {
            fetch('https://tamkeen-dev.com/api/file/upload/user/user/user_picture?_format=json', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/octet-stream',
                    'X-CSRF-Token': sessionToken,
                    'Authorization': `Basic ${credentials}`,
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
                    setProfilePhotoImg(data.fid[0].value)
                })
                .catch(err => {
                    console.error("Error Uploading Image", err.message);
                    setError(err.message);
                })
                .finally(() => {
                    console.log("Profile Photo Upload Ended");
                });
        });

    }






    function editAccount(e) {
        e.preventDefault()
        fetch(`https://tamkeen-dev.com/api/user/${formData.userID}?_format=json`, {
            method: 'PATCH',
            headers: {
                'Authorization': `Basic ${credentials}`,
                'Content-Type': `application/json`,
                'Accept': `application/json`,
                'X-CSRF-Token': sessionToken,
            },
            body: JSON.stringify({
                "field_name": [
                    {
                        "value": name
                    }
                ],
                "field_surname": [
                    {
                        "value": surName
                    }
                ],
                "user_picture": [
                    {
                        "target_id": profilePhotoImg || 886
                    }
                ]
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
                window.location.reload()
            })
            .catch(err => {
                setError(err.message);
                console.log(err.message)
            })
            .finally(console.log("Fetch Ended"));
    }

    function deleteAccount(e) {
        e.preventDefault()
        fetch(`https://tamkeen-dev.com/api/user/${formData.userID}?_format=json`, {
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
                setIsAuthorized(false)
                localStorage.clear()
                navigate('/')
            })
            .catch(err => {
                setError(err.message);
                console.log(err.message)
            })
            .finally(console.log("Fetch Ended"));
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

    return (
        <>
            <header>
                <Navigation />
            </header>

            <main>
                <Container fluid>
                    <Row>
                        <Col xs={12} className="p-0">
                            <div className="background-img-container">
                                <img src="profile/farzane-mohammadi-8s6ny61hjfM-unsplash.jpg" alt="" />
                            </div>
                        </Col>
                    </Row>

                    <Row className="img-name-row parent">

                        <Col xs={12} xl={6}>
                            <div className="profile-pic-container">
                                <img className="rounded-circle" src={userInformation?.user_picture?.[0]?.url || "profile/placeholder.png"} alt="Personal Photo" />
                            </div>
                        </Col>
                        <Col xs={12} xl={6}>
                            <div className="user-name-container d-flex">
                                <div className="user-name-text my-auto article-summary">{userInformation?.field_name?.[0]?.value} {userInformation?.field_surname?.[0]?.value}</div>
                            </div>
                        </Col>
                        <Col xs={12}>
                            <div className="buttons-container d-flex flex-wrap gap-2 ms-auto">
                                <Button onClick={() => setShowModalEdit(true)}>Edit Account</Button>
                                <Button className="delete-btn" onClick={() => setShowModalDelete(true)}>Delete Account</Button>
                            </div>
                        </Col>

                    </Row>


                    <div className="info-row-container py-5 mt-5">
                        <Row className="info-row justify-content-start ">
                            <Col xs={12} xl={6}>
                                <div className="d-flex justify-content-center flex-column ms-auto">
                                    <div className="article-summary ms-0 user-info-text mb-3">UserName: <i>{userInformation?.name?.[0].value}</i></div>
                                    <div className="article-summary ms-0 user-info-text mb-3">Gender : <i>{(userInformation?.field_gender?.[0]?.target_id === 9 ? "Male" : userInformation?.field_gender?.[0]?.target_id === 10 ? "Female" : "Alien")}</i></div>
                                    <div className="article-summary ms-0 user-info-text mb-3">Mobile Number: <i>{userInformation?.field_mobile?.[0].value}</i> </div>
                                    <div className="article-summary ms-0 user-info-text mb-3">Location: <i>{userInformation?.timezone?.[0].value}</i></div>
                                </div>
                            </Col>
                            <Col xs={12} xl={6}>
                                <div className=" w-100 d-flex justify-content-center flex-column ms-auto">
                                    <div className="article-summary ms-0 user-info-text mb-3 ">Mail: <i>{userInformation?.mail?.[0].value}</i></div>
                                    <div className="article-summary ms-0 user-info-text mb-3">Account Creation Date: <i>{userInformation?.created?.[0].value.replace(/[^\d-].*/, "")}</i></div>
                                    <div className="article-summary ms-0 user-info-text mb-3">Last Login: <i>{userInformation?.login?.[0].value.replace(/[^\d-].*/, "")}</i></div>
                                    <div className="article-summary ms-0 user-info-text mb-3">Posted Articles: <i>{totalArticles !== 0 ? totalArticles : "No Posted Articles Yet"}</i></div>
                                </div>
                            </Col>
                        </Row>
                    </div>

                    <Modal show={showModalEdit} onHide={() => setShowModalEdit(false)}>
                        <Modal.Header closeButton>
                            <Modal.Title>Edit Profile Credintials</Modal.Title>
                        </Modal.Header>
                        <Modal.Body>

                            <Form onSubmit={(e) => editAccount(e)}>
                                <Form.Group className="mb-3">
                                    <Form.Label>First Name</Form.Label>
                                    <Form.Control required type="text" value={name} onInput={(e) => { setName(e.target.value) }} />
                                </Form.Group>
                                <Form.Group className="mb-3">
                                    <Form.Label>LastName</Form.Label>
                                    <Form.Control required type="text" value={surName} onInput={(e) => { setSurName(e.target.value) }} />
                                </Form.Group>
                                <Row>
                                    <Col xs={4}>
                                        <div className="upload-img-conteiner">
                                            <img src={previewUrl || "signup-page/placeholder.png"} alt="" />
                                        </div>

                                    </Col>

                                    <Col xs={8}>
                                        <Form.Group className="mb-5" controlId="formBasicFieldImage">
                                            <Form.Label>Profile Photo</Form.Label>
                                            <Form.Control className='p-3'
                                                type="file"
                                                placeholder="Upload Image"
                                                onChange={postUserPhoto}
                                            />
                                        </Form.Group>
                                    </Col>
                                </Row>
                                <Modal.Footer>
                                    <Button onClick={() => setShowModalEdit(false)}>
                                        Cancel
                                    </Button>
                                    <Button type="submit">
                                        Save Changes
                                    </Button>
                                </Modal.Footer>
                            </Form>

                        </Modal.Body>

                    </Modal>







                    <Modal show={showModalDelete} onHide={() => setShowModalDelete(false)}>
                        <Modal.Header closeButton>
                            <Modal.Title>Are you Shure You Want To Delete Your Account?</Modal.Title>
                        </Modal.Header>
                        <Modal.Body>

                            <Form onSubmit={(e) => deleteAccount(e)}>
                                <Form.Group className="mb-3">
                                    <Form.Label>Your Password</Form.Label>
                                    <Form.Control required type="text" value={givenPass} onInput={(e) => { setGivenPass(e.target.value) }} placeholder="Password" />
                                </Form.Group>

                                <Form.Group className="mb-3">
                                    <Form.Label>Fill <big className="delete-word">delete</big> In The Field Below</Form.Label>
                                    <Form.Control required type="text" value={givenDelete} onInput={(e) => { setGivenDelete(e.target.value) }} placeholder="delete" />
                                </Form.Group>

                                <Modal.Footer>
                                    <Button onClick={() => setShowModalDelete(false)}>
                                        Cancel
                                    </Button>

                                    <Button className="delete-btn" type="submit" disabled={
                                        givenPass != formData.pass ||
                                        givenDelete != "delete"
                                    } >
                                        Delete
                                    </Button>
                                </Modal.Footer>
                            </Form>

                        </Modal.Body>

                    </Modal>
















                </Container>

            </main >
            <footer>
                <Footer />
            </footer>
        </>
    )
}
export default MyAccount