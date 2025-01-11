import React from 'react';
import { X, RefreshCw } from 'lucide-react';
import { Filters } from '../../types';

interface FilterSidebarProps {
  isOpen: boolean;
  onClose: () => void;
  filters: Filters;
  onFilterChange: (filters: Filters) => void;
  onClearFilters: () => void;
}

export default function FilterSidebar({ 
  isOpen, 
  onClose, 
  filters,
  onFilterChange,
  onClearFilters
}: FilterSidebarProps) {
  const brands = ['Nike', 'Adidas', 'Puma', 'Reebok', 'New Balance'];
  const sizes = Array.from({ length: 13 }, (_, i) => i + 3);
  const priceRanges = [
    { label: 'Under $50', value: '0-50' },
    { label: '$50 - $100', value: '50-100' },
    { label: '$100 - $200', value: '100-200' },
    { label: 'Over $200', value: '200-999' },
  ];

  const handleBrandChange = (brand: string) => {
    const newBrands = filters.brands.includes(brand)
      ? filters.brands.filter(b => b !== brand)
      : [...filters.brands, brand];
    onFilterChange({ ...filters, brands: newBrands });
  };

  const handleSizeChange = (size: number) => {
    const newSizes = filters.sizes.includes(size)
      ? filters.sizes.filter(s => s !== size)
      : [...filters.sizes, size];
    onFilterChange({ ...filters, sizes: newSizes });
  };

  return (
    <div className={`
      lg:block
      ${isOpen ? 'fixed inset-0 z-40 lg:relative' : 'hidden'}
    `}>
      <div className="lg:hidden fixed inset-0 bg-black bg-opacity-50" onClick={onClose} />
      
      <div className={`
        fixed right-0 top-0 h-full w-64 lg:w-72
        lg:sticky lg:top-8 lg:h-auto
        bg-white p-6 overflow-y-auto
        transform transition-transform duration-300
        ${isOpen ? 'translate-x-0' : 'translate-x-full lg:translate-x-0'}
      `}>
        <div className="flex justify-between items-center lg:hidden mb-6">
          <h3 className="text-lg font-semibold">Filters</h3>
          <button onClick={onClose}>
            <X className="h-6 w-6" />
          </button>
        </div>

        <button
          onClick={onClearFilters}
          className="w-full flex items-center justify-center gap-2 mb-6 py-2 text-purple-600 hover:text-purple-700 border border-purple-600 rounded-md"
        >
          <RefreshCw className="h-4 w-4" />
          Clear All Filters
        </button>

        <div className="mb-8">
          <h3 className="text-lg font-semibold mb-4">Brands</h3>
          <div className="space-y-2">
            {brands.map(brand => (
              <label key={brand} className="flex items-center">
                <input
                  type="checkbox"
                  checked={filters.brands.includes(brand)}
                  onChange={() => handleBrandChange(brand)}
                  className="rounded border-gray-300 text-purple-600 focus:ring-purple-500"
                />
                <span className="ml-2">{brand}</span>
              </label>
            ))}
          </div>
        </div>

        <div className="mb-8">
          <h3 className="text-lg font-semibold mb-4">Sizes</h3>
          <div className="grid grid-cols-3 gap-2">
            {sizes.map(size => (
              <button
                key={size}
                onClick={() => handleSizeChange(size)}
                className={`p-2 border rounded-md transition-colors ${
                  filters.sizes.includes(size)
                    ? 'border-purple-600 text-purple-600 bg-purple-50'
                    : 'hover:border-purple-600 hover:text-purple-600'
                }`}
              >
                {size}
              </button>
            ))}
          </div>
        </div>

        <div className="mb-8">
          <h3 className="text-lg font-semibold mb-4">Price Range</h3>
          <div className="space-y-2">
            {priceRanges.map(range => (
              <label key={range.value} className="flex items-center">
                <input
                  type="radio"
                  name="price"
                  value={range.value}
                  checked={filters.priceRange === range.value}
                  onChange={(e) => onFilterChange({ ...filters, priceRange: e.target.value })}
                  className="text-purple-600 focus:ring-purple-500"
                />
                <span className="ml-2">{range.label}</span>
              </label>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}