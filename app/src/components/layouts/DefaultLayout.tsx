import { Endpoints } from '@/constants/endpoints';
import { Activity } from 'react';
import { Outlet, useLocation } from 'react-router-dom';
import { Footer } from './Footer';
import { Header } from './Header';

export default function DefaultLayout() {
  const location = useLocation();

  const links: string[] = [Endpoints.profile];
  const without = links.some((link) => location.pathname.includes(link));

  return (
    <div className="relative flex flex-col h-screen">
      <Activity mode={!without ? 'visible' : 'hidden'}>
        <Header />
      </Activity>
      <div className="overflow-auto scrollbar-hide">
        <main className="w-full min-h-[90vh]">
          <Outlet />
        </main>
        <Activity mode={!without ? 'visible' : 'hidden'}>
          <Footer />
        </Activity>
      </div>
    </div>
  );
}
