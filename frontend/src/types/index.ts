export interface User {
  id: number;
  email: string;
  phone: string;
  full_name: string;
  user_type: 'owner' | 'tenant' | 'buyer' | 'agent' | 'builder';
  is_active: boolean;
  is_verified: boolean;
  created_at: string;
}

export interface Property {
  id: number;
  title: string;
  description?: string;
  property_type: 'apartment' | 'house' | 'villa' | 'builder_floor' | 'studio' | 'farmhouse' | 'serviced_apartment' | 'pg' | 'hostel' | 'office' | 'retail' | 'warehouse' | 'land' | 'plot' | 'commercial_land' | 'other';
  listing_type: 'rent' | 'sale';
  price: number;
  deposit?: number;
  area?: number;
  bedrooms?: number;
  bathrooms?: number;
  floor?: number;
  total_floors?: number;
  age?: number;
  furnished: boolean;
  parking: boolean;
  balcony: boolean;
  gym: boolean;
  swimming_pool: boolean;
  address: string;
  city: string;
  state: string;
  pincode: string;
  latitude?: number;
  longitude?: number;
  is_active: boolean;
  is_featured: boolean;
  views: number;
  owner_id: number;
  created_at: string;
  images: PropertyImage[];
}

export interface PropertyImage {
  id: number;
  image_url: string;
  is_primary: boolean;
}

export interface Inquiry {
  id: number;
  property_id: number;
  user_id: number;
  message?: string;
  status: 'pending' | 'contacted' | 'closed';
  created_at: string;
}

export interface SearchFilters {
  city?: string;
  property_type?: string;
  listing_type?: string;
  min_price?: number;
  max_price?: number;
  bedrooms?: number;
  furnished?: boolean;
  page?: number;
  limit?: number;
}