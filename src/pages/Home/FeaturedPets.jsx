import { Link } from 'react-router-dom';
import { useQuery } from '@tanstack/react-query';
import { motion } from 'framer-motion';
import { FiArrowRight } from 'react-icons/fi';
import useAxiosPublic from '../../hooks/useAxiosPublic';
import PetCard from '../../components/PetCard';
import LoadingSpinner from '../../components/shared/LoadingSpinner';

const FeaturedPets = () => {
  const axiosPublic = useAxiosPublic();
  const { data: pets = [], isLoading } = useQuery({
    queryKey: ['featured-pets'],
    queryFn: async () => {
      const res = await axiosPublic.get('/pets/featured');
      return res.data;
    },
  });

  return (
    <section className="py-24 bg-white dark:bg-gray-950">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="flex flex-col sm:flex-row sm:items-end justify-between mb-14 gap-4">
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
          >
            <span className="text-brand font-semibold text-sm uppercase tracking-widest">
              Ready for Adoption
            </span>
            <h2 className="font-display font-extrabold text-4xl text-gray-900 dark:text-white mt-2">
              Meet Our Featured Pets
            </h2>
            <p className="text-gray-500 dark:text-gray-400 mt-3 max-w-lg">
              These wonderful companions are eagerly waiting to find their forever family.
            </p>
          </motion.div>
          <motion.div
            initial={{ opacity: 0, x: 20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
          >
            <Link
              to="/pets"
              className="inline-flex items-center gap-2 text-brand font-semibold hover:gap-3 transition-all"
            >
              View All Pets <FiArrowRight />
            </Link>
          </motion.div>
        </div>

        {isLoading ? (
          <LoadingSpinner fullScreen={false} />
        ) : pets.length === 0 ? (
          <div className="text-center py-20">
            <p className="text-6xl mb-4">🐾</p>
            <p className="text-gray-500 text-lg">No pets listed yet. Be the first to add one!</p>
            <Link
              to="/dashboard/add-pet"
              className="inline-flex items-center gap-2 mt-6 px-6 py-3 bg-brand text-white rounded-xl font-semibold hover:bg-orange-600 transition-all"
            >
              Add a Pet
            </Link>
          </div>
        ) : (
          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-8">
            {pets.map((pet, i) => (
              <PetCard key={pet._id} pet={pet} index={i} />
            ))}
          </div>
        )}
      </div>
    </section>
  );
};

export default FeaturedPets;
