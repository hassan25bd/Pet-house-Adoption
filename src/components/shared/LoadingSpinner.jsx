import { FaPaw } from 'react-icons/fa';
import { motion } from 'framer-motion';

const LoadingSpinner = ({ fullScreen = true }) => (
  <div
    className={`flex flex-col items-center justify-center gap-4 ${
      fullScreen ? 'min-h-screen' : 'py-24'
    } bg-[var(--bg)]`}
  >
    <motion.div
      animate={{ rotate: 360 }}
      transition={{ duration: 1.2, repeat: Infinity, ease: 'linear' }}
      className="text-brand text-5xl"
    >
      <FaPaw />
    </motion.div>
    <p className="text-gray-500 dark:text-gray-400 text-sm font-medium animate-pulse">
      Loading...
    </p>
  </div>
);

export default LoadingSpinner;
