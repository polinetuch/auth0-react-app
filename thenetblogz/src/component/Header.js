import React from 'react';
import 'bulma/css/bulma.css';
import { useAuth0 } from './contexts/auth0-context';

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
                    </div>
                </div>
            </nav>
        </header>
    )
}