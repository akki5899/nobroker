from sqlalchemy import Column, Integer, String, Float, Boolean, DateTime, Text, ForeignKey, Enum
from sqlalchemy.sql import func
from sqlalchemy.orm import relationship
from ..core.database import Base
import enum

class PropertyType(enum.Enum):
    APARTMENT = "apartment"
    HOUSE = "house"
    VILLA = "villa"
    BUILDER_FLOOR = "builder_floor"
    STUDIO = "studio"
    FARMHOUSE = "farmhouse"
    SERVICED_APARTMENT = "serviced_apartment"
    PG = "pg"
    HOSTEL = "hostel"
    OFFICE = "office"
    RETAIL = "retail"
    WAREHOUSE = "warehouse"
    LAND = "land"
    PLOT = "plot"
    COMMERCIAL_LAND = "commercial_land"
    OTHER = "other"

class ListingType(enum.Enum):
    RENT = "rent"
    SALE = "sale"

class Property(Base):
    __tablename__ = "properties"
    
    id = Column(Integer, primary_key=True, index=True)
    title = Column(String, nullable=False)
    description = Column(Text)
    property_type = Column(Enum(PropertyType), nullable=False)
    listing_type = Column(Enum(ListingType), nullable=False)
    price = Column(Float, nullable=False)
    deposit = Column(Float)
    area = Column(Float)
    bedrooms = Column(Integer)
    bathrooms = Column(Integer)
    floor = Column(Integer)
    total_floors = Column(Integer)
    age = Column(Integer)
    furnished = Column(Boolean, default=False)
    parking = Column(Boolean, default=False)
    balcony = Column(Boolean, default=False)
    gym = Column(Boolean, default=False)
    swimming_pool = Column(Boolean, default=False)
    
    # Location
    address = Column(Text, nullable=False)
    city = Column(String, nullable=False, index=True)
    state = Column(String, nullable=False)
    pincode = Column(String, nullable=False)
    latitude = Column(Float)
    longitude = Column(Float)
    
    # Status
    is_active = Column(Boolean, default=True)
    is_featured = Column(Boolean, default=False)
    views = Column(Integer, default=0)
    
    # Relationships
    owner_id = Column(Integer, ForeignKey("users.id"), nullable=False)
    created_at = Column(DateTime(timezone=True), server_default=func.now())
    updated_at = Column(DateTime(timezone=True), onupdate=func.now())
    
    owner = relationship("User", back_populates="properties")
    images = relationship("PropertyImage", back_populates="property")
    inquiries = relationship("Inquiry", back_populates="property")