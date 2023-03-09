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
