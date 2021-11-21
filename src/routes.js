import { AnimatePresence } from "framer-motion";
import React from 'react';
import { Route, Switch, useLocation } from 'react-router-dom';
import Employess from './pages/Employess';
import ForgotPassword from './pages/ForgotPassword';
import Login from './pages/Login';
import Menu from './pages/Menu';
import Orders from './pages/Orders';
import Profile from './pages/Profile';
import Reports from './pages/Reports';
import SignUp from './pages/SignUp';
import Tables from './pages/Tables';
import Welcome from './pages/Welcome';

export default function Routes() {
    const location = useLocation();
    return (

        <AnimatePresence exitBeforeEnter>
            <Switch location={location} key={location.pathname}>
                <Route path="/" exact component={Welcome} />
                <Route path="/login" exact component={Login} />
                <Route path="/signup" exact component={SignUp} />
                <Route path="/forgotpassword" exact component={ForgotPassword} />
                <Route path="/menu" exact component={Menu} />
                <Route path="/orders" exact component={Orders} />
                <Route path="/profile" exact component={Profile} />
                <Route path="/employess" exact component={Employess} />
                <Route path="/tables" exact component={Tables} />
                <Route path="/reports" exact component={Reports} />
            </Switch>
        </AnimatePresence>

    );
}