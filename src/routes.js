import React from 'react';
import { BrowserRouter, Switch, Route } from 'react-router-dom';

import Login from './pages/Login';
import SignUp from './pages/SignUp';
import ForgotPassword from './pages/ForgotPassword';


export default function Routes() {
    return (<BrowserRouter>
        <Switch>
            <Route path="/" exact component={Login} />
            <Route path="/signup" exact component={SignUp} />
            <Route path="/forgotpassword" exact component={ForgotPassword} />
        </Switch>
    </BrowserRouter>
    );
}