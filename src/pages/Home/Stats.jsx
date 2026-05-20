import { useQuery } from '@tanstack/react-query';
import { motion } from 'framer-motion';
import CountUp from 'react-countup';
import { useInView } from 'react-intersection-observer';
import useAxiosPublic from '../../hooks/useAxiosPublic';

const fallback = {
  totalPets: 2500, adoptedPets: 1800, availablePets: 700, totalUsers: 5000,
};

const Stats = () => {
  const axiosPublic = useAxiosPublic();
  const [ref, inView] = useInView({ triggerOnce: true, threshold: 0.3 });

  const { data: stats = fallback } = useQuery({
    queryKey: ['stats'],
    queryFn: async () => {
      const res = await axiosPublic.get('/stats');
      const d = res.data;
      return {
        totalPets:    Math.max(d.totalPets, fallback.totalPets),
        adoptedPets:  Math.max(d.adoptedPets, fallback.adoptedPets),
        availablePets:Math.max(d.availablePets, fallback.availablePets),
        totalUsers:   Math.max(d.totalUsers, fallback.totalUsers),
      };
    },
  });

  const items = [
    { value: stats.totalPets,     suffix: '+', label: 'Total Pets Listed',    emoji: '🐾' },
    { value: stats.adoptedPets,   suffix: '+', label: 'Successful Adoptions', emoji: '🏡' },
    { value: stats.availablePets, suffix: '+', label: 'Pets Available Now',   emoji: '🐶' },
    { value: stats.totalUsers,    suffix: '+', label: 'Registered Users',     emoji: '👨‍👩‍👧' },
  ];

  return (
    <section className="py-24 bg-gradient-to-br from-brand to-orange-600 relative overflow-hidden">
      {/* Background pattern */}
      <div className="absolute inset-0 opacity-10">
        <div className="absolute top-8 left-8 text-8xl">🐾</div>
        <div className="absolute top-8 right-8 text-8xl">🐾</div>
        <div className="absolute bottom-8 left-1/4 text-8xl">🐾</div>
        <div className="absolute bottom-8 right-1/4 text-8xl">🐾</div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center mb-14"
        >
          <h2 className="font-display font-extrabold text-4xl text-white mb-3">
            Our Impact in Numbers
          </h2>
          <p className="text-orange-100 text-lg max-w-xl mx-auto">
            Every number represents a life changed — both a pet's and a family's.
          </p>
        </motion.div>

        <div ref={ref} className="grid sm:grid-cols-2 lg:grid-cols-4 gap-8">
          {items.map((item, i) => (
            <motion.div
              key={item.label}
              initial={{ opacity: 0, scale: 0.8 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.1 }}
              className="text-center bg-white/10 backdrop-blur-sm rounded-2xl p-8 border border-white/20"
            >
              <div className="text-5xl mb-3">{item.emoji}</div>
              <div className="font-display font-extrabold text-5xl text-white mb-2">
                {inView ? (
                  <CountUp end={item.value} duration={2.5} separator="," suffix={item.suffix} />
                ) : (
                  '0'
                )}
              </div>
              <p className="text-orange-100 font-medium">{item.label}</p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Stats;
