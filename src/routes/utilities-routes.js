import React, { lazy } from 'react';

import MainLayout from 'layout/MainLayout';
import Loadable from 'ui-component/Loadable';

const HCKaryawan = Loadable(lazy(() => import('views/human-capital/karyawan')));
const HCKontrak = Loadable(lazy(() => import('views/human-capital/kontrak')));

const Jabatan = Loadable(lazy(() => import('views/master/jabatan')));

const UtilitiesRoutes = {
  path: '/',
  element: <MainLayout />,
  children: [
    {
      path: '/utilities/templates',
      element: <HCKaryawan />
    },
    {
      path: '/utilities/master-jabatan',
      element: <Jabatan />
    },
    {
      path: '/utilities/master-unit-bisnis',
      element: <HCKaryawan />
    },
    {
      path: '/utilities/master-tempat-tugas',
      element: <HCKaryawan />
    },
    {
      path: '/utilities/master-tunjangan',
      element: <HCKaryawan />
    },
    {
      path: '/utilities/master-iuran',
      element: <HCKaryawan />
    },
    {
      path: '/utilities/master-pajak',
      element: <HCKaryawan />
    },
    {
      path: '/utilities/master-simpwajib',
      element: <HCKaryawan />
    },
    {
      path: '/utilities/user-manajemen-userdata',
      element: <HCKaryawan />
    },
    {
      path: '/utilities/user-manajemen-group-akses',
      element: <HCKaryawan />
    },
    {
      path: '/utilities/user-manajemen-hak-akses',
      element: <HCKaryawan />
    }
  ]
};

export default UtilitiesRoutes;
