import React from 'react';
import { useNavigate } from 'react-router';
import { ReactKeycloakProvider } from '@react-keycloak/web';
import CircularProgress from '@mui/material/CircularProgress';
import keycloakParam from '../keycloak';

const KeycloakProvider = ({ children }) => {
  const navigate = useNavigate();

  return (
    <ReactKeycloakProvider
      authClient={keycloakParam}
      LoadingComponent={
        <div
          style={{
            display: 'flex',
            justifyContent: 'center',
            alignItems: 'center',
            height: '100vh'
          }}
        >
          <CircularProgress />
        </div>
      }
      initOptions={{
        onLoad: 'login-required',
        checkLoginIframe: true,
        silentCheckSsoRedirectUri: window.location.origin + '/silent-check-sso.html'
      }}
      onEvent={(_event, error) => {
        if (error) {
          navigate('/error-sso');
        }
      }}
      onTokens={(res) => {
        console.log(res);
      }}
    >
      {children}
    </ReactKeycloakProvider>
  );
};

export default KeycloakProvider;
