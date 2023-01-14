import React, { lazy } from "react";

import MainLayout from "layout/MainLayout";
import Loadable from "ui-component/Loadable";

// karyawan - Human Capital Routing
const HumanCapitalKaryawan = Loadable(lazy(() => import('views/human-capital/karyawan/')));

const HumanCapitalRoutes = {
    path: '/',
    element: <MainLayout />,
    children: [
        {
            path:'/human-capital/karyawan',
            element: <HumanCapitalKaryawan />
        }
    ]
};

export default HumanCapitalRoutes;