import React from 'react';
import { ReactKeycloakProvider } from '@react-keycloak/web';
import keycloakParam from '../keycloak';
// import { store } from '../../redux/storeConfig/store';
// import { loginWithToken } from '../../redux/actions/auth/loginActions';
// import { history } from '../../history';
// import Spinner from '../../components/@vuexy/spinner/Loading-spinner';

const KeycloakProvider = ({ children }) => {
  const onInitError = () => {
    // history.push('/error/sso');
    console.log('error ygy')
  };
  return (
    <ReactKeycloakProvider
      authClient={keycloakParam}
      // LoadingComponent={<Spinner />}
      initOptions={{
        onLoad: 'login-required',
        checkLoginIframe: true,
        silentCheckSsoRedirectUri:
          window.location.origin + '/silent-check-sso.html',
      }}
      onEvent={(event, error) => {
        if (error) {
          onInitError();
        }
      }}
      onTokens={(res) => {
        // store.dispatch(loginWithToken(res.token));
        // store.dispatch(ListClient());
      }}>
      {children}
    </ReactKeycloakProvider>
  );
};

export default KeycloakProvider;
