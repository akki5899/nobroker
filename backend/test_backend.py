#!/usr/bin/env python3
"""
Quick test script to verify backend structure and imports
"""

def test_imports():
    try:
        # Test core imports
        from app.core.config import settings
        from app.core.database import get_db
        from app.core.security import create_access_token
        
        # Test model imports
        from app.models.user import User, UserType
        from app.models.property import Property, PropertyType, ListingType
        from app.models.property_image import PropertyImage
        from app.models.inquiry import Inquiry, InquiryStatus
        
        # Test schema imports
        from app.schemas.user import UserCreate, UserResponse
        from app.schemas.property import PropertyCreate, PropertyResponse
        from app.schemas.inquiry import InquiryCreate, InquiryResponse
        
        # Test API imports
        from app.api.v1 import auth, properties, users, inquiries
        
        # Test main app
        from app.main import app
        
        print("✅ All imports successful!")
        return True
        
    except ImportError as e:
        print(f"❌ Import error: {e}")
        return False

def test_enums():
    try:
        from app.models.user import UserType
        from app.models.property import PropertyType, ListingType
        from app.models.inquiry import InquiryStatus
        
        # Test enum values
        assert UserType.OWNER.value == "owner"
        assert PropertyType.APARTMENT.value == "apartment"
        assert ListingType.RENT.value == "rent"
        assert InquiryStatus.PENDING.value == "pending"
        
        print("✅ All enums working correctly!")
        return True
        
    except Exception as e:
        print(f"❌ Enum error: {e}")
        return False

if __name__ == "__main__":
    print("Testing NoBroker Backend Structure...")
    print("=" * 40)
    
    success = True
    success &= test_imports()
    success &= test_enums()
    
    print("=" * 40)
    if success:
        print("🎉 Backend structure is complete and ready!")
        print("\nNext steps:")
        print("1. Set up PostgreSQL database")
        print("2. Copy .env.example to .env and configure")
        print("3. Run: pip install -r requirements.txt")
        print("4. Run: alembic upgrade head")
        print("5. Run: python run.py")
    else:
        print("❌ Backend has issues that need to be fixed")