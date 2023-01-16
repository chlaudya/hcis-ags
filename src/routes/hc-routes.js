import React, { lazy } from "react";

import MainLayout from "layout/MainLayout";
import Loadable from "ui-component/Loadable";

// View Routing
const HCKaryawan = Loadable(lazy(() => import('views/human-capital/karyawan')));
const HCKontrak = Loadable(lazy(() => import('views/human-capital/kontrak')));
const HCTagihanGaji = Loadable(lazy(() => import('views/human-capital/payroll/tagihan-gaji')));
const HCGenSlipGaji = Loadable(lazy(() => import('views/human-capital/payroll/generate-slip')));

const HumanCapitalRoutes = {
    path: '/',
    element: <MainLayout />,
    children: [
        {
            path: '/human-capital/karyawan',
            element: <HCKaryawan/>
        },
        {
            path:'/human-capital/kontrak',
            element: <HCKontrak/>
        },
        {
            path: '/human-capital/koperasi/inquiry',
            element : <HCKaryawan />
        },
        {
            path: '/human-capital/koperasi/pengajuan',
            element : <HCKaryawan />
        },
        {
            path: '/human-capital/koperasi/bayar',
            element : <HCKaryawan />
        },
        {
            path: '/human-capital/payroll-tagihangaji',
            element : <HCTagihanGaji />
        },
        {
            path: '/human-capital/payroll-generate-slip',
            element : <HCGenSlipGaji />
        },
        {
            path: '/human-capital/payroll-generate-slip-transfer',
            element : <HCKaryawan />
        },
        {
            path: '/human-capital/payroll-blashting-email-slip',
            element : <HCKaryawan />
        }
    ]
};

export default HumanCapitalRoutes;