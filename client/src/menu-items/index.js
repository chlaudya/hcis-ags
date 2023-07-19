import dashboard from './dashboard';
import humanCapital from './human-capital';
import utilities from './utilities';

// ===========================|| MENU ITEMS ||=========================== //

const menuItems = {
  itemsAdmin: [dashboard, humanCapital, utilities],
  itemsUser: [humanCapital]
};

export default menuItems;
