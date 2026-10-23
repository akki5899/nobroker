'use client';

import { useState, useEffect } from 'react';
import { useParams } from 'next/navigation';
import Image from 'next/image';
import { propertyAPI, inquiryAPI } from '@/lib/api';
import { useAuth } from '@/hooks/useAuth';
import { Property } from '@/types';
import { MapPin, Bed, Bath, Square, Calendar, Phone, Mail, MessageCircle } from 'lucide-react';

export default function PropertyDetailPage() {
  const params = useParams();
  const { user, isAuthenticated } = useAuth();
  const [property, setProperty] = useState<Property | null>(null);
  const [loading, setLoading] = useState(true);
  const [currentImageIndex, setCurrentImageIndex] = useState(0);
  const [showInquiryForm, setShowInquiryForm] = useState(false);
  const [inquiryMessage, setInquiryMessage] = useState('');
  const [inquiryLoading, setInquiryLoading] = useState(false);

  useEffect(() => {
    if (params.id) {
      fetchProperty(Number(params.id));
    }
  }, [params.id]);

  const fetchProperty = async (id: number) => {
    try {
      const response = await propertyAPI.getById(id);
      setProperty(response.data);
    } catch (error) {
      console.error('Error fetching property:', error);
    } finally {
      setLoading(false);
    }
  };

  const handleInquiry = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!property || !isAuthenticated) return;

    try {
      setInquiryLoading(true);
      await inquiryAPI.create({
        property_id: property.id,
        message: inquiryMessage
      });
      setShowInquiryForm(false);
      setInquiryMessage('');
      alert('Inquiry sent successfully!');
    } catch (error) {
      console.error('Error sending inquiry:', error);
      alert('Failed to send inquiry');
    } finally {
      setInquiryLoading(false);
    }
  };

  if (loading) {
    return (
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="animate-pulse">
          <div className="h-96 bg-gray-300 rounded-lg mb-8"></div>
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            <div className="lg:col-span-2 space-y-4">
              <div className="h-8 bg-gray-300 rounded"></div>
              <div className="h-4 bg-gray-300 rounded w-3/4"></div>
              <div className="h-32 bg-gray-300 rounded"></div>
            </div>
            <div className="h-64 bg-gray-300 rounded"></div>
          </div>
        </div>
      </div>
    );
  }

  if (!property) {
    return (
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="text-center">
          <h1 className="text-2xl font-bold text-gray-900">Property not found</h1>
        </div>
      </div>
    );
  }

  const images = property.images.length > 0 ? property.images : [{ id: 0, image_url: '/placeholder.jpg', is_primary: true }];

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      {/* Image Gallery */}
      <div className="mb-8">
        <div className="relative h-96 rounded-lg overflow-hidden">
          <Image
            src={`http://localhost:8000/${images[currentImageIndex].image_url}`}
            alt={property.title}
            fill
            className="object-cover"
            onError={(e) => {
              e.currentTarget.src = '/placeholder.jpg';
            }}
          />
          {images.length > 1 && (
            <div className="absolute bottom-4 left-1/2 transform -translate-x-1/2 flex space-x-2">
              {images.map((_, index) => (
                <button
                  key={index}
                  onClick={() => setCurrentImageIndex(index)}
                  className={`w-3 h-3 rounded-full ${
                    index === currentImageIndex ? 'bg-white' : 'bg-white/50'
                  }`}
                />
              ))}
            </div>
          )}
        </div>
        
        {images.length > 1 && (
          <div className="flex space-x-2 mt-4 overflow-x-auto">
            {images.map((image, index) => (
              <button
                key={image.id}
                onClick={() => setCurrentImageIndex(index)}
                className="flex-shrink-0"
              >
                <Image
                  src={`http://localhost:8000/${image.image_url}`}
                  alt=""
                  width={80}
                  height={60}
                  className={`rounded object-cover ${
                    index === currentImageIndex ? 'ring-2 ring-primary-600' : ''
                  }`}
                  onError={(e) => {
                    e.currentTarget.src = '/placeholder.jpg';
                  }}
                />
              </button>
            ))}
          </div>
        )}
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        {/* Property Details */}
        <div className="lg:col-span-2">
          <div className="bg-white rounded-lg shadow-md p-6">
            <div className="flex justify-between items-start mb-4">
              <div>
                <h1 className="text-3xl font-bold text-gray-900 mb-2">{property.title}</h1>
                <div className="flex items-center text-gray-600 mb-4">
                  <MapPin className="h-5 w-5 mr-2" />
                  <span>{property.address}, {property.city}, {property.state}</span>
                </div>
              </div>
              <div className="text-right">
                <div className="text-3xl font-bold text-primary-600">
                  ₹{property.price.toLocaleString()}
                </div>
                <div className="text-gray-600">
                  {property.listing_type === 'rent' ? '/month' : ''}
                </div>
              </div>
            </div>

            {/* Property Features */}
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-6">
              {property.bedrooms && (
                <div className="flex items-center space-x-2">
                  <Bed className="h-5 w-5 text-gray-600" />
                  <span>{property.bedrooms} Bedrooms</span>
                </div>
              )}
              {property.bathrooms && (
                <div className="flex items-center space-x-2">
                  <Bath className="h-5 w-5 text-gray-600" />
                  <span>{property.bathrooms} Bathrooms</span>
                </div>
              )}
              {property.area && (
                <div className="flex items-center space-x-2">
                  <Square className="h-5 w-5 text-gray-600" />
                  <span>{property.area} sq ft</span>
                </div>
              )}
              {property.age && (
                <div className="flex items-center space-x-2">
                  <Calendar className="h-5 w-5 text-gray-600" />
                  <span>{property.age} years old</span>
                </div>
              )}
            </div>

            {/* Amenities */}
            <div className="mb-6">
              <h3 className="text-lg font-semibold mb-3">Amenities</h3>
              <div className="grid grid-cols-2 md:grid-cols-3 gap-2">
                {property.furnished && <span className="text-green-600">✓ Furnished</span>}
                {property.parking && <span className="text-green-600">✓ Parking</span>}
                {property.balcony && <span className="text-green-600">✓ Balcony</span>}
                {property.gym && <span className="text-green-600">✓ Gym</span>}
                {property.swimming_pool && <span className="text-green-600">✓ Swimming Pool</span>}
              </div>
            </div>

            {/* Description */}
            {property.description && (
              <div>
                <h3 className="text-lg font-semibold mb-3">Description</h3>
                <p className="text-gray-700 leading-relaxed">{property.description}</p>
              </div>
            )}
          </div>
        </div>

        {/* Contact Card */}
        <div className="lg:col-span-1">
          <div className="bg-white rounded-lg shadow-md p-6 sticky top-8">
            <h3 className="text-lg font-semibold mb-4">Contact Owner</h3>
            
            {isAuthenticated ? (
              <div className="space-y-4">
                <button
                  onClick={() => setShowInquiryForm(true)}
                  className="w-full btn-primary flex items-center justify-center space-x-2"
                >
                  <MessageCircle className="h-4 w-4" />
                  <span>Send Inquiry</span>
                </button>
                
                <div className="text-center text-gray-600">
                  <p className="text-sm">Property Views: {property.views}</p>
                </div>
              </div>
            ) : (
              <div className="text-center">
                <p className="text-gray-600 mb-4">Login to contact the owner</p>
                <a href="/login" className="btn-primary inline-block">
                  Login
                </a>
              </div>
            )}
          </div>
        </div>
      </div>

      {/* Inquiry Modal */}
      {showInquiryForm && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <div className="bg-white rounded-lg p-6 max-w-md w-full mx-4">
            <h3 className="text-lg font-semibold mb-4">Send Inquiry</h3>
            <form onSubmit={handleInquiry}>
              <textarea
                className="input-field mb-4"
                rows={4}
                placeholder="Write your message..."
                value={inquiryMessage}
                onChange={(e) => setInquiryMessage(e.target.value)}
                required
              />
              <div className="flex space-x-4">
                <button
                  type="button"
                  onClick={() => setShowInquiryForm(false)}
                  className="btn-secondary flex-1"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  disabled={inquiryLoading}
                  className="btn-primary flex-1 disabled:opacity-50"
                >
                  {inquiryLoading ? 'Sending...' : 'Send'}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}