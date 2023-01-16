import { useRoutes } from 'react-router-dom';

// routes
import MainRoutes from './main-routes';
import HCRoutes from './hc-routes';
import UtilitiesRoutes from './utilities-routes';

// ===========================|| ROUTING RENDER ||=========================== //

export default function ThemeRoutes() {
    return useRoutes([MainRoutes, HCRoutes, UtilitiesRoutes]);
}