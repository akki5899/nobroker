'use client';

import { useState } from 'react';
import { Search, Filter, MapPin, Home, IndianRupee } from 'lucide-react';
import { SearchFilters } from '@/types';

interface SearchFormProps {
  onSearch: (filters: SearchFilters) => void;
  initialFilters?: SearchFilters;
  activeTab?: string;
}

export default function SearchForm({ onSearch, initialFilters = {}, activeTab = 'rent' }: SearchFormProps) {
  const [filters, setFilters] = useState<SearchFilters>(initialFilters);
  const [showAdvanced, setShowAdvanced] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onSearch({ ...filters, listing_type: activeTab === 'buy' ? 'sale' : activeTab });
  };

  const updateFilter = (key: keyof SearchFilters, value: any) => {
    setFilters(prev => ({ ...prev, [key]: value }));
  };

  const popularCities = ['Mumbai', 'Delhi', 'Bangalore', 'Hyderabad', 'Chennai', 'Pune'];
  const budgetRanges = {
    rent: ['Under ₹10,000', '₹10,000 – ₹15,000', '₹15,000 – ₹25,000', 'Above ₹25,000'],
    buy: ['Under ₹50 Lakhs', '₹50L – ₹1 Cr', '₹1 Cr – ₹1.5 Cr', 'Above ₹1.5 Cr'],
    commercial: ['Under ₹25,000', '₹25,000 – ₹50,000', '₹50,000 – ₹1,00,000', 'Above ₹1,00,000']
  };

  return (
    <div className="bg-white rounded-xl shadow-lg overflow-hidden">
      <form onSubmit={handleSubmit} className="p-6">
        <div className="grid grid-cols-1 md:grid-cols-12 gap-4">
          {/* Location Input */}
          <div className="md:col-span-4 relative">
            <div className="absolute left-3 top-1/2 transform -translate-y-1/2">
              <MapPin className="h-5 w-5 text-gray-400" />
            </div>
            <input
              type="text"
              placeholder="Enter city, locality or project"
              className="w-full pl-10 pr-4 py-3 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent text-gray-900"
              value={filters.city || ''}
              onChange={(e) => updateFilter('city', e.target.value)}
            />
          </div>
          
          {/* Property Type */}
          <div className="md:col-span-3">
            <select
              className="w-full px-4 py-3 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent text-gray-900"
              value={filters.property_type || ''}
              onChange={(e) => updateFilter('property_type', e.target.value)}
            >
              <option value="">Property Type</option>
              {activeTab === 'commercial' ? (
                <>
                  <option value="office">Office Space</option>
                  <option value="retail">Retail/Shop</option>
                  <option value="warehouse">Warehouse</option>
                  <option value="commercial_land">Commercial Land</option>
                </>
              ) : activeTab === 'rent' ? (
                <>
                  <option value="apartment">Flat/Apartment</option>
                  <option value="builder_floor">Independent/Builder Floor</option>
                  <option value="house">Independent House/Villa</option>
                  <option value="land">Residential Land</option>
                  <option value="studio">1 RK/Studio</option>
                  <option value="farmhouse">Farm House</option>
                  <option value="serviced_apartment">Serviced Apartments</option>
                  <option value="pg">PG/Hostels</option>
                  <option value="other">Other</option>
                </>
              ) : (
                <>
                  <option value="apartment">Flat/Apartment</option>
                  <option value="builder_floor">Builder Floor</option>
                  <option value="house">Independent House/Villa</option>
                  <option value="plot">Residential Land & Plots</option>
                  <option value="studio">Studio Apartment</option>
                  <option value="farmhouse">Farm House</option>
                  <option value="office">Commercial Properties</option>
                  <option value="other">Other</option>
                </>
              )}
            </select>
          </div>
          
          {/* Budget */}
          <div className="md:col-span-3">
            <select
              className="w-full px-4 py-3 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent text-gray-900"
              value={filters.budget_range || ''}
              onChange={(e) => updateFilter('budget_range', e.target.value)}
            >
              <option value="">Budget</option>
              {budgetRanges[activeTab as keyof typeof budgetRanges]?.map((range) => (
                <option key={range} value={range}>{range}</option>
              ))}
            </select>
          </div>
          
          {/* Search Button */}
          <div className="md:col-span-2">
            <button type="submit" className="w-full bg-blue-600 text-white py-3 px-6 rounded-lg hover:bg-blue-700 transition-colors flex items-center justify-center space-x-2 font-semibold">
              <Search className="h-5 w-5" />
              <span>Search</span>
            </button>
          </div>
        </div>

        {/* Popular Cities */}
        <div className="mt-4">
          <p className="text-sm text-gray-600 mb-2">Popular Cities:</p>
          <div className="flex flex-wrap gap-2">
            {popularCities.map((city) => (
              <button
                key={city}
                type="button"
                onClick={() => updateFilter('city', city)}
                className="px-3 py-1 text-sm bg-gray-100 text-gray-700 rounded-full hover:bg-blue-50 hover:text-blue-600 transition-colors"
              >
                {city}
              </button>
            ))}
          </div>
        </div>

        {/* Advanced Filters Toggle */}
        <div className="mt-4 flex justify-center">
          <button
            type="button"
            onClick={() => setShowAdvanced(!showAdvanced)}
            className="flex items-center space-x-2 text-blue-600 hover:text-blue-700 text-sm font-medium"
          >
            <Filter className="h-4 w-4" />
            <span>{showAdvanced ? 'Hide' : 'More'} Filters</span>
          </button>
        </div>

        {/* Advanced Filters */}
        {showAdvanced && (
          <div className="mt-6 pt-6 border-t border-gray-200">
            <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Min Price (₹)
                </label>
                <input
                  type="number"
                  className="w-full px-3 py-2 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  placeholder="Min Price"
                  value={filters.min_price || ''}
                  onChange={(e) => updateFilter('min_price', e.target.value ? Number(e.target.value) : undefined)}
                />
              </div>
              
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Max Price (₹)
                </label>
                <input
                  type="number"
                  className="w-full px-3 py-2 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  placeholder="Max Price"
                  value={filters.max_price || ''}
                  onChange={(e) => updateFilter('max_price', e.target.value ? Number(e.target.value) : undefined)}
                />
              </div>
              
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Bedrooms
                </label>
                <select
                  className="w-full px-3 py-2 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  value={filters.bedrooms || ''}
                  onChange={(e) => updateFilter('bedrooms', e.target.value ? Number(e.target.value) : undefined)}
                >
                  <option value="">Any</option>
                  <option value="1">1 BHK</option>
                  <option value="2">2 BHK</option>
                  <option value="3">3 BHK</option>
                  <option value="4">4+ BHK</option>
                </select>
              </div>
              
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Area (sq ft)
                </label>
                <input
                  type="number"
                  className="w-full px-3 py-2 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  placeholder="Min Area"
                  value={filters.min_area || ''}
                  onChange={(e) => updateFilter('min_area', e.target.value ? Number(e.target.value) : undefined)}
                />
              </div>
            </div>
            
            <div className="mt-4 flex flex-wrap gap-4">
              <label className="flex items-center space-x-2">
                <input
                  type="checkbox"
                  checked={filters.furnished || false}
                  onChange={(e) => updateFilter('furnished', e.target.checked)}
                  className="rounded border-gray-300 text-blue-600 focus:ring-blue-500"
                />
                <span className="text-sm text-gray-700">Furnished</span>
              </label>
              
              <label className="flex items-center space-x-2">
                <input
                  type="checkbox"
                  checked={filters.parking || false}
                  onChange={(e) => updateFilter('parking', e.target.checked)}
                  className="rounded border-gray-300 text-blue-600 focus:ring-blue-500"
                />
                <span className="text-sm text-gray-700">Parking</span>
              </label>
              
              <label className="flex items-center space-x-2">
                <input
                  type="checkbox"
                  checked={filters.gym || false}
                  onChange={(e) => updateFilter('gym', e.target.checked)}
                  className="rounded border-gray-300 text-blue-600 focus:ring-blue-500"
                />
                <span className="text-sm text-gray-700">Gym</span>
              </label>
              
              <label className="flex items-center space-x-2">
                <input
                  type="checkbox"
                  checked={filters.swimming_pool || false}
                  onChange={(e) => updateFilter('swimming_pool', e.target.checked)}
                  className="rounded border-gray-300 text-blue-600 focus:ring-blue-500"
                />
                <span className="text-sm text-gray-700">Swimming Pool</span>
              </label>
            </div>
          </div>
        )}
      </form>
    </div>
  );
}