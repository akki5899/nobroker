'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';
import SearchForm from '@/components/SearchForm';
import PropertyCard from '@/components/PropertyCard';
import { propertyAPI } from '@/lib/api';
import { Property, SearchFilters } from '@/types';
import { Home, Shield, Users, TrendingUp, MapPin, Building, Car, Wrench, FileText, Phone, Star, CheckCircle, ArrowRight, Play } from 'lucide-react';

export default function HomePage() {
  const [properties, setProperties] = useState<Property[]>([]);
  const [loading, setLoading] = useState(false);
  const [activeTab, setActiveTab] = useState('rent');

  useEffect(() => {
    fetchFeaturedProperties();
  }, []);

  const fetchFeaturedProperties = async () => {
    try {
      setLoading(true);
      const response = await propertyAPI.search({ limit: 8 });
      setProperties(response.data);
    } catch (error) {
      console.error('Error fetching properties:', error);
    } finally {
      setLoading(false);
    }
  };

  const handleSearch = async (filters: SearchFilters) => {
    try {
      setLoading(true);
      const response = await propertyAPI.search(filters);
      setProperties(response.data);
    } catch (error) {
      console.error('Error searching properties:', error);
    } finally {
      setLoading(false);
    }
  };

  const stats = [
    { label: 'Properties Listed', value: '10L+', icon: Building },
    { label: 'Happy Customers', value: '50L+', icon: Users },
    { label: 'Cities Covered', value: '50+', icon: MapPin },
    { label: 'Zero Brokerage', value: '100%', icon: Shield }
  ];

  const services = [
    {
      title: 'Rent Agreement',
      description: 'Online rent agreement in just 4 hours',
      icon: FileText,
      color: 'bg-blue-500'
    },
    {
      title: 'Home Services',
      description: 'Painting, cleaning, repairs & more',
      icon: Wrench,
      color: 'bg-green-500'
    },
    {
      title: 'Packers & Movers',
      description: 'Reliable moving services',
      icon: Car,
      color: 'bg-purple-500'
    },
    {
      title: 'Home Loans',
      description: 'Get instant home loan approval',
      icon: Home,
      color: 'bg-orange-500'
    }
  ];

  return (
    <div>
      {/* Top User Selection */}
      <section className="bg-white border-b py-3">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between">
            <div className="text-sm text-gray-600">
              Are you:
            </div>
            <div className="flex space-x-4">
              {['Buyer', 'Owner', 'Tenant', 'Agent', 'Builder'].map((type) => (
                <button key={type} className="px-3 py-1 text-sm border border-gray-300 rounded-full hover:bg-blue-50 hover:border-blue-300 transition-colors">
                  {type}
                </button>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Hero Section */}
      <section className="relative bg-gradient-to-br from-blue-600 via-blue-700 to-blue-800 text-white overflow-hidden">
        <div className="absolute inset-0 bg-black opacity-10"></div>
        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20">
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            <div>
              <div className="flex items-center space-x-2 mb-6">
                <span className="bg-yellow-400 text-black px-3 py-1 rounded-full text-sm font-semibold">
                  #1 Property Site
                </span>
                <div className="flex items-center space-x-1">
                  {[...Array(5)].map((_, i) => (
                    <Star key={i} className="h-4 w-4 fill-yellow-400 text-yellow-400" />
                  ))}
                  <span className="text-sm ml-1">4.8/5</span>
                </div>
              </div>
              
              <h1 className="text-5xl md:text-6xl font-bold mb-6 leading-tight">
                Discover Your
                <span className="text-yellow-400"> Perfect Space </span>
                Direct Property Marketplace
              </h1>
              
              <p className="text-xl mb-8 opacity-90 leading-relaxed">
                Connect directly with property owners, tenants, buyers, and agents.
                Find residential & commercial properties without hassle.
              </p>
              
              <div className="flex flex-wrap gap-4 mb-8">
                <div className="flex items-center space-x-2">
                  <CheckCircle className="h-5 w-5 text-green-400" />
                  <span>Direct Connection</span>
                </div>
                <div className="flex items-center space-x-2">
                  <CheckCircle className="h-5 w-5 text-green-400" />
                  <span>Verified Listings</span>
                </div>
                <div className="flex items-center space-x-2">
                  <CheckCircle className="h-5 w-5 text-green-400" />
                  <span>All Property Types</span>
                </div>
              </div>
            </div>
            
            <div className="lg:pl-8">
              <div className="bg-white/10 backdrop-blur-sm rounded-2xl p-6">
                <div className="flex space-x-1 mb-6">
                  {['rent', 'buy', 'commercial'].map((tab) => (
                    <button
                      key={tab}
                      onClick={() => setActiveTab(tab)}
                      className={`px-6 py-3 rounded-lg font-semibold capitalize transition-all ${
                        activeTab === tab
                          ? 'bg-white text-blue-600'
                          : 'text-white hover:bg-white/20'
                      }`}
                    >
                      {tab === 'commercial' ? 'Commercial' : tab}
                    </button>
                  ))}
                </div>
                <SearchForm onSearch={handleSearch} activeTab={activeTab} />
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Stats Section */}
      <section className="py-16 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
            {stats.map((stat, index) => {
              const Icon = stat.icon;
              return (
                <div key={index} className="text-center">
                  <div className="bg-blue-50 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4">
                    <Icon className="h-8 w-8 text-blue-600" />
                  </div>
                  <div className="text-3xl font-bold text-gray-900 mb-2">{stat.value}</div>
                  <div className="text-gray-600">{stat.label}</div>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* Primary User Categories */}
      <section className="py-16 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-4xl font-bold text-gray-900 mb-4">
              Choose Your Category
            </h2>
            <p className="text-xl text-gray-600">
              Find the perfect solution for your property needs
            </p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-16">
            {[
              { title: 'For Buyers', desc: 'Find your dream property', icon: Home, color: 'bg-green-500' },
              { title: 'For Tenants', desc: 'Discover rental properties', icon: Users, color: 'bg-blue-500' },
              { title: 'For Owners', desc: 'List your property', icon: Building, color: 'bg-purple-500' },
              { title: 'For Dealers/Builders', desc: 'Manage multiple listings', icon: TrendingUp, color: 'bg-orange-500' }
            ].map((category, index) => {
              const Icon = category.icon;
              return (
                <div key={index} className="bg-white rounded-xl p-8 shadow-sm hover:shadow-lg transition-shadow cursor-pointer group text-center">
                  <div className={`${category.color} w-16 h-16 rounded-xl flex items-center justify-center mx-auto mb-4 group-hover:scale-110 transition-transform`}>
                    <Icon className="h-8 w-8 text-white" />
                  </div>
                  <h3 className="text-xl font-semibold mb-2">{category.title}</h3>
                  <p className="text-gray-600">{category.desc}</p>
                </div>
              );
            })}
          </div>

          <div className="text-center mb-12">
            <h2 className="text-4xl font-bold text-gray-900 mb-4">
              Additional Services
            </h2>
            <p className="text-xl text-gray-600">
              Complete property solutions for all your needs
            </p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {services.map((service, index) => {
              const Icon = service.icon;
              return (
                <div key={index} className="bg-white rounded-xl p-6 shadow-sm hover:shadow-lg transition-shadow cursor-pointer group">
                  <div className={`${service.color} w-12 h-12 rounded-lg flex items-center justify-center mb-4 group-hover:scale-110 transition-transform`}>
                    <Icon className="h-6 w-6 text-white" />
                  </div>
                  <h3 className="text-lg font-semibold mb-2">{service.title}</h3>
                  <p className="text-gray-600 text-sm mb-4">{service.description}</p>
                  <div className="flex items-center text-blue-600 text-sm font-medium">
                    <span>Learn More</span>
                    <ArrowRight className="h-4 w-4 ml-1 group-hover:translate-x-1 transition-transform" />
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* Properties Section */}
      <section className="py-16 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center mb-8">
            <div>
              <h2 className="text-4xl font-bold text-gray-900 mb-2">
                Featured Properties
              </h2>
              <p className="text-gray-600">Handpicked properties just for you</p>
            </div>
            <Link href="/properties" className="bg-blue-600 text-white px-6 py-3 rounded-lg hover:bg-blue-700 transition-colors flex items-center space-x-2">
              <span>View All</span>
              <ArrowRight className="h-4 w-4" />
            </Link>
          </div>
          
          {loading ? (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
              {[...Array(8)].map((_, i) => (
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
          
          {!loading && properties.length === 0 && (
            <div className="text-center py-12">
              <div className="bg-gray-100 rounded-full w-24 h-24 flex items-center justify-center mx-auto mb-4">
                <Building className="h-12 w-12 text-gray-400" />
              </div>
              <p className="text-gray-600 text-lg">No properties found</p>
              <p className="text-gray-500">Try adjusting your search criteria</p>
            </div>
          )}
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-16 bg-gradient-to-r from-blue-600 to-blue-700 text-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-4xl font-bold mb-4">
            Ready to Discover Your Perfect Space?
          </h2>
          <p className="text-xl mb-8 opacity-90">
            Join thousands of users connecting directly for property deals
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link href="/properties" className="bg-white text-blue-600 px-8 py-4 rounded-lg font-semibold hover:bg-gray-100 transition-colors">
              Browse Properties
            </Link>
            <Link href="/post-property" className="border-2 border-white text-white px-8 py-4 rounded-lg font-semibold hover:bg-white hover:text-blue-600 transition-colors">
              Post Property — Free
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
}