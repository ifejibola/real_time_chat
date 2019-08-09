import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import * as serviceWorker from './serviceWorker';
import {Route, BrowserRouter as Router} from 'react-router-dom'
import Login from './login/Login';
import SignUp from './signup/SignUp';
import DashBoard from './dashboard/dashboard';

const firebase = require('firebase');
require('firebase/firestore');

//Initialize fire base
firebase.initializeApp({
    apiKey: "AIzaSyBQqQIeiCiCzE2YPhWuBKtR5hle6l2vwyw",
    authDomain: "real-time-53015.firebaseapp.com",
    databaseURL: "https://real-time-53015.firebaseio.com",
    projectId: "real-time-53015",
    storageBucket: "real-time-53015.appspot.com",
    messagingSenderId: "689937343588",
    appId: "1:689937343588:web:810d3912aa2066ef"
});

const routing = (
    <Router>
        <div id='routing-container'>
            <Route path='/login' component={Login}>

            </Route>
            <Route path='/signup' component={SignUp}>

            </Route>
            <Route path='/dashboard' component={DashBoard}>

            </Route>
        </div>
    </Router>
)
ReactDOM.render(routing, document.getElementById('root'));

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.unregister();
