import React from 'react';
import { useSelector } from 'react-redux';

import { ThemeProvider } from '@material-ui/core/styles';
import { CssBaseline, StyledEngineProvider } from '@material-ui/core';

// routing
import Routes from './routes';

// defaultTheme
import themes from './themes';

// project imports
import NavigationScroll from './layout/NavigationScroll';
import KeycloakProvider from './keycloak/KeycloakProvider';
import { ModalProvider } from 'ui-component/modal';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

// ===========================|| APP ||=========================== //

const App = () => {
  const customization = useSelector((state) => state.customization);

  return (
    <KeycloakProvider>
      <ModalProvider>
        <StyledEngineProvider injectFirst>
          <ThemeProvider theme={themes(customization)}>
            <CssBaseline />
            <NavigationScroll>
              <Routes />
              <ToastContainer
                position="top-right"
                autoClose={3000}
                hideProgressBar={false}
                newestOnTop={false}
                closeOnClick
                rtl={false}
                pauseOnFocusLoss
                draggable
                pauseOnHover
                theme="colored"
              />
            </NavigationScroll>
          </ThemeProvider>
        </StyledEngineProvider>
      </ModalProvider>
    </KeycloakProvider>
  );
};

export default App;
