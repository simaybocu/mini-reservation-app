# Backend - Mini Reservation App

Backend API for the yacht reservation platform built with NestJS and TypeORM.

## Technologies Used

- **NestJS** - Progressive Node.js framework
- **TypeORM** - TypeScript ORM for database management
- **PostgreSQL** - Primary database
- **JWT** - Authentication and authorization
- **bcryptjs** - Password hashing
- **Winston** - Logging
- **Passport** - Authentication middleware

## Database Schema

### Users Table
| Column | Type | Description |
|--------|------|-------------|
| id | UUID | Primary key |
| email | VARCHAR | Unique user email |
| passwordHash | VARCHAR | Hashed password |
| isAdmin | BOOLEAN | Admin privileges flag |
| createdAt | TIMESTAMP | Creation date |
| updatedAt | TIMESTAMP | Last update date |

### Products Table
| Column | Type | Description |
|--------|------|-------------|
| id | UUID | Primary key |
| title | VARCHAR | Product/yacht name |
| description | TEXT | Product description |
| capacity | INTEGER | Maximum capacity |
| imageUrl | VARCHAR | Product image URL |
| location | VARCHAR | Product location |
| createdAt | TIMESTAMP | Creation date |
| updatedAt | TIMESTAMP | Last update date |

### Reservations Table
| Column | Type | Description |
|--------|------|-------------|
| id | UUID | Primary key |
| userId | UUID | Foreign key to users |
| productId | UUID | Foreign key to products |
| date | DATE | Reservation date (YYYY-MM-DD) |
| createdAt | TIMESTAMP | Creation date |
| updatedAt | TIMESTAMP | Last update date |

**Constraints:**
- Unique constraint on (productId, date) - prevents double booking

## API Endpoints

### Authentication
- `POST /auth/login` - User login
- `POST /auth/register` - User registration

### Products
- `GET /products` - List all products
- `GET /products/:id` - Get product details

### Reservations
- `GET /reservations` - Get user's reservations
- `POST /reservations` - Create new reservation

## API Testing

### Postman Collection
The API endpoints can be tested using the provided Postman collection:
- **Collection File:** [`docs/api/MiniReservApp.postman_collection.json`](docs/api/MiniReservApp.postman_collection.json)

## Getting Started

### Prerequisites
- Node.js 18+
- PostgreSQL database
- npm or yarn

### Installation

1. Install dependencies:
```bash
npm install
```

2. Set up environment variables:
```bash
cp .env.example .env
# Edit .env with your database credentials
```

3. Create the database:
```sql
CREATE DATABASE reservation_db;
```

4. Run database migrations:
```bash
npm run migrate
```

5. Seed the database:
```bash
npm run seed
```

### Running the Application

**Development:**
```bash
npm run start
```

**Build:**
```bash
npm run build
```

**Database Commands:**
```bash
npm run migrate    # Run migrations
npm run seed       # Seed database with sample data
```

The API will be available at `http://localhost:3000`

## Environment Variables

Create a `.env` file based on `.env.example`:

```env
PORT=3000
JWT_SECRET=
DB_HOST=localhost
DB_PORT=5432
DB_USER=postgres
DB_PASS=postgres
DB_NAME=reservation_db
ADMIN_EMAIL=admin@example.com
ADMIN_PASSWORD=[:password]
ALLOWED_ORIGINS=http://localhost:3001,http://127.0.0.1:3001
```

**Environment Variables Description:**
- `PORT` - Server port (default: 3000)
- `JWT_SECRET` - Secret for JWT token signing
- `DB_HOST` - PostgreSQL host
- `DB_PORT` - PostgreSQL port
- `DB_USER` - Database username
- `DB_PASS` - Database password
- `DB_NAME` - Database name
- `ADMIN_EMAIL` - Default admin user email
- `ADMIN_PASSWORD` - Default admin user password
- `ALLOWED_ORIGINS` - CORS allowed origins
