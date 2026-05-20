import { useState } from 'react';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import { useForm } from 'react-hook-form';
import { motion } from 'framer-motion';
import toast from 'react-hot-toast';
import { FiMail, FiLock, FiEye, FiEyeOff } from 'react-icons/fi';
import { FaGoogle, FaPaw } from 'react-icons/fa';
import useAuth from '../../hooks/useAuth';

const Login = () => {
  const [showPass, setShowPass] = useState(false);
  const { signIn, googleSignIn } = useAuth();
  const navigate = useNavigate();
  const location = useLocation();
  const from = location.state?.from?.pathname || '/';

  const { register, handleSubmit, formState: { errors, isSubmitting } } = useForm();

  const onSubmit = async (data) => {
    try {
      await signIn(data.email, data.password);
      toast.success('Welcome back! 🐾');
      navigate(from, { replace: true });
    } catch (err) {
      const msg = err.code === 'auth/invalid-credential'
        ? 'Invalid email or password'
        : err.message;
      toast.error(msg);
    }
  };

  const handleGoogle = async () => {
    try {
      await googleSignIn();
      toast.success('Signed in with Google! 🎉');
      navigate(from, { replace: true });
    } catch (err) {
      toast.error(err.message);
    }
  };

  return (
    <div className="min-h-screen flex bg-gradient-to-br from-orange-50 via-amber-50 to-white dark:from-gray-950 dark:via-gray-900 dark:to-gray-950">
      {/* Left panel */}
      <div className="hidden lg:flex flex-1 items-center justify-center bg-gradient-to-br from-brand to-orange-600 relative overflow-hidden">
        <div className="absolute inset-0 opacity-10">
          {['🐶', '🐱', '🐰', '🦜', '🐠', '🐾'].map((e, i) => (
            <span key={i} className="absolute text-6xl" style={{ top: `${15 + i * 14}%`, left: `${10 + (i % 3) * 30}%` }}>{e}</span>
          ))}
        </div>
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-center text-white z-10 p-12"
        >
          <div className="text-6xl mb-4"><FaPaw /></div>
          <h2 className="font-display font-extrabold text-4xl mb-3">Welcome Back!</h2>
          <p className="text-orange-100 text-lg max-w-xs mx-auto leading-relaxed">
            Sign in to manage your listings and track adoption requests.
          </p>
        </motion.div>
      </div>

      {/* Right panel - form */}
      <div className="flex-1 flex items-center justify-center p-8">
        <motion.div
          initial={{ opacity: 0, x: 30 }}
          animate={{ opacity: 1, x: 0 }}
          className="w-full max-w-md"
        >
          {/* Logo */}
          <Link to="/" className="flex items-center gap-2 mb-8">
            <FaPaw className="text-brand text-2xl" />
            <span className="font-display font-bold text-xl text-gray-900 dark:text-white">
              Pet<span className="text-brand">House</span>
            </span>
          </Link>

          <h1 className="font-display font-extrabold text-3xl text-gray-900 dark:text-white mb-2">
            Sign In
          </h1>
          <p className="text-gray-500 mb-8">
            Don't have an account?{' '}
            <Link to="/register" className="text-brand hover:underline font-semibold">
              Register for free
            </Link>
          </p>

          {/* Google */}
          <button
            onClick={handleGoogle}
            className="w-full flex items-center justify-center gap-3 px-6 py-3.5 bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded-xl text-sm font-semibold text-gray-700 dark:text-gray-200 hover:border-brand/50 hover:shadow-md transition-all mb-6"
          >
            <FaGoogle className="text-red-500 text-lg" />
            Continue with Google
          </button>

          <div className="flex items-center gap-4 mb-6">
            <div className="flex-1 h-px bg-gray-200 dark:bg-gray-700" />
            <span className="text-sm text-gray-400">or sign in with email</span>
            <div className="flex-1 h-px bg-gray-200 dark:bg-gray-700" />
          </div>

          <form onSubmit={handleSubmit(onSubmit)} className="space-y-5">
            {/* Email */}
            <div>
              <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1.5">
                Email Address
              </label>
              <div className="relative">
                <FiMail className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400" />
                <input
                  type="email"
                  placeholder="you@example.com"
                  {...register('email', {
                    required: 'Email is required',
                    pattern: { value: /^\S+@\S+\.\S+$/, message: 'Invalid email address' },
                  })}
                  className="w-full pl-11 pr-4 py-3.5 rounded-xl border border-gray-200 dark:border-gray-700 bg-white dark:bg-gray-800 text-gray-900 dark:text-white text-sm outline-none focus:ring-2 focus:ring-brand/30 focus:border-brand transition-all"
                />
              </div>
              {errors.email && <p className="text-red-500 text-xs mt-1">{errors.email.message}</p>}
            </div>

            {/* Password */}
            <div>
              <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1.5">
                Password
              </label>
              <div className="relative">
                <FiLock className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400" />
                <input
                  type={showPass ? 'text' : 'password'}
                  placeholder="Enter your password"
                  {...register('password', { required: 'Password is required' })}
                  className="w-full pl-11 pr-12 py-3.5 rounded-xl border border-gray-200 dark:border-gray-700 bg-white dark:bg-gray-800 text-gray-900 dark:text-white text-sm outline-none focus:ring-2 focus:ring-brand/30 focus:border-brand transition-all"
                />
                <button
                  type="button"
                  onClick={() => setShowPass(!showPass)}
                  className="absolute right-4 top-1/2 -translate-y-1/2 text-gray-400 hover:text-gray-600"
                >
                  {showPass ? <FiEyeOff /> : <FiEye />}
                </button>
              </div>
              {errors.password && <p className="text-red-500 text-xs mt-1">{errors.password.message}</p>}
            </div>

            <button
              type="submit"
              disabled={isSubmitting}
              className="w-full py-4 bg-brand text-white rounded-xl font-bold text-base hover:bg-orange-600 transition-all shadow-lg shadow-brand/25 disabled:opacity-70"
            >
              {isSubmitting ? 'Signing in...' : 'Sign In'}
            </button>
          </form>
        </motion.div>
      </div>
    </div>
  );
};

export default Login;
