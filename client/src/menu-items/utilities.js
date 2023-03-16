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
          id: 'mbank',
          title: 'Bank',
          type: 'item',
          url: '/utilities/master-bank',
          breadcrumbs: false
        },
        {
          id: 'miuran',
          title: 'Iuran',
          type: 'item',
          url: '/utilities/master-iuran',
          breadcrumbs: false
        },

        {
          id: 'mjabatan',
          title: 'Jabatan',
          type: 'item',
          url: '/utilities/master-jabatan',
          breadcrumbs: false
        },
        {
          id: 'mpajak',
          title: 'Pajak',
          type: 'item',
          url: '/utilities/master-pajak',
          breadcrumbs: false
        },
        {
          id: 'mtempattugas',
          title: 'Tempat Tugas',
          type: 'item',
          url: '/utilities/master-tempat-tugas',
          breadcrumbs: false
        },
        {
          id: 'munitbisnis',
          title: 'Unit Bisnis',
          type: 'item',
          url: '/utilities/master-unit-bisnis',
          breadcrumbs: false
        }
      ]
    }
  ]
};

export default utilities;
