# Liquor Online Server

Backend API for the Liquor Online e-commerce platform.

## Setup

1. Install dependencies:
   ```
   npm install
   ```

2. Create a `.env` file in the root directory with the following variables:
   ```
   PORT=5000
   NODE_ENV=development
   MONGO_URI=mongodb://localhost:27017/liquor-online
   JWT_SECRET=your_jwt_secret_key
   JWT_EXPIRE=30d
   ```

3. Start the development server:
   ```
   npm run dev
   ```

## API Endpoints

### Products
- `GET /api/products` - Get all products with filtering
- `GET /api/products/:id` - Get single product by ID
- `POST /api/products` - Create new product
- `PUT /api/products/:id` - Update product
- `DELETE /api/products/:id` - Delete product
- `GET /api/products/filter-counts` - Get filter counts

### Categories
- `GET /api/categories` - Get all categories
- `GET /api/categories/:id` - Get single category by ID
- `GET /api/categories/slug/:slug` - Get category by slug
- `POST /api/categories` - Create new category
- `PUT /api/categories/:id` - Update category
- `DELETE /api/categories/:id` - Delete category
- `GET /api/categories/hierarchy` - Get category hierarchy

### Types
- `GET /api/types` - Get all types
- `GET /api/types/:id` - Get single type by ID
- `GET /api/types/slug/:slug` - Get type by slug
- `POST /api/types` - Create new type
- `PUT /api/types/:id` - Update type
- `DELETE /api/types/:id` - Delete type
- `GET /api/types/category/:categoryId` - Get types by category

### Brands
- `GET /api/brands` - Get all brands
- `GET /api/brands/:id` - Get single brand by ID
- `GET /api/brands/slug/:slug` - Get brand by slug
- `POST /api/brands` - Create new brand
- `PUT /api/brands/:id` - Update brand
- `DELETE /api/brands/:id` - Delete brand
- `GET /api/brands/category/:categoryId` - Get brands by category

## Data Models

### Product
- name: String (required)
- description: String (required)
- price: Number (required)
- images: [String]
- stock: Number (required, default: 0)
- sku: String (required, unique)
- isActive: Boolean (default: true)
- isHot: Boolean (default: false)
- categoryIds: [ObjectId] (references Category)
- brandId: ObjectId (references Brand)
- typeIds: [ObjectId] (references Type)
- countryId: ObjectId (references Country)
- attributes: Map (custom attributes)

### Category
- name: String (required)
- slug: String (required, unique)
- description: String
- parentId: ObjectId (references Category)
- image: String
- isActive: Boolean (default: true)
- displayOrder: Number (default: 0)
- filterMetadata: Object (UI display options)

### Type
- name: String (required)
- slug: String (required, unique)
- description: String
- isActive: Boolean (default: true)
- displayOrder: Number (default: 0)
- categoryIds: [ObjectId] (references Category)
- filterMetadata: Object (UI display options)

### Brand
- name: String (required)
- slug: String (required, unique)
- description: String
- logo: String
- website: String
- isActive: Boolean (default: true)
- countryId: ObjectId (references Country)
- filterMetadata: Object (UI display options)

### Country
- name: String (required)
- code: String (required, unique)
- flag: String
- isActive: Boolean (default: true)
- filterMetadata: Object (UI display options) 