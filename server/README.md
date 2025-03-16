# Liquor Online Clone - Backend

This is the backend API for the Liquor Online Clone project. It is built with Node.js, Express, and MongoDB.

## Project Structure

The project follows a modular architecture with a clear separation of concerns:

```
src/
├── config/              # Configuration files
│   ├── db.js            # Database configuration
│   └── env.js           # Environment variables
│
├── controllers/         # Request handlers
│   ├── productController.js
│   ├── categoryController.js
│   └── ...
│
├── models/              # Database models
│   ├── Product.js
│   ├── Category.js
│   └── ...
│
├── routes/              # API routes
│   ├── productRoutes.js
│   ├── categoryRoutes.js
│   └── ...
│
├── middleware/          # Express middleware
│   ├── auth.js
│   ├── error.js
│   └── ...
│
└── utils/               # Utility functions
    ├── logger.js
    └── validators.js
```

## API Endpoints

### Products

- `GET /api/products` - Get all products
- `GET /api/products/:id` - Get product by ID
- `GET /api/products/category/:category` - Get products by category
- `GET /api/products/brand/:brand` - Get products by brand
- `GET /api/products/type/:type` - Get products by type
- `POST /api/products` - Create a new product
- `PUT /api/products/:id` - Update a product
- `DELETE /api/products/:id` - Delete a product

### Categories

- `GET /api/categories` - Get all categories
- `GET /api/categories/:id` - Get category by ID
- `POST /api/categories` - Create a new category
- `PUT /api/categories/:id` - Update a category
- `DELETE /api/categories/:id` - Delete a category

### Types

- `GET /api/types` - Get all types
- `GET /api/types/:id` - Get type by ID
- `POST /api/types` - Create a new type
- `PUT /api/types/:id` - Update a type
- `DELETE /api/types/:id` - Delete a type

### Brands

- `GET /api/brands` - Get all brands
- `GET /api/brands/:id` - Get brand by ID
- `POST /api/brands` - Create a new brand
- `PUT /api/brands/:id` - Update a brand
- `DELETE /api/brands/:id` - Delete a brand

### Countries

- `GET /api/countries` - Get all countries
- `GET /api/countries/:id` - Get country by ID
- `POST /api/countries` - Create a new country
- `PUT /api/countries/:id` - Update a country
- `DELETE /api/countries/:id` - Delete a country

### Authentication

- `POST /api/auth/register` - Register a new user
- `POST /api/auth/login` - Login a user
- `POST /api/auth/logout` - Logout a user
- `GET /api/auth/me` - Get current user

## Getting Started

1. Clone the repository
2. Install dependencies: `npm install`
3. Create a `.env` file with the following variables:
   ```
   PORT=5000
   MONGODB_URI=mongodb://localhost:27017/liquor-online
   JWT_SECRET=your_jwt_secret
   ```
4. Start the server: `npm start`

## Available Scripts

- `npm start` - Start the server
- `npm run dev` - Start the server with nodemon
- `npm test` - Run tests

## Data Models

### Product

```javascript
{
  id: String,
  name: String,
  slug: String,
  description: String,
  price: Number,
  salePrice: Number,
  image: String,
  images: [String],
  categoryId: String,
  typeId: String,
  brandId: String,
  countryId: String,
  isActive: Boolean,
  isHot: Boolean,
  isFeatured: Boolean,
  stock: Number,
  sku: String,
  metadata: Object
}
```

### Category

```javascript
{
  id: String,
  name: String,
  slug: String,
  description: String,
  parentId: String,
  image: String,
  isActive: Boolean,
  displayOrder: Number,
  filterMetadata: Object
}
```

### Type

```javascript
{
  id: String,
  name: String,
  slug: String,
  description: String,
  isActive: Boolean,
  displayOrder: Number,
  categoryIds: [String],
  filterMetadata: Object
}
```

### Brand

```javascript
{
  id: String,
  name: String,
  slug: String,
  description: String,
  logo: String,
  website: String,
  isActive: Boolean,
  countryId: String,
  filterMetadata: Object
}
```

### Country

```javascript
{
  id: String,
  name: String,
  code: String,
  flag: String,
  isActive: Boolean,
  filterMetadata: Object
}
```

### User

```javascript
{
  id: String,
  firstName: String,
  lastName: String,
  email: String,
  password: String,
  role: String,
  isActive: Boolean,
  createdAt: Date,
  updatedAt: Date
}
``` 