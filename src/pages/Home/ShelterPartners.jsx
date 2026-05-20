import { motion } from 'framer-motion';

const shelters = [
  { name: 'Happy Paws Shelter', city: 'New York, NY', pets: 42, logo: '🐾', rating: 4.9 },
  { name: 'Second Chance Rescue', city: 'Los Angeles, CA', pets: 38, logo: '💛', rating: 4.8 },
  { name: 'Furever Homes', city: 'Chicago, IL', pets: 29, logo: '🏠', rating: 4.9 },
  { name: 'Paws & Claws', city: 'Houston, TX', pets: 55, logo: '🐱', rating: 4.7 },
  { name: 'The Ark Rescue', city: 'Phoenix, AZ', pets: 33, logo: '🌟', rating: 4.8 },
  { name: 'Wings & Whiskers', city: 'Seattle, WA', pets: 22, logo: '🦜', rating: 5.0 },
];

const ShelterPartners = () => (
  <section className="py-24 bg-white dark:bg-gray-950">
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        className="text-center mb-16"
      >
        <span className="text-brand font-semibold text-sm uppercase tracking-widest">
          Trusted Network
        </span>
        <h2 className="font-display font-extrabold text-4xl text-gray-900 dark:text-white mt-2 mb-4">
          Our Partner Shelters
        </h2>
        <p className="text-gray-500 dark:text-gray-400 max-w-2xl mx-auto text-lg">
          We work with verified, compassionate shelters and rescues across the country to bring you the best pets.
        </p>
      </motion.div>

      <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
        {shelters.map((shelter, i) => (
          <motion.div
            key={shelter.name}
            initial={{ opacity: 0, scale: 0.95 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            transition={{ delay: i * 0.08 }}
            whileHover={{ y: -4 }}
            className="flex items-center gap-5 p-6 bg-gray-50 dark:bg-gray-900 rounded-2xl border border-gray-100 dark:border-gray-800 hover:border-brand/30 transition-all cursor-pointer group"
          >
            <div className="w-14 h-14 bg-white dark:bg-gray-800 rounded-xl flex items-center justify-center text-3xl shadow-sm shrink-0">
              {shelter.logo}
            </div>
            <div className="flex-1 min-w-0">
              <h3 className="font-semibold text-gray-900 dark:text-white text-sm group-hover:text-brand transition-colors truncate">
                {shelter.name}
              </h3>
              <p className="text-xs text-gray-500 mt-0.5">{shelter.city}</p>
              <div className="flex items-center gap-3 mt-2">
                <span className="text-xs bg-brand/10 text-brand px-2 py-0.5 rounded-full font-medium">
                  {shelter.pets} pets
                </span>
                <span className="text-xs text-amber-500 font-medium">
                  ⭐ {shelter.rating}
                </span>
              </div>
            </div>
          </motion.div>
        ))}
      </div>

      <motion.p
        initial={{ opacity: 0 }}
        whileInView={{ opacity: 1 }}
        viewport={{ once: true }}
        className="text-center text-sm text-gray-400 mt-8"
      >
        Want to partner with us? <a href="mailto:hello@pethouse.com" className="text-brand hover:underline">Contact our team →</a>
      </motion.p>
    </div>
  </section>
);

export default ShelterPartners;
