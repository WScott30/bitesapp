import React from 'react';
import { GoogleLogin } from '@react-oauth/google';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import NavigationComponent from './components/NavigationComponent';
import HeroComponent from './components/HeroComponent';
import LoginComponent from './components/LoginComponent';
import DashboardComponent from './components/DashboardComponent';
import RecipeDetailComponent from './components/RecipeDetailComponent';

function App() {
    const responseMessage = (response) => {
        console.log(response);
    };
    
    const errorMessage = (error) => {
        console.log(error);
    };

    return (
        <Router>
            <div>
                <NavigationComponent />
                <Routes>
                    <Route exact path="/" element={<HeroComponent />} />
                    <Route path="/login" element={<LoginComponent />} />
                    <Route path="/dashboard" element={<DashboardComponent />} />
                    <Route path="/recipe/:id" element={<RecipeDetailComponent />} />
                    {/* Add more routes as needed */}
                </Routes>
                {/* Place the GoogleLogin component wherever it fits your UI */}
                <div style={{ marginTop: '20px', textAlign: 'center' }}>
                    <h2>Login for more features</h2>
                    <GoogleLogin onSuccess={responseMessage} onError={errorMessage} />
                </div>
            </div>
        </Router>
    );
}

export default App;
