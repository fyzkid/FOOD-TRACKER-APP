import AddItem from '../pages/AddItem';
import Settings from '../pages/Settings';
import Dashboard from '../pages/Dashboard';
import Statistics from '../pages/Statistics';
import Notifications from '../pages/Notifications';
import Inventory from '../pages/Inventory';

const mainRoutes = [
  { index: true, path: '/dashboard', element: <Dashboard /> },
  { path: '/dashboard/add-item', element: <AddItem /> },
  { path: '/dashboard/settings', element: <Settings /> },
  { path: '/dashboard/notifications', element: <Notifications /> },
  { path: '/dashboard/inventory', element: <Inventory /> },
  { path: '/dashboard/statistics', element: <Statistics /> },
];

export default mainRoutes;
