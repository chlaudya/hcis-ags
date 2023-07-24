import React, { lazy } from 'react';

// project imports
import MainLayout from 'layout/MainLayout';
import Loadable from 'src/ui-component/Loadable';

// employee routing
const Profile = Loadable(lazy(() => import('views/employee/profile/Profile')));
const Kontrak = Loadable(lazy(() => import('views/employee/kontrak/Kontrak')));

// ===========================|| MAIN ROUTING ||=========================== //

const MainRoutesEmployee = {
  path: '/',
  element: <MainLayout />,
  children: [
    {
      path: '/',
      element: <Profile />
    },
    {
      path: '/kontrak',
      element: <Kontrak />
    }
  ]
};

export default MainRoutesEmployee;
