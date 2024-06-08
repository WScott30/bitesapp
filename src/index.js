import React from 'react';
import ReactDOM from 'react-dom';
import {Provider} from 'react-redux';
import App from './App'
import { GoogleOAuthProvider } from '@react-oauth/google';
import store from './store';

const clientID = '630822064137-si5779dp2k60ed1u11bdk227e5aaok9o.apps.googleusercontent.com'

ReactDOM.render(
    <Provider store={store}>
    <GoogleOAuthProvider clientId={clientID}>
        <React.StrictMode>
            <App />
        </React.StrictMode>
    </GoogleOAuthProvider>,
    </Provider>,
    document.getElementById('root')
);