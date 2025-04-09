
import { Outlet } from "react-router-dom";
import { Footer } from "./Footer";
import { Header } from "./Header";

export default function DefaultLayout() {
  return (
    <div className="relative flex flex-col h-screen">
      <Header />
      <div className="overflow-auto scrollbar-hide">
        <main className="container min-h-[90vh] p-6">
          <Outlet />
        </main>
        <Footer />
      </div>
    </div>
  );
}
