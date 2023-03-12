import React, { lazy } from 'react';
import Loadable from 'src/ui-component/Loadable';

// project routing
const ErrorSso = Loadable(lazy(() => import('views/error/ErrorSso')));

// ===========================|| ERROR ROUTING ||=========================== //

const ErrorRoutes = {
  path: '/error-sso',
  element: <ErrorSso />
};

export default ErrorRoutes;
