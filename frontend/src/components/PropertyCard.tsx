import Image from 'next/image';
import Link from 'next/link';
import { Property } from '@/types';
import { MapPin, Bed, Bath, Square, Eye, Heart, Share2, Phone, Calendar, CheckCircle } from 'lucide-react';
import { useState } from 'react';

interface PropertyCardProps {
  property: Property;
}

export default function PropertyCard({ property }: PropertyCardProps) {
  const [isFavorited, setIsFavorited] = useState(false);
  const primaryImage = property.images.find(img => img.is_primary) || property.images[0];
  const imageUrl = primaryImage ? `http://localhost:8000/${primaryImage.image_url}` : '/placeholder.jpg';

  const handleFavorite = (e: React.MouseEvent) => {
    e.preventDefault();
    setIsFavorited(!isFavorited);
  };

  const handleShare = (e: React.MouseEvent) => {
    e.preventDefault();
    // Share functionality
  };

  const handleContact = (e: React.MouseEvent) => {
    e.preventDefault();
    // Contact functionality
  };

  return (
    <div className="bg-white rounded-xl shadow-sm hover:shadow-lg transition-all duration-300 overflow-hidden group border border-gray-100">
      <Link href={`/properties/${property.id}`}>
        <div className="relative h-48 overflow-hidden">
          <Image
            src={imageUrl}
            alt={property.title}
            fill
            className="object-cover group-hover:scale-105 transition-transform duration-300"
            onError={(e) => {
              e.currentTarget.src = '/placeholder.jpg';
            }}
          />
          
          {/* Property Type Badge */}
          <div className="absolute top-3 left-3">
            <span className={`px-3 py-1 rounded-full text-xs font-semibold ${
              property.listing_type === 'rent' 
                ? 'bg-green-500 text-white' 
                : 'bg-blue-500 text-white'
            }`}>
              {property.listing_type === 'rent' ? 'For Rent' : 'For Sale'}
            </span>
          </div>
          
          {/* Action Buttons */}
          <div className="absolute top-3 right-3 flex space-x-2">
            <button
              onClick={handleFavorite}
              className={`p-2 rounded-full backdrop-blur-sm transition-colors ${
                isFavorited 
                  ? 'bg-red-500 text-white' 
                  : 'bg-white/80 text-gray-700 hover:bg-red-500 hover:text-white'
              }`}
            >
              <Heart className={`h-4 w-4 ${isFavorited ? 'fill-current' : ''}`} />
            </button>
            <button
              onClick={handleShare}
              className="p-2 rounded-full bg-white/80 text-gray-700 hover:bg-gray-900 hover:text-white backdrop-blur-sm transition-colors"
            >
              <Share2 className="h-4 w-4" />
            </button>
          </div>
          
          {/* Views Counter */}
          <div className="absolute bottom-3 left-3">
            <div className="bg-black/60 text-white px-2 py-1 rounded-full text-xs flex items-center space-x-1">
              <Eye className="h-3 w-3" />
              <span>{property.views || 0}</span>
            </div>
          </div>
          
          {/* Verified Badge */}
          <div className="absolute bottom-3 right-3">
            <div className="bg-green-500 text-white px-2 py-1 rounded-full text-xs flex items-center space-x-1">
              <CheckCircle className="h-3 w-3" />
              <span>Verified</span>
            </div>
          </div>
        </div>
      </Link>
      
      <div className="p-4">
        <Link href={`/properties/${property.id}`}>
          <h3 className="font-semibold text-lg mb-2 line-clamp-2 hover:text-red-600 transition-colors">
            {property.title}
          </h3>
        </Link>
        
        <div className="flex items-center text-gray-600 mb-3">
          <MapPin className="h-4 w-4 mr-1 text-red-500" />
          <span className="text-sm">{property.city}, {property.state}</span>
        </div>
        
        <div className="flex items-center justify-between text-gray-600 mb-4">
          <div className="flex items-center space-x-4">
            {property.bedrooms && (
              <div className="flex items-center space-x-1">
                <Bed className="h-4 w-4" />
                <span className="text-sm">{property.bedrooms} BHK</span>
              </div>
            )}
            {property.bathrooms && (
              <div className="flex items-center space-x-1">
                <Bath className="h-4 w-4" />
                <span className="text-sm">{property.bathrooms}</span>
              </div>
            )}
          </div>
          {property.area && (
            <div className="flex items-center space-x-1 text-gray-500">
              <Square className="h-4 w-4" />
              <span className="text-sm">{property.area} sq ft</span>
            </div>
          )}
        </div>
        
        <div className="flex justify-between items-center mb-4">
          <div>
            <div className="text-2xl font-bold text-gray-900">
              ₹{property.price.toLocaleString()}
            </div>
            <div className="text-sm text-gray-500">
              {property.listing_type === 'rent' ? 'per month' : 'total price'}
            </div>
          </div>
          <div className="text-right">
            <div className="text-sm font-medium text-gray-900 capitalize">
              {property.property_type}
            </div>
            <div className="text-xs text-gray-500 flex items-center">
              <Calendar className="h-3 w-3 mr-1" />
              <span>2 days ago</span>
            </div>
          </div>
        </div>
        
        {/* Action Buttons */}
        <div className="flex space-x-2">
          <button
            onClick={handleContact}
            className="flex-1 bg-red-600 text-white py-2 px-4 rounded-lg hover:bg-red-700 transition-colors flex items-center justify-center space-x-2 font-medium"
          >
            <Phone className="h-4 w-4" />
            <span>Contact</span>
          </button>
          <Link 
            href={`/properties/${property.id}`}
            className="flex-1 border border-gray-300 text-gray-700 py-2 px-4 rounded-lg hover:bg-gray-50 transition-colors text-center font-medium"
          >
            View Details
          </Link>
        </div>
      </div>
    </div>
  );
}