import { createBrowserRouter } from 'react-router-dom';

import { ProtectedRoutes } from './components/layouts/ProtectedRoutes';
import { Endpoints } from './constants/endpoints';
import CartPage from './pages/Cart';
import ChatsPage from './pages/Chats';
import ClientsPage from './pages/Clients';
import DashboardPage from './pages/Dashboard';
import GeneralError from './pages/Error';
import FavoritesPage from './pages/Favorites';
import LoginPage from './pages/Login';
import OrdersPage from './pages/Orders';
import ProductDetails from './pages/ProductDetails';
import ProductsPage from './pages/Products';
import Profile from './pages/Profile';
import RegisterPage from './pages/Register';
import UsersPage from './pages/Users';
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
        path: Endpoints.clients,
        element: <ClientsPage />,
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
        path: Endpoints.favorites,
        element: <FavoritesPage />,
      },
      {
        path: Endpoints.cart,
        element: <CartPage />,
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
        path: Endpoints.users,
        element: <UsersPage />,
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
