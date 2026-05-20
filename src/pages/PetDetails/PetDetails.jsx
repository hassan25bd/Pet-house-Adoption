import { useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { motion, AnimatePresence } from 'framer-motion';
import { useForm } from 'react-hook-form';
import toast from 'react-hot-toast';
import {
  FiCalendar, FiMapPin, FiTag, FiHeart, FiChevronLeft,
  FiCheckCircle, FiX, FiAlertCircle,
} from 'react-icons/fi';
import { FaPaw } from 'react-icons/fa';
import useAuth from '../../hooks/useAuth';
import useAxiosPublic from '../../hooks/useAxiosPublic';
import useAxiosSecure from '../../hooks/useAxiosSecure';
import LoadingSpinner from '../../components/shared/LoadingSpinner';

const PetDetails = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const { user } = useAuth();
  const axiosPublic = useAxiosPublic();
  const axiosSecure = useAxiosSecure();
  const queryClient = useQueryClient();
  const [modalOpen, setModalOpen] = useState(false);

  const { data: pet, isLoading, error } = useQuery({
    queryKey: ['pet', id],
    queryFn: async () => {
      const res = await axiosPublic.get(`/pets/${id}`);
      return res.data;
    },
  });

  const { register, handleSubmit, reset, formState: { errors } } = useForm();

  const adoptMutation = useMutation({
    mutationFn: (data) => axiosSecure.post('/requests', data),
    onSuccess: () => {
      toast.success('Adoption request sent successfully! 🐾');
      queryClient.invalidateQueries(['my-requests']);
      setModalOpen(false);
      reset();
    },
    onError: (err) => {
      toast.error(err.response?.data?.message || 'Failed to send request');
    },
  });

  const onSubmit = (data) => {
    adoptMutation.mutate({
      petId: id,
      petName: pet.name,
      userEmail: user.email,
      userName: user.displayName,
      pickupDate: data.pickupDate,
      message: data.message,
    });
  };

  const handleAdoptClick = () => {
    if (!user) {
      toast.error('Please sign in to submit an adoption request');
      navigate('/login', { state: { from: `/pets/${id}` } });
      return;
    }
    if (pet.ownerEmail === user.email) {
      toast.error('You cannot adopt your own pet');
      return;
    }
    setModalOpen(true);
  };

  if (isLoading) return <LoadingSpinner />;
  if (error || !pet) return (
    <div className="min-h-screen flex items-center justify-center">
      <div className="text-center">
        <p className="text-6xl mb-4">😿</p>
        <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-2">Pet Not Found</h2>
        <button onClick={() => navigate('/pets')} className="text-brand hover:underline">
          ← Back to All Pets
        </button>
      </div>
    </div>
  );

  const isOwner = user?.email === pet.ownerEmail;
  const isAdopted = pet.status === 'adopted';

  return (
    <div className="min-h-screen bg-[var(--bg)] py-10">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Back button */}
        <button
          onClick={() => navigate(-1)}
          className="flex items-center gap-2 text-sm text-gray-500 hover:text-brand transition-colors mb-8"
        >
          <FiChevronLeft /> Back
        </button>

        <div className="grid lg:grid-cols-5 gap-10">
          {/* Images & basic info */}
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            className="lg:col-span-3"
          >
            {/* Main image */}
            <div className="relative rounded-3xl overflow-hidden mb-6 bg-gradient-to-br from-orange-50 to-amber-50 dark:from-gray-800 dark:to-gray-700">
              <img
                src={pet.image}
                alt={pet.name}
                className="w-full h-80 sm:h-96 object-cover"
                onError={(e) => { e.target.src = 'https://via.placeholder.com/600x400?text=🐾'; }}
              />
              <div className="absolute top-4 left-4 flex gap-2">
                <span className={`px-3 py-1.5 rounded-full text-sm font-semibold ${
                  isAdopted ? 'bg-gray-700 text-white' : 'bg-green-500 text-white'
                }`}>
                  {isAdopted ? 'Adopted' : 'Available'}
                </span>
              </div>
            </div>

            {/* Details card */}
            <div className="bg-white dark:bg-gray-900 rounded-2xl p-6 border border-gray-100 dark:border-gray-800">
              <div className="flex items-start justify-between mb-4">
                <div>
                  <h1 className="font-display font-extrabold text-3xl text-gray-900 dark:text-white">
                    {pet.name}
                  </h1>
                  <p className="text-gray-500 capitalize mt-1">
                    {pet.breed || pet.species} · {pet.gender} · {pet.age} {pet.age === 1 ? 'year' : 'years'} old
                  </p>
                </div>
                <span className="text-2xl font-bold text-brand">
                  {pet.adoptionFee > 0 ? `$${pet.adoptionFee}` : 'Free'}
                </span>
              </div>

              <div className="grid grid-cols-2 gap-4 mb-6">
                {[
                  { icon: <FiMapPin />, label: 'Location', value: pet.location },
                  { icon: <FiTag />, label: 'Species', value: pet.species },
                  { icon: <FiCheckCircle />, label: 'Health', value: pet.healthStatus },
                  { icon: <FiHeart />, label: 'Vaccinated', value: pet.vaccinationStatus ? 'Yes' : 'No' },
                ].map((item) => item.value && (
                  <div key={item.label} className="flex items-center gap-3 p-3 bg-gray-50 dark:bg-gray-800 rounded-xl">
                    <span className="text-brand">{item.icon}</span>
                    <div>
                      <p className="text-xs text-gray-500">{item.label}</p>
                      <p className="text-sm font-semibold text-gray-900 dark:text-white capitalize">{item.value}</p>
                    </div>
                  </div>
                ))}
              </div>

              {pet.description && (
                <div>
                  <h3 className="font-semibold text-gray-900 dark:text-white mb-2">About {pet.name}</h3>
                  <p className="text-gray-600 dark:text-gray-400 leading-relaxed text-sm">{pet.description}</p>
                </div>
              )}
            </div>
          </motion.div>

          {/* Adoption sidebar */}
          <motion.div
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.1 }}
            className="lg:col-span-2"
          >
            <div className="bg-white dark:bg-gray-900 rounded-2xl p-6 border border-gray-100 dark:border-gray-800 sticky top-24">
              <div className="text-center mb-6">
                <div className="w-20 h-20 rounded-full overflow-hidden mx-auto mb-3 ring-4 ring-brand/20">
                  <img
                    src={pet.image}
                    alt={pet.name}
                    className="w-full h-full object-cover"
                  />
                </div>
                <h3 className="font-display font-bold text-xl text-gray-900 dark:text-white">
                  Adopt {pet.name}
                </h3>
                <p className="text-sm text-gray-500 mt-1">
                  {isAdopted ? 'This pet has found a home 🏡' : 'Give this pet a loving home'}
                </p>
              </div>

              {/* Owner info */}
              <div className="bg-gray-50 dark:bg-gray-800 rounded-xl p-4 mb-6">
                <p className="text-xs text-gray-500 mb-1">Listed by</p>
                <p className="text-sm font-semibold text-gray-900 dark:text-white">{pet.ownerEmail}</p>
              </div>

              {isOwner ? (
                <div className="flex items-center gap-2 p-4 bg-blue-50 dark:bg-blue-900/20 rounded-xl text-sm text-blue-600 dark:text-blue-400">
                  <FiAlertCircle />
                  This is your listing
                </div>
              ) : isAdopted ? (
                <div className="text-center py-4 text-gray-500">
                  <p className="text-4xl mb-2">🏡</p>
                  <p className="font-semibold">Already Adopted</p>
                  <p className="text-sm mt-1">This pet has found their forever home.</p>
                </div>
              ) : (
                <button
                  onClick={handleAdoptClick}
                  className="w-full py-4 bg-brand text-white rounded-xl font-bold text-lg hover:bg-orange-600 transition-all shadow-lg shadow-brand/25 flex items-center justify-center gap-2"
                >
                  <FaPaw /> Adopt {pet.name}
                </button>
              )}
            </div>
          </motion.div>
        </div>
      </div>

      {/* Adoption Modal */}
      <AnimatePresence>
        {modalOpen && (
          <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="absolute inset-0 bg-black/60 backdrop-blur-sm"
              onClick={() => setModalOpen(false)}
            />
            <motion.div
              initial={{ opacity: 0, scale: 0.9, y: 20 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.9, y: 20 }}
              className="relative bg-white dark:bg-gray-900 rounded-3xl p-8 w-full max-w-md shadow-2xl z-10"
            >
              <button
                onClick={() => setModalOpen(false)}
                className="absolute top-4 right-4 w-8 h-8 bg-gray-100 dark:bg-gray-800 rounded-full flex items-center justify-center text-gray-500 hover:bg-gray-200 transition-all"
              >
                <FiX />
              </button>

              <div className="text-center mb-6">
                <div className="text-4xl mb-2">🐾</div>
                <h2 className="font-display font-bold text-2xl text-gray-900 dark:text-white">
                  Adoption Request
                </h2>
                <p className="text-sm text-gray-500 mt-1">for {pet.name}</p>
              </div>

              <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
                {/* Read-only fields */}
                <div>
                  <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">Pet Name</label>
                  <input value={pet.name} readOnly className="w-full px-4 py-2.5 rounded-xl border border-gray-200 dark:border-gray-700 bg-gray-50 dark:bg-gray-800 text-gray-500 text-sm cursor-not-allowed" />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">Your Name</label>
                  <input value={user?.displayName || ''} readOnly className="w-full px-4 py-2.5 rounded-xl border border-gray-200 dark:border-gray-700 bg-gray-50 dark:bg-gray-800 text-gray-500 text-sm cursor-not-allowed" />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">Your Email</label>
                  <input value={user?.email || ''} readOnly className="w-full px-4 py-2.5 rounded-xl border border-gray-200 dark:border-gray-700 bg-gray-50 dark:bg-gray-800 text-gray-500 text-sm cursor-not-allowed" />
                </div>

                {/* Pickup date */}
                <div>
                  <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                    Preferred Pickup Date <span className="text-red-500">*</span>
                  </label>
                  <div className="relative">
                    <FiCalendar className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" />
                    <input
                      type="date"
                      min={new Date().toISOString().split('T')[0]}
                      {...register('pickupDate', { required: 'Please select a pickup date' })}
                      className="w-full pl-10 pr-4 py-2.5 rounded-xl border border-gray-200 dark:border-gray-700 bg-white dark:bg-gray-800 text-gray-900 dark:text-white text-sm outline-none focus:ring-2 focus:ring-brand/30 focus:border-brand transition-all"
                    />
                  </div>
                  {errors.pickupDate && <p className="text-red-500 text-xs mt-1">{errors.pickupDate.message}</p>}
                </div>

                {/* Message */}
                <div>
                  <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                    Message to Owner <span className="text-red-500">*</span>
                  </label>
                  <textarea
                    rows={3}
                    placeholder="Tell the owner a bit about yourself and why you'd be a great match..."
                    {...register('message', { required: 'Please write a message', minLength: { value: 20, message: 'Message must be at least 20 characters' } })}
                    className="w-full px-4 py-2.5 rounded-xl border border-gray-200 dark:border-gray-700 bg-white dark:bg-gray-800 text-gray-900 dark:text-white text-sm outline-none focus:ring-2 focus:ring-brand/30 focus:border-brand transition-all resize-none"
                  />
                  {errors.message && <p className="text-red-500 text-xs mt-1">{errors.message.message}</p>}
                </div>

                <button
                  type="submit"
                  disabled={adoptMutation.isPending}
                  className="w-full py-3.5 bg-brand text-white rounded-xl font-bold hover:bg-orange-600 transition-all shadow-md shadow-brand/25 disabled:opacity-70"
                >
                  {adoptMutation.isPending ? 'Sending Request...' : 'Submit Adoption Request'}
                </button>
              </form>
            </motion.div>
          </div>
        )}
      </AnimatePresence>
    </div>
  );
};

export default PetDetails;
