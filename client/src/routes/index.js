import { useRoutes } from 'react-router-dom';
import { useRolesKeycloak } from 'utils/useRolesKeycloak';

// routes
import MainRoutesAdmin from './main-routes-admin';
import MainRoutesEmployee from './main-routes-employee';
import HCRoutes from './hc-routes';
import UtilitiesRoutes from './utilities-routes';
import ErrorRoutes from './error-routes';

// ===========================|| ROUTING RENDER ||=========================== //

export default function ThemeRoutes() {
  const isAdminRole = useRolesKeycloak('Admin');
  const routes = isAdminRole
    ? [ErrorRoutes, MainRoutesAdmin, HCRoutes, UtilitiesRoutes]
    : [MainRoutesEmployee];

  return useRoutes(routes);
}
