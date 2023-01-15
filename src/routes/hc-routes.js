import React, { lazy } from "react";

import MainLayout from "layout/MainLayout";
import Loadable from "ui-component/Loadable";

// View Routing
const HCKaryawan = Loadable(lazy(() => import('views/human-capital/karyawan')));
const HCKontrak = Loadable(lazy(() => import('views/human-capital/kontrak')));
const HCDataCV = Loadable(lazy(() => import('views/human-capital/datacv')));

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
            path: '/human-capital/data-cv',
            element : <HCDataCV />
        },
        {
            path: '/human-capital/koperasi-simpwajib',
            element : <HCDataCV />
        },
        {
            path: '/human-capital/koperasi-simpsukarela',
            element : <HCDataCV />
        },
        {
            path: '/human-capital/koperasi-pkpl',
            element : <HCDataCV />
        },
        {
            path: '/human-capital/payroll-tagihangaji',
            element : <HCDataCV />
        },
        {
            path: '/human-capital/payroll-generate-slip',
            element : <HCDataCV />
        },
        {
            path: '/human-capital/payroll-generate-slip-transfer',
            element : <HCDataCV />
        },
        {
            path: '/human-capital/payroll-blashting-email-slip',
            element : <HCDataCV />
        }
    ]
};

export default HumanCapitalRoutes;