import React from 'react';
import 'bulma/css/bulma.css';
import { useAuth0 } from '../contexts/auth0-context';
import './Header.css';

export default function Header() {
    const { isLoading, user, loginWithRedirect, logout } = useAuth0();

    return(
        <header>
            <nav className="navbar is-dark">
                <div className="container">
                    <div className="navbar-menu is-active">
                        {/*logo*/}
                        <div className="navbar-brand">
                            <button className="navbar-item">
                                The Net Blogz
                            </button>
                        </div>

                        <div className="navbar-end">
                        {/* if there is no user, show the login button */}
                        {
                            !isLoading && !user && (
                            <button onClick={loginWithRedirect} className="navbar-item">
                                Login
                            </button>
                            )
                        }

                        {
                            !isLoading && user && (
                                <>
                                <button className="navbar-item">{user.name}</button>
                                <button onClick={() => logout ({ returnTo: window.location.origin})}
                                className="navbar-item"> Logout</button>           
                                </> 
                            )
                        }
                        </div>
                    </div>
                </div>
            </nav>
        </header>
    )
}