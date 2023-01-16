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
                    id: 'inquirykop',
                    title: 'Inquiry Koperasi',
                    type: 'item',
                    url: '/human-capital/koperasi/inquiry',
                    breadcrumbs: false
                },
                {
                    id: 'pengajuankoperasi',
                    title: 'Pengajuan',
                    type: 'item',
                    url: '/human-capital/koperasi/pengajuan',
                    breadcrumbs: false
                },
                {
                    id: 'bayarkop',
                    title: 'Bayar Koperasi',
                    type: 'item',
                    url: '/human-capital/koperasi/bayar',
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
