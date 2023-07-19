import React from 'react';

// material-ui
import { Typography } from '@material-ui/core';

// project imports
import NavGroup from './NavGroup';
import menuItem from 'menuItems';
import { useRolesKeycloak } from 'utils/useRolesKeycloak';

// ===========================|| SIDEBAR MENU LIST ||=========================== //

const MenuList = () => {
  const isAdminRole = useRolesKeycloak('Admin');
  const filteredMenu = isAdminRole ? menuItem?.itemsAdmin : menuItem?.itemsUser;

  const navItems = filteredMenu?.map((item) => {
    switch (item.type) {
      case 'group':
        return <NavGroup key={item.id} item={item} />;
      default:
        return (
          <Typography key={item.id} variant="h6" color="error" align="center">
            Menu Items Error
          </Typography>
        );
    }
  });

  return navItems;
};

export default MenuList;
