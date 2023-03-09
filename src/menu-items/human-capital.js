// assets
import {
  IconKey,
  IconReceipt2,
  IconBug,
  IconBellRinging,
  IconPhoneCall,
  IconUsers,
  IconCoinBitcoin,
  IconBrandPaypal,
  IconAdjustments
} from '@tabler/icons';

// constant
const icons = {
  IconKey,
  IconReceipt2,
  IconBug,
  IconBellRinging,
  IconPhoneCall,
  IconUsers,
  IconCoinBitcoin,
  IconBrandPaypal,
  IconAdjustments
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
      id: 'master',
      title: 'Master',
      type: 'collapse',
      icon: icons.IconAdjustments,
      children: [
        {
          id: 'mjabatan',
          title: 'Jabatan',
          type: 'item',
          url: '/human-capital/master-jabatan',
          breadcrumbs: false
        },
        {
          id: 'munitbisnis',
          title: 'Unit Bisnis',
          type: 'item',
          url: '/human-capital/master-unit-bisnis',
          breadcrumbs: false
        },
        {
          id: 'mtempattugas',
          title: 'Tempat Tugas',
          type: 'item',
          url: '/human-capital/master-tempat-tugas',
          breadcrumbs: false
        },
        {
          id: 'miuran',
          title: 'Iuran',
          type: 'item',
          url: '/human-capital/master-iuran',
          breadcrumbs: false
        },
        {
          id: 'mpajak',
          title: 'Pajak',
          type: 'item',
          url: '/human-capital/master-pajak',
          breadcrumbs: false
        },
        {
          id: 'mbank',
          title: 'Bank',
          type: 'item',
          url: '/human-capital/master-bank',
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
          title: 'Generate Slip Gaji',
          type: 'item',
          url: '/human-capital/payroll-generate-slip',
          breadcrumbs: false
        }
        // {
        //   id: 'generatesliptransfer',
        //   title: 'Generate Slip Transfer',
        //   type: 'item',
        //   url: '/human-capital/payroll-generate-slip-transfer',
        //   breadcrumbs: false
        // },
        // {
        //   id: 'blashtingemail',
        //   title: 'Blashting Email Slip',
        //   type: 'item',
        //   url: '/human-capital/payroll-blashting-email-slip',
        //   breadcrumbs: false
        // }
      ]
    }
    // {
    //   id: 'report',
    //   title: 'Report',
    //   type: 'collapse',
    //   icon: icons.IconCoinBitcoin,
    //   children: [
    //     {
    //       id: 'tagihanGaji',
    //       title: 'Tagihan Gaji',
    //       type: 'item',
    //       url: '/human-capital/koperasi/inquiry',
    //       breadcrumbs: false
    //     }
    //     // {
    //     //   id: 'pengajuankoperasi',
    //     //   title: 'Pengajuan',
    //     //   type: 'item',
    //     //   url: '/human-capital/koperasi/pengajuan',
    //     //   breadcrumbs: false
    //     // },
    //     // {
    //     //   id: 'bayarkop',
    //     //   title: 'Bayar Koperasi',
    //     //   type: 'item',
    //     //   url: '/human-capital/koperasi/bayar',
    //     //   breadcrumbs: false
    //     // }
    //   ]
    // }
  ]
};

export default pages;
