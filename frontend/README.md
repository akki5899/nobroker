# NoBroker Clone Frontend

A Next.js-based frontend for a real estate platform similar to NoBroker.

## Features

- **Property Search & Filtering**: Advanced search with multiple filters
- **User Authentication**: Login/Register with JWT
- **Property Listings**: Browse and view property details
- **Property Management**: Post and manage properties (for owners)
- **Inquiry System**: Contact property owners directly
- **Responsive Design**: Mobile-first approach
- **Image Gallery**: Property image viewing with carousel

## Tech Stack

- **Framework**: Next.js 14 with App Router
- **Language**: TypeScript
- **Styling**: Tailwind CSS
- **State Management**: React Hooks + Custom hooks
- **HTTP Client**: Axios
- **Icons**: Lucide React
- **Authentication**: JWT with cookies

## Setup

1. Install dependencies:
```bash
npm install
```

2. Copy environment variables:
```bash
cp .env.local.example .env.local
```

3. Start development server:
```bash
npm run dev
```

4. Build for production:
```bash
npm run build
npm start
```

## Project Structure

```
src/
├── app/                    # Next.js App Router pages
│   ├── login/             # Login page
│   ├── register/          # Registration page
│   ├── properties/        # Property listing & details
│   ├── dashboard/         # User dashboard
│   └── post-property/     # Property posting form
├── components/            # Reusable components
│   ├── Header.tsx         # Navigation header
│   ├── PropertyCard.tsx   # Property card component
│   └── SearchForm.tsx     # Search form component
├── hooks/                 # Custom React hooks
│   └── useAuth.ts         # Authentication hook
├── lib/                   # Utilities and configurations
│   └── api.ts             # API client setup
└── types/                 # TypeScript type definitions
    └── index.ts           # Main type definitions
```

## Key Components

### Authentication
- JWT-based authentication with HTTP-only cookies
- Protected routes and user state management
- Role-based access (owner/tenant/buyer)

### Property Management
- Property listing with advanced search
- Image upload and gallery
- Property details with amenities
- Inquiry system for lead generation

### User Interface
- Responsive design with Tailwind CSS
- Loading states and error handling
- Form validation and user feedback
- Mobile-optimized navigation

## API Integration

The frontend integrates with the FastAPI backend through:
- RESTful API calls using Axios
- JWT token management
- File upload for property images
- Real-time search and filtering

## Environment Variables

- `NEXT_PUBLIC_API_URL`: Backend API URL (default: http://localhost:8000)

## Development

Access the application at: http://localhost:3000

The frontend automatically connects to the backend API for all data operations.