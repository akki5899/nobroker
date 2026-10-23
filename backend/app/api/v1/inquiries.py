from fastapi import APIRouter, Depends, HTTPException
from sqlalchemy.orm import Session
from typing import List
from ...core.database import get_db
from ...models.inquiry import Inquiry
from ...models.property import Property
from ...models.user import User
from ...schemas.inquiry import InquiryCreate, InquiryResponse, InquiryUpdate
from ...services.auth import get_current_active_user

router = APIRouter()

@router.post("/", response_model=InquiryResponse)
def create_inquiry(
    inquiry: InquiryCreate,
    current_user: User = Depends(get_current_active_user),
    db: Session = Depends(get_db)
):
    # Check if property exists
    property = db.query(Property).filter(Property.id == inquiry.property_id).first()
    if not property:
        raise HTTPException(status_code=404, detail="Property not found")
    
    # Check if user already inquired about this property
    existing_inquiry = db.query(Inquiry).filter(
        Inquiry.property_id == inquiry.property_id,
        Inquiry.user_id == current_user.id
    ).first()
    if existing_inquiry:
        raise HTTPException(status_code=400, detail="You have already inquired about this property")
    
    db_inquiry = Inquiry(**inquiry.dict(), user_id=current_user.id)
    db.add(db_inquiry)
    db.commit()
    db.refresh(db_inquiry)
    
    return db_inquiry

@router.get("/my-inquiries", response_model=List[InquiryResponse])
def get_my_inquiries(
    current_user: User = Depends(get_current_active_user),
    db: Session = Depends(get_db)
):
    inquiries = db.query(Inquiry).filter(Inquiry.user_id == current_user.id).all()
    return inquiries

@router.get("/property-inquiries", response_model=List[InquiryResponse])
def get_property_inquiries(
    current_user: User = Depends(get_current_active_user),
    db: Session = Depends(get_db)
):
    # Get inquiries for properties owned by current user
    inquiries = db.query(Inquiry).join(Property).filter(
        Property.owner_id == current_user.id
    ).all()
    return inquiries

@router.put("/{inquiry_id}", response_model=InquiryResponse)
def update_inquiry(
    inquiry_id: int,
    inquiry_update: InquiryUpdate,
    current_user: User = Depends(get_current_active_user),
    db: Session = Depends(get_db)
):
    inquiry = db.query(Inquiry).join(Property).filter(
        Inquiry.id == inquiry_id,
        Property.owner_id == current_user.id
    ).first()
    
    if not inquiry:
        raise HTTPException(status_code=404, detail="Inquiry not found")
    
    for field, value in inquiry_update.dict(exclude_unset=True).items():
        setattr(inquiry, field, value)
    
    db.commit()
    db.refresh(inquiry)
    return inquiry