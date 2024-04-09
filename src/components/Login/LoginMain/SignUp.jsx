import React, { useState } from 'react';
import { FaCheck, FaEnvelope, FaLock, FaTimes, FaUser, FaUserTie, FaCalendar } from 'react-icons/fa';
import { createAccountWithEmail } from './LoginManager';
import Spinner from 'react-bootstrap/Spinner'
import swal from 'sweetalert';
import axios from 'axios';


const SignUp = ({ handleResponse }) => {
    const baseUrl = process.env.REACT_APP_BASE_URL;
    const [error, setError] = useState({})
    const [loading, setLoading] = useState(false);
    const [user, setUser] = useState({})
    const [role, setRole] = useState('')
    const [passwordValidation, setPasswordValidation] = useState({
        carLength: false,
        specailChar: false,
        upperLowerCase: false,
        numeric: false
    })
    const [emailError, setEmailError] = useState({
        emailError: false
    })

    const handleEmailError = (name, value) => {
        if (name === 'email') {
            setEmailError({
                emailError: /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(value)
            })
        }
    }
    const handleValidation = (name, value) => {
        if (name === 'password') {
            setPasswordValidation({
                carLength: (value.length > 8),
                specailChar: /[ `!@#$%^&*()_+\-=[\]{};':"\\|,.<>/?~]/.test(value),
                upperLowerCase: /^(?=.*[a-z])(?=.*[A-Z])/.test(value),
                numeric: /^(?=.*\d)/.test(value),
            })
        }
    }

    const handleOnChange = (e) => {
        let { name, value } = e.target;
        handleValidation(name, value)
        handleEmailError(name, value)
        let isPassValid = true;

        if (value === 'email') {
            isPassValid = /\S+@\S+\.\S+/.test(value);
        }
        if (value === 'password') {
            isPassValid = ((value.length > 8)
                && /[ `!@#$%^&*()_+\-=[\]{};':"\\|,.<>/?~]/.test(value)
                && /^(?=.*[a-z])(?=.*[A-Z])/.test(value)
                && /^(?=.*\d)/.test(value))
        }
        if (isPassValid) {
            const newPass = { ...user };
            newPass[name] = value
            setUser(newPass)
        }
    }
    const handleOnSubmit = async(e) => {
        e.preventDefault();
        setLoading(true);
        const registerInfo = {
            username : user.displayName,
            email: user.email,
            password: user.password,
            isDoctor:role=="therapist",
            calendlyUser: user.calendlyUser || null,
        }

        console.log(registerInfo)
        try {
            const data = await axios.post(`${baseUrl}/auth/register`, registerInfo)
            setLoading(false);
            swal({
                icon:'success',
                text:'Successfully Sign Up',
                timer: 2000
            })
        }

        catch(err){
            setLoading(false);
            setError(err);
        }
    }

    return (
        <form className="sign-up-form" onSubmit={handleOnSubmit}>
            <h2 className="title">Sign Up</h2>

            <div className="input-field">
                <span className="fIcon"><FaUser /></span>
                <input placeholder="Name" name="displayName" type="text" onChange={(e) => handleOnChange(e)} />
            </div>

            <div className="input-field">
                <span className="fIcon"><FaEnvelope /></span>
                <input placeholder="Email" name="email" type="email" onChange={(e) => handleOnChange(e)} />
            </div>

            <div className="input-field">
                <span className="fIcon"><FaLock /></span>
                <input type="password" name="password" placeholder="password" onChange={(e) => handleOnChange(e)} />
            </div>

            <div className="input-field">
        <span className="fIcon"><FaUserTie /></span>
        <select style={{appearance: "none",
    border: "none",
    background: "transparent"}} name="role" value={role} onChange={(e) => setRole(e.target.value)}>
            <option value="">Select role...</option>
            <option value="therapist">Therapist</option>
            <option value="patient">Patient</option>
        </select>

                
    </div>

            
            {role === 'therapist' && (
        <div className="input-field">
            <span className="fIcon"><FaCalendar /></span>
            <input type="text" name="calendlyUser" placeholder="Calendly User" onChange={(e) => handleOnChange(e)} />
        </div>
    )}

            {error.length && <h6 className="text-danger text-center">{error}</h6>}
            <button type="submit"
                className="btn btn-primary btn-block mt-2 iBtn"
                disabled={
                    passwordValidation.carLength && passwordValidation.numeric && passwordValidation.upperLowerCase && passwordValidation.specailChar && emailError.emailError ? "" : true
                }
            >
                {loading ? <Spinner animation="border" variant="info" /> : "Sign Up"}
            </button>

            <div className="password-validatity mx-auto">

                <div style={emailError.emailError ? { color: "green" } : { color: "red" }}>
                    <p>{passwordValidation.numeric ? <FaCheck /> : <FaTimes />}
                        Must Have Valid Email.</p>
                </div>

                <div style={passwordValidation.carLength ? { color: "green" } : { color: "red" }}>
                    <p>{passwordValidation.numeric ? <FaCheck /> : <FaTimes />}
                        Password Must Have atlast 8 character.</p>
                </div>

                <div style={passwordValidation.specailChar ? { color: "green" } : { color: "red" }}>
                    <p>{passwordValidation.numeric ? <FaCheck /> : <FaTimes />}
                        Password Must Have a special cracter.</p>
                </div>

                <div style={passwordValidation.upperLowerCase ? { color: "green" } : { color: "red" }}>
                    <p>{passwordValidation.numeric ? <FaCheck /> : <FaTimes />}
                        Password Must Have uppercase and lower case.</p>
                </div>

                <div style={passwordValidation.numeric ? { color: "green" } : { color: "red" }}>
                    <p>{passwordValidation.numeric ? <FaCheck /> : <FaTimes />}
                        Password Must Have Number.</p>
                </div>
            </div>
        </form>

    );
};

export default SignUp;