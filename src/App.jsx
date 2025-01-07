import { createBrowserRouter, RouterProvider } from 'react-router-dom';

import Home from './pages/Home';
import Login from './pages/Login';
import mainRoutes from './routes';
import Page404 from './pages/Page404';
import MainLayout from './layouts/MainLayout';

const App = () => {
  const router = createBrowserRouter([
    { path: '/', index: true, element: <Home /> },
    {
      children: mainRoutes,
      element: <MainLayout />,
      errorElement: <Page404 />,
    },
    { path: '/register', element: <></> },
    { path: '/login', element: <Login /> },
  ]);
  return <RouterProvider router={router} />;
};

export default App;
