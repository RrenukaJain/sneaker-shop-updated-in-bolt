import React, { useState, Suspense } from 'react';
import { Filter } from 'lucide-react';
import LoadingSpinner from '../components/LoadingSpinner';
import { Filters } from '../types';

// Lazy load components
const SneakerGrid = React.lazy(() => import('../components/dashboard/SneakerGrid'));
const FilterSidebar = React.lazy(() => import('../components/dashboard/FilterSidebar'));

export default function Dashboard() {
  const [showFilters, setShowFilters] = useState(false);
  const [filters, setFilters] = useState<Filters>({
    brands: [],
    sizes: [],
    priceRange: ''
  });

  const handleClearFilters = () => {
    setFilters({
      brands: [],
      sizes: [],
      priceRange: ''
    });
  };

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      <div className="flex justify-between items-center mb-8">
        <h1 className="text-3xl font-bold text-gray-900">All Sneakers</h1>
        <button
          onClick={() => setShowFilters(!showFilters)}
          className="lg:hidden flex items-center gap-2 px-4 py-2 bg-purple-600 text-white rounded-md hover:bg-purple-700"
        >
          <Filter className="h-5 w-5" />
          Filters
        </button>
      </div>

      <div className="flex gap-8">
        <Suspense fallback={<LoadingSpinner />}>
          <FilterSidebar 
            isOpen={showFilters} 
            onClose={() => setShowFilters(false)}
            filters={filters}
            onFilterChange={setFilters}
            onClearFilters={handleClearFilters}
          />
          <SneakerGrid filters={filters} />
        </Suspense>
      </div>
    </div>
  );
}