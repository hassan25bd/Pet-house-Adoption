import { useNavigate } from 'react-router-dom';
import { useForm } from 'react-hook-form';
import { useMutation, useQueryClient } from '@tanstack/react-query';
import { motion } from 'framer-motion';
import toast from 'react-hot-toast';
import { FiImage, FiMapPin } from 'react-icons/fi';
import useAuth from '../../hooks/useAuth';
import useAxiosSecure from '../../hooks/useAxiosSecure';

const SPECIES = ['Dog', 'Cat', 'Bird', 'Rabbit', 'Fish', 'Reptile', 'Hamster', 'Other'];
const GENDERS = ['Male', 'Female'];
const HEALTH_STATUSES = ['Excellent', 'Good', 'Fair', 'Needs Care'];

const Field = ({ label, required, error, children }) => (
  <div>
    <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1.5">
      {label} {required && <span className="text-red-500">*</span>}
    </label>
    {children}
    {error && <p className="text-red-500 text-xs mt-1">{error}</p>}
  </div>
);

const inputCls = 'w-full px-4 py-3 rounded-xl border border-gray-200 dark:border-gray-700 bg-white dark:bg-gray-800 text-gray-900 dark:text-white text-sm outline-none focus:ring-2 focus:ring-brand/30 focus:border-brand transition-all';

const AddPet = ({ defaultValues, petId, onSuccess }) => {
  const { user } = useAuth();
  const axiosSecure = useAxiosSecure();
  const queryClient = useQueryClient();
  const navigate = useNavigate();
  const isEdit = !!petId;

  const { register, handleSubmit, watch, formState: { errors, isSubmitting } } = useForm({
    defaultValues: defaultValues || { vaccinationStatus: false },
  });

  const imageUrl = watch('image');

  const mutation = useMutation({
    mutationFn: (data) =>
      isEdit
        ? axiosSecure.put(`/pets/${petId}`, data)
        : axiosSecure.post('/pets', data),
    onSuccess: () => {
      queryClient.invalidateQueries(['my-pets']);
      queryClient.invalidateQueries(['featured-pets']);
      queryClient.invalidateQueries(['pets']);
      toast.success(isEdit ? 'Pet updated successfully!' : 'Pet listed successfully! 🐾');
      if (onSuccess) onSuccess();
      else navigate('/dashboard/my-listings');
    },
    onError: (err) => {
      toast.error(err.response?.data?.message || 'Something went wrong');
    },
  });

  const onSubmit = (data) => {
    const payload = {
      ...data,
      age: Number(data.age),
      adoptionFee: Number(data.adoptionFee),
      vaccinationStatus: data.vaccinationStatus === true || data.vaccinationStatus === 'true',
      ownerEmail: user.email,
    };
    mutation.mutate(payload);
  };

  return (
    <div className="max-w-3xl mx-auto">
      <motion.div
        initial={{ opacity: 0, y: 16 }}
        animate={{ opacity: 1, y: 0 }}
        className="mb-8"
      >
        <span className="text-brand font-semibold text-sm">Dashboard</span>
        <h1 className="font-display font-extrabold text-2xl text-gray-900 dark:text-white mt-1">
          {isEdit ? 'Update Pet Listing' : 'Add a New Pet'}
        </h1>
        <p className="text-gray-500 text-sm mt-1">
          Fill in the details below to {isEdit ? 'update' : 'list'} a pet for adoption.
        </p>
      </motion.div>

      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.1 }}
        className="bg-white dark:bg-gray-900 rounded-2xl border border-gray-100 dark:border-gray-800 p-8"
      >
        <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
          {/* Image preview */}
          {imageUrl && (
            <div className="rounded-xl overflow-hidden h-40 bg-gray-50 dark:bg-gray-800">
              <img
                src={imageUrl}
                alt="Preview"
                className="w-full h-full object-cover"
                onError={(e) => { e.target.style.display = 'none'; }}
              />
            </div>
          )}

          {/* Image URL */}
          <Field label="Image URL" required error={errors.image?.message}>
            <div className="relative">
              <FiImage className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400" />
              <input
                type="url"
                placeholder="https://images.unsplash.com/..."
                {...register('image', { required: 'Image URL is required' })}
                className={`${inputCls} pl-11`}
              />
            </div>
          </Field>

          {/* Name + Species */}
          <div className="grid sm:grid-cols-2 gap-5">
            <Field label="Pet Name" required error={errors.name?.message}>
              <input
                type="text"
                placeholder="e.g. Buddy"
                {...register('name', { required: 'Pet name is required' })}
                className={inputCls}
              />
            </Field>
            <Field label="Species" required error={errors.species?.message}>
              <select
                {...register('species', { required: 'Species is required' })}
                className={inputCls}
              >
                <option value="">Select species</option>
                {SPECIES.map((s) => <option key={s} value={s.toLowerCase()}>{s}</option>)}
              </select>
            </Field>
          </div>

          {/* Breed + Age */}
          <div className="grid sm:grid-cols-2 gap-5">
            <Field label="Breed" error={errors.breed?.message}>
              <input
                type="text"
                placeholder="e.g. Golden Retriever"
                {...register('breed')}
                className={inputCls}
              />
            </Field>
            <Field label="Age (years)" required error={errors.age?.message}>
              <input
                type="number"
                min="0"
                max="30"
                step="0.5"
                placeholder="e.g. 2"
                {...register('age', { required: 'Age is required', min: { value: 0, message: 'Age cannot be negative' } })}
                className={inputCls}
              />
            </Field>
          </div>

          {/* Gender + Health */}
          <div className="grid sm:grid-cols-2 gap-5">
            <Field label="Gender" required error={errors.gender?.message}>
              <select
                {...register('gender', { required: 'Gender is required' })}
                className={inputCls}
              >
                <option value="">Select gender</option>
                {GENDERS.map((g) => <option key={g} value={g.toLowerCase()}>{g}</option>)}
              </select>
            </Field>
            <Field label="Health Status" required error={errors.healthStatus?.message}>
              <select
                {...register('healthStatus', { required: 'Health status is required' })}
                className={inputCls}
              >
                <option value="">Select health status</option>
                {HEALTH_STATUSES.map((h) => <option key={h} value={h.toLowerCase()}>{h}</option>)}
              </select>
            </Field>
          </div>

          {/* Vaccination + Location */}
          <div className="grid sm:grid-cols-2 gap-5">
            <Field label="Vaccination Status">
              <div className="flex items-center gap-3 mt-1">
                <label className="relative inline-flex items-center cursor-pointer">
                  <input
                    type="checkbox"
                    {...register('vaccinationStatus')}
                    className="sr-only peer"
                  />
                  <div className="w-11 h-6 bg-gray-200 peer-focus:ring-2 peer-focus:ring-brand/30 rounded-full peer dark:bg-gray-700 peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-brand" />
                </label>
                <span className="text-sm text-gray-600 dark:text-gray-400">Vaccinated</span>
              </div>
            </Field>
            <Field label="Adoption Fee ($)" error={errors.adoptionFee?.message}>
              <input
                type="number"
                min="0"
                placeholder="0 for free"
                {...register('adoptionFee', { min: { value: 0, message: 'Fee cannot be negative' } })}
                className={inputCls}
              />
            </Field>
          </div>

          {/* Location */}
          <Field label="Location" required error={errors.location?.message}>
            <div className="relative">
              <FiMapPin className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400" />
              <input
                type="text"
                placeholder="e.g. New York, NY"
                {...register('location', { required: 'Location is required' })}
                className={`${inputCls} pl-11`}
              />
            </div>
          </Field>

          {/* Description */}
          <Field label="Description" error={errors.description?.message}>
            <textarea
              rows={4}
              placeholder="Tell potential adopters about this pet's personality, habits, and special needs..."
              {...register('description')}
              className={`${inputCls} resize-none`}
            />
          </Field>

          {/* Owner Email (read only) */}
          <Field label="Owner Email">
            <input
              type="email"
              value={user?.email || ''}
              readOnly
              className={`${inputCls} bg-gray-50 dark:bg-gray-800 text-gray-500 cursor-not-allowed`}
            />
          </Field>

          <button
            type="submit"
            disabled={isSubmitting || mutation.isPending}
            className="w-full py-4 bg-brand text-white rounded-xl font-bold text-base hover:bg-orange-600 transition-all shadow-lg shadow-brand/25 disabled:opacity-70"
          >
            {mutation.isPending
              ? isEdit ? 'Updating...' : 'Adding Pet...'
              : isEdit ? 'Update Pet' : 'Add Pet for Adoption'}
          </button>
        </form>
      </motion.div>
    </div>
  );
};

export default AddPet;
