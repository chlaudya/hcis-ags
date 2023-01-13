// assets
import { IconBrandFramer, IconTypography, IconPalette, IconShadow, IconWindmill, IconLayoutGridAdd, IconAdjustments, IconTemplate, IconUserCheck } from '@tabler/icons';

// constant
const icons = {
    IconTypography,
    IconPalette,
    IconShadow,
    IconWindmill,
    IconBrandFramer,
    IconLayoutGridAdd,
    IconAdjustments,
    IconTemplate,
    IconUserCheck
};

// ===========================|| UTILITIES MENU ITEMS ||=========================== //

const utilities = {
    id: 'utilities',
    title: 'Utilities',
    type: 'group',
    children: [
        {
            id: 'util-shadow',
            title: 'Template',
            type: 'item',
            url: '/utils/util-shadow',
            icon: icons.IconTemplate,
            breadcrumbs: false
        },
        {
            id: 'icons',
            title: 'Master',
            type: 'collapse',
            icon: icons.IconAdjustments,
            children: [
                {
                    id: 'tabler-icons',
                    title: 'Jabatan',
                    type: 'item',
                    url: '/icons/tabler-icons',
                    breadcrumbs: false
                },
                {
                    id: 'material-icons',
                    title: 'Unit Bisnis',
                    type: 'item',
                    url: '/icons/material-icons',
                    breadcrumbs: false
                },
                {
                    id: 'material-icons',
                    title: 'Tempat Tugas',
                    type: 'item',
                    url: '/icons/material-icons',
                    breadcrumbs: false
                },
                {
                    id: 'material-icons',
                    title: 'Tunjangan',
                    type: 'item',
                    url: '/icons/material-icons',
                    breadcrumbs: false
                },
                {
                    id: 'material-icons',
                    title: 'Iuran',
                    type: 'item',
                    url: '/icons/material-icons',
                    breadcrumbs: false
                },
                {
                    id: 'material-icons',
                    title: 'Pajak',
                    type: 'item',
                    url: '/icons/material-icons',
                    breadcrumbs: false
                },
                {
                    id: 'material-icons',
                    title: 'Sim. Wajib',
                    type: 'item',
                    url: '/icons/material-icons',
                    breadcrumbs: false
                }
            ]
        },
        {
            id: 'icons',
            title: 'User Manajemen',
            type: 'collapse',
            icon: icons.IconUserCheck,
            children: [
                {
                    id: 'tabler-icons',
                    title: 'User Data',
                    type: 'item',
                    url: '/icons/tabler-icons',
                    breadcrumbs: false
                },
                {
                    id: 'material-icons',
                    title: 'Group User',
                    type: 'item',
                    url: '/icons/material-icons',
                    breadcrumbs: false
                },
                {
                    id: 'material-icons',
                    title: 'Hak Ases User',
                    type: 'item',
                    url: '/icons/material-icons',
                    breadcrumbs: false
                }
            ]
        }
    ]
};

export default utilities;
