import React from 'react';
import { BrowserRouter, Switch, Route } from 'react-router-dom';

import Login from './pages/Login';
import SignUp from './pages/SignUp';
import ForgotPassword from './pages/ForgotPassword';
import Menu from './pages/Menu';
import Orders from './pages/Orders';
import Profile from './pages/Profile';
import Employess from './pages/Employess';
import Reports from './pages/Reports';
import Tables from './pages/Tables';


export default function Routes() {
    return (<BrowserRouter>
        <Switch>
            <Route path="/" exact component={Login} />
            <Route path="/signup" exact component={SignUp} />
            <Route path="/forgotpassword" exact component={ForgotPassword} />
            <Route path="/menu" exact component={Menu} />
            <Route path="/orders" exact component={Orders} />
            <Route path="/profile" exact component={Profile} />
            <Route path="/employess" exact component={Employess} />
            <Route path="/tables" exact component={Tables} />
            <Route path="/reports" exact component={Reports} />
        </Switch>
    </BrowserRouter>
    );
}