# Liquor Online Clone - Frontend

This is the frontend application for the Liquor Online Clone project. It is built with React, React Router, and Tailwind CSS.

## Project Structure

The project follows a feature-based architecture with a clear separation of concerns:

```
src/
├── assets/              # Dynamic assets imported in components
│   ├── images/          # Image assets
│   └── styles/          # Global styles
│
├── components/          # Reusable components
│   ├── common/          # Shared components
│   ├── layout/          # Layout components
│   └── ui/              # UI-specific components
│
├── features/            # Feature-based modules
│   ├── products/        # Product-related components
│   ├── cart/            # Cart-related components
│   ├── checkout/        # Checkout flow
│   └── auth/            # Authentication
│
├── hooks/               # Custom hooks
│
├── pages/               # Page components
│
├── services/            # API and service functions
│   └── api/             # API client and endpoints
│
├── store/               # State management
│   ├── slices/          # Redux slices
│   ├── actions/         # Redux actions
│   └── selectors/       # Redux selectors
│
├── utils/               # Utility functions
│
├── constants/           # App constants
│
├── contexts/            # React contexts
│
├── data/                # Mock data for development
│
├── App.jsx              # Main app component
├── index.jsx            # Entry point
└── routes.jsx           # Route definitions
```

## Key Features

- Product browsing and filtering
- Shopping cart functionality
- User authentication
- Checkout process
- Responsive design

## Available Scripts

In the project directory, you can run:

### `npm start`

Runs the app in the development mode.\
Open [http://localhost:3000](http://localhost:3000) to view it in your browser.

### `npm test`

Launches the test runner in the interactive watch mode.

### `npm run build`

Builds the app for production to the `build` folder.

## Component Organization

### Layout Components

- `Header`: Main navigation header
- `Footer`: Site footer with links
- `Layout`: Main layout wrapper
- `TopBar`: Top navigation bar

### UI Components

- `ProductCard`: Card for displaying product information
- `ProductGrid`: Grid for displaying multiple products
- `Pagination`: Component for paginating through results

### Common Components

- `RouteDebugger`: Utility for debugging routes

## Services

- `api/client.js`: API client for making HTTP requests
- `api/endpoints.js`: API endpoint definitions
- `productService.js`: Service for product-related API calls

## Hooks

- `useProducts`: Hook for fetching and managing products

## Contexts

- `CartContext`: Context for managing the shopping cart

## Utils

- `formatters.js`: Utility functions for formatting data

## Constants

- `routes.js`: Application route definitions
