import { Route, Routes } from "react-router-dom";

import ChatsPage from "@/pages/Chats";
import DashboardPage from "@/pages/Dashboard/index";
import OrdersPage from "@/pages/Orders";
import BlogPage from "@/pages/Products";
import VariantsPage from "@/pages/Variants";
import DefaultLayout from "./components/layouts/DefaultLayout";
import { Endpoints } from "./constants/frontend/endpoints";

function App() {
  return (
    <Routes>
      <Route element={<DefaultLayout />} path={Endpoints.dashboard}>
        <Route index element={<DashboardPage />} />
        <Route element={<OrdersPage />} path={Endpoints.orders} />
        <Route element={<ChatsPage />} path={Endpoints.chats} />
        <Route element={<BlogPage />} path={Endpoints.products} />
        <Route element={<VariantsPage />} path={Endpoints.variants} />
      </Route>
    </Routes>
  );
}

export default App;
