// src/App.js
import React, {  } from 'react';
import { googleLogout, GoogleLogin } from '@react-oauth/google';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import NavigationComponent from './components/NavigationComponent';
import HeroComponent from './components/HeroComponent';
import LoginComponent from './components/LoginComponent';
import DashboardComponent from './components/DashboardComponent';
import RecipeDetailComponent from './components/RecipeDetailComponent';
import { useSelector, useDispatch } from 'react-redux';
import loginUser from './actions/authActions';
import { jwtDecode } from 'jwt-decode';

// const clientID = '630822064137-si5779dp2k60ed1u11bdk227e5aaok9o.apps.googleusercontent.com'

function App() {
    const user = useSelector(state => state.auth.user);
    const dispatch = useDispatch()
    console.log(user);
    // const login = useGoogleLogin({
    //     onSuccess: (codeResponse) => dispatch({ type: 'LOGIN_USER', payload: codeResponse }),
    //     onError: (error) => console.log('Login Failed:', error)
    // });

    // useEffect(() => {
    //     if (user) {
    //         axios
    //             .get(`https://www.googleapis.com/oauth2/v1/userinfo?access_token=${user.access_token}`, {
    //                 headers: {
    //                     Authorization: `Bearer ${user.access_token}`,
    //                     Accept: 'application/json'
    //                 }
    //             })
    //             .then((res) => {
    //                 setProfile(res.data);
    //             })
    //             .catch((err) => console.log(err));
    //     }
    // }, [user]);

    const logOut = () => {
        googleLogout();
        dispatch({ type: 'LOGOUT_USER' });
        
    };

    const responseMessage = (response) => {
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

                <div style={{ marginTop: '20px', textAlign: 'center' }}>
                    {user ? (
                        <div>
                            <img src={user.profile.picture} alt="user img" />
                            <h3>User Logged in</h3>
                            <p>Name: {user.profile.name}</p>
                            <p>Email Address: {user.profile.email}</p>
                            <br />
                            <br />
                            <button onClick={logOut}>Log out</button>
                        </div>
                    ) : (
                        <div>
                            
                            <GoogleLogin onSuccess={responseMessage} onError={errorMessage} />
                        </div>
                    )}
                </div>
            </div>
        </Router>
        
    );
}

export default App;
