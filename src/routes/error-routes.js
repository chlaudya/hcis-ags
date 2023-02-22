import React, { lazy } from 'react';

// project imports
import Loadable from 'ui-component/Loadable';

// project routing
const ErrorSso = Loadable(lazy(() => import('views/error/ErrorSso')));

// ===========================|| ERROR ROUTING ||=========================== //

const ErrorRoutes = {
  path: '/error-sso',
  element: <ErrorSso />
};

export default ErrorRoutes;
