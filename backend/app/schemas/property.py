from pydantic import BaseModel
from typing import Optional, List
from datetime import datetime
from ..models.property import PropertyType, ListingType

class PropertyImageResponse(BaseModel):
    id: int
    image_url: str
    is_primary: bool
    
    class Config:
        from_attributes = True

class PropertyBase(BaseModel):
    title: str
    description: Optional[str] = None
    property_type: PropertyType
    listing_type: ListingType
    price: float
    deposit: Optional[float] = None
    area: Optional[float] = None
    bedrooms: Optional[int] = None
    bathrooms: Optional[int] = None
    floor: Optional[int] = None
    total_floors: Optional[int] = None
    age: Optional[int] = None
    furnished: bool = False
    parking: bool = False
    balcony: bool = False
    gym: bool = False
    swimming_pool: bool = False
    address: str
    city: str
    state: str
    pincode: str
    latitude: Optional[float] = None
    longitude: Optional[float] = None

class PropertyCreate(PropertyBase):
    pass

class PropertyUpdate(BaseModel):
    title: Optional[str] = None
    description: Optional[str] = None
    price: Optional[float] = None
    deposit: Optional[float] = None
    is_active: Optional[bool] = None

class PropertyResponse(PropertyBase):
    id: int
    is_active: bool
    is_featured: bool
    views: int
    owner_id: int
    created_at: datetime
    images: List[PropertyImageResponse] = []
    
    class Config:
        from_attributes = True

class PropertySearch(BaseModel):
    city: Optional[str] = None
    property_type: Optional[PropertyType] = None
    listing_type: Optional[ListingType] = None
    min_price: Optional[float] = None
    max_price: Optional[float] = None
    bedrooms: Optional[int] = None
    furnished: Optional[bool] = None
    page: int = 1
    limit: int = 20