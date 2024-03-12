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
  IconAdjustments,
  IconReport
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
  IconAdjustments,
  IconReport
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
          title: 'Daftar Karyawan',
          type: 'item',
          url: '/human-capital/karyawan',
          breadcrumbs: false
        },
        {
          id: 'kontrak-karyawan',
          title: 'Daftar Kontrak',
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
      icon: icons.IconReport,
      children: [
        {
          id: 'tagihanGaji',
          title: 'Tagihan Gaji',
          type: 'item',
          url: '/human-capital/tagihan-gaji',
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
