import React from 'react';
import { useNavigate } from 'react-router';
import { useDispatch } from 'react-redux';
import { ReactKeycloakProvider } from '@react-keycloak/web';
import CircularProgress from '@mui/material/CircularProgress';
import keycloakParam from '../keycloak';
import { loginWithToken } from 'store/actions/auth/loginActions';

const KeycloakProvider = ({ children }) => {
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const onInitError = () => {
    navigate('/error-sso');
  };
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
          onInitError();
        }
      }}
      onTokens={(res) => {
        dispatch(loginWithToken(res.token));
      }}
    >
      {children}
    </ReactKeycloakProvider>
  );
};

export default KeycloakProvider;
