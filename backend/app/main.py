from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
from fastapi.staticfiles import StaticFiles
from .api.v1 import auth, properties, users, inquiries
from .core.database import engine
from .models import user, property, property_image, inquiry, chat, lead, subscription
import os

# Create tables
user.Base.metadata.create_all(bind=engine)
property.Base.metadata.create_all(bind=engine)
property_image.Base.metadata.create_all(bind=engine)
inquiry.Base.metadata.create_all(bind=engine)
chat.Base.metadata.create_all(bind=engine)
lead.Base.metadata.create_all(bind=engine)
subscription.Base.metadata.create_all(bind=engine)

app = FastAPI(title="PropDirect API", version="1.0.0", description="Direct property marketplace API")

# CORS middleware
app.add_middleware(
    CORSMiddleware,
    allow_origins=["http://localhost:3000"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

# Static files
os.makedirs("uploads", exist_ok=True)
app.mount("/uploads", StaticFiles(directory="uploads"), name="uploads")

# Routes
app.include_router(auth.router, prefix="/api/v1/auth", tags=["auth"])
app.include_router(properties.router, prefix="/api/v1/properties", tags=["properties"])
app.include_router(users.router, prefix="/api/v1/users", tags=["users"])
app.include_router(inquiries.router, prefix="/api/v1/inquiries", tags=["inquiries"])

@app.get("/")
def read_root():
    return {"message": "PropDirect API - Discover Your Perfect Space"}

@app.get("/health")
def health_check():
    return {"status": "healthy"}