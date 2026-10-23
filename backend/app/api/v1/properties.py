from fastapi import APIRouter, Depends, HTTPException, Query, UploadFile, File
from sqlalchemy.orm import Session
from sqlalchemy import and_, or_
from typing import List, Optional
from ...core.database import get_db
from ...models.property import Property
from ...models.property_image import PropertyImage
from ...models.user import User
from ...schemas.property import PropertyCreate, PropertyResponse, PropertyUpdate, PropertySearch
from ...services.auth import get_current_active_user
import shutil
import os
from uuid import uuid4

router = APIRouter()

@router.post("/", response_model=PropertyResponse)
def create_property(
    property: PropertyCreate,
    current_user: User = Depends(get_current_active_user),
    db: Session = Depends(get_db)
):
    db_property = Property(**property.dict(), owner_id=current_user.id)
    db.add(db_property)
    db.commit()
    db.refresh(db_property)
    return db_property

@router.get("/", response_model=List[PropertyResponse])
def search_properties(
    city: Optional[str] = None,
    property_type: Optional[str] = None,
    listing_type: Optional[str] = None,
    min_price: Optional[float] = None,
    max_price: Optional[float] = None,
    bedrooms: Optional[int] = None,
    furnished: Optional[bool] = None,
    page: int = Query(1, ge=1),
    limit: int = Query(20, ge=1, le=100),
    db: Session = Depends(get_db)
):
    query = db.query(Property).filter(Property.is_active == True)
    
    if city:
        query = query.filter(Property.city.ilike(f"%{city}%"))
    if property_type:
        query = query.filter(Property.property_type == property_type)
    if listing_type:
        query = query.filter(Property.listing_type == listing_type)
    if min_price:
        query = query.filter(Property.price >= min_price)
    if max_price:
        query = query.filter(Property.price <= max_price)
    if bedrooms:
        query = query.filter(Property.bedrooms == bedrooms)
    if furnished is not None:
        query = query.filter(Property.furnished == furnished)
    
    properties = query.offset((page - 1) * limit).limit(limit).all()
    return properties

@router.get("/{property_id}", response_model=PropertyResponse)
def get_property(property_id: int, db: Session = Depends(get_db)):
    property = db.query(Property).filter(Property.id == property_id).first()
    if not property:
        raise HTTPException(status_code=404, detail="Property not found")
    
    # Increment views
    property.views += 1
    db.commit()
    
    return property

@router.put("/{property_id}", response_model=PropertyResponse)
def update_property(
    property_id: int,
    property_update: PropertyUpdate,
    current_user: User = Depends(get_current_active_user),
    db: Session = Depends(get_db)
):
    property = db.query(Property).filter(
        Property.id == property_id,
        Property.owner_id == current_user.id
    ).first()
    if not property:
        raise HTTPException(status_code=404, detail="Property not found")
    
    for field, value in property_update.dict(exclude_unset=True).items():
        setattr(property, field, value)
    
    db.commit()
    db.refresh(property)
    return property

@router.post("/{property_id}/images")
def upload_property_images(
    property_id: int,
    files: List[UploadFile] = File(...),
    current_user: User = Depends(get_current_active_user),
    db: Session = Depends(get_db)
):
    property = db.query(Property).filter(
        Property.id == property_id,
        Property.owner_id == current_user.id
    ).first()
    if not property:
        raise HTTPException(status_code=404, detail="Property not found")
    
    os.makedirs("uploads/properties", exist_ok=True)
    uploaded_images = []
    
    for file in files:
        if file.content_type not in ["image/jpeg", "image/png", "image/jpg"]:
            continue
            
        file_extension = file.filename.split(".")[-1]
        filename = f"{uuid4()}.{file_extension}"
        file_path = f"uploads/properties/{filename}"
        
        with open(file_path, "wb") as buffer:
            shutil.copyfileobj(file.file, buffer)
        
        db_image = PropertyImage(
            property_id=property_id,
            image_url=file_path,
            is_primary=len(uploaded_images) == 0
        )
        db.add(db_image)
        uploaded_images.append(filename)
    
    db.commit()
    return {"uploaded_files": uploaded_images}