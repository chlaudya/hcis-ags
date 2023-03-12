// assets
import {
  IconBrandFramer,
  IconTypography,
  IconPalette,
  IconShadow,
  IconWindmill,
  IconLayoutGridAdd,
  IconAdjustments,
  IconTemplate,
  IconUserCheck
} from '@tabler/icons';

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
      id: 'template',
      title: 'Template',
      type: 'item',
      url: '/utilities/templates',
      icon: icons.IconTemplate,
      breadcrumbs: false
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
      id: 'usermanajemen',
      title: 'User Manajemen',
      type: 'collapse',
      icon: icons.IconUserCheck,
      children: [
        {
          id: 'userdata',
          title: 'User Data',
          type: 'item',
          url: '/utilities/user-manajemen-userdata',
          breadcrumbs: false
        },
        {
          id: 'groupakses',
          title: 'Group User',
          type: 'item',
          url: '/utilities/user-manajemen-group-akses',
          breadcrumbs: false
        },
        {
          id: 'hakakses',
          title: 'Hak Ases User',
          type: 'item',
          url: '/utilities/user-manajemen-hak-akses',
          breadcrumbs: false
        }
      ]
    }
  ]
};

export default utilities;
