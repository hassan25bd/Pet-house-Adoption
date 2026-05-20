import { Link, useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import { FiHome, FiArrowLeft } from 'react-icons/fi';

const NotFound = () => {
  const navigate = useNavigate();

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-orange-50 via-amber-50 to-white dark:from-gray-950 dark:via-gray-900 dark:to-gray-950 px-4">
      <motion.div
        initial={{ opacity: 0, y: 30 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className="text-center max-w-md"
      >
        {/* Animated paw */}
        <motion.div
          animate={{ rotate: [0, -10, 10, -10, 0] }}
          transition={{ duration: 1.5, repeat: Infinity, repeatDelay: 2 }}
          className="text-9xl mb-6 select-none"
        >
          🐾
        </motion.div>

        <h1 className="font-display font-extrabold text-8xl text-brand mb-2">404</h1>
        <h2 className="font-display font-bold text-2xl text-gray-900 dark:text-white mb-3">
          Lost in the Paw-ticulars!
        </h2>
        <p className="text-gray-500 dark:text-gray-400 leading-relaxed mb-8">
          The page you're looking for has wandered off like a curious pup. Let's get you back on the right trail!
        </p>

        <div className="flex flex-col sm:flex-row gap-3 justify-center">
          <Link
            to="/"
            className="inline-flex items-center justify-center gap-2 px-6 py-3.5 bg-brand text-white rounded-xl font-semibold hover:bg-orange-600 transition-all shadow-lg shadow-brand/25"
          >
            <FiHome /> Back to Home
          </Link>
          <button
            onClick={() => navigate(-1)}
            className="inline-flex items-center justify-center gap-2 px-6 py-3.5 bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 text-gray-700 dark:text-gray-200 rounded-xl font-semibold hover:border-brand/50 transition-all"
          >
            <FiArrowLeft /> Go Back
          </button>
        </div>
      </motion.div>
    </div>
  );
};

export default NotFound;
