// src/components/LoginComponent.js
import React from 'react';
import { GoogleLogin } from '@react-oauth/google';
import { useDispatch } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import {jwtDecode} from 'jwt-decode';
import { loginUser } from '../actions/authActions';
import '../styles/LoginComponent.scss';

const LoginComponent = () => {
    const dispatch = useDispatch();
    const navigate = useNavigate();

    const handleLoginSuccess = (response) => {
        console.log('Login Success:', response);
        const decoded = jwtDecode(response.credential); // Use the correct function name
        const profile = {
            name: decoded.name,
            email: decoded.email,
            picture: decoded.picture,
        };
        const token = response.credential;
        console.log(decoded);
        // Dispatch login action with user data
        dispatch(loginUser({ profile, token }));
        navigate('/dashboard');
    };

    const handleLoginFailure = (error) => {
        console.error('Login Failed:', error);
    };

    return (
        <div className="login-container">
            <h1>Login to Continue</h1>
            <GoogleLogin
                onSuccess={handleLoginSuccess}
                onError={handleLoginFailure}
                useOneTap
                className="login-button"
            />
        </div>
    );
};

export default LoginComponent;
