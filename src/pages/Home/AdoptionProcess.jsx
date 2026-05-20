import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import { FiArrowRight } from 'react-icons/fi';

const steps = [
  {
    step: '01',
    emoji: '🔍',
    title: 'Browse Pets',
    description: 'Explore our curated listings of dogs, cats, birds, rabbits, and more. Filter by species, age, location, or fee.',
    color: 'text-blue-500 bg-blue-50 dark:bg-blue-900/20',
  },
  {
    step: '02',
    emoji: '💌',
    title: 'Send a Request',
    description: 'Found your match? Create an account and submit an adoption request with your preferred pickup date and a message.',
    color: 'text-green-500 bg-green-50 dark:bg-green-900/20',
  },
  {
    step: '03',
    emoji: '✅',
    title: 'Get Approved',
    description: 'The pet\'s owner reviews your request. Once approved, you\'ll be notified and can arrange to meet your new companion.',
    color: 'text-brand bg-orange-50 dark:bg-orange-900/20',
  },
  {
    step: '04',
    emoji: '🏡',
    title: 'Welcome Home',
    description: 'Pick up your new furry family member and start an incredible journey together. Your forever friend is waiting!',
    color: 'text-purple-500 bg-purple-50 dark:bg-purple-900/20',
  },
];

const AdoptionProcess = () => (
  <section className="py-24 bg-gray-50 dark:bg-gray-900">
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        className="text-center mb-16"
      >
        <span className="text-brand font-semibold text-sm uppercase tracking-widest">
          Simple Steps
        </span>
        <h2 className="font-display font-extrabold text-4xl text-gray-900 dark:text-white mt-2 mb-4">
          How Adoption Works
        </h2>
        <p className="text-gray-500 dark:text-gray-400 max-w-2xl mx-auto text-lg">
          Our adoption process is designed to be transparent, safe, and joyful for everyone involved.
        </p>
      </motion.div>

      {/* Steps */}
      <div className="relative">
        {/* Connecting line */}
        <div className="hidden lg:block absolute top-16 left-1/2 -translate-x-1/2 w-3/4 h-0.5 bg-gradient-to-r from-transparent via-gray-200 dark:via-gray-700 to-transparent" />

        <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-8">
          {steps.map((step, i) => (
            <motion.div
              key={step.step}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.15 }}
              className="text-center relative"
            >
              {/* Number bubble */}
              <div className={`w-14 h-14 rounded-2xl ${step.color} flex items-center justify-center text-2xl mx-auto mb-6 font-display font-bold relative z-10`}>
                {step.emoji}
              </div>
              <span className="absolute top-0 right-1/4 text-xs font-bold text-gray-300 dark:text-gray-600">
                {step.step}
              </span>
              <h3 className="font-display font-bold text-xl text-gray-900 dark:text-white mb-3">
                {step.title}
              </h3>
              <p className="text-gray-500 dark:text-gray-400 text-sm leading-relaxed">
                {step.description}
              </p>
            </motion.div>
          ))}
        </div>
      </div>

      <motion.div
        initial={{ opacity: 0, y: 16 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        className="text-center mt-14"
      >
        <Link
          to="/pets"
          className="inline-flex items-center gap-2 px-8 py-4 bg-brand text-white rounded-2xl font-semibold text-lg hover:bg-orange-600 transition-all shadow-lg shadow-brand/25 hover:-translate-y-0.5"
        >
          Start Browsing <FiArrowRight />
        </Link>
      </motion.div>
    </div>
  </section>
);

export default AdoptionProcess;
