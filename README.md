# Liquor Online Clone

A full-stack e-commerce application for an online liquor store with product filtering, user authentication, and admin dashboard.

## Project Structure

```
liquor-online-clone/
├── client/             # React frontend
├── server/             # Node.js/Express backend
└── .gitignore          # Git ignore file
```

## Features

- **Product Browsing**: Filter products by category, type, brand, and more
- **User Authentication**: Register, login, and manage user profiles
- **Shopping Cart**: Add products to cart and checkout
- **Admin Dashboard**: Manage products, categories, brands, and orders
- **Responsive Design**: Mobile-friendly interface

## Tech Stack

### Frontend
- React
- React Router for navigation
- Tailwind CSS for styling
- Context API for state management

### Backend
- Node.js
- Express.js
- MongoDB with Mongoose
- JWT for authentication
- Multer and Cloudinary for image uploads

## Getting Started

### Prerequisites
- Node.js (v14 or higher)
- npm or yarn
- MongoDB (local or Atlas)

### Installation

1. Clone the repository
```bash
git clone https://github.com/yourusername/liquor-online-clone.git
cd liquor-online-clone
```

2. Install dependencies for both client and server
```bash
# Install client dependencies
cd client
npm install

# Install server dependencies
cd ../server
npm install
```

3. Set up environment variables
   - Create a `.env` file in the server directory based on the `.env.example` template
   - Create a `.env` file in the client directory if needed

4. Start the development servers
```bash
# Start the backend server
cd server
npm run dev

# In a new terminal, start the frontend
cd client
npm start
```

5. Open your browser and navigate to `http://localhost:3000`

## API Endpoints

### Authentication
- `POST /api/auth/register` - Register a new user
- `POST /api/auth/login` - Login a user
- `GET /api/auth/me` - Get current user
- `POST /api/auth/forgot-password` - Request password reset
- `POST /api/auth/reset-password/:token` - Reset password

### Products
- `GET /api/products` - Get all products (with filtering)
- `GET /api/products/:id` - Get a single product
- `POST /api/products` - Create a new product (admin only)
- `PUT /api/products/:id` - Update a product (admin only)
- `DELETE /api/products/:id` - Delete a product (admin only)

### Categories
- `GET /api/categories` - Get all categories
- `GET /api/categories/:id` - Get a single category
- `POST /api/categories` - Create a new category (admin only)
- `PUT /api/categories/:id` - Update a category (admin only)
- `DELETE /api/categories/:id` - Delete a category (admin only)

### Brands
- `GET /api/brands` - Get all brands
- `GET /api/brands/:id` - Get a single brand
- `POST /api/brands` - Create a new brand (admin only)
- `PUT /api/brands/:id` - Update a brand (admin only)
- `DELETE /api/brands/:id` - Delete a brand (admin only)

### Types
- `GET /api/types` - Get all types
- `GET /api/types/:id` - Get a single type
- `POST /api/types` - Create a new type (admin only)
- `PUT /api/types/:id` - Update a type (admin only)
- `DELETE /api/types/:id` - Delete a type (admin only)

## Frontend Routes

- `/` - Home page
- `/shop` - All products
- `/product-category/:category` - Products by category
- `/product-tag/:tag` - Products by tag
- `/brand/:brand` - Products by brand
- `/product/:id` - Product details
- `/cart` - Shopping cart
- `/checkout` - Checkout process
- `/login` - User login
- `/register` - User registration
- `/account` - User account
- `/admin` - Admin dashboard (protected)

## Contributing

1. Fork the repository
2. Create your feature branch (`git checkout -b feature/amazing-feature`)
3. Commit your changes (`git commit -m 'Add some amazing feature'`)
4. Push to the branch (`git push origin feature/amazing-feature`)
5. Open a Pull Request

## License

This project is licensed under the MIT License - see the LICENSE file for details.

## Acknowledgments

- [React](https://reactjs.org/)
- [Express](https://expressjs.com/)
- [MongoDB](https://www.mongodb.com/)
- [Tailwind CSS](https://tailwindcss.com/)
- [Cloudinary](https://cloudinary.com/) 