import React from 'react';
import { useSelector } from 'react-redux';
import dotenv from 'dotenv';

import { ThemeProvider } from '@material-ui/core/styles';
import { CssBaseline, StyledEngineProvider } from '@material-ui/core';

// routing
import Routes from './routes';

// defaultTheme
import themes from './themes';

// project imports
import NavigationScroll from './layout/NavigationScroll';
import KeycloakProvider from './keycloak/KeycloakProvider';
import { ModalProvider } from 'src/ui-component/modal';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

// ===========================|| APP ||=========================== //

const App = () => {
  const customization = useSelector((state) => state.customization);
  dotenv.config();

  return (
    <StyledEngineProvider injectFirst>
      <ThemeProvider theme={themes(customization)}>
        <CssBaseline />
        <KeycloakProvider>
          <NavigationScroll>
            <ModalProvider>
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
            </ModalProvider>
          </NavigationScroll>
        </KeycloakProvider>
      </ThemeProvider>
    </StyledEngineProvider>
  );
};

export default App;
