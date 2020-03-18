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
        isAuthenticated: false    
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
            this.setState({ auth0Client, isLoading: false, isAuthenticated });
        } catch (err) {
            console.log("Error occurred: ", err)
        }
    }

    render() {
        const { isLoading, isAuthenticated } = this.state;
        const { children } = this.props;
        const configObject = { isLoading, isAuthenticated };

        return (
            <Auth0Context.Provider value={configObject}>
                {children}
            </Auth0Context.Provider>
        )
    }
};