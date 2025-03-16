# Liquor Online Clone

A full-stack e-commerce application for an online liquor store. This project includes a React frontend and a Node.js/Express backend with MongoDB.

## Project Structure

The project is organized into two main directories:

- `client/`: Frontend React application
- `server/`: Backend Node.js/Express API

## Features

- **Product Catalog**: Browse products by category, brand, type, and country
- **Advanced Filtering**: Filter products by multiple criteria
- **Shopping Cart**: Add products to cart, update quantities, and checkout
- **User Authentication**: Register, login, and manage user accounts
- **Admin Dashboard**: Manage products, categories, brands, and orders
- **Responsive Design**: Mobile-friendly interface

## Tech Stack

### Frontend

- **React**: UI library
- **React Router**: Client-side routing
- **Tailwind CSS**: Utility-first CSS framework
- **Context API**: State management
- **Fetch API**: Data fetching

### Backend

- **Node.js**: JavaScript runtime
- **Express**: Web framework
- **MongoDB**: NoSQL database
- **Mongoose**: MongoDB object modeling
- **JWT**: Authentication

## Getting Started

### Prerequisites

- Node.js (v14 or higher)
- MongoDB (local or Atlas)

### Installation

1. Clone the repository:
   ```
   git clone https://github.com/yourusername/liquor-online-clone.git
   cd liquor-online-clone
   ```

2. Install dependencies for both client and server:
   ```
   # Install client dependencies
   cd client
   npm install

   # Install server dependencies
   cd ../server
   npm install
   ```

3. Set up environment variables:
   - Create a `.env` file in the server directory with the following variables:
     ```
     PORT=5000
     MONGODB_URI=mongodb://localhost:27017/liquor-online
     JWT_SECRET=your_jwt_secret
     ```

4. Start the development servers:
   ```
   # Start the backend server
   cd server
   npm run dev

   # In a separate terminal, start the frontend server
   cd client
   npm start
   ```

5. Open your browser and navigate to `http://localhost:3000`

## API Documentation

See the [server README](server/README.md) for detailed API documentation.

## Frontend Documentation

See the [client README](client/README.md) for detailed frontend documentation.

## License

This project is licensed under the MIT License - see the LICENSE file for details.

## Acknowledgments

- [React](https://reactjs.org/)
- [Express](https://expressjs.com/)
- [MongoDB](https://www.mongodb.com/)
- [Tailwind CSS](https://tailwindcss.com/) 