import React, { useState, useContext, useEffect } from 'react';
import './LoginPopup.css';
import { assets } from '../../assets/assets';
import { StoreContext } from '../../context/StoreContext';
import axios from 'axios';
import PropTypes from 'prop-types';

const LoginPopup = ({ setShowLogin }) => {
    const { url, setToken } = useContext(StoreContext);

    const [currState, setCurrState] = useState("Login");
    const [data, setData] = useState({ name: "", email: "", password: "" });
    const [termsAccepted, setTermsAccepted] = useState(false);

    const onChangeHandler = (event) => {
        const { name, value } = event.target;
        setData((data) => ({ ...data, [name]: value }));
    };

    const onCheckboxChange = () => {
        setTermsAccepted(!termsAccepted);
    };

    const onLogin = async (event) => {
        event.preventDefault();
        if (!termsAccepted) {
            alert("You must agree to the terms of use and privacy policy");
            return;
        }

        let newUrl = url;
        console.log(url);
        newUrl += currState === "Login" ? "/api/auth/user/login" : "/api/auth/user/register";

        try {
            const response = await axios.post(newUrl, data);
            if (response.data && response.data.success) {
                setToken(response.data.token);
                localStorage.setItem("token", response.data.token);
                setShowLogin(false);
            } else {
                alert(response.data?.message || "An error occurred");
            }
        } catch (error) {
            alert(error.response?.data?.message || "Network error. Please try again.");
        }
    };

    useEffect(() => {
        console.log(data);
    }, [data]);

    return (
        <div className='login-popup'>
            <form onSubmit={onLogin} className="login-popup-container">
                <div className="login-popup-title">
                    <h2>{currState}</h2>
                    <img onClick={() => setShowLogin(false)} src={assets.cross_icon || "default_icon.png"} alt="Close" />
                </div>
                <div className="login-popup-inputs">
                    {currState === "Login" ? null : <input name='name' onChange={onChangeHandler} value={data.name} type="text" placeholder='Your Name' required />}
                    <input name='email' onChange={onChangeHandler} value={data.email} type="email" placeholder='Your Email' required />
                    <input name='password' onChange={onChangeHandler} value={data.password} type="password" placeholder='Password' required />
                </div>
                <button type='submit'>{currState === "Sign Up" ? "Create Account" : "Login"}</button>
                <div className="login-popup-condition">
                    <input type="checkbox" checked={termsAccepted} onChange={onCheckboxChange} />
                    <p>By continuing, I agree to the terms of use & privacy policy</p>
                </div>
                {currState === "Login"
                    ? <p>Create a new account? <span onClick={() => setCurrState("Sign Up")}>Click here</span></p>
                    : <p>Already have an account? <span onClick={() => setCurrState("Login")}>Login here</span></p>
                }
            </form>
        </div>
    );
};

LoginPopup.propTypes = {
    setShowLogin: PropTypes.func.isRequired,
};

export default LoginPopup;
