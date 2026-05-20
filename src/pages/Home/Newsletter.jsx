import { useState } from 'react';
import { motion } from 'framer-motion';
import { FiSend } from 'react-icons/fi';
import toast from 'react-hot-toast';

const Newsletter = () => {
  const [email, setEmail] = useState('');
  const [loading, setLoading] = useState(false);

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!email) return;
    setLoading(true);
    setTimeout(() => {
      toast.success('You are now subscribed! 🐾 Welcome to the PetHouse family!');
      setEmail('');
      setLoading(false);
    }, 900);
  };

  return (
    <section className="py-24 bg-white dark:bg-gray-950">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="bg-gradient-to-br from-orange-50 to-amber-50 dark:from-gray-900 dark:to-gray-800 rounded-3xl p-12 text-center border border-orange-100 dark:border-gray-700 relative overflow-hidden"
        >
          <div className="absolute top-4 left-4 text-4xl opacity-20 rotate-12">🐾</div>
          <div className="absolute bottom-4 right-4 text-4xl opacity-20 -rotate-12">🐾</div>

          <span className="text-brand font-semibold text-sm uppercase tracking-widest">
            Stay Updated
          </span>
          <h2 className="font-display font-extrabold text-4xl text-gray-900 dark:text-white mt-2 mb-3">
            Never Miss a New Arrival
          </h2>
          <p className="text-gray-500 dark:text-gray-400 text-lg max-w-lg mx-auto mb-8">
            Subscribe to get weekly updates about new pets, adoption events, and exclusive pet care tips.
          </p>

          <form
            onSubmit={handleSubmit}
            className="flex flex-col sm:flex-row gap-3 max-w-md mx-auto"
          >
            <input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="Enter your email address"
              required
              className="flex-1 px-5 py-3.5 rounded-xl border border-gray-200 dark:border-gray-700 bg-white dark:bg-gray-800 text-gray-900 dark:text-white text-sm outline-none focus:ring-2 focus:ring-brand/30 focus:border-brand transition-all"
            />
            <button
              type="submit"
              disabled={loading}
              className="inline-flex items-center justify-center gap-2 px-6 py-3.5 bg-brand text-white rounded-xl font-semibold text-sm hover:bg-orange-600 transition-all shadow-md shadow-brand/25 disabled:opacity-70 shrink-0"
            >
              {loading ? 'Subscribing...' : <><FiSend /> Subscribe</>}
            </button>
          </form>

          <p className="text-xs text-gray-400 mt-4">
            No spam, ever. Unsubscribe anytime. 🐶
          </p>
        </motion.div>
      </div>
    </section>
  );
};

export default Newsletter;
