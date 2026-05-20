import { Link } from 'react-router-dom';
import { FaPaw, FaFacebookF, FaTwitter, FaInstagram, FaYoutube } from 'react-icons/fa';
import { FiMail, FiPhone, FiMapPin } from 'react-icons/fi';

const Footer = () => {
  const year = new Date().getFullYear();

  return (
    <footer className="bg-gray-900 text-gray-300">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12">
          {/* Brand */}
          <div className="lg:col-span-1">
            <div className="flex items-center gap-2 mb-4">
              <span className="text-brand text-2xl"><FaPaw /></span>
              <span className="font-display font-bold text-xl text-white">
                Pet<span className="text-brand">House</span>
              </span>
            </div>
            <p className="text-sm text-gray-400 leading-relaxed mb-6">
              Connecting loving families with pets who need a forever home.
              Every adoption changes two lives — yours and theirs.
            </p>
            <div className="flex gap-3">
              {[
                { icon: <FaFacebookF />, href: 'https://www.facebook.com/', label: 'Facebook' },
                { icon: <FaTwitter />,   href: 'https://twitter.com/',      label: 'Twitter' },
                { icon: <FaInstagram />, href: 'https://www.instagram.com/', label: 'Instagram' },
                { icon: <FaYoutube />,   href: 'https://www.youtube.com/',  label: 'YouTube' },
              ].map((s) => (
                <a
                  key={s.label}
                  href={s.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label={s.label}
                  className="w-9 h-9 bg-gray-800 hover:bg-brand rounded-xl flex items-center justify-center text-sm transition-all hover:scale-110"
                >
                  {s.icon}
                </a>
              ))}
            </div>
          </div>

          {/* Quick Links */}
          <div>
            <h3 className="font-semibold text-white mb-5">Quick Links</h3>
            <ul className="space-y-3">
              {[
                { to: '/', label: 'Home' },
                { to: '/pets', label: 'All Pets' },
                { to: '/dashboard/add-pet', label: 'List a Pet' },
                { to: '/dashboard/my-requests', label: 'My Requests' },
              ].map((l) => (
                <li key={l.to}>
                  <Link
                    to={l.to}
                    className="text-sm text-gray-400 hover:text-brand transition-colors flex items-center gap-2"
                  >
                    <span className="text-brand/50">›</span> {l.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Pet Categories */}
          <div>
            <h3 className="font-semibold text-white mb-5">Browse Pets</h3>
            <ul className="space-y-3">
              {['Dogs', 'Cats', 'Birds', 'Rabbits', 'Fish', 'Reptiles'].map((pet) => (
                <li key={pet}>
                  <Link
                    to={`/pets?species=${pet.toLowerCase()}`}
                    className="text-sm text-gray-400 hover:text-brand transition-colors flex items-center gap-2"
                  >
                    <span className="text-brand/50">›</span> {pet}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Contact */}
          <div>
            <h3 className="font-semibold text-white mb-5">Contact Us</h3>
            <ul className="space-y-4">
              <li className="flex items-start gap-3 text-sm text-gray-400">
                <FiMapPin className="text-brand mt-0.5 shrink-0" />
                <span>123 Pawsome Street, Pet City, PC 10001</span>
              </li>
              <li className="flex items-center gap-3 text-sm text-gray-400">
                <FiPhone className="text-brand shrink-0" />
                <a href="tel:+15551234567" className="hover:text-brand transition-colors">
                  +1 (555) 123-4567
                </a>
              </li>
              <li className="flex items-center gap-3 text-sm text-gray-400">
                <FiMail className="text-brand shrink-0" />
                <a href="mailto:hello@pethouse.com" className="hover:text-brand transition-colors">
                  hello@pethouse.com
                </a>
              </li>
            </ul>
          </div>
        </div>

        <div className="border-t border-gray-800 mt-12 pt-8 flex flex-col sm:flex-row items-center justify-between gap-4">
          <p className="text-sm text-gray-500">
            © {year} PetHouse. All rights reserved. Made with ❤️ for animals.
          </p>
          <div className="flex gap-6 text-sm text-gray-500">
            <a href="#" className="hover:text-brand transition-colors">Privacy Policy</a>
            <a href="#" className="hover:text-brand transition-colors">Terms of Service</a>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
