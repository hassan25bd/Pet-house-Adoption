import { motion } from 'framer-motion';
import { FiStar } from 'react-icons/fi';

const stories = [
  {
    name: 'Sarah & Max',
    role: 'Adopted a Golden Retriever',
    avatar: 'https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=80&h=80&fit=crop&crop=face',
    petImage: 'https://images.unsplash.com/photo-1587300003388-59208cc962cb?w=120&h=120&fit=crop',
    rating: 5,
    story:
      'Max came into our lives when we needed him most. The whole process was so smooth and the team was incredibly supportive. He has brought so much joy and laughter to our home every single day.',
    date: 'March 2024',
  },
  {
    name: 'James & Luna',
    role: 'Adopted a Persian Cat',
    avatar: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=80&h=80&fit=crop&crop=face',
    petImage: 'https://images.unsplash.com/photo-1514888286974-6c03e2ca1dba?w=120&h=120&fit=crop',
    rating: 5,
    story:
      'Luna was shy at first but now she owns the whole apartment. PetHouse made the adoption so easy with their step-by-step guidance. I could not imagine life without her constant purring.',
    date: 'January 2024',
  },
  {
    name: 'Emily & Rio',
    role: 'Adopted an African Grey',
    avatar: 'https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=80&h=80&fit=crop&crop=face',
    petImage: 'https://images.unsplash.com/photo-1552728089-57bdde30beb3?w=120&h=120&fit=crop',
    rating: 5,
    story:
      'Rio already knew 50 words when we got him! The detailed pet profile on PetHouse helped us understand exactly what we were getting. He is the most entertaining member of our family.',
    date: 'February 2024',
  },
];

const SuccessStories = () => (
  <section className="py-24 bg-white dark:bg-gray-950">
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        className="text-center mb-16"
      >
        <span className="text-brand font-semibold text-sm uppercase tracking-widest">
          Happy Families
        </span>
        <h2 className="font-display font-extrabold text-4xl text-gray-900 dark:text-white mt-2 mb-4">
          Success Stories
        </h2>
        <p className="text-gray-500 dark:text-gray-400 max-w-2xl mx-auto text-lg">
          Real stories from real families who found their perfect match through PetHouse.
        </p>
      </motion.div>

      <div className="grid md:grid-cols-3 gap-8">
        {stories.map((story, i) => (
          <motion.div
            key={story.name}
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: i * 0.12 }}
            className="bg-gray-50 dark:bg-gray-900 rounded-2xl p-8 border border-gray-100 dark:border-gray-800 relative overflow-hidden"
          >
            {/* Quote mark */}
            <span className="absolute top-6 right-8 text-8xl font-serif text-brand/10 leading-none select-none">
              "
            </span>

            {/* Stars */}
            <div className="flex gap-1 mb-5">
              {Array.from({ length: story.rating }).map((_, j) => (
                <FiStar key={j} className="text-amber-400 fill-amber-400 text-sm" />
              ))}
            </div>

            {/* Story */}
            <p className="text-gray-600 dark:text-gray-400 leading-relaxed mb-6 relative z-10">
              "{story.story}"
            </p>

            {/* Author */}
            <div className="flex items-center gap-4">
              <img
                src={story.avatar}
                alt={story.name}
                className="w-12 h-12 rounded-full object-cover ring-2 ring-brand/20"
              />
              <div className="flex-1">
                <p className="font-semibold text-gray-900 dark:text-white text-sm">{story.name}</p>
                <p className="text-xs text-gray-500">{story.role} · {story.date}</p>
              </div>
              <img
                src={story.petImage}
                alt="pet"
                className="w-12 h-12 rounded-xl object-cover"
              />
            </div>
          </motion.div>
        ))}
      </div>
    </div>
  </section>
);

export default SuccessStories;
