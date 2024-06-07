// src/App.js
import React, { useState, useEffect } from 'react';
import { googleLogout, useGoogleLogin, GoogleLogin, GoogleOAuthProvider } from '@react-oauth/google';
import axios from 'axios';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import NavigationComponent from './components/NavigationComponent';
import HeroComponent from './components/HeroComponent';
import LoginComponent from './components/LoginComponent';
import DashboardComponent from './components/DashboardComponent';
import RecipeDetailComponent from './components/RecipeDetailComponent';

const clientID = '630822064137-si5779dp2k60ed1u11bdk227e5aaok9o.apps.googleusercontent.com'

function App() {
    const [user, setUser] = useState(null);
    const [profile, setProfile] = useState(null);

    const login = useGoogleLogin({
        onSuccess: (codeResponse) => setUser(codeResponse),
        onError: (error) => console.log('Login Failed:', error)
    });

    useEffect(() => {
        if (user) {
            axios
                .get(`https://www.googleapis.com/oauth2/v1/userinfo?access_token=${user.access_token}`, {
                    headers: {
                        Authorization: `Bearer ${user.access_token}`,
                        Accept: 'application/json'
                    }
                })
                .then((res) => {
                    setProfile(res.data);
                })
                .catch((err) => console.log(err));
        }
    }, [user]);

    const logOut = () => {
        googleLogout();
        setProfile(null);
    };

    const responseMessage = (response) => {
        console.log(response);
    };

    const errorMessage = (error) => {
        console.log(error);
    };

    return (
        <GoogleOAuthProvider clientId={clientID}>
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

                <div style={{ marginTop: '20px', textAlign: 'center' }}>
                    <h2>Login for more features</h2>
                    {profile ? (
                        <div>
                            <img src={profile.picture} alt="user img" />
                            <h3>User Logged in</h3>
                            <p>Name: {profile.name}</p>
                            <p>Email Address: {profile.email}</p>
                            <br />
                            <br />
                            <button onClick={logOut}>Log out</button>
                        </div>
                    ) : (
                        <div>
                            <button onClick={login}>Sign in with Google 🚀 </button>
                            <GoogleLogin onSuccess={responseMessage} onError={errorMessage} />
                        </div>
                    )}
                </div>
            </div>
        </Router>
        </GoogleOAuthProvider>
    );
}

export default App;
