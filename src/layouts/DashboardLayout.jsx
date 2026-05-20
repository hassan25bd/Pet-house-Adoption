import { useState } from 'react';
import { Link, NavLink, Outlet, useNavigate } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import {
  FiHome, FiPlusCircle, FiList, FiInbox, FiMenu, FiX, FiLogOut,
} from 'react-icons/fi';
import { FaPaw } from 'react-icons/fa';
import useAuth from '../hooks/useAuth';
import toast from 'react-hot-toast';

const links = [
  { to: '/dashboard', label: 'Overview', icon: <FiHome /> },
  { to: '/dashboard/add-pet', label: 'Add Pet', icon: <FiPlusCircle /> },
  { to: '/dashboard/my-listings', label: 'My Listings', icon: <FiList /> },
  { to: '/dashboard/my-requests', label: 'My Requests', icon: <FiInbox /> },
];

const DashboardLayout = () => {
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const { user, logOut } = useAuth();
  const navigate = useNavigate();

  const handleLogout = async () => {
    await logOut();
    toast.success('Logged out successfully');
    navigate('/');
  };

  const Sidebar = ({ mobile = false }) => (
    <aside
      className={`${
        mobile ? 'flex' : 'hidden lg:flex'
      } flex-col w-64 bg-white dark:bg-gray-900 border-r border-gray-100 dark:border-gray-800 h-full`}
    >
      {/* Logo */}
      <div className="p-6 border-b border-gray-100 dark:border-gray-800">
        <Link to="/" className="flex items-center gap-2">
          <span className="text-brand text-2xl"><FaPaw /></span>
          <span className="font-display font-bold text-lg text-gray-900 dark:text-white">
            PetHouse
          </span>
        </Link>
      </div>

      {/* User */}
      <div className="p-4 border-b border-gray-100 dark:border-gray-800">
        <div className="flex items-center gap-3">
          <img
            src={user?.photoURL || `https://ui-avatars.com/api/?name=${user?.displayName}&background=FF6B35&color=fff`}
            alt="avatar"
            className="w-10 h-10 rounded-full object-cover ring-2 ring-brand/20"
          />
          <div className="overflow-hidden">
            <p className="font-semibold text-sm text-gray-900 dark:text-white truncate">{user?.displayName}</p>
            <p className="text-xs text-gray-500 truncate">{user?.email}</p>
          </div>
        </div>
      </div>

      {/* Nav */}
      <nav className="flex-1 p-4 space-y-1">
        {links.map((link) => (
          <NavLink
            key={link.to}
            to={link.to}
            end={link.to === '/dashboard'}
            onClick={() => setSidebarOpen(false)}
            className={({ isActive }) =>
              `flex items-center gap-3 px-4 py-3 rounded-xl text-sm font-medium transition-all ${
                isActive
                  ? 'bg-brand text-white shadow-md shadow-brand/25'
                  : 'text-gray-600 dark:text-gray-400 hover:bg-gray-50 dark:hover:bg-gray-800 hover:text-gray-900 dark:hover:text-white'
              }`
            }
          >
            <span className="text-lg">{link.icon}</span>
            {link.label}
          </NavLink>
        ))}
      </nav>

      {/* Logout */}
      <div className="p-4 border-t border-gray-100 dark:border-gray-800">
        <button
          onClick={handleLogout}
          className="w-full flex items-center gap-3 px-4 py-3 rounded-xl text-sm font-medium text-red-500 hover:bg-red-50 dark:hover:bg-red-900/20 transition-all"
        >
          <FiLogOut className="text-lg" />
          Sign Out
        </button>
      </div>
    </aside>
  );

  return (
    <div className="flex h-screen overflow-hidden bg-gray-50 dark:bg-gray-950">
      {/* Desktop sidebar */}
      <Sidebar />

      {/* Mobile sidebar overlay */}
      <AnimatePresence>
        {sidebarOpen && (
          <>
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="fixed inset-0 bg-black/50 z-40 lg:hidden"
              onClick={() => setSidebarOpen(false)}
            />
            <motion.div
              initial={{ x: -280 }}
              animate={{ x: 0 }}
              exit={{ x: -280 }}
              transition={{ type: 'spring', damping: 25 }}
              className="fixed inset-y-0 left-0 z-50 lg:hidden"
            >
              <Sidebar mobile />
            </motion.div>
          </>
        )}
      </AnimatePresence>

      {/* Main */}
      <div className="flex-1 flex flex-col overflow-hidden">
        {/* Topbar */}
        <header className="bg-white dark:bg-gray-900 border-b border-gray-100 dark:border-gray-800 px-6 py-4 flex items-center justify-between lg:justify-end">
          <button
            className="lg:hidden p-2 rounded-lg text-gray-600 hover:bg-gray-100"
            onClick={() => setSidebarOpen(true)}
          >
            <FiMenu className="text-xl" />
          </button>
          <Link
            to="/"
            className="text-sm font-medium text-brand hover:text-brand/80 transition-colors"
          >
            ← Back to Site
          </Link>
        </header>

        {/* Content */}
        <main className="flex-1 overflow-y-auto p-6">
          <Outlet />
        </main>
      </div>
    </div>
  );
};

export default DashboardLayout;
