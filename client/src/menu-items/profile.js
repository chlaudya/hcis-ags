// assets
import { IconUser } from '@tabler/icons';

// ===========================|| DASHBOARD MENU ITEMS ||=========================== //

const profile = {
  id: 'profile',
  type: 'group',
  title: 'My Employee Detail',
  children: [
    {
      id: 'profile',
      title: 'Profile',
      type: 'item',
      url: '/',
      icon: IconUser,
      breadcrumbs: false
    }
  ]
};

export default profile;
