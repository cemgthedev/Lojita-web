import { createBrowserRouter } from 'react-router-dom';

import { ProtectedRoutes } from './components/layouts/ProtectedRoutes';
import { Endpoints } from './constants/endpoints';
import ChatsPage from './pages/Chats';
import DashboardPage from './pages/Dashboard';
import GeneralError from './pages/Error';
import LoginPage from './pages/Login';
import OrdersPage from './pages/Orders';
import ProductsPage from './pages/Products';
import RegisterPage from './pages/Register';
import VariantsPage from './pages/Variants';

const router = createBrowserRouter([
  // Auth routes
  {
    path: Endpoints.login,
    element: <LoginPage />,
  },
  {
    path: Endpoints.register,
    element: <RegisterPage />,
  },

  // Protected routes
  {
    path: Endpoints.dashboard,
    element: <ProtectedRoutes />,
    children: [
      {
        path: Endpoints.dashboard,
        element: <DashboardPage />,
      },
      {
        path: Endpoints.orders,
        element: <OrdersPage />,
      },
      {
        path: Endpoints.chats,
        element: <ChatsPage />,
      },
      {
        path: Endpoints.products,
        element: <ProductsPage />,
      },
      {
        path: Endpoints.variants,
        element: <VariantsPage />,
      },
    ],
  },

  // Error routes
  {
    path: '*',
    element: <GeneralError />,
  },
]);

export default router;
