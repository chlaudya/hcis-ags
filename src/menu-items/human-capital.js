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
            id: 'karyawan',
            title: 'Karyawan',
            type: 'collapse',
            icon: icons.IconUsers,
            children: [
                {
                    id: 'karyawan',
                    title: 'Input Karyawan',
                    type: 'item',
                    url: '/human-capital/karyawan',
                    breadcrumbs: false
                },
                {
                    id: 'kontrak-karyawan',
                    title: 'Input Kontrak',
                    type: 'item',
                    url: '/human-capital/kontrak',
                    breadcrumbs: false
                },
                {
                    id: 'cv-karyawan',
                    title: 'Data CV',
                    type: 'item',
                    url: '/human-capital/data-cv',
                    breadcrumbs: false
                }
            ]
        },
        {
            id: 'koperasi',
            title: 'Koperasi',
            type: 'collapse',
            icon: icons.IconCoinBitcoin,
            children: [
                {
                    id: 'simpwajib',
                    title: 'Simp. Wajib',
                    type: 'item',
                    url: '/human-capital/koperasi-simpwajib',
                    breadcrumbs: false
                },
                {
                    id: 'simpsukarela',
                    title: 'Simp. Sukarela',
                    type: 'item',
                    url: '/human-capital/koperasi-simpsukarela',
                    breadcrumbs: false
                },
                {
                    id: 'datapkpl',
                    title: 'Data PKPL',
                    type: 'item',
                    url: '/human-capital/koperasi-pkpl',
                    breadcrumbs: false
                }
            ]
        },
        {
            id: 'payroll',
            title: 'Payroll',
            type: 'collapse',
            icon: icons.IconBrandPaypal,
            children: [
                {
                    id: 'tagihangaji',
                    title: 'Tagihan Gaji',
                    type: 'item',
                    url: '/human-capital/payroll-tagihangaji',
                    breadcrumbs: false
                },
                {
                    id: 'generate-slip',
                    title: 'Generate Slip',
                    type: 'item',
                    url: '/human-capital/payroll-generate-slip',
                    breadcrumbs: false
                },
                {
                    id: 'generatesliptransfer',
                    title: 'Generate Slip Transfer',
                    type: 'item',
                    url: '/human-capital/payroll-generate-slip-transfer',
                    breadcrumbs: false
                },
                {
                    id: 'blashtingemail',
                    title: 'Blashting Email Slip',
                    type: 'item',
                    url: '/human-capital/payroll-blashting-email-slip',
                    breadcrumbs: false
                }
            ]
        }
    ]
};

export default pages;
