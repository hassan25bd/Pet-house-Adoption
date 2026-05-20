import { useState } from 'react';
import { Link } from 'react-router-dom';
import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { motion, AnimatePresence } from 'framer-motion';
import toast from 'react-hot-toast';
import { FiEye, FiTrash2, FiX, FiCalendar, FiClock } from 'react-icons/fi';
import useAxiosSecure from '../../hooks/useAxiosSecure';
import LoadingSpinner from '../../components/shared/LoadingSpinner';

const statusConfig = {
  pending:  { bg: 'bg-yellow-100 dark:bg-yellow-900/20', text: 'text-yellow-700 dark:text-yellow-400', dot: 'bg-yellow-500' },
  approved: { bg: 'bg-green-100 dark:bg-green-900/20',  text: 'text-green-700 dark:text-green-400',   dot: 'bg-green-500' },
  rejected: { bg: 'bg-red-100 dark:bg-red-900/20',      text: 'text-red-700 dark:text-red-400',       dot: 'bg-red-500' },
};

const MyRequests = () => {
  const axiosSecure = useAxiosSecure();
  const queryClient = useQueryClient();
  const [cancelTarget, setCancelTarget] = useState(null);

  const { data: requests = [], isLoading } = useQuery({
    queryKey: ['my-requests'],
    queryFn: async () => (await axiosSecure.get('/requests/my')).data,
  });

  const cancelMutation = useMutation({
    mutationFn: (id) => axiosSecure.delete(`/requests/${id}`),
    onSuccess: () => {
      queryClient.invalidateQueries(['my-requests']);
      toast.success('Request cancelled');
      setCancelTarget(null);
    },
    onError: () => toast.error('Failed to cancel request'),
  });

  const pending  = requests.filter((r) => r.status === 'pending').length;
  const approved = requests.filter((r) => r.status === 'approved').length;
  const rejected = requests.filter((r) => r.status === 'rejected').length;

  if (isLoading) return <LoadingSpinner fullScreen={false} />;

  return (
    <div className="space-y-8">
      <motion.div initial={{ opacity: 0, y: 16 }} animate={{ opacity: 1, y: 0 }}>
        <span className="text-brand font-semibold text-sm">Dashboard</span>
        <h1 className="font-display font-extrabold text-2xl text-gray-900 dark:text-white mt-1">My Requests</h1>
        <p className="text-gray-500 text-sm mt-1">Track all your adoption requests in one place.</p>
      </motion.div>

      {/* Summary */}
      <div className="grid grid-cols-3 gap-4">
        {[
          { label: 'Pending',  value: pending,  color: 'text-yellow-600' },
          { label: 'Approved', value: approved, color: 'text-green-600' },
          { label: 'Rejected', value: rejected, color: 'text-red-500' },
        ].map((s) => (
          <div key={s.label} className="bg-white dark:bg-gray-900 rounded-2xl p-5 border border-gray-100 dark:border-gray-800 text-center">
            <p className={`font-display font-extrabold text-3xl ${s.color}`}>{s.value}</p>
            <p className="text-sm text-gray-500 mt-1">{s.label}</p>
          </div>
        ))}
      </div>

      {/* Requests list */}
      {requests.length === 0 ? (
        <div className="text-center py-20 bg-white dark:bg-gray-900 rounded-2xl border border-gray-100 dark:border-gray-800">
          <p className="text-5xl mb-4">📭</p>
          <p className="font-semibold text-gray-900 dark:text-white text-xl mb-2">No requests yet</p>
          <p className="text-gray-500 mb-6">Browse available pets and submit your first adoption request.</p>
          <Link to="/pets" className="px-6 py-3 bg-brand text-white rounded-xl font-semibold hover:bg-orange-600 transition-all">
            Browse Pets
          </Link>
        </div>
      ) : (
        <div className="space-y-4">
          {requests.map((req, i) => {
            const cfg = statusConfig[req.status] || statusConfig.pending;
            return (
              <motion.div
                key={req._id}
                initial={{ opacity: 0, y: 16 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: i * 0.06 }}
                className="bg-white dark:bg-gray-900 rounded-2xl border border-gray-100 dark:border-gray-800 overflow-hidden hover:shadow-md transition-all"
              >
                <div className="flex flex-col sm:flex-row">
                  {/* Pet image */}
                  <div className="w-full sm:w-32 h-32 sm:h-auto shrink-0 bg-gray-50 dark:bg-gray-800">
                    <img
                      src={req.petImage}
                      alt={req.petName}
                      className="w-full h-full object-cover"
                      onError={(e) => { e.target.src = 'https://via.placeholder.com/128?text=🐾'; }}
                    />
                  </div>

                  {/* Info */}
                  <div className="flex-1 p-5 flex flex-col sm:flex-row sm:items-center gap-4">
                    <div className="flex-1">
                      <div className="flex items-center gap-3 mb-2">
                        <h3 className="font-display font-bold text-gray-900 dark:text-white">
                          {req.petName}
                        </h3>
                        <span className={`flex items-center gap-1.5 px-2.5 py-1 rounded-full text-xs font-semibold ${cfg.bg} ${cfg.text}`}>
                          <span className={`w-1.5 h-1.5 rounded-full ${cfg.dot}`} />
                          {req.status.charAt(0).toUpperCase() + req.status.slice(1)}
                        </span>
                      </div>

                      <div className="flex flex-wrap gap-4 text-xs text-gray-500 dark:text-gray-400">
                        <span className="flex items-center gap-1.5">
                          <FiClock className="text-brand" />
                          Requested: {new Date(req.requestDate).toLocaleDateString()}
                        </span>
                        <span className="flex items-center gap-1.5">
                          <FiCalendar className="text-brand" />
                          Pickup: {req.pickupDate}
                        </span>
                      </div>
                    </div>

                    {/* Actions */}
                    <div className="flex items-center gap-2 shrink-0">
                      <Link
                        to={`/pets/${req.petId}`}
                        className="flex items-center gap-1.5 px-4 py-2 bg-gray-50 dark:bg-gray-800 text-gray-700 dark:text-gray-300 rounded-xl text-sm font-medium hover:bg-gray-100 transition-all"
                      >
                        <FiEye /> View
                      </Link>
                      {req.status === 'pending' && (
                        <button
                          onClick={() => setCancelTarget(req)}
                          className="flex items-center gap-1.5 px-4 py-2 bg-red-50 dark:bg-red-900/20 text-red-500 rounded-xl text-sm font-medium hover:bg-red-100 transition-all"
                        >
                          <FiTrash2 /> Cancel
                        </button>
                      )}
                    </div>
                  </div>
                </div>
              </motion.div>
            );
          })}
        </div>
      )}

      {/* Cancel Confirmation Modal */}
      <AnimatePresence>
        {cancelTarget && (
          <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
            <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}
              className="absolute inset-0 bg-black/60 backdrop-blur-sm" onClick={() => setCancelTarget(null)} />
            <motion.div
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.9 }}
              className="relative bg-white dark:bg-gray-900 rounded-2xl p-8 max-w-sm w-full shadow-2xl z-10 text-center"
            >
              <button onClick={() => setCancelTarget(null)} className="absolute top-4 right-4 p-1.5 bg-gray-100 dark:bg-gray-800 rounded-full">
                <FiX className="text-sm" />
              </button>
              <div className="text-5xl mb-4">❌</div>
              <h3 className="font-display font-bold text-xl text-gray-900 dark:text-white mb-2">
                Cancel Request?
              </h3>
              <p className="text-gray-500 text-sm mb-6">
                Cancel your adoption request for <strong className="text-gray-800 dark:text-white">{cancelTarget.petName}</strong>? This cannot be undone.
              </p>
              <div className="flex gap-3">
                <button onClick={() => setCancelTarget(null)}
                  className="flex-1 py-3 border border-gray-200 dark:border-gray-700 rounded-xl text-sm font-semibold hover:bg-gray-50 transition-all">
                  Keep Request
                </button>
                <button
                  onClick={() => cancelMutation.mutate(cancelTarget._id)}
                  disabled={cancelMutation.isPending}
                  className="flex-1 py-3 bg-red-500 text-white rounded-xl text-sm font-semibold hover:bg-red-600 transition-all disabled:opacity-70"
                >
                  {cancelMutation.isPending ? 'Cancelling...' : 'Cancel Request'}
                </button>
              </div>
            </motion.div>
          </div>
        )}
      </AnimatePresence>
    </div>
  );
};

export default MyRequests;
