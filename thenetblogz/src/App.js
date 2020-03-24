import React, { useContext } from 'react';
import 'bulma/css/bulma.css';
import { Auth0Context } from './contexts/auth0-context';

function App() {
  // useContext so that all Auth0Context is available to use in App.js 
  const auth0 = useContext(Auth0Context);
  return (
    <div className="App">
      <div className="hero is-info is-fullheight">
        <div className="hero-body">
          <h1>Login First</h1>
          <button onClick={auth0.loginWithRedirect} className="button is-danger"> Login</button>
          <div className="container has-text-centered">
            {auth0.message}
          </div>
        </div>
      </div>
    </div>
  );
}

export default App;
