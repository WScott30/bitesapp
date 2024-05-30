import React from 'react';
import ReactDOM from 'react-dom';
import {Provider} from 'react-redux';
import App from './App'
import { GoogleOAuthProvider } from '@react-oauth/google';
import store from './store';

ReactDOM.render(
    <Provider store={store}>
    <GoogleOAuthProvider clientId="386932037035-k8v833noqjk7m4***********.apps.googleusercontent.com">
        <React.StrictMode>
            <App />
        </React.StrictMode>
    </GoogleOAuthProvider>,
    </Provider>,
    document.getElementById('root')
);