import { createBrowserRouter } from 'react-router-dom';

import { ProtectedRoutes } from './components/layouts/ProtectedRoutes';
import { Endpoints } from './constants/endpoints';
import ChatsPage from './pages/Chats';
import DashboardPage from './pages/Dashboard';
import GeneralError from './pages/Error';
import LoginPage from './pages/Login';
import OrdersPage from './pages/Orders';
import ProductDetails from './pages/ProductDetails';
import ProductsPage from './pages/Products';
import Profile from './pages/Profile';
import RegisterPage from './pages/Register';
import { UpsertUser } from './pages/Users/components/UpsertUser';

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
        path: `${Endpoints.products}/:id`,
        element: <ProductDetails />,
      },
      {
        path: Endpoints.profile,
        element: <Profile />,
      },
      {
        path: `${Endpoints.users}/${Endpoints.create}`,
        element: <UpsertUser />,
      },
      {
        path: `/${Endpoints.profile}/${Endpoints.update}/:id`,
        element: <UpsertUser />,
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
