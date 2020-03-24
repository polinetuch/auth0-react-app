// src/contexts/auth0-context.js
import React, { Component, createContext } from 'react';
import createAuth0Client from '@auth0/auth0-spa-js';

// create the context
export const Auth0Context = createContext();

// create provider
export class Auth0Provider extends Component {
    state = { 
        auth0Client: null,
        isLoading: true,
        isAuthenticated: false,
        user: null    
    };
    config = {
        domain: process.env.REACT_APP_AUTH0_DOMAIN,
        client_id: process.env.REACT_APP_AUTH0_CLIENT_ID,
        redirect_uri: window.location.origin
    };

    componentDidMount() {
        this.initializeAuth0();
    }

    // initialize the auth0 library
    // initializeAuth0 = async => {
    //     const auth0Client = await createAuth0Client(this.config);
    //     this.setState({ auth0Client });
    // }

// using async and await to confirm authentication
    async initializeAuth0() {
        try {
            const auth0Client = await createAuth0Client(this.config);
            const isAuthenticated = await auth0Client.isAuthenticated();
            const user = isAuthenticated ? await auth0Client.getUser() : null;
            this.setState({ auth0Client, isLoading: false, isAuthenticated, user });
        } catch (err) {
            console.log("Error occurred: ", err)
        }
    }

    render() {
        const { auth0Client, isLoading, isAuthenticated, user } = this.state;
        const { children } = this.props;
        const configObject = { 
            isLoading, 
            isAuthenticated, 
            user,
            // LoginWithRedirect method is to pass value directly to child component
            loginWithRedirect: (...p) => auth0Client.loginWithRedirect(...p),

            // Grab token so we can use for API calls
            getTokenSilently: (...p) => auth0Client.getTokenSilently(...p),
            
            // Get information out of token
            getIdTokenClaims: (...p) => auth0Client.getIdTokenClaims(...p),

            // Call the logout and get redirected to Auth0 logout
            logout: (...p) => auth0Client.logout(...p)
        };

        return (
            <Auth0Context.Provider value={configObject}>
                {children}
            </Auth0Context.Provider>
        )
    }
};