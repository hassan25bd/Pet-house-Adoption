import { useState } from 'react';
import { Link } from 'react-router-dom';
import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { motion, AnimatePresence } from 'framer-motion';
import toast from 'react-hot-toast';
import { FiEdit2, FiTrash2, FiEye, FiUsers, FiX, FiCheck } from 'react-icons/fi';
import useAxiosSecure from '../../hooks/useAxiosSecure';
import AddPet from './AddPet';
import LoadingSpinner from '../../components/shared/LoadingSpinner';

const StatusBadge = ({ status }) => {
  const map = {
    pending:  'bg-yellow-100 text-yellow-700 dark:bg-yellow-900/20 dark:text-yellow-400',
    approved: 'bg-green-100 text-green-700 dark:bg-green-900/20 dark:text-green-400',
    rejected: 'bg-red-100 text-red-700 dark:bg-red-900/20 dark:text-red-400',
  };
  return (
    <span className={`px-2.5 py-1 rounded-full text-xs font-semibold capitalize ${map[status] || ''}`}>
      {status}
    </span>
  );
};

const MyListings = () => {
  const axiosSecure = useAxiosSecure();
  const queryClient = useQueryClient();
  const [editPet, setEditPet]         = useState(null);
  const [deletePet, setDeletePet]     = useState(null);
  const [requestsPet, setRequestsPet] = useState(null);

  const { data: pets = [], isLoading } = useQuery({
    queryKey: ['my-pets'],
    queryFn: async () => (await axiosSecure.get('/pets/owner/my-listings')).data,
  });

  const { data: requests = [], isLoading: reqLoading } = useQuery({
    queryKey: ['pet-requests', requestsPet?._id],
    queryFn: async () => (await axiosSecure.get(`/requests/pet/${requestsPet._id}`)).data,
    enabled: !!requestsPet,
  });

  const deleteMutation = useMutation({
    mutationFn: (id) => axiosSecure.delete(`/pets/${id}`),
    onSuccess: () => {
      queryClient.invalidateQueries(['my-pets']);
      toast.success('Pet removed successfully');
      setDeletePet(null);
    },
    onError: () => toast.error('Failed to delete pet'),
  });

  const approveMutation = useMutation({
    mutationFn: (id) => axiosSecure.patch(`/requests/${id}/approve`),
    onSuccess: () => {
      queryClient.invalidateQueries(['pet-requests', requestsPet?._id]);
      queryClient.invalidateQueries(['my-pets']);
      toast.success('Request approved! Pet marked as adopted 🏡');
    },
    onError: () => toast.error('Failed to approve request'),
  });

  const rejectMutation = useMutation({
    mutationFn: (id) => axiosSecure.patch(`/requests/${id}/reject`),
    onSuccess: () => {
      queryClient.invalidateQueries(['pet-requests', requestsPet?._id]);
      toast.success('Request rejected');
    },
    onError: () => toast.error('Failed to reject request'),
  });

  const totalListings  = pets.length;
  const available      = pets.filter((p) => p.status === 'available').length;
  const adopted        = pets.filter((p) => p.status === 'adopted').length;

  if (isLoading) return <LoadingSpinner fullScreen={false} />;

  return (
    <div className="space-y-8">
      <motion.div initial={{ opacity: 0, y: 16 }} animate={{ opacity: 1, y: 0 }}>
        <span className="text-brand font-semibold text-sm">Dashboard</span>
        <h1 className="font-display font-extrabold text-2xl text-gray-900 dark:text-white mt-1">My Listings</h1>
      </motion.div>

      {/* Stats */}
      <div className="grid grid-cols-3 gap-4">
        {[
          { label: 'Total Listings', value: totalListings, color: 'text-gray-900 dark:text-white' },
          { label: 'Available',      value: available,     color: 'text-green-600' },
          { label: 'Adopted',        value: adopted,       color: 'text-purple-600' },
        ].map((s) => (
          <div key={s.label} className="bg-white dark:bg-gray-900 rounded-2xl p-5 border border-gray-100 dark:border-gray-800 text-center">
            <p className={`font-display font-extrabold text-3xl ${s.color}`}>{s.value}</p>
            <p className="text-sm text-gray-500 mt-1">{s.label}</p>
          </div>
        ))}
      </div>

      {/* Listings grid */}
      {pets.length === 0 ? (
        <div className="text-center py-20 bg-white dark:bg-gray-900 rounded-2xl border border-gray-100 dark:border-gray-800">
          <p className="text-5xl mb-4">🐾</p>
          <p className="font-semibold text-gray-900 dark:text-white text-xl mb-2">No listings yet</p>
          <p className="text-gray-500 mb-6">Start by adding your first pet for adoption.</p>
          <Link to="/dashboard/add-pet" className="px-6 py-3 bg-brand text-white rounded-xl font-semibold hover:bg-orange-600 transition-all">
            Add a Pet
          </Link>
        </div>
      ) : (
        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {pets.map((pet, i) => (
            <motion.div
              key={pet._id}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: i * 0.06 }}
              className="bg-white dark:bg-gray-900 rounded-2xl border border-gray-100 dark:border-gray-800 overflow-hidden hover:shadow-lg transition-all"
            >
              <div className="relative h-40 bg-gray-50 dark:bg-gray-800">
                <img
                  src={pet.image}
                  alt={pet.name}
                  className="w-full h-full object-cover"
                  onError={(e) => { e.target.src = 'https://via.placeholder.com/400x200?text=🐾'; }}
                />
                <span className={`absolute top-3 right-3 px-2.5 py-1 rounded-full text-xs font-semibold ${
                  pet.status === 'available' ? 'bg-green-500 text-white' : 'bg-gray-600 text-white'
                }`}>
                  {pet.status}
                </span>
              </div>

              <div className="p-5">
                <div className="flex items-start justify-between mb-1">
                  <h3 className="font-bold text-gray-900 dark:text-white">{pet.name}</h3>
                  <span className="text-brand font-bold text-sm">
                    {pet.adoptionFee > 0 ? `$${pet.adoptionFee}` : 'Free'}
                  </span>
                </div>
                <p className="text-sm text-gray-500 capitalize mb-4">{pet.breed || pet.species}</p>

                {/* Requests count */}
                {pet.requestCount > 0 && (
                  <div className="mb-3 text-xs text-brand font-medium">
                    {pet.requestCount} adoption request{pet.requestCount !== 1 ? 's' : ''}
                  </div>
                )}

                {/* Action buttons */}
                <div className="grid grid-cols-4 gap-2">
                  <button
                    onClick={() => setRequestsPet(pet)}
                    title="View Requests"
                    className="flex items-center justify-center p-2.5 bg-blue-50 dark:bg-blue-900/20 text-blue-600 rounded-xl hover:bg-blue-100 transition-all"
                  >
                    <FiUsers />
                  </button>
                  <Link
                    to={`/pets/${pet._id}`}
                    title="View Pet"
                    className="flex items-center justify-center p-2.5 bg-gray-50 dark:bg-gray-800 text-gray-600 dark:text-gray-400 rounded-xl hover:bg-gray-100 transition-all"
                  >
                    <FiEye />
                  </Link>
                  <button
                    onClick={() => setEditPet(pet)}
                    title="Edit Pet"
                    className="flex items-center justify-center p-2.5 bg-amber-50 dark:bg-amber-900/20 text-amber-600 rounded-xl hover:bg-amber-100 transition-all"
                  >
                    <FiEdit2 />
                  </button>
                  <button
                    onClick={() => setDeletePet(pet)}
                    title="Delete Pet"
                    className="flex items-center justify-center p-2.5 bg-red-50 dark:bg-red-900/20 text-red-500 rounded-xl hover:bg-red-100 transition-all"
                  >
                    <FiTrash2 />
                  </button>
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      )}

      {/* ── Edit Modal ──────────────────────────────────────────────── */}
      <AnimatePresence>
        {editPet && (
          <div className="fixed inset-0 z-50 flex items-start justify-center p-4 overflow-y-auto">
            <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}
              className="fixed inset-0 bg-black/60 backdrop-blur-sm" onClick={() => setEditPet(null)} />
            <motion.div
              initial={{ opacity: 0, scale: 0.95, y: 20 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.95 }}
              className="relative bg-gray-50 dark:bg-gray-950 rounded-3xl p-6 w-full max-w-2xl shadow-2xl z-10 my-8"
            >
              <div className="flex items-center justify-between mb-6">
                <h2 className="font-display font-bold text-xl text-gray-900 dark:text-white">Update Pet</h2>
                <button onClick={() => setEditPet(null)} className="p-2 bg-white dark:bg-gray-800 rounded-full">
                  <FiX />
                </button>
              </div>
              <AddPet
                defaultValues={editPet}
                petId={editPet._id}
                onSuccess={() => setEditPet(null)}
              />
            </motion.div>
          </div>
        )}
      </AnimatePresence>

      {/* ── Delete Modal ─────────────────────────────────────────────── */}
      <AnimatePresence>
        {deletePet && (
          <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
            <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}
              className="absolute inset-0 bg-black/60 backdrop-blur-sm" onClick={() => setDeletePet(null)} />
            <motion.div
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.9 }}
              className="relative bg-white dark:bg-gray-900 rounded-2xl p-8 max-w-sm w-full shadow-2xl z-10 text-center"
            >
              <div className="text-5xl mb-4">🗑️</div>
              <h3 className="font-display font-bold text-xl text-gray-900 dark:text-white mb-2">
                Delete {deletePet.name}?
              </h3>
              <p className="text-gray-500 text-sm mb-6">
                This will permanently remove this listing and all its adoption requests. This action cannot be undone.
              </p>
              <div className="flex gap-3">
                <button onClick={() => setDeletePet(null)}
                  className="flex-1 py-3 border border-gray-200 dark:border-gray-700 rounded-xl text-sm font-semibold hover:bg-gray-50 transition-all">
                  Cancel
                </button>
                <button
                  onClick={() => deleteMutation.mutate(deletePet._id)}
                  disabled={deleteMutation.isPending}
                  className="flex-1 py-3 bg-red-500 text-white rounded-xl text-sm font-semibold hover:bg-red-600 transition-all disabled:opacity-70"
                >
                  {deleteMutation.isPending ? 'Deleting...' : 'Delete'}
                </button>
              </div>
            </motion.div>
          </div>
        )}
      </AnimatePresence>

      {/* ── Requests Modal ───────────────────────────────────────────── */}
      <AnimatePresence>
        {requestsPet && (
          <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
            <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}
              className="absolute inset-0 bg-black/60 backdrop-blur-sm" onClick={() => setRequestsPet(null)} />
            <motion.div
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.95 }}
              className="relative bg-white dark:bg-gray-900 rounded-2xl w-full max-w-xl shadow-2xl z-10 overflow-hidden"
            >
              <div className="flex items-center justify-between p-6 border-b border-gray-100 dark:border-gray-800">
                <div>
                  <h3 className="font-display font-bold text-lg text-gray-900 dark:text-white">
                    Adoption Requests
                  </h3>
                  <p className="text-sm text-gray-500">for {requestsPet.name}</p>
                </div>
                <button onClick={() => setRequestsPet(null)} className="p-2 bg-gray-100 dark:bg-gray-800 rounded-full hover:bg-gray-200 transition-all">
                  <FiX />
                </button>
              </div>

              <div className="p-6 max-h-[60vh] overflow-y-auto">
                {reqLoading ? (
                  <div className="py-8 text-center text-gray-500">Loading requests...</div>
                ) : requests.length === 0 ? (
                  <div className="py-8 text-center">
                    <p className="text-4xl mb-2">📭</p>
                    <p className="text-gray-500">No adoption requests yet</p>
                  </div>
                ) : (
                  <div className="space-y-4">
                    {requests.map((req) => (
                      <div key={req._id} className="bg-gray-50 dark:bg-gray-800 rounded-xl p-4">
                        <div className="flex items-start justify-between mb-2">
                          <div>
                            <p className="font-semibold text-gray-900 dark:text-white text-sm">{req.userName}</p>
                            <p className="text-xs text-gray-500">{req.userEmail}</p>
                          </div>
                          <StatusBadge status={req.status} />
                        </div>
                        <p className="text-xs text-gray-500 mb-1">
                          Pickup: <span className="font-medium text-gray-700 dark:text-gray-300">{req.pickupDate}</span>
                        </p>
                        {req.message && (
                          <p className="text-xs text-gray-600 dark:text-gray-400 italic mb-3">
                            "{req.message}"
                          </p>
                        )}
                        {req.status === 'pending' && requestsPet.status !== 'adopted' && (
                          <div className="flex gap-2">
                            <button
                              onClick={() => approveMutation.mutate(req._id)}
                              disabled={approveMutation.isPending}
                              className="flex-1 flex items-center justify-center gap-1.5 py-2 bg-green-500 text-white rounded-lg text-xs font-semibold hover:bg-green-600 transition-all disabled:opacity-70"
                            >
                              <FiCheck /> Approve
                            </button>
                            <button
                              onClick={() => rejectMutation.mutate(req._id)}
                              disabled={rejectMutation.isPending}
                              className="flex-1 flex items-center justify-center gap-1.5 py-2 bg-red-500 text-white rounded-lg text-xs font-semibold hover:bg-red-600 transition-all disabled:opacity-70"
                            >
                              <FiX /> Reject
                            </button>
                          </div>
                        )}
                      </div>
                    ))}
                  </div>
                )}
              </div>
            </motion.div>
          </div>
        )}
      </AnimatePresence>
    </div>
  );
};

export default MyListings;
