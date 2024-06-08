import React from 'react';
import { Button } from '@mui/material';
import { useNavigate } from 'react-router-dom';
import '../styles/HeroComponent.scss';
import { useSelector } from 'react-redux';
const HeroComponent = () => {
    const user = useSelector(state => state.auth.user);
    const navigate = useNavigate();
    const handleGetStarted = () => {
        if (user) {
            navigate('/dashboard');
            return;
        }
            navigate('/login');
    };
    return (
        <div className="hero-container">
        <div className="hero-content">
        <h1>Welcome to Bites App</h1>
        <p>Discover delicious recipes tailored just for you.</p>
        <Button
        variant="contained"
        color="primary"
        onClick={handleGetStarted}
        className="hero-button"
        >
            Get Started
        </Button>
    </div>
</div>
);
};
export default HeroComponent;