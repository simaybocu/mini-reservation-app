# Mini Reservation App

A full-stack yacht charter reservation system built with Node.js, NestJS, Next.js, and PostgreSQL. Allows users to browse and book yacht charters with date-based availability management and user authentication.

## Table of Contents

- [Features](#features)
- [Tech Stack](#tech-stack)
- [Installation](#installation)
- [Configuration](#configuration)
- [Running the Application](#running-the-application)
- [Project Structure](#project-structure)

## Features

### Core Functionality
- **Yacht Charter Bookings**: Browse and reserve yachts for specific dates
- **Date-based Availability**: Each yacht can only be reserved once per date
- **User Authentication**: JWT-based authentication with registration and login
- **Booking History**: Users can view their personal reservation history

### Business Logic
- **Future-only Reservations**: Cannot book past dates
- **One Reservation Per Date**: Prevents double-booking of yachts

## Tech Stack

### Backend
- **Framework**: NestJS with TypeScript
- **Database**: PostgreSQL with TypeORM
- **Authentication**: JWT with Passport.js
- **Password Hashing**: bcryptjs
- **Logging**: Winston with structured output
- **Validation**: class-validator

### Frontend
- **Framework**: Next.js 15 with App Router
- **Language**: TypeScript
- **Styling**: Tailwind CSS v4
- **State Management**: React hooks
- **HTTP Client**: Fetch API


## Installation

1. **Clone the repository**
   ```bash
   git clone https://github.com/simaybocu/mini-reservation-app.git
   cd mini-reservation-app
   ```

2. **Install backend dependencies**
   ```bash
   cd backend
   npm install
   ```

3. **Install frontend dependencies**
   ```bash
   cd frontend
   npm install
   ```

## Configuration

### Backend Configuration

- **[Backend Documentation](./backend/README.md)** - API endpoints, database schemas, migrations, authentication, and backend setup

### Frontend Configuration
- **[Frontend Documentation](./frontend/README.md)** - React components, pages structure, technologies, and frontend setup


## Running the Application

### Development Mode

1. **Start the backend server**
   ```bash
   cd backend
   npm run start
   ```
   The API will start on `http://localhost:3000`

2. **Start the frontend development server**
   ```bash
   cd frontend
   npm run dev
   ```
   The app will start on `http://localhost:3001`

## Project Structure

```
mini-reservation-app/
├── backend/                 # NestJS API server
│   ├── src/
│   │   ├── controllers/     # HTTP request handlers
│   │   ├── guards/         # Authentication guards
│   │   ├── migrations/     # Database migrations
│   │   ├── models/         # TypeORM entity models
│   │   ├── services/       # Business logic services
│   │   ├── strategies/     # Passport authentication strategies
│   │   ├── utils/          # Utility functions and logger
│   │   ├── app.module.ts   # Main application module
│   │   ├── main.ts         # Application entry point
│   │   └── seed.ts         # Database seeding script
│   ├── .env.example        # Environment variables template
│   └── package.json        # Backend dependencies and scripts
│
├── frontend/               # Next.js web application
│   ├── app/               # Next.js App Router pages
│   ├── components/        # React components
│   ├── lib/              # Frontend utilities
│   ├── next.config.mjs   # Next.js configuration
│   └── package.json      # Frontend dependencies and scripts
│
└── README.md             # This file
```

## Available Scripts

### Backend Scripts
- `npm run start` - Start development server
- `npm run build` - Build
- `npm run migrate` - Run database migrations
- `npm run seed` - Seed database with initial data

### Frontend Scripts
- `npm run dev` - Start development server on port 3001
- `npm run build` - Build
