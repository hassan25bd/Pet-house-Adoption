import { useState, useCallback } from 'react';
import { useQuery } from '@tanstack/react-query';
import { motion, AnimatePresence } from 'framer-motion';
import { useSearchParams } from 'react-router-dom';
import { FiSearch, FiSliders, FiX } from 'react-icons/fi';
import useAxiosPublic from '../../hooks/useAxiosPublic';
import PetCard from '../../components/PetCard';
import LoadingSpinner from '../../components/shared/LoadingSpinner';

const SPECIES = ['All', 'Dog', 'Cat', 'Bird', 'Rabbit', 'Fish', 'Reptile', 'Hamster', 'Other'];
const SORT_OPTIONS = [
  { value: 'newest',     label: 'Newest First' },
  { value: 'price_asc',  label: 'Price: Low to High' },
  { value: 'price_desc', label: 'Price: High to Low' },
  { value: 'age_asc',    label: 'Youngest First' },
  { value: 'age_desc',   label: 'Oldest First' },
];

const AllPets = () => {
  const axiosPublic = useAxiosPublic();
  const [searchParams, setSearchParams] = useSearchParams();

  const [search, setSearch]   = useState(searchParams.get('search') || '');
  const [species, setSpecies] = useState(searchParams.get('species') || 'all');
  const [sort, setSort]       = useState(searchParams.get('sort') || 'newest');
  const [showFilters, setShowFilters] = useState(false);

  const updateParams = useCallback(
    (newSearch, newSpecies, newSort) => {
      const params = {};
      if (newSearch)              params.search  = newSearch;
      if (newSpecies !== 'all')   params.species = newSpecies;
      if (newSort !== 'newest')   params.sort    = newSort;
      setSearchParams(params);
    },
    [setSearchParams]
  );

  const { data: pets = [], isLoading } = useQuery({
    queryKey: ['pets', search, species, sort],
    queryFn: async () => {
      const res = await axiosPublic.get('/pets', {
        params: { search, species, sort },
      });
      return res.data;
    },
    keepPreviousData: true,
  });

  const handleSearch = (e) => {
    e.preventDefault();
    updateParams(search, species, sort);
  };

  const handleSpecies = (s) => {
    const val = s.toLowerCase() === 'all' ? 'all' : s.toLowerCase();
    setSpecies(val);
    updateParams(search, val, sort);
  };

  const handleSort = (e) => {
    setSort(e.target.value);
    updateParams(search, species, e.target.value);
  };

  const clearFilters = () => {
    setSearch('');
    setSpecies('all');
    setSort('newest');
    setSearchParams({});
  };

  const hasFilters = search || species !== 'all' || sort !== 'newest';

  return (
    <div className="min-h-screen bg-[var(--bg)] pt-8 pb-20">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Page header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="mb-10"
        >
          <span className="text-brand font-semibold text-sm uppercase tracking-widest">
            Adopt Today
          </span>
          <h1 className="font-display font-extrabold text-4xl text-gray-900 dark:text-white mt-1 mb-2">
            All Available Pets
          </h1>
          <p className="text-gray-500 dark:text-gray-400">
            {isLoading ? 'Loading...' : `${pets.length} wonderful companion${pets.length !== 1 ? 's' : ''} waiting for a home`}
          </p>
        </motion.div>

        {/* Search bar */}
        <form onSubmit={handleSearch} className="flex gap-3 mb-6">
          <div className="relative flex-1">
            <FiSearch className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400" />
            <input
              type="text"
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              placeholder="Search by name..."
              className="w-full pl-11 pr-4 py-3.5 rounded-xl border border-gray-200 dark:border-gray-700 bg-white dark:bg-gray-900 text-gray-900 dark:text-white text-sm outline-none focus:ring-2 focus:ring-brand/30 focus:border-brand transition-all"
            />
            {search && (
              <button
                type="button"
                onClick={() => { setSearch(''); updateParams('', species, sort); }}
                className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400 hover:text-gray-600"
              >
                <FiX />
              </button>
            )}
          </div>
          <button
            type="submit"
            className="px-6 py-3.5 bg-brand text-white rounded-xl font-semibold text-sm hover:bg-orange-600 transition-all shadow-md shadow-brand/20"
          >
            Search
          </button>
          <button
            type="button"
            onClick={() => setShowFilters(!showFilters)}
            className={`px-4 py-3.5 rounded-xl border text-sm font-medium flex items-center gap-2 transition-all ${
              showFilters
                ? 'bg-brand text-white border-brand'
                : 'border-gray-200 dark:border-gray-700 text-gray-600 dark:text-gray-300 bg-white dark:bg-gray-900 hover:border-brand/50'
            }`}
          >
            <FiSliders /> Filters
          </button>
        </form>

        {/* Filters panel */}
        <AnimatePresence>
          {showFilters && (
            <motion.div
              initial={{ height: 0, opacity: 0 }}
              animate={{ height: 'auto', opacity: 1 }}
              exit={{ height: 0, opacity: 0 }}
              className="overflow-hidden mb-6"
            >
              <div className="bg-white dark:bg-gray-900 rounded-2xl border border-gray-100 dark:border-gray-800 p-6">
                <div className="flex flex-col sm:flex-row gap-6">
                  {/* Sort */}
                  <div className="flex-1">
                    <label className="block text-sm font-semibold text-gray-700 dark:text-gray-300 mb-2">
                      Sort By
                    </label>
                    <select
                      value={sort}
                      onChange={handleSort}
                      className="w-full px-4 py-2.5 rounded-xl border border-gray-200 dark:border-gray-700 bg-white dark:bg-gray-800 text-gray-900 dark:text-white text-sm outline-none focus:ring-2 focus:ring-brand/30"
                    >
                      {SORT_OPTIONS.map((o) => (
                        <option key={o.value} value={o.value}>{o.label}</option>
                      ))}
                    </select>
                  </div>

                  {hasFilters && (
                    <div className="flex items-end">
                      <button
                        onClick={clearFilters}
                        className="flex items-center gap-2 px-4 py-2.5 text-sm text-red-500 border border-red-200 dark:border-red-800 rounded-xl hover:bg-red-50 dark:hover:bg-red-900/20 transition-all"
                      >
                        <FiX /> Clear All
                      </button>
                    </div>
                  )}
                </div>
              </div>
            </motion.div>
          )}
        </AnimatePresence>

        {/* Species filter pills */}
        <div className="flex flex-wrap gap-2 mb-8">
          {SPECIES.map((s) => {
            const val = s.toLowerCase() === 'all' ? 'all' : s.toLowerCase();
            const active = species === val;
            return (
              <button
                key={s}
                onClick={() => handleSpecies(s)}
                className={`px-4 py-2 rounded-full text-sm font-medium transition-all ${
                  active
                    ? 'bg-brand text-white shadow-md shadow-brand/25'
                    : 'bg-white dark:bg-gray-900 text-gray-600 dark:text-gray-400 border border-gray-200 dark:border-gray-700 hover:border-brand/50 hover:text-brand'
                }`}
              >
                {s}
              </button>
            );
          })}
        </div>

        {/* Results */}
        {isLoading ? (
          <LoadingSpinner fullScreen={false} />
        ) : pets.length === 0 ? (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="text-center py-24"
          >
            <p className="text-7xl mb-4">🔍</p>
            <h3 className="font-display font-bold text-2xl text-gray-900 dark:text-white mb-2">
              No Pets Found
            </h3>
            <p className="text-gray-500 mb-6">
              Try adjusting your search or filters to find your perfect companion.
            </p>
            <button
              onClick={clearFilters}
              className="px-6 py-3 bg-brand text-white rounded-xl font-semibold hover:bg-orange-600 transition-all"
            >
              Clear Filters
            </button>
          </motion.div>
        ) : (
          <div className="grid sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
            {pets.map((pet, i) => (
              <PetCard key={pet._id} pet={pet} index={i} />
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default AllPets;
