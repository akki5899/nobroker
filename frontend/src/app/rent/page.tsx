'use client';

import { useState, useEffect } from 'react';
import SearchForm from '@/components/SearchForm';
import PropertyCard from '@/components/PropertyCard';
import { propertyAPI } from '@/lib/api';
import { Property } from '@/types';

export default function RentPage() {
  const [properties, setProperties] = useState<Property[]>([]);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    fetchProperties();
  }, []);

  const fetchProperties = async () => {
    try {
      setLoading(true);
      const response = await propertyAPI.search({ listing_type: 'rent', limit: 12 });
      setProperties(response.data);
    } catch (error) {
      console.error('Error fetching properties:', error);
    } finally {
      setLoading(false);
    }
  };

  const handleSearch = async (filters: any) => {
    try {
      setLoading(true);
      const response = await propertyAPI.search({ ...filters, listing_type: 'rent' });
      setProperties(response.data);
    } catch (error) {
      console.error('Error searching properties:', error);
    } finally {
      setLoading(false);
    }
  };

  const popularChoices = [
    'Ready to Move', 'Owner Properties', 'Budget Homes', 
    'Premium Homes', 'Newly Launched'
  ];

  const propertyTypes = [
    'Flats in Bangalore', 'Houses in Bangalore', 'Villas in Bangalore', 
    'PG in Bangalore', 'Office Spaces in Bangalore'
  ];

  const budgetFilters = [
    'Under ₹10,000', '₹10,000 – ₹15,000', '₹15,000 – ₹25,000', 'Above ₹25,000'
  ];

  return (
    <div className="bg-gray-50 min-h-screen">
      {/* Hero Section */}
      <section className="bg-gradient-to-r from-green-600 to-green-700 text-white py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-8">
            <h1 className="text-4xl md:text-5xl font-bold mb-4">
              Rent Properties
            </h1>
            <p className="text-xl opacity-90">
              Find your perfect rental home from verified listings
            </p>
          </div>
          <SearchForm onSearch={handleSearch} activeTab="rent" />
        </div>
      </section>

      {/* Quick Filters */}
      <section className="py-12 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {/* Popular Choices */}
            <div>
              <h3 className="text-lg font-semibold mb-4">Popular Choices</h3>
              <div className="space-y-2">
                {popularChoices.map((choice) => (
                  <button key={choice} className="block w-full text-left px-3 py-2 text-sm text-gray-700 hover:bg-green-50 hover:text-green-600 rounded transition-colors">
                    {choice}
                  </button>
                ))}
              </div>
            </div>

            {/* Property Types */}
            <div>
              <h3 className="text-lg font-semibold mb-4">Property Types</h3>
              <div className="space-y-2">
                {propertyTypes.map((type) => (
                  <button key={type} className="block w-full text-left px-3 py-2 text-sm text-gray-700 hover:bg-green-50 hover:text-green-600 rounded transition-colors">
                    {type}
                  </button>
                ))}
              </div>
            </div>

            {/* Budget Filters */}
            <div>
              <h3 className="text-lg font-semibold mb-4">Budget Filters</h3>
              <div className="space-y-2">
                {budgetFilters.map((filter) => (
                  <button key={filter} className="block w-full text-left px-3 py-2 text-sm text-gray-700 hover:bg-green-50 hover:text-green-600 rounded transition-colors">
                    {filter}
                  </button>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Properties Grid */}
      <section className="py-12">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="text-3xl font-bold text-gray-900 mb-8">Properties for Rent</h2>
          
          {loading ? (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
              {[...Array(12)].map((_, i) => (
                <div key={i} className="bg-white rounded-xl shadow-sm h-80 animate-pulse">
                  <div className="h-48 bg-gray-300 rounded-t-xl"></div>
                  <div className="p-4 space-y-3">
                    <div className="h-4 bg-gray-300 rounded"></div>
                    <div className="h-4 bg-gray-300 rounded w-3/4"></div>
                    <div className="h-4 bg-gray-300 rounded w-1/2"></div>
                  </div>
                </div>
              ))}
            </div>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
              {properties.map((property) => (
                <PropertyCard key={property.id} property={property} />
              ))}
            </div>
          )}
        </div>
      </section>
    </div>
  );
}