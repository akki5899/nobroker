'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { useAuth } from '@/hooks/useAuth';
import { propertyAPI } from '@/lib/api';
import { Upload, X } from 'lucide-react';

export default function PostPropertyPage() {
  const router = useRouter();
  const { user, isAuthenticated } = useAuth();
  const [loading, setLoading] = useState(false);
  const [images, setImages] = useState<File[]>([]);
  const [formData, setFormData] = useState({
    title: '',
    description: '',
    property_type: 'apartment',
    listing_type: 'rent',
    price: '',
    deposit: '',
    area: '',
    bedrooms: '',
    bathrooms: '',
    floor: '',
    total_floors: '',
    age: '',
    furnished: false,
    parking: false,
    balcony: false,
    gym: false,
    swimming_pool: false,
    address: '',
    city: '',
    state: '',
    pincode: '',
  });

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!isAuthenticated) return;

    try {
      setLoading(true);
      
      // Create property
      const propertyData = {
        ...formData,
        price: Number(formData.price),
        deposit: formData.deposit ? Number(formData.deposit) : undefined,
        area: formData.area ? Number(formData.area) : undefined,
        bedrooms: formData.bedrooms ? Number(formData.bedrooms) : undefined,
        bathrooms: formData.bathrooms ? Number(formData.bathrooms) : undefined,
        floor: formData.floor ? Number(formData.floor) : undefined,
        total_floors: formData.total_floors ? Number(formData.total_floors) : undefined,
        age: formData.age ? Number(formData.age) : undefined,
      };

      const response = await propertyAPI.create(propertyData);
      const propertyId = response.data.id;

      // Upload images if any
      if (images.length > 0) {
        const imageFormData = new FormData();
        images.forEach(image => {
          imageFormData.append('files', image);
        });
        await propertyAPI.uploadImages(propertyId, imageFormData);
      }

      router.push('/dashboard');
    } catch (error) {
      console.error('Error creating property:', error);
      alert('Failed to create property');
    } finally {
      setLoading(false);
    }
  };

  const updateField = (field: string, value: any) => {
    setFormData(prev => ({ ...prev, [field]: value }));
  };

  const handleImageUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const files = Array.from(e.target.files || []);
    setImages(prev => [...prev, ...files].slice(0, 10)); // Max 10 images
  };

  const removeImage = (index: number) => {
    setImages(prev => prev.filter((_, i) => i !== index));
  };

  if (!isAuthenticated) {
    return (
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="text-center">
          <h1 className="text-2xl font-bold text-gray-900">Please login to post a property</h1>
        </div>
      </div>
    );
  }

  return (
    <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-gray-900 mb-2">Post Your Property</h1>
        <p className="text-gray-600">Fill in the details to list your property</p>
      </div>

      <form onSubmit={handleSubmit} className="space-y-8">
        {/* Basic Information */}
        <div className="bg-white rounded-lg shadow-md p-6">
          <h2 className="text-xl font-semibold mb-4">Basic Information</h2>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="md:col-span-2">
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Property Title *
              </label>
              <input
                type="text"
                required
                className="input-field"
                placeholder="e.g., 2 BHK Apartment in Koramangala"
                value={formData.title}
                onChange={(e) => updateField('title', e.target.value)}
              />
            </div>
            
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Property Type *
              </label>
              <select
                className="input-field"
                value={formData.property_type}
                onChange={(e) => updateField('property_type', e.target.value)}
              >
                <option value="apartment">Apartment</option>
                <option value="house">House</option>
                <option value="pg">PG</option>
                <option value="office">Office</option>
                <option value="shop">Shop</option>
              </select>
            </div>
            
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Listing Type *
              </label>
              <select
                className="input-field"
                value={formData.listing_type}
                onChange={(e) => updateField('listing_type', e.target.value)}
              >
                <option value="rent">For Rent</option>
                <option value="sale">For Sale</option>
              </select>
            </div>
            
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Price * (₹)
              </label>
              <input
                type="number"
                required
                className="input-field"
                placeholder="Enter price"
                value={formData.price}
                onChange={(e) => updateField('price', e.target.value)}
              />
            </div>
            
            {formData.listing_type === 'rent' && (
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Security Deposit (₹)
                </label>
                <input
                  type="number"
                  className="input-field"
                  placeholder="Enter deposit amount"
                  value={formData.deposit}
                  onChange={(e) => updateField('deposit', e.target.value)}
                />
              </div>
            )}
          </div>
          
          <div className="mt-6">
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Description
            </label>
            <textarea
              rows={4}
              className="input-field"
              placeholder="Describe your property..."
              value={formData.description}
              onChange={(e) => updateField('description', e.target.value)}
            />
          </div>
        </div>

        {/* Property Details */}
        <div className="bg-white rounded-lg shadow-md p-6">
          <h2 className="text-xl font-semibold mb-4">Property Details</h2>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Area (sq ft)
              </label>
              <input
                type="number"
                className="input-field"
                value={formData.area}
                onChange={(e) => updateField('area', e.target.value)}
              />
            </div>
            
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Bedrooms
              </label>
              <select
                className="input-field"
                value={formData.bedrooms}
                onChange={(e) => updateField('bedrooms', e.target.value)}
              >
                <option value="">Select</option>
                <option value="1">1</option>
                <option value="2">2</option>
                <option value="3">3</option>
                <option value="4">4</option>
                <option value="5">5+</option>
              </select>
            </div>
            
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Bathrooms
              </label>
              <select
                className="input-field"
                value={formData.bathrooms}
                onChange={(e) => updateField('bathrooms', e.target.value)}
              >
                <option value="">Select</option>
                <option value="1">1</option>
                <option value="2">2</option>
                <option value="3">3</option>
                <option value="4">4+</option>
              </select>
            </div>
            
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Floor
              </label>
              <input
                type="number"
                className="input-field"
                value={formData.floor}
                onChange={(e) => updateField('floor', e.target.value)}
              />
            </div>
            
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Total Floors
              </label>
              <input
                type="number"
                className="input-field"
                value={formData.total_floors}
                onChange={(e) => updateField('total_floors', e.target.value)}
              />
            </div>
            
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Property Age (years)
              </label>
              <input
                type="number"
                className="input-field"
                value={formData.age}
                onChange={(e) => updateField('age', e.target.value)}
              />
            </div>
          </div>
          
          {/* Amenities */}
          <div className="mt-6">
            <label className="block text-sm font-medium text-gray-700 mb-3">
              Amenities
            </label>
            <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
              {[
                { key: 'furnished', label: 'Furnished' },
                { key: 'parking', label: 'Parking' },
                { key: 'balcony', label: 'Balcony' },
                { key: 'gym', label: 'Gym' },
                { key: 'swimming_pool', label: 'Swimming Pool' },
              ].map(({ key, label }) => (
                <label key={key} className="flex items-center">
                  <input
                    type="checkbox"
                    checked={formData[key as keyof typeof formData] as boolean}
                    onChange={(e) => updateField(key, e.target.checked)}
                    className="mr-2"
                  />
                  <span className="text-sm text-gray-700">{label}</span>
                </label>
              ))}
            </div>
          </div>
        </div>

        {/* Location */}
        <div className="bg-white rounded-lg shadow-md p-6">
          <h2 className="text-xl font-semibold mb-4">Location</h2>
          
          <div className="space-y-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Full Address *
              </label>
              <textarea
                rows={3}
                required
                className="input-field"
                placeholder="Enter complete address"
                value={formData.address}
                onChange={(e) => updateField('address', e.target.value)}
              />
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  City *
                </label>
                <input
                  type="text"
                  required
                  className="input-field"
                  value={formData.city}
                  onChange={(e) => updateField('city', e.target.value)}
                />
              </div>
              
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  State *
                </label>
                <input
                  type="text"
                  required
                  className="input-field"
                  value={formData.state}
                  onChange={(e) => updateField('state', e.target.value)}
                />
              </div>
              
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Pincode *
                </label>
                <input
                  type="text"
                  required
                  className="input-field"
                  value={formData.pincode}
                  onChange={(e) => updateField('pincode', e.target.value)}
                />
              </div>
            </div>
          </div>
        </div>

        {/* Images */}
        <div className="bg-white rounded-lg shadow-md p-6">
          <h2 className="text-xl font-semibold mb-4">Property Images</h2>
          
          <div className="mb-4">
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Upload Images (Max 10)
            </label>
            <div className="border-2 border-dashed border-gray-300 rounded-lg p-6 text-center">
              <Upload className="h-12 w-12 text-gray-400 mx-auto mb-4" />
              <input
                type="file"
                multiple
                accept="image/*"
                onChange={handleImageUpload}
                className="hidden"
                id="image-upload"
              />
              <label
                htmlFor="image-upload"
                className="cursor-pointer text-primary-600 hover:text-primary-700"
              >
                Click to upload images
              </label>
            </div>
          </div>
          
          {images.length > 0 && (
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
              {images.map((image, index) => (
                <div key={index} className="relative">
                  <img
                    src={URL.createObjectURL(image)}
                    alt={`Preview ${index + 1}`}
                    className="w-full h-24 object-cover rounded"
                  />
                  <button
                    type="button"
                    onClick={() => removeImage(index)}
                    className="absolute -top-2 -right-2 bg-red-500 text-white rounded-full p-1"
                  >
                    <X className="h-4 w-4" />
                  </button>
                </div>
              ))}
            </div>
          )}
        </div>

        {/* Submit */}
        <div className="flex justify-end space-x-4">
          <button
            type="button"
            onClick={() => router.back()}
            className="btn-secondary"
          >
            Cancel
          </button>
          <button
            type="submit"
            disabled={loading}
            className="btn-primary disabled:opacity-50 disabled:cursor-not-allowed"
          >
            {loading ? 'Posting...' : 'Post Property'}
          </button>
        </div>
      </form>
    </div>
  );
}