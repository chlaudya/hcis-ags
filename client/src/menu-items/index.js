import dashboard from './dashboard';
import humanCapital from './human-capital';
import utilities from './utilities';
import profile from './profile';
import kontrak from './kontrak';

// ===========================|| MENU ITEMS ||=========================== //

const menuItems = {
  itemsAdmin: [dashboard, humanCapital, utilities],
  itemsUser: [profile, kontrak]
};

export default menuItems;
