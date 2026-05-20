import { Link } from 'react-router-dom';
import { useQuery } from '@tanstack/react-query';
import { motion } from 'framer-motion';
import { FiPlusCircle, FiList, FiInbox, FiArrowRight } from 'react-icons/fi';
import useAuth from '../../hooks/useAuth';
import useAxiosSecure from '../../hooks/useAxiosSecure';

const Dashboard = () => {
  const { user } = useAuth();
  const axiosSecure = useAxiosSecure();

  const { data: myPets = [] } = useQuery({
    queryKey: ['my-pets'],
    queryFn: async () => (await axiosSecure.get('/pets/owner/my-listings')).data,
  });

  const { data: myRequests = [] } = useQuery({
    queryKey: ['my-requests'],
    queryFn: async () => (await axiosSecure.get('/requests/my')).data,
  });

  const totalListings  = myPets.length;
  const available      = myPets.filter((p) => p.status === 'available').length;
  const adopted        = myPets.filter((p) => p.status === 'adopted').length;
  const pendingReqs    = myRequests.filter((r) => r.status === 'pending').length;

  const cards = [
    { icon: <FiList className="text-xl" />, label: 'Total Listings', value: totalListings, color: 'bg-blue-50 dark:bg-blue-900/20 text-blue-600', to: '/dashboard/my-listings' },
    { icon: '🐾', label: 'Available', value: available, color: 'bg-green-50 dark:bg-green-900/20 text-green-600', to: '/dashboard/my-listings' },
    { icon: '🏡', label: 'Adopted', value: adopted, color: 'bg-purple-50 dark:bg-purple-900/20 text-purple-600', to: '/dashboard/my-listings' },
    { icon: <FiInbox className="text-xl" />, label: 'My Pending Requests', value: pendingReqs, color: 'bg-orange-50 dark:bg-orange-900/20 text-brand', to: '/dashboard/my-requests' },
  ];

  return (
    <div className="space-y-8">
      {/* Welcome */}
      <motion.div
        initial={{ opacity: 0, y: 16 }}
        animate={{ opacity: 1, y: 0 }}
        className="flex flex-col sm:flex-row sm:items-center justify-between gap-4"
      >
        <div>
          <h1 className="font-display font-extrabold text-2xl text-gray-900 dark:text-white">
            Welcome back, {user?.displayName?.split(' ')[0]}! 👋
          </h1>
          <p className="text-gray-500 text-sm mt-1">Here's an overview of your PetHouse activity.</p>
        </div>
        <Link
          to="/dashboard/add-pet"
          className="inline-flex items-center gap-2 px-5 py-2.5 bg-brand text-white rounded-xl font-semibold text-sm hover:bg-orange-600 transition-all shadow-md shadow-brand/20 shrink-0"
        >
          <FiPlusCircle /> Add New Pet
        </Link>
      </motion.div>

      {/* Stats cards */}
      <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-5">
        {cards.map((card, i) => (
          <motion.div
            key={card.label}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: i * 0.08 }}
          >
            <Link
              to={card.to}
              className="block bg-white dark:bg-gray-900 rounded-2xl p-6 border border-gray-100 dark:border-gray-800 hover:border-brand/30 hover:shadow-lg transition-all"
            >
              <div className={`w-11 h-11 rounded-xl flex items-center justify-center text-xl mb-4 ${card.color}`}>
                {card.icon}
              </div>
              <p className="font-display font-extrabold text-3xl text-gray-900 dark:text-white">
                {card.value}
              </p>
              <p className="text-sm text-gray-500 mt-1">{card.label}</p>
            </Link>
          </motion.div>
        ))}
      </div>

      {/* Quick actions */}
      <div className="grid sm:grid-cols-3 gap-5">
        {[
          { to: '/dashboard/add-pet', icon: <FiPlusCircle className="text-2xl" />, label: 'Add a Pet', desc: 'List a new pet for adoption', color: 'bg-brand text-white' },
          { to: '/dashboard/my-listings', icon: <FiList className="text-2xl" />, label: 'My Listings', desc: 'Manage your listed pets', color: 'bg-white dark:bg-gray-900 text-gray-900 dark:text-white' },
          { to: '/dashboard/my-requests', icon: <FiInbox className="text-2xl" />, label: 'My Requests', desc: 'Track your adoption requests', color: 'bg-white dark:bg-gray-900 text-gray-900 dark:text-white' },
        ].map((action, i) => (
          <motion.div
            key={action.label}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.35 + i * 0.08 }}
          >
            <Link
              to={action.to}
              className={`flex items-center gap-4 p-6 rounded-2xl border border-gray-100 dark:border-gray-800 hover:shadow-lg transition-all ${action.color}`}
            >
              <div className={`shrink-0 ${action.color.includes('brand') ? 'text-white/80' : 'text-brand'}`}>
                {action.icon}
              </div>
              <div className="flex-1">
                <p className="font-semibold">{action.label}</p>
                <p className={`text-xs mt-0.5 ${action.color.includes('brand') ? 'text-orange-100' : 'text-gray-500'}`}>
                  {action.desc}
                </p>
              </div>
              <FiArrowRight className={action.color.includes('brand') ? 'text-white/60' : 'text-gray-400'} />
            </Link>
          </motion.div>
        ))}
      </div>
    </div>
  );
};

export default Dashboard;
