import { useRoutes } from 'react-router-dom';

// routes
import MainRoutes from './main-routes';
import HCRoutes from './hc-routes';
import UtilitiesRoutes from './utilities-routes';
import ErrorRoutes from './error-routes';

// ===========================|| ROUTING RENDER ||=========================== //

export default function ThemeRoutes() {
  return useRoutes([ErrorRoutes, MainRoutes, HCRoutes, UtilitiesRoutes]);
}
