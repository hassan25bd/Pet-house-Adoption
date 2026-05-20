import { motion } from 'framer-motion';
import { FiHeart, FiShield, FiSmile, FiStar, FiUsers, FiZap } from 'react-icons/fi';

const reasons = [
  {
    icon: <FiHeart />,
    title: 'Save a Life',
    description: 'Every adoption directly saves a pet from the shelter and opens space for another animal in need.',
    color: 'bg-red-50 text-red-500 dark:bg-red-900/20',
  },
  {
    icon: <FiSmile />,
    title: 'Unconditional Love',
    description: 'Adopted pets form incredibly deep bonds with their families and bring immeasurable joy.',
    color: 'bg-yellow-50 text-yellow-500 dark:bg-yellow-900/20',
  },
  {
    icon: <FiShield />,
    title: 'Health Checked',
    description: 'All our listed pets are health-checked, vaccinated, and ready for their new home.',
    color: 'bg-green-50 text-green-600 dark:bg-green-900/20',
  },
  {
    icon: <FiStar />,
    title: 'Known Personality',
    description: 'Shelter pets are observed over time — you know exactly what temperament you are getting.',
    color: 'bg-purple-50 text-purple-500 dark:bg-purple-900/20',
  },
  {
    icon: <FiUsers />,
    title: 'Community Support',
    description: 'Join thousands of adopters with access to our community, tips, and ongoing support resources.',
    color: 'bg-blue-50 text-blue-500 dark:bg-blue-900/20',
  },
  {
    icon: <FiZap />,
    title: 'Easy Process',
    description: 'Our streamlined adoption process gets you matched with the right pet quickly and smoothly.',
    color: 'bg-orange-50 text-brand dark:bg-orange-900/20',
  },
];

const WhyAdopt = () => (
  <section className="py-24 bg-gray-50 dark:bg-gray-900">
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        className="text-center mb-16"
      >
        <span className="text-brand font-semibold text-sm uppercase tracking-widest">
          The Benefits
        </span>
        <h2 className="font-display font-extrabold text-4xl text-gray-900 dark:text-white mt-2 mb-4">
          Why Adopt a Pet?
        </h2>
        <p className="text-gray-500 dark:text-gray-400 max-w-2xl mx-auto text-lg">
          Adopting is one of the most rewarding decisions you'll ever make — for both you and your new companion.
        </p>
      </motion.div>

      <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-8">
        {reasons.map((reason, i) => (
          <motion.div
            key={reason.title}
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: i * 0.1 }}
            whileHover={{ y: -4 }}
            className="bg-white dark:bg-gray-950 rounded-2xl p-8 shadow-card hover:shadow-card-hover transition-all border border-gray-100 dark:border-gray-800"
          >
            <div className={`w-14 h-14 rounded-2xl flex items-center justify-center text-2xl mb-5 ${reason.color}`}>
              {reason.icon}
            </div>
            <h3 className="font-display font-bold text-xl text-gray-900 dark:text-white mb-3">
              {reason.title}
            </h3>
            <p className="text-gray-500 dark:text-gray-400 leading-relaxed">{reason.description}</p>
          </motion.div>
        ))}
      </div>
    </div>
  </section>
);

export default WhyAdopt;
