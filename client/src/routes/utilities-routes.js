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

const UtilitiesRoutes = {
  path: '/',
  element: <MainLayout />,
  children: [
    {
      path: '/utilities/templates',
      element: <HCKaryawan />
    },
    {
      path: '/human-capital/master-jabatan',
      element: <MasterJabatan />
    },
    {
      path: '/human-capital/master-jabatan/input',
      element: <MasterJabatanForm />
    },
    {
      path: '/human-capital/master-unit-bisnis',
      element: <MasterUnitBisnis />
    },
    {
      path: '/human-capital/master-unit-bisnis/input',
      element: <MasterUnitBisnisForm />
    },
    {
      path: '/human-capital/master-tempat-tugas',
      element: <MasterTempatTugas />
    },
    {
      path: '/human-capital/master-tempat-tugas/input',
      element: <MasterTempatTugasForm />
    },
    {
      path: '/human-capital/master-Iuran',
      element: <MasterIuran />
    },
    {
      path: '/human-capital/master-iuran/input',
      element: <MasterIuranForm />
    },
    {
      path: '/human-capital/master-pajak',
      element: <MasterPajak />
    },
    {
      path: '/human-capital/master-pajak/input',
      element: <MasterPajakForm />
    },
    {
      path: '/human-capital/master-bank',
      element: <MasterBank />
    },
    {
      path: '/human-capital/master-bank/input',
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