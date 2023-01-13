// assets
import { IconKey, IconReceipt2, IconBug, IconBellRinging, IconPhoneCall, IconUsers, IconCoinBitcoin, IconBrandPaypal } from '@tabler/icons';

// constant
const icons = {
    IconKey,
    IconReceipt2,
    IconBug,
    IconBellRinging,
    IconPhoneCall,
    IconUsers,
    IconCoinBitcoin,
    IconBrandPaypal
};

// ===========================|| EXTRA PAGES MENU ITEMS ||=========================== //

const pages = {
    id: 'pages',
    title: 'Human Capital',
    type: 'group',
    children: [
        {
            id: 'authentication',
            title: 'Karyawan',
            type: 'collapse',
            icon: icons.IconUsers,
            children: [
                {
                    id: 'login3',
                    title: 'Input Karyawan',
                    type: 'item',
                    url: '/pages/login/login3',
                    target: true
                },
                {
                    id: 'register3',
                    title: 'Input Kontrak',
                    type: 'item',
                    url: '/pages/register/register3',
                    target: true
                },
                {
                    id: 'register3',
                    title: 'Data CV',
                    type: 'item',
                    url: '/pages/register/register3',
                    target: true
                }
            ]
        },
        {
            id: 'authentication',
            title: 'Koperasi',
            type: 'collapse',
            icon: icons.IconCoinBitcoin,
            children: [
                {
                    id: 'login3',
                    title: 'Simp. Wajib',
                    type: 'item',
                    url: '/pages/login/login3',
                    target: true
                },
                {
                    id: 'register3',
                    title: 'Simp. Sukarela',
                    type: 'item',
                    url: '/pages/register/register3',
                    target: true
                },
                {
                    id: 'register3',
                    title: 'Data PKPL',
                    type: 'item',
                    url: '/pages/register/register3',
                    target: true
                }
            ]
        },
        {
            id: 'authentication',
            title: 'Payroll',
            type: 'collapse',
            icon: icons.IconBrandPaypal,
            children: [
                {
                    id: 'login3',
                    title: 'Simp. Wajib',
                    type: 'item',
                    url: '/pages/login/login3',
                    target: true
                },
                {
                    id: 'register3',
                    title: 'Simp. Sukarela',
                    type: 'item',
                    url: '/pages/register/register3',
                    target: true
                },
                {
                    id: 'register3',
                    title: 'Data PKPL',
                    type: 'item',
                    url: '/pages/register/register3',
                    target: true
                }
            ]
        }
    ]
};

export default pages;
