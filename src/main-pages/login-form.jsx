import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';
import RegisterationBar from '../sub-components/regestration-bar';
import '../assets/css/login-form.css';
import { useState, useEffect, useContext } from 'react';
import { FaLongArrowAltRight } from "react-icons/fa";
import { FaRegCircleUser, FaKey } from "react-icons/fa6";
import { Link, useNavigate } from 'react-router-dom';
import { UserAuth } from './application-context/auth-context';

function LoginForm() {
    const [error, setError] = useState();
    const [loading, setLoading] = useState(false);
    const { setIsAuthorized, isAuthorized, formData, setFormData } = useContext(UserAuth);
    const [userInfo, setUserInfo] = useState({});
    const navi = useNavigate();

    const handleLoginForm = (event) => {
        event.preventDefault();
        setLoading(true);

        fetch('https://tamkeen-dev.com/api/user/login?_format=json', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({
                name: formData.name,
                pass: formData.pass,
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
            setUserInfo({
                username: data.current_user.name,
                userID: data.current_user.uid
            });

            localStorage.setItem('username', data.current_user.name);
            localStorage.setItem('userID', data.current_user.uid);
            localStorage.setItem('logout_token', data.logout_token);
            localStorage.setItem('csrf_token', data.csrf_token);
            localStorage.setItem('password', formData.pass);

            setIsAuthorized(true);
        })
        .catch(err => setError(err.message))
        .finally(() => setTimeout(() => setLoading(false), 2000));
    };

    useEffect(() => {
        const u = localStorage.getItem('username');
        const id = localStorage.getItem('userID');
        const logout = localStorage.getItem('logout_token');
        const csrf = localStorage.getItem('csrf_token');
        const pw = localStorage.getItem('password');

        if (u && id && logout && csrf && pw) {
            setIsAuthorized(true);
            setUserInfo({ username: u, userID: id });
            setFormData({ name: u, pass: pw, userID: id});
        }
    }, []);

    useEffect(() => {
        if (isAuthorized) navi('/Articles');
    }, [isAuthorized]);

    if (isAuthorized) return null;

    return (
        <>
            <RegisterationBar className='d-flex' />
            <div className="login-form-container">
                <img className='login-img' src="login-page/illustrations.png" alt="login" />
                <Form className='login-form' onSubmit={handleLoginForm}>
                    <div className="browse text-center mb-5">Sign in to your account</div>

                    <Form.Group className="mb-4 d-flex align-items-center w-100" controlId="formBasicEmail">
                        <Form.Label className='me-3'><FaRegCircleUser /></Form.Label>
                        <Form.Control required className='login-control p-3' type="text" placeholder="Username or email address"
                            onInput={(e) => setFormData({ ...formData, 'name': e.target.value })} />
                    </Form.Group>

                    <Form.Group className="mb-4 d-flex align-items-center w-100" controlId="formBasicPassword">
                        <Form.Label className='me-3'><FaKey /></Form.Label>
                        <Form.Control required className='login-control p-3' type="password" placeholder="Password"
                            onInput={(e) => setFormData({ ...formData, 'pass': e.target.value })} />
                    </Form.Group>

                    {error && <div className='text-danger fw-4 fs-3'>{error}</div>}

                    <div className="btn-chk-container d-flex justify-content-between align-items-center mb-4 w-100">
                        <Form.Check type="checkbox" label="Remember me" className='chk-box'/>
                        <Button type="submit">
                            {loading ? "Signing in..." : "Sign in"} <FaLongArrowAltRight className='arrow' />
                        </Button>
                    </div>

                    <div className='d-flex justify-content-center align-items-center gap-2 my-4 w-100'>
                        <span className='flex-grow-1 s-1'></span>
                        <span className='text-center'>SIGN IN WITH</span>
                        <span className='flex-grow-1 s-3'></span>
                    </div>

                    <div className='login-with'>
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
                </Form>
            </div>
        </>
    );
}

export default LoginForm;