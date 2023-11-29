import React, { lazy } from 'react';

import MainLayout from 'layout/MainLayout';
import Loadable from 'src/ui-component/Loadable';

const HCKaryawan = Loadable(lazy(() => import('views/human-capital/karyawan')));
const MasterJabatan = Loadable(lazy(() => import('views/master/jabatan')));
const MasterJabatanForm = Loadable(lazy(() => import('views/master/jabatan/jabatan-form')));
const MasterUnitBisnis = Loadable(lazy(() => import('views/master/unit-bisnis')));
const MasterUnitBisnisForm = Loadable(
  lazy(() => import('views/master/unit-bisnis/unit-bisnis-form'))
);
const MasterTempatTugas = Loadable(lazy(() => import('views/master/tempat-tugas')));
const MasterTempatTugasForm = Loadable(
  lazy(() => import('views/master/tempat-tugas/tempat-tugas-form'))
);
const MasterIuran = Loadable(lazy(() => import('views/master/iuran')));
const MasterIuranForm = Loadable(lazy(() => import('views/master/iuran/iuran-form')));
const MasterPajak = Loadable(lazy(() => import('views/master/pajak')));
const MasterPajakForm = Loadable(lazy(() => import('views/master/pajak/pajak-form')));
const MasterBank = Loadable(lazy(() => import('views/master/bank')));
const MasterBankForm = Loadable(lazy(() => import('views/master/bank/bank-form')));

const Template = Loadable(lazy(() => import('views/utilities/template/template')));

const UtilitiesRoutes = {
  path: '/',
  element: <MainLayout />,
  children: [
    // {
    //   path: '/utilities/templates',
    //   element: <Template />
    // },
    {
      path: '/utilities/master-jabatan',
      element: <MasterJabatan />
    },
    {
      path: '/utilities/master-jabatan/input',
      element: <MasterJabatanForm />
    },
    {
      path: '/utilities/master-unit-bisnis',
      element: <MasterUnitBisnis />
    },
    {
      path: '/utilities/master-unit-bisnis/input',
      element: <MasterUnitBisnisForm />
    },
    {
      path: '/utilities/master-tempat-tugas',
      element: <MasterTempatTugas />
    },
    {
      path: '/utilities/master-tempat-tugas/input',
      element: <MasterTempatTugasForm />
    },
    {
      path: '/utilities/master-Iuran',
      element: <MasterIuran />
    },
    {
      path: '/utilities/master-iuran/input',
      element: <MasterIuranForm />
    },
    {
      path: '/utilities/master-pajak',
      element: <MasterPajak />
    },
    {
      path: '/utilities/master-pajak/input',
      element: <MasterPajakForm />
    },
    {
      path: '/utilities/master-bank',
      element: <MasterBank />
    },
    {
      path: '/utilities/master-bank/input',
      element: <MasterBankForm />
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
