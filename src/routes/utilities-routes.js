import React, { lazy } from "react";

import MainLayout from "layout/MainLayout";
import Loadable from "ui-component/Loadable";

const HCKaryawan = Loadable(lazy(() => import('views/human-capital/karyawan')));
const HCKontrak = Loadable(lazy(() => import('views/human-capital/kontrak')));
const HCDataCV = Loadable(lazy(() => import('views/human-capital/datacv')));

const UtilitiesRoutes = {
    path: '/',
    element: <MainLayout />,
    children: [
        {
            path: '/utilities/templates',
            element: <HCKaryawan/>
        },
        {
            path:'/utilities/master-jabatan',
            element: <HCKontrak/>
        },
        {
            path: '/utilities/master-unit-bisnis',
            element : <HCDataCV />
        },
        {
            path: '/utilities/master-tempat-tugas',
            element : <HCDataCV />
        },
        {
            path: '/utilities/master-tunjangan',
            element : <HCDataCV />
        },
        {
            path: '/utilities/master-iuran',
            element : <HCDataCV />
        },
        {
            path: '/utilities/master-pajak',
            element : <HCDataCV />
        },
        {
            path: '/utilities/master-simpwajib',
            element : <HCDataCV />
        },
        {
            path: '/utilities/user-manajemen-userdata',
            element : <HCDataCV />
        },
        {
            path: '/utilities/user-manajemen-group-akses',
            element : <HCDataCV />
        },
        {
            path: '/utilities/user-manajemen-hak-akses',
            element : <HCDataCV />
        }
    ]
};

export default UtilitiesRoutes;