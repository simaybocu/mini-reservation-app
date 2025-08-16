# Frontend - Mini Reservation App

Frontend application for the yacht reservation platform built with Next.js and React.

## Technologies Used

- **Next.js 15.4.6** - React framework with App Router
- **React 19.1.0** - UI library
- **TypeScript** - Type-safe JavaScript
- **Tailwind CSS 4** - Utility-first CSS framework
- **ESLint** - Code linting

## Features

### Authentication System
- User login and registration
- JWT token-based authentication
- Persistent login state with localStorage
- Protected routes with automatic redirects

### Yacht Browsing
- Responsive grid layout for yacht listings
- Yacht details with images, capacity, and location
- Search and discovery interface

### Reservation Management
- Date picker for booking selection
- One-click reservation booking
- Personal reservation dashboard
- Booking history with yacht details

## Pages Structure

- **`/`** - Authentication page (login/register)
- **`/home`** - Yacht listings and discovery
- **`/products/[id]`** - Individual yacht details and booking
- **`/reservations`** - User's reservation history

## Getting Started

### Prerequisites
- Node.js 18+
- Backend API running on `http://localhost:3000`

### Installation

1. Install dependencies:
```bash
npm install
```

2. Start the development server:
```bash
npm run dev
```

The application will be available at `http://localhost:3001`

### Build

```bash
npm run build
```

## API Integration

The frontend communicates with the backend API at `http://localhost:3000` using:

- **Authentication endpoints** - `/auth/login`, `/auth/register`
- **Products endpoints** - `/products`, `/products/:id`
- **Reservations endpoints** - `/reservations`

JWT tokens are stored in localStorage and automatically included in API requests.

## Development Notes

- Uses App Router architecture (Next.js 13+)
- Client-side state management with localStorage
- Responsive design with Tailwind CSS
- TypeScript for type safety
- Future date validation for reservations
