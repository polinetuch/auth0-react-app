import React, { useContext } from 'react';
import 'bulma/css/bulma.css';
import { Auth0Context } from './contexts/auth0-context';

function App() {
  const auth0 = useContext(Auth0Context);
  return (
    <div className="App">
      <div className="hero is-info is-fullheight">
        <div className="hero-body">
          <div className="container has-text-centered">
            {auth0.message}
          </div>
        </div>
      </div>
    </div>
  );
}

export default App;
