import React, { useState } from 'react';
import { FaTimes } from 'react-icons/fa';
import { Link, useHistory, useLocation, useNavigate } from 'react-router-dom';
import SignIn from './SignIn';
import './SignInForm.css';
import SignUp from './SignUp';


const SignInForm = () => {
    const [isSignUp, setSignUp] = useState(false);
    const handleResponse = (res) => {
    }
    return (
        <div className={`${isSignUp ? "signin-signup-container sign-up-mode" : "signin-signup-container"}`}>
            <Link to="/">
                <span className="pageCloseBtn"><FaTimes /></span>
            </Link>
            <div className="forms-container">
                <div className="signIn-singUp">
                    <SignIn handleResponse={handleResponse} />
                    <SignUp handleResponse={handleResponse} />
                </div>
            </div>
            <div className="panels-container">
                <div className="panel left-panel">
                    <div className="content">
                        <h3>JOIN US !</h3>
                        <p>Register on our website today and enjoy a variety of options and updates</p>
                        <button className="iBtn transparent" onClick={() => setSignUp(true)}>Sign Up</button>
                    </div>
                </div>
                <div className="panel right-panel">
                    <div className="content">
                        <h3>Are You Already One Of Us?</h3>
                        <p>If you are already registered on our website, all that remains is to connect and enjoy</p>
                        <button className="iBtn transparent" onClick={() => setSignUp(false)}>Sign In</button>
                    </div>

                </div>
            </div>
        </div>
    );
};

export default SignInForm;