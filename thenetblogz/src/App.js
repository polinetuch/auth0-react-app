import React, { useContext } from 'react';
import 'bulma/css/bulma.css';
import { Auth0Context } from './contexts/auth0-context';

function App() {
  // useContext so that all Auth0Context is available to use in App.js 
  const { isLoading, user, loginWithRedirect} = useContext(Auth0Context);
  return (
    <div className="App">
      <div className="hero is-info is-fullheight">
        <div className="hero-body">
          <div className="container has-text-centered"> 
            {!isLoading && !user && (
            <>
              <h1>Click here</h1>
              <button onClick={loginWithRedirect} className="button is-danger">Login</button>
            </>
          )}
          </div>
        </div>
      </div>
    </div>
  );
}

export default App;
