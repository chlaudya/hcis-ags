import React, { lazy } from 'react';

// project imports
import MainLayout from 'layout/MainLayout';
import Loadable from 'src/ui-component/Loadable';

// dashboard routing
const Dashboard = Loadable(lazy(() => import('views/dashboard')));

// ===========================|| MAIN ROUTING ||=========================== //

const MainRoutes = {
  path: '/',
  element: <MainLayout />,
  children: [
    {
      path: '/',
      element: <Dashboard />
    }
  ]
};

export default MainRoutes;
