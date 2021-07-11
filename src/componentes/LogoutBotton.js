import React from 'react';
import { useAuth0 } from '@auth0/auth0-react';
import './LogoutBotton.css'

function LogoutButton() {
  const {
    isAuthenticated,
    logout,
  } = useAuth0();

  return isAuthenticated && (
    <button className='logout' onClick={() => {
      logout({ returnTo: window.location.origin });
    }}>Log out</button>
  );
}

export default LogoutButton;