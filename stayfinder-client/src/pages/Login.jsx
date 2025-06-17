// src/pages/Login.jsx
import React, { useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import './Login.css';

const Login = () => {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [errorMessage, setErrorMessage] = useState('');
    const navigate = useNavigate();

    const handleLogin = async (e) => {
        e.preventDefault();

        try {
            const response = await axios.post('https://stayfinder-backend-2qaa.onrender.com/api/auth/login', { email, password });
            if (response.data && response.data.token) {
                localStorage.setItem('token', response.data.token);
                alert('Login successful!');
                navigate('/listings');
            } else {
                setErrorMessage('No token received from server');
            }
        } catch (error) {
            console.error('Error logging in:', error);
            if (error.response) {
                setErrorMessage(error.response.data.message || 'Something went wrong');
            } else {
                setErrorMessage('Network error, please try again');
            }
        }
    };

    return (
        <div className="login-container">
            <div className="login-card">
                <h2>Welcome to StayFinder 👋</h2>
                <p className="login-subtext">Please login to continue</p>

                <form onSubmit={handleLogin} className="login-form">
                    <input 
                        type="email"
                        placeholder="Email"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        required 
                    />
                    <input 
                        type="password"
                        placeholder="Password"
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                        required 
                    />
                    <button type="submit">Login</button>
                </form>

                {errorMessage && <p className="login-error">{errorMessage}</p>}

                <div className="login-links">
                    <p>Don't have an account? <Link to="/register">Sign up here</Link></p>
                    <p><a href="/forgot-password">Forgot password?</a></p>
                </div>
            </div>
        </div>
    );
};

export default Login;
