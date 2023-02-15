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
// import { ModalProvider } from 'ui-component/modal';

// ===========================|| APP ||=========================== //

const App = () => {
  const customization = useSelector((state) => state.customization);

  return (
    <KeycloakProvider>
      {/* <ModalProvider> */}
      <StyledEngineProvider injectFirst>
        <ThemeProvider theme={themes(customization)}>
          <CssBaseline />
          <NavigationScroll>
            <Routes />
          </NavigationScroll>
        </ThemeProvider>
      </StyledEngineProvider>
      {/* </ModalProvider> */}
    </KeycloakProvider>
  );
};

export default App;
