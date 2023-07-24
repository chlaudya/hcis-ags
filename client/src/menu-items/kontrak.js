// assets
import { IconUser } from '@tabler/icons';

// ===========================|| DASHBOARD MENU ITEMS ||=========================== //

const kontrak = {
  id: 'kontrak',
  type: 'group',
  children: [
    {
      id: 'kontrak',
      title: 'Kontrak',
      type: 'item',
      url: '/kontrak',
      icon: IconUser,
      breadcrumbs: false
    }
  ]
};

export default kontrak;
