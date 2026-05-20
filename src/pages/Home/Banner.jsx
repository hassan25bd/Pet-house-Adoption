import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { FiArrowRight, FiSearch } from 'react-icons/fi';

const fadeUp = (delay = 0) => ({
  initial: { opacity: 0, y: 40 },
  animate: { opacity: 1, y: 0 },
  transition: { duration: 0.6, delay, ease: 'easeOut' },
});

const Banner = () => (
  <section className="relative min-h-screen flex items-center overflow-hidden bg-gradient-to-br from-orange-50 via-amber-50 to-white dark:from-gray-950 dark:via-gray-900 dark:to-gray-950">
    {/* Background blobs */}
    <div className="absolute top-20 right-10 w-96 h-96 bg-brand/10 rounded-full blur-3xl pointer-events-none" />
    <div className="absolute bottom-20 left-10 w-72 h-72 bg-amber-300/15 rounded-full blur-3xl pointer-events-none" />

    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-24 grid lg:grid-cols-2 gap-16 items-center">
      {/* Text */}
      <div>
        <motion.div {...fadeUp(0.1)}>
          <span className="inline-flex items-center gap-2 px-4 py-2 bg-brand/10 text-brand rounded-full text-sm font-semibold mb-6">
            🐾 Over 2,000 pets need a home
          </span>
        </motion.div>

        <motion.h1
          {...fadeUp(0.2)}
          className="font-display font-extrabold text-5xl sm:text-6xl lg:text-7xl text-gray-900 dark:text-white leading-tight mb-6"
        >
          Find Your{' '}
          <span className="text-transparent bg-clip-text bg-gradient-to-r from-brand to-amber-500">
            Forever
          </span>{' '}
          Friend
        </motion.h1>

        <motion.p {...fadeUp(0.3)} className="text-lg text-gray-600 dark:text-gray-400 leading-relaxed mb-10 max-w-lg">
          Thousands of loving pets are waiting for a family like yours. Browse our available pets and give them the home they deserve.
        </motion.p>

        <motion.div {...fadeUp(0.4)} className="flex flex-wrap gap-4">
          <Link
            to="/pets"
            className="inline-flex items-center gap-2 px-8 py-4 bg-brand text-white rounded-2xl font-semibold text-lg hover:bg-orange-600 transition-all shadow-lg shadow-brand/25 hover:shadow-brand/40 hover:-translate-y-0.5"
          >
            Adopt Now <FiArrowRight />
          </Link>
          <Link
            to="/dashboard/add-pet"
            className="inline-flex items-center gap-2 px-8 py-4 bg-white dark:bg-gray-800 text-gray-900 dark:text-white rounded-2xl font-semibold text-lg border border-gray-200 dark:border-gray-700 hover:border-brand/50 transition-all hover:-translate-y-0.5"
          >
            List a Pet
          </Link>
        </motion.div>

        {/* Quick search */}
        <motion.div {...fadeUp(0.5)} className="mt-10">
          <Link
            to="/pets"
            className="inline-flex items-center gap-3 px-5 py-3 bg-white dark:bg-gray-800 rounded-xl border border-gray-200 dark:border-gray-700 text-sm text-gray-500 hover:border-brand/50 transition-all shadow-sm w-full max-w-sm"
          >
            <FiSearch className="text-brand" />
            Search by name, breed, or species...
            <span className="ml-auto bg-gray-100 dark:bg-gray-700 px-2 py-0.5 rounded text-xs">Search</span>
          </Link>
        </motion.div>

        {/* Stats row */}
        <motion.div {...fadeUp(0.6)} className="mt-10 flex flex-wrap gap-8">
          {[
            { value: '2,500+', label: 'Pets Available' },
            { value: '1,800+', label: 'Happy Adoptions' },
            { value: '50+', label: 'Partner Shelters' },
          ].map((stat) => (
            <div key={stat.label}>
              <p className="font-display font-extrabold text-2xl text-gray-900 dark:text-white">{stat.value}</p>
              <p className="text-sm text-gray-500 dark:text-gray-400">{stat.label}</p>
            </div>
          ))}
        </motion.div>
      </div>

      {/* Hero image grid */}
      <motion.div
        initial={{ opacity: 0, scale: 0.9 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.7, delay: 0.3 }}
        className="hidden lg:grid grid-cols-2 gap-4"
      >
        {[
          { src: 'https://images.unsplash.com/photo-1587300003388-59208cc962cb?w=400&h=300&fit=crop&crop=face', alt: 'Golden Retriever', label: 'Dogs' },
          { src: 'https://images.unsplash.com/photo-1514888286974-6c03e2ca1dba?w=400&h=300&fit=crop&crop=face', alt: 'Orange Cat', label: 'Cats' },
          { src: 'https://images.unsplash.com/photo-1522926193341-e9ffd686c60f?w=400&h=300&fit=crop&crop=top', alt: 'Colorful Parrot', label: 'Birds' },
          { src: 'https://images.unsplash.com/photo-1518796745738-41048802f99a?w=400&h=300&fit=crop&crop=center', alt: 'Rabbit', label: 'Rabbits' },
        ].map((img, i) => (
          <motion.div
            key={img.label}
            animate={{ y: i % 2 === 0 ? [0, -12, 0] : [0, 12, 0] }}
            transition={{ duration: 4 + i, repeat: Infinity, ease: 'easeInOut' }}
            className="relative rounded-2xl overflow-hidden shadow-xl group"
          >
            <img src={img.src} alt={img.alt} className="w-full h-44 object-cover group-hover:scale-105 transition-transform duration-500" />
            <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black/60 to-transparent p-3">
              <span className="text-white text-sm font-semibold">{img.label}</span>
            </div>
          </motion.div>
        ))}
      </motion.div>
    </div>
  </section>
);

export default Banner;
