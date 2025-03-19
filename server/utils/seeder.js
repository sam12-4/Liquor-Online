const dotenv = require('dotenv');
const connectDB = require('../config/db');
const User = require('../models/user');
const Admin = require('../models/admin');
const Category = require('../models/category');
const Brand = require('../models/brand');
const Type = require('../models/type');
const Country = require('../models/country');
const Product = require('../models/product');

// Load environment variables
dotenv.config();

// Connect to database
connectDB();

/**
 * Seed initial data to the database
 */
const seedData = async () => {
  try {
    // Clear existing data
    await User.deleteMany();
    await Admin.deleteMany();
    await Category.deleteMany();
    await Brand.deleteMany();
    await Type.deleteMany();
    await Country.deleteMany();
    await Product.deleteMany();
    
    console.log('All existing data cleared');

    // Create admin user
    await Admin.create({
      name: 'Admin User',
      email: 'admin@example.com',
      password: 'admin123',
      avatar: {
        public_id: 'avatars/admin',
        url: 'https://res.cloudinary.com/dc3hqcovg/image/upload/v1631234567/liquor-online/avatars/admin.png'
      },
      permissions: {
        manageProducts: true,
        manageCategories: true,
        manageBrands: true,
        manageTypes: true,
        manageCountries: true,
        manageUsers: true,
        manageOrders: true
      }
    });

    console.log('Admin user created');
    
    // Exit process
    process.exit();
  } catch (error) {
    console.error(`Error: ${error.message}`);
    process.exit(1);
  }
};

// Run the seeder
seedData(); 