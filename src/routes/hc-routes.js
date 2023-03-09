import React, { lazy } from 'react';

import MainLayout from 'layout/MainLayout';
import Loadable from 'ui-component/Loadable';

// View Routing
const HCKaryawan = Loadable(lazy(() => import('views/human-capital/karyawan')));
const HCFormKaryawan = Loadable(lazy(() => import('views/human-capital/karyawan/karyawan-form')));
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

const HCKontrak = Loadable(lazy(() => import('views/human-capital/kontrak')));
const HCTagihanGaji = Loadable(lazy(() => import('views/human-capital/payroll/tagihan-gaji')));
const HCGenSlipGaji = Loadable(lazy(() => import('views/human-capital/payroll/generate-slip')));

const HumanCapitalRoutes = {
  path: '/',
  element: <MainLayout />,
  children: [
    {
      path: '/human-capital/karyawan',
      element: <HCKaryawan />
    },
    {
      path: '/human-capital/karyawan/input-karyawan',
      element: <HCFormKaryawan />
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

    //
    {
      path: '/human-capital/kontrak',
      element: <HCKontrak />
    },
    {
      path: '/human-capital/koperasi/inquiry',
      element: <HCKaryawan />
    },
    {
      path: '/human-capital/koperasi/pengajuan',
      element: <HCKaryawan />
    },
    {
      path: '/human-capital/koperasi/bayar',
      element: <HCKaryawan />
    },
    {
      path: '/human-capital/payroll-tagihangaji',
      element: <HCTagihanGaji />
    },
    {
      path: '/human-capital/payroll-generate-slip',
      element: <HCGenSlipGaji />
    },
    {
      path: '/human-capital/payroll-generate-slip-transfer',
      element: <HCKaryawan />
    },
    {
      path: '/human-capital/payroll-blashting-email-slip',
      element: <HCKaryawan />
    }
  ]
};

export default HumanCapitalRoutes;
