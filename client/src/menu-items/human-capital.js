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
      ]
    },
    {
      id: 'report',
      title: 'Report',
      type: 'collapse',
      icon: icons.IconCoinBitcoin,
      children: [
        {
          id: 'tagihanGaji',
          title: 'Tagihan Gaji',
          type: 'item',
          url: '/human-capital/koperasi/inquiry',
          breadcrumbs: false
        }
        // {
        //   id: 'pengajuankoperasi',
        //   title: 'Pengajuan',
        //   type: 'item',
        //   url: '/human-capital/koperasi/pengajuan',
        //   breadcrumbs: false
        // },
        // {
        //   id: 'bayarkop',
        //   title: 'Bayar Koperasi',
        //   type: 'item',
        //   url: '/human-capital/koperasi/bayar',
        //   breadcrumbs: false
        // }
      ]
    }
  ]
};

export default pages;
