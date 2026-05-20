import { Outlet, useLocation } from 'react-router-dom';
import Navbar from '../components/shared/Navbar';
import Footer from '../components/shared/Footer';

const MainLayout = () => {
  const { pathname } = useLocation();
  const noFooter = ['/login', '/register'].includes(pathname);

  return (
    <div className="flex flex-col min-h-screen bg-[var(--bg)] text-[var(--text)]">
      <Navbar />
      <main className="flex-1">
        <Outlet />
      </main>
      {!noFooter && <Footer />}
    </div>
  );
};

export default MainLayout;
