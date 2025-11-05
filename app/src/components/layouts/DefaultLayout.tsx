import { Endpoints } from '@/constants/endpoints';
import { Outlet, useLocation } from 'react-router-dom';
import { Footer } from './Footer';
import { Header } from './Header';

export default function DefaultLayout() {
  const location = useLocation();

  const links: string[] = [Endpoints.profile];
  const without = links.includes(location?.pathname);

  return (
    <div className="relative flex flex-col h-screen">
      {!without && <Header />}
      <div className="overflow-auto scrollbar-hide">
        <main className="w-full min-h-[90vh] p-6">
          <Outlet />
        </main>
        {!without && <Footer />}
      </div>
    </div>
  );
}
