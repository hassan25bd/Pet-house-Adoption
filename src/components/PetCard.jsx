import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { FiMapPin, FiCalendar, FiHeart } from 'react-icons/fi';
import { FaPaw } from 'react-icons/fa';

const speciesEmoji = {
  dog: '🐕', cat: '🐈', bird: '🦜', rabbit: '🐰',
  fish: '🐠', reptile: '🦎', hamster: '🐹', other: '🐾',
};

const PetCard = ({ pet, index = 0 }) => {
  const emoji = speciesEmoji[pet.species?.toLowerCase()] || '🐾';

  return (
    <motion.div
      initial={{ opacity: 0, y: 30 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.4, delay: index * 0.08 }}
      whileHover={{ y: -6 }}
      className="group bg-white dark:bg-gray-900 rounded-2xl overflow-hidden shadow-card hover:shadow-card-hover transition-all duration-300 border border-gray-100 dark:border-gray-800"
    >
      {/* Image */}
      <div className="relative h-52 overflow-hidden bg-gradient-to-br from-orange-50 to-amber-50 dark:from-gray-800 dark:to-gray-700">
        <img
          src={pet.image}
          alt={pet.name}
          className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
          onError={(e) => {
            e.target.style.display = 'none';
            e.target.nextSibling.style.display = 'flex';
          }}
        />
        <div
          className="hidden w-full h-full items-center justify-center text-6xl"
          style={{ display: 'none' }}
        >
          {emoji}
        </div>

        {/* Status badge */}
        <div className="absolute top-3 left-3">
          <span
            className={`px-3 py-1 rounded-full text-xs font-semibold backdrop-blur-sm ${
              pet.status === 'available'
                ? 'bg-green-500/90 text-white'
                : 'bg-gray-500/90 text-white'
            }`}
          >
            {pet.status === 'available' ? 'Available' : 'Adopted'}
          </span>
        </div>

        {/* Species badge */}
        <div className="absolute top-3 right-3">
          <span className="px-2.5 py-1 rounded-full text-xs font-semibold bg-white/90 dark:bg-gray-900/90 text-gray-700 dark:text-gray-200 backdrop-blur-sm capitalize">
            {emoji} {pet.species}
          </span>
        </div>

        {/* Wishlist button */}
        <button className="absolute bottom-3 right-3 w-8 h-8 bg-white/90 dark:bg-gray-900/90 rounded-full flex items-center justify-center text-gray-400 hover:text-red-500 transition-colors backdrop-blur-sm shadow-sm">
          <FiHeart className="text-sm" />
        </button>
      </div>

      {/* Content */}
      <div className="p-5">
        <div className="flex items-start justify-between mb-2">
          <h3 className="font-display font-bold text-lg text-gray-900 dark:text-white leading-tight">
            {pet.name}
          </h3>
          {pet.adoptionFee > 0 ? (
            <span className="text-brand font-bold text-sm shrink-0 ml-2">
              ${pet.adoptionFee}
            </span>
          ) : (
            <span className="text-green-500 font-bold text-sm shrink-0 ml-2">Free</span>
          )}
        </div>

        <p className="text-sm text-gray-500 dark:text-gray-400 mb-3 capitalize">
          {pet.breed || pet.species} • {pet.gender}
        </p>

        <div className="flex items-center gap-4 text-xs text-gray-500 dark:text-gray-400 mb-4">
          <span className="flex items-center gap-1.5">
            <FiCalendar className="text-brand" />
            {pet.age} {pet.age === 1 ? 'year' : 'years'} old
          </span>
          {pet.location && (
            <span className="flex items-center gap-1.5 truncate">
              <FiMapPin className="text-brand shrink-0" />
              <span className="truncate">{pet.location}</span>
            </span>
          )}
        </div>

        {/* Health tags */}
        <div className="flex gap-2 mb-4">
          {pet.vaccinationStatus && (
            <span className="px-2.5 py-1 bg-green-50 dark:bg-green-900/20 text-green-700 dark:text-green-400 text-xs rounded-lg font-medium">
              ✓ Vaccinated
            </span>
          )}
          {pet.healthStatus && (
            <span className="px-2.5 py-1 bg-blue-50 dark:bg-blue-900/20 text-blue-700 dark:text-blue-400 text-xs rounded-lg font-medium capitalize">
              {pet.healthStatus}
            </span>
          )}
        </div>

        <Link
          to={`/pets/${pet._id}`}
          className="w-full flex items-center justify-center gap-2 py-2.5 bg-brand text-white rounded-xl text-sm font-semibold hover:bg-orange-600 transition-all shadow-sm hover:shadow-brand/25"
        >
          <FaPaw className="text-xs" />
          View Details
        </Link>
      </div>
    </motion.div>
  );
};

export default PetCard;
