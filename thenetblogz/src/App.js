import React from 'react';
import 'bulma/css/bulma.css';
import { useAuth0 } from './contexts/auth0-context';
import Header from './component/Header';

function App() {
  // useContext so that all Auth0Context is available to use in App.js 
  const { isLoading, user, loginWithRedirect, logout} = useAuth0();
  console.log(user)
  return (
    <>
    <Header />
      <div className="hero is-info is-fullheight">
        <div className="hero-body">
          <div className="container has-text-centered"> 
            {!isLoading && !user && (
            <>
              <h1>Click here</h1>
              <button onClick={loginWithRedirect} className="button is-danger">Login</button>
            </>
          )}
          { !isLoading && user && (
            <>
              <h1>You are logged in</h1>
              <h3>Welcome {user.name}</h3>
              {user.picture && <img src={user.picture} alt="My Avatar"/>}
            </>
          )}

          <button onClick={() => logout({ returnTo: window.location.origin})}
          className="button is=small is-dark">Logout</button>
          </div>
        </div>
      </div>
    </>
  );
}

export default App;
