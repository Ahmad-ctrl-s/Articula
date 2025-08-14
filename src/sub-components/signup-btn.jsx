import {Link} from 'react-router';
import Button from 'react-bootstrap/Button';
import { Navigate, useNavigate } from 'react-router-dom';
import '../assets/css/signup-btn.css'
function SignUpBtn () {
    const navigate = useNavigate()
    return (
        <>
            {/* <Link to='/signup'>
                <Button className="upbtn">Create Account</Button>
            </Link> */}
            <Button className="upbtn" onClick={() => navigate('/signup')}>Create Account</Button>
        </>
    )
}
export default SignUpBtn