'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';
import { useAuth } from '@/hooks/useAuth';
import { userAPI, inquiryAPI } from '@/lib/api';
import PropertyCard from '@/components/PropertyCard';
import { Property, Inquiry } from '@/types';
import { Plus, Home, MessageCircle, Eye } from 'lucide-react';

export default function DashboardPage() {
  const { user, isAuthenticated } = useAuth();
  const [properties, setProperties] = useState<Property[]>([]);
  const [inquiries, setInquiries] = useState<Inquiry[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (isAuthenticated) {
      fetchDashboardData();
    }
  }, [isAuthenticated]);

  const fetchDashboardData = async () => {
    try {
      const [propertiesRes, inquiriesRes] = await Promise.all([
        userAPI.getMyProperties(),
        user?.user_type === 'owner' 
          ? inquiryAPI.getPropertyInquiries()
          : inquiryAPI.getMyInquiries()
      ]);
      
      setProperties(propertiesRes.data);
      setInquiries(inquiriesRes.data);
    } catch (error) {
      console.error('Error fetching dashboard data:', error);
    } finally {
      setLoading(false);
    }
  };

  if (!isAuthenticated) {
    return (
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="text-center">
          <h1 className="text-2xl font-bold text-gray-900">Please login to access dashboard</h1>
          <Link href="/login" className="btn-primary mt-4 inline-block">
            Login
          </Link>
        </div>
      </div>
    );
  }

  if (loading) {
    return (
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="animate-pulse">
          <div className="h-8 bg-gray-300 rounded mb-8"></div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
            {[...Array(3)].map((_, i) => (
              <div key={i} className="h-24 bg-gray-300 rounded"></div>
            ))}
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-gray-900 mb-2">
          Welcome back, {user?.full_name}!
        </h1>
        <p className="text-gray-600">Manage your properties and inquiries</p>
      </div>

      {/* Stats Cards */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
        <div className="bg-white rounded-lg shadow-md p-6">
          <div className="flex items-center">
            <div className="bg-primary-100 p-3 rounded-full">
              <Home className="h-6 w-6 text-primary-600" />
            </div>
            <div className="ml-4">
              <p className="text-sm font-medium text-gray-600">My Properties</p>
              <p className="text-2xl font-bold text-gray-900">{properties.length}</p>
            </div>
          </div>
        </div>

        <div className="bg-white rounded-lg shadow-md p-6">
          <div className="flex items-center">
            <div className="bg-green-100 p-3 rounded-full">
              <MessageCircle className="h-6 w-6 text-green-600" />
            </div>
            <div className="ml-4">
              <p className="text-sm font-medium text-gray-600">
                {user?.user_type === 'owner' ? 'Property Inquiries' : 'My Inquiries'}
              </p>
              <p className="text-2xl font-bold text-gray-900">{inquiries.length}</p>
            </div>
          </div>
        </div>

        <div className="bg-white rounded-lg shadow-md p-6">
          <div className="flex items-center">
            <div className="bg-blue-100 p-3 rounded-full">
              <Eye className="h-6 w-6 text-blue-600" />
            </div>
            <div className="ml-4">
              <p className="text-sm font-medium text-gray-600">Total Views</p>
              <p className="text-2xl font-bold text-gray-900">
                {properties.reduce((sum, p) => sum + p.views, 0)}
              </p>
            </div>
          </div>
        </div>
      </div>

      {/* Quick Actions */}
      <div className="mb-8">
        <div className="flex space-x-4">
          <Link href="/post-property" className="btn-primary flex items-center space-x-2">
            <Plus className="h-4 w-4" />
            <span>Post New Property</span>
          </Link>
        </div>
      </div>

      {/* My Properties */}
      <div className="mb-8">
        <div className="flex justify-between items-center mb-6">
          <h2 className="text-2xl font-bold text-gray-900">My Properties</h2>
        </div>
        
        {properties.length > 0 ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
            {properties.map((property) => (
              <PropertyCard key={property.id} property={property} />
            ))}
          </div>
        ) : (
          <div className="text-center py-12 bg-white rounded-lg shadow-md">
            <Home className="h-12 w-12 text-gray-400 mx-auto mb-4" />
            <p className="text-gray-600 text-lg mb-4">No properties listed yet</p>
            <Link href="/post-property" className="btn-primary">
              Post Your First Property
            </Link>
          </div>
        )}
      </div>

      {/* Recent Inquiries */}
      <div>
        <h2 className="text-2xl font-bold text-gray-900 mb-6">
          Recent {user?.user_type === 'owner' ? 'Property Inquiries' : 'My Inquiries'}
        </h2>
        
        {inquiries.length > 0 ? (
          <div className="bg-white rounded-lg shadow-md overflow-hidden">
            <div className="divide-y divide-gray-200">
              {inquiries.slice(0, 5).map((inquiry) => (
                <div key={inquiry.id} className="p-6">
                  <div className="flex justify-between items-start">
                    <div>
                      <p className="font-medium text-gray-900">
                        Property ID: {inquiry.property_id}
                      </p>
                      {inquiry.message && (
                        <p className="text-gray-600 mt-1">{inquiry.message}</p>
                      )}
                      <p className="text-sm text-gray-500 mt-2">
                        {new Date(inquiry.created_at).toLocaleDateString()}
                      </p>
                    </div>
                    <span className={`px-2 py-1 text-xs rounded-full ${
                      inquiry.status === 'pending' ? 'bg-yellow-100 text-yellow-800' :
                      inquiry.status === 'contacted' ? 'bg-blue-100 text-blue-800' :
                      'bg-green-100 text-green-800'
                    }`}>
                      {inquiry.status}
                    </span>
                  </div>
                </div>
              ))}
            </div>
          </div>
        ) : (
          <div className="text-center py-12 bg-white rounded-lg shadow-md">
            <MessageCircle className="h-12 w-12 text-gray-400 mx-auto mb-4" />
            <p className="text-gray-600 text-lg">No inquiries yet</p>
          </div>
        )}
      </div>
    </div>
  );
}