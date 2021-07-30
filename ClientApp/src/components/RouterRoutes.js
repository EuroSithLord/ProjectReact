import React from 'react';
import { Route, Redirect } from 'react-router';

export const PrivateRoute = ({component: Component, isLoggedIn, ...rest}) => {
    return(
        <Route {...rest} render={ props => (
            isLoggedIn ? <Component {...props} /> :
            <Redirect to="/" />
        )} />
    )
}

export const PublicRoute = ({component: Component, isLoggedIn, componentProps, ...rest}) => {
    return(
        <Route {...rest} render={ props => (
            !isLoggedIn && role === admin ? <Component isLoggedIn={isLoggedIn} {...props} /> :
            <Redirect to="/" />
        )} />
    )
}
