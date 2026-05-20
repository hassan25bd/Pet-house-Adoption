import { motion } from 'framer-motion';

const tips = [
  {
    emoji: '🍽️',
    title: 'Balanced Nutrition',
    description:
      'Feed species-appropriate, high-quality food. Consult your vet to determine the right portion size and diet plan for your pet\'s age and health.',
    bg: 'from-orange-50 to-amber-50 dark:from-orange-900/10 dark:to-amber-900/10',
    border: 'border-orange-100 dark:border-orange-800/30',
  },
  {
    emoji: '🏃',
    title: 'Regular Exercise',
    description:
      'Daily physical activity keeps pets healthy and mentally stimulated. Dogs need walks, cats need playtime, and even small pets benefit from enrichment.',
    bg: 'from-blue-50 to-sky-50 dark:from-blue-900/10 dark:to-sky-900/10',
    border: 'border-blue-100 dark:border-blue-800/30',
  },
  {
    emoji: '🩺',
    title: 'Veterinary Care',
    description:
      'Schedule annual check-ups and stay current on vaccinations and parasite prevention. Early detection of health issues saves lives and money.',
    bg: 'from-green-50 to-emerald-50 dark:from-green-900/10 dark:to-emerald-900/10',
    border: 'border-green-100 dark:border-green-800/30',
  },
  {
    emoji: '🛁',
    title: 'Grooming & Hygiene',
    description:
      'Regular grooming prevents matting, skin problems, and infections. Brush teeth, clean ears, and trim nails as part of a routine care schedule.',
    bg: 'from-purple-50 to-violet-50 dark:from-purple-900/10 dark:to-violet-900/10',
    border: 'border-purple-100 dark:border-purple-800/30',
  },
  {
    emoji: '💕',
    title: 'Love & Socialization',
    description:
      'Pets thrive on love and social interaction. Spend quality time daily, introduce them to new experiences gently, and reward positive behavior.',
    bg: 'from-pink-50 to-rose-50 dark:from-pink-900/10 dark:to-rose-900/10',
    border: 'border-pink-100 dark:border-pink-800/30',
  },
  {
    emoji: '🏠',
    title: 'Safe Environment',
    description:
      'Pet-proof your home by securing hazardous items, providing a comfortable sleeping area, and ensuring your pet cannot accidentally escape.',
    bg: 'from-yellow-50 to-lime-50 dark:from-yellow-900/10 dark:to-lime-900/10',
    border: 'border-yellow-100 dark:border-yellow-800/30',
  },
];

const PetCareTips = () => (
  <section className="py-24 bg-gray-50 dark:bg-gray-900">
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        className="text-center mb-16"
      >
        <span className="text-brand font-semibold text-sm uppercase tracking-widest">
          Expert Advice
        </span>
        <h2 className="font-display font-extrabold text-4xl text-gray-900 dark:text-white mt-2 mb-4">
          Pet Care Tips
        </h2>
        <p className="text-gray-500 dark:text-gray-400 max-w-2xl mx-auto text-lg">
          Give your new companion the best start with these essential care guidelines recommended by veterinary experts.
        </p>
      </motion.div>

      <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
        {tips.map((tip, i) => (
          <motion.div
            key={tip.title}
            initial={{ opacity: 0, y: 24 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: i * 0.08 }}
            whileHover={{ y: -4, scale: 1.01 }}
            className={`bg-gradient-to-br ${tip.bg} rounded-2xl p-7 border ${tip.border} transition-all duration-300`}
          >
            <span className="text-4xl block mb-4">{tip.emoji}</span>
            <h3 className="font-display font-bold text-lg text-gray-900 dark:text-white mb-2">
              {tip.title}
            </h3>
            <p className="text-gray-600 dark:text-gray-400 text-sm leading-relaxed">
              {tip.description}
            </p>
          </motion.div>
        ))}
      </div>
    </div>
  </section>
);

export default PetCareTips;
