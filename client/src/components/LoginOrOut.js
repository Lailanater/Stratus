import React from 'react';
import { useAuth0 } from '../react-auth0-spa';
import Button from '@material-ui/core/Button';

const LoginOrOut = () => {
  const { isAuthenticated, loginWithRedirect, logout } = useAuth0();

  console.log('isAuthenticated:', isAuthenticated);

  return (
    <div>
      {!isAuthenticated && (
        <Button onClick={() => loginWithRedirect({})}>Log in</Button>
      )}

      {isAuthenticated && <Button onClick={() => logout()}>Log out</Button>}
    </div>
  );
};

export default LoginOrOut;
