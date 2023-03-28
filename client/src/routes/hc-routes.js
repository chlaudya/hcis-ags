import React, { lazy } from 'react';

import MainLayout from 'layout/MainLayout';
import Loadable from 'src/ui-component/Loadable';

// View Routing
const HCKaryawan = Loadable(lazy(() => import('views/human-capital/karyawan')));
const HCFormKaryawan = Loadable(lazy(() => import('views/human-capital/karyawan/karyawan-form')));

const HCKontrak = Loadable(lazy(() => import('views/human-capital/kontrak')));
const HCFormKontrak = Loadable(lazy(() => import('views/human-capital/kontrak/kontrak-form')));

const HCReportTagihanGaji = Loadable(lazy(() => import('views/human-capital/report/tagihan-gaji')));

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
      path: '/human-capital/karyawan/input-karyawan/:id',
      element: <HCFormKaryawan />
    },
    {
      path: '/human-capital/karyawan/input-karyawan',
      element: <HCFormKaryawan />
    },
    //
    {
      path: '/human-capital/kontrak',
      element: <HCKontrak />
    },
    {
      path: '/human-capital/kontrak/input-kontrak',
      element: <HCFormKontrak />
    },
    {
      path: '/human-capital/kontrak/input-kontrak/:id',
      element: <HCFormKontrak />
    },
    //ini masih dummy
    {
      path: '/human-capital/tagihan-gaji',
      element: <HCReportTagihanGaji />
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
