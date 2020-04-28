// src/contexts/auth0-context.js
import React, { Component, createContext, useContext } from 'react';
import createAuth0Client from '@auth0/auth0-spa-js';

// create the context
export const Auth0Context = createContext();

export const useAuth0 = () => useContext(Auth0Context);

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

    // using async and await to confirm authentication
    async initializeAuth0() {
        const auth0Client = await createAuth0Client(this.config);
        this.setState({ auth0Client });

        // Check to see if they have been redirected after login
        if (window.location.search.includes('code=')) {
            return this.handleRedirectCallback();
        }

        const isAuthenticated = await auth0Client.isAuthenticated();
        const user = isAuthenticated ? await auth0Client.getUser() : null;
        this.setState({ isLoading: false, isAuthenticated, user });
    }

    // Handle the authentication callback
    async handleRedirectCallback() {
        this.setState({ isLoading: true });

        await this.state.auth0Client.handleRedirectCallback();
        const user = await this.state.auth0Client.getUser();

        this.setState({ user, isAuthenticated: true, isLoading: false});
        window.history.replaceState({}, document.title, window.location.pathname);
    };

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
            logout: (...p) => auth0Client.logout(...p),
        };

        return (
            <Auth0Context.Provider value={configObject}>
                {children}
            </Auth0Context.Provider>
        )
    }
};