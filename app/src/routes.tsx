import { createBrowserRouter } from "react-router-dom";

import { ProtectedRouter } from "./components/ui/ProtectedRouter";
import { URLS } from "./constants/urls";
import { DashboardPage } from "./pages/Dashboard";
import { EnterprisesPage } from "./pages/Enterprises";
import GeneralError from "./pages/errors/general-error";
import NotFoundError from "./pages/errors/not-found-error";
import { LoginPage } from "./pages/Login";

const router = createBrowserRouter([
  // Auth routes
  {
    path: URLS.login,
    element: <LoginPage />,
  },
  {
    path: URLS.dashboard,
    errorElement: <GeneralError />,
    element: <ProtectedRouter />,
    children: [
      {
        path: URLS.dashboard,
        element: <DashboardPage />,
        index: true,
      },
      {
        path: URLS.enterprises,
        element: <EnterprisesPage />,
      },
    ],
  },
  { path: "*", Component: NotFoundError },
]);

export default router;
