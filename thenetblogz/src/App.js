import React from 'react';
import 'bulma/css/bulma.css';
import { useAuth0 } from './contexts/auth0-context';
import Header from './component/Header';

function App() {
  // useContext so that all Auth0Context is available to use in App.js 
  const { isLoading, user, loginWithRedirect} = useAuth0();

  return (
    <>
    <Header />
      <div className="hero is-info is-fullheight">
        <div className="hero-body">
          <div className="container has-text-centered"> 
            {!isLoading && !user && (
            <>
              <h1>Please login</h1>
              <button onClick={loginWithRedirect} className="button is-danger">Login</button>
            </>
          )}
          </div>
        </div>
      </div>
    </>
  );
}

export default App;
