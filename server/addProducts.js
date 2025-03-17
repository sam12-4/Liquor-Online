const mongoose = require('mongoose');
require('dotenv').config();

// Import models
const Product = require('./models/Product');
const Category = require('./models/Category');
const Brand = require('./models/Brand');

// Connect to MongoDB
mongoose.connect(process.env.MONGODB_URI)
  .then(() => console.log('MongoDB connected'))
  .catch(err => {
    console.error('MongoDB connection error:', err);
    process.exit(1);
  });

// Sample data for categories
const categories = [
  { name: 'Whisky', slug: 'whisky', description: 'All types of whisky' },
  { name: 'Vodka', slug: 'vodka', description: 'Premium vodkas' },
  { name: 'Gin', slug: 'gin', description: 'Craft and premium gins' },
  { name: 'Tequila', slug: 'tequila', description: 'Tequila and mezcal' },
  { name: 'Rum', slug: 'rum', description: 'Dark and light rums' },
  { name: 'Wine', slug: 'wine', description: 'Red, white, and sparkling wines' },
  { name: 'Champagne', slug: 'champagne', description: 'Premium champagnes' },
  { name: 'Beer', slug: 'beer', description: 'Craft and imported beers' },
  { name: 'Liqueur', slug: 'liqueur', description: 'Sweet and flavored liqueurs' }
];

// Sample data for brands
const brands = [
  { name: 'Johnnie Walker', slug: 'johnnie-walker', description: 'Premium Scotch whisky brand' },
  { name: 'Grey Goose', slug: 'grey-goose', description: 'Premium French vodka' },
  { name: 'Hendrick\'s', slug: 'hendricks', description: 'Scottish gin with cucumber and rose' },
  { name: 'Don Julio', slug: 'don-julio', description: 'Premium tequila brand' },
  { name: 'Bacardi', slug: 'bacardi', description: 'Famous rum brand' },
  { name: 'Jack Daniel\'s', slug: 'jack-daniels', description: 'Tennessee whiskey' },
  { name: 'Patrón', slug: 'patron', description: 'Premium tequila' },
  { name: 'Absolut', slug: 'absolut', description: 'Swedish vodka' },
  { name: 'Bombay Sapphire', slug: 'bombay-sapphire', description: 'London dry gin' },
  { name: 'The Macallan', slug: 'the-macallan', description: 'Single malt Scotch whisky' }
];

// Function to add categories
const addCategories = async () => {
  try {
    // Clear existing categories
    await Category.deleteMany({});
    
    // Add new categories
    const createdCategories = await Category.insertMany(categories);
    console.log(`${createdCategories.length} categories added`);
    return createdCategories;
  } catch (error) {
    console.error('Error adding categories:', error);
    throw error;
  }
};

// Function to add brands
const addBrands = async () => {
  try {
    // Clear existing brands
    await Brand.deleteMany({});
    
    // Add new brands
    const createdBrands = await Brand.insertMany(brands);
    console.log(`${createdBrands.length} brands added`);
    return createdBrands;
  } catch (error) {
    console.error('Error adding brands:', error);
    throw error;
  }
};

// Function to generate products
const generateProducts = (categories, brands) => {
  const products = [
    {
      name: 'Johnnie Walker Blue Label',
      slug: 'johnnie-walker-blue-label',
      description: 'Premium blended Scotch whisky with a remarkably smooth flavor.',
      shortDescription: 'Luxury blended Scotch whisky',
      price: 180.99,
      salePrice: 170.99,
      onSale: true,
      sku: 'JW-BL-001',
      stock: 15,
      images: [
        {
          url: 'https://images.unsplash.com/photo-1619451334792-150fd785ee74',
          alt: 'Johnnie Walker Blue Label',
          isPrimary: true
        }
      ],
      isActive: true,
      isHot: true,
      isFeatured: true,
      rating: 4.8,
      ratingCount: 120,
      reviewCount: 85,
      attributes: {
        'alcohol_content': '40%',
        'volume': '750ml',
        'age': '25 years'
      },
      brandId: brands.find(b => b.name === 'Johnnie Walker')._id,
      categoryIds: [categories.find(c => c.name === 'Whisky')._id]
    },
    {
      name: 'Grey Goose Vodka',
      slug: 'grey-goose-vodka',
      description: 'Premium French vodka made from the finest ingredients.',
      shortDescription: 'Premium French vodka',
      price: 45.99,
      salePrice: 0,
      onSale: false,
      sku: 'GG-V-001',
      stock: 28,
      images: [
        {
          url: 'https://images.unsplash.com/photo-1613063070402-86acc8a55e0c',
          alt: 'Grey Goose Vodka',
          isPrimary: true
        }
      ],
      isActive: true,
      isHot: false,
      isFeatured: true,
      rating: 4.5,
      ratingCount: 95,
      reviewCount: 60,
      attributes: {
        'alcohol_content': '40%',
        'volume': '750ml',
        'origin': 'France'
      },
      brandId: brands.find(b => b.name === 'Grey Goose')._id,
      categoryIds: [categories.find(c => c.name === 'Vodka')._id]
    },
    {
      name: 'Hendrick\'s Gin',
      slug: 'hendricks-gin',
      description: 'Scottish gin distilled with rose and cucumber for a distinctive flavor.',
      shortDescription: 'Cucumber and rose infused gin',
      price: 39.99,
      salePrice: 34.99,
      onSale: true,
      sku: 'HG-001',
      stock: 20,
      images: [
        {
          url: 'https://images.unsplash.com/photo-1571577571750-0f2293980b63',
          alt: 'Hendrick\'s Gin',
          isPrimary: true
        }
      ],
      isActive: true,
      isHot: false,
      isFeatured: false,
      rating: 4.7,
      ratingCount: 88,
      reviewCount: 55,
      attributes: {
        'alcohol_content': '44%',
        'volume': '750ml',
        'origin': 'Scotland'
      },
      brandId: brands.find(b => b.name === 'Hendrick\'s')._id,
      categoryIds: [categories.find(c => c.name === 'Gin')._id]
    },
    {
      name: 'Don Julio 1942 Tequila',
      slug: 'don-julio-1942-tequila',
      description: 'Luxury añejo tequila aged for a minimum of two and a half years.',
      shortDescription: 'Premium aged tequila',
      price: 149.99,
      salePrice: 0,
      onSale: false,
      sku: 'DJ-1942-001',
      stock: 10,
      images: [
        {
          url: 'https://images.unsplash.com/photo-1649197002381-9badf65d25ec',
          alt: 'Don Julio 1942 Tequila',
          isPrimary: true
        }
      ],
      isActive: true,
      isHot: true,
      isFeatured: true,
      rating: 4.9,
      ratingCount: 75,
      reviewCount: 45,
      attributes: {
        'alcohol_content': '38%',
        'volume': '750ml',
        'age': '2.5 years'
      },
      brandId: brands.find(b => b.name === 'Don Julio')._id,
      categoryIds: [categories.find(c => c.name === 'Tequila')._id]
    },
    {
      name: 'Bacardi Superior Rum',
      slug: 'bacardi-superior-rum',
      description: 'Classic white rum, perfect for cocktails and mixed drinks.',
      shortDescription: 'Classic white rum',
      price: 19.99,
      salePrice: 17.99,
      onSale: true,
      sku: 'BSR-001',
      stock: 35,
      images: [
        {
          url: 'https://images.unsplash.com/photo-1598018553943-93e905b47a9e',
          alt: 'Bacardi Superior Rum',
          isPrimary: true
        }
      ],
      isActive: true,
      isHot: false,
      isFeatured: false,
      rating: 4.2,
      ratingCount: 110,
      reviewCount: 70,
      attributes: {
        'alcohol_content': '40%',
        'volume': '750ml',
        'type': 'White rum'
      },
      brandId: brands.find(b => b.name === 'Bacardi')._id,
      categoryIds: [categories.find(c => c.name === 'Rum')._id]
    },
    {
      name: 'Jack Daniel\'s Tennessee Whiskey',
      slug: 'jack-daniels-tennessee-whiskey',
      description: 'Iconic American whiskey with a smooth, mellow character.',
      shortDescription: 'Classic Tennessee whiskey',
      price: 29.99,
      salePrice: 0,
      onSale: false,
      sku: 'JD-TW-001',
      stock: 42,
      images: [
        {
          url: 'https://images.unsplash.com/photo-1609954848895-15999ec5da9e',
          alt: 'Jack Daniel\'s Tennessee Whiskey',
          isPrimary: true
        }
      ],
      isActive: true,
      isHot: false,
      isFeatured: true,
      rating: 4.4,
      ratingCount: 150,
      reviewCount: 95,
      attributes: {
        'alcohol_content': '40%',
        'volume': '750ml',
        'type': 'Tennessee Whiskey'
      },
      brandId: brands.find(b => b.name === 'Jack Daniel\'s')._id,
      categoryIds: [categories.find(c => c.name === 'Whisky')._id]
    },
    {
      name: 'Patrón Silver Tequila',
      slug: 'patron-silver-tequila',
      description: 'Ultra-premium tequila, perfect for sipping or in cocktails.',
      shortDescription: 'Premium silver tequila',
      price: 49.99,
      salePrice: 44.99,
      onSale: true,
      sku: 'PST-001',
      stock: 18,
      images: [
        {
          url: 'https://images.unsplash.com/photo-1656149481619-602f99984ecc',
          alt: 'Patrón Silver Tequila',
          isPrimary: true
        }
      ],
      isActive: true,
      isHot: false,
      isFeatured: false,
      rating: 4.6,
      ratingCount: 85,
      reviewCount: 50,
      attributes: {
        'alcohol_content': '40%',
        'volume': '750ml',
        'type': 'Silver tequila'
      },
      brandId: brands.find(b => b.name === 'Patrón')._id,
      categoryIds: [categories.find(c => c.name === 'Tequila')._id]
    },
    {
      name: 'Absolut Vodka',
      slug: 'absolut-vodka',
      description: 'Swedish vodka made from winter wheat, known for its clarity and purity.',
      shortDescription: 'Classic Swedish vodka',
      price: 24.99,
      salePrice: 21.99,
      onSale: true,
      sku: 'AV-001',
      stock: 30,
      images: [
        {
          url: 'https://images.unsplash.com/photo-1652542124945-bb20277153a8',
          alt: 'Absolut Vodka',
          isPrimary: true
        }
      ],
      isActive: true,
      isHot: false,
      isFeatured: true,
      rating: 4.3,
      ratingCount: 120,
      reviewCount: 75,
      attributes: {
        'alcohol_content': '40%',
        'volume': '750ml',
        'origin': 'Sweden'
      },
      brandId: brands.find(b => b.name === 'Absolut')._id,
      categoryIds: [categories.find(c => c.name === 'Vodka')._id]
    },
    {
      name: 'Bombay Sapphire Gin',
      slug: 'bombay-sapphire-gin',
      description: 'London dry gin infused with 10 exotic botanicals.',
      shortDescription: 'Premium London dry gin',
      price: 32.99,
      salePrice: 0,
      onSale: false,
      sku: 'BSG-001',
      stock: 25,
      images: [
        {
          url: 'https://images.unsplash.com/photo-1659781894478-cad99e6a869e',
          alt: 'Bombay Sapphire Gin',
          isPrimary: true
        }
      ],
      isActive: true,
      isHot: false,
      isFeatured: false,
      rating: 4.4,
      ratingCount: 90,
      reviewCount: 55,
      attributes: {
        'alcohol_content': '47%',
        'volume': '750ml',
        'type': 'London Dry Gin'
      },
      brandId: brands.find(b => b.name === 'Bombay Sapphire')._id,
      categoryIds: [categories.find(c => c.name === 'Gin')._id]
    },
    {
      name: 'The Macallan 12 Year',
      slug: 'the-macallan-12-year',
      description: 'Luxurious single malt Scotch whisky aged in sherry oak casks.',
      shortDescription: 'Premium single malt Scotch',
      price: 75.99,
      salePrice: 0,
      onSale: false,
      sku: 'TM-12Y-001',
      stock: 15,
      images: [
        {
          url: 'https://images.unsplash.com/photo-1659781894478-cad99e6a869e',
          alt: 'The Macallan 12 Year',
          isPrimary: true
        }
      ],
      isActive: true,
      isHot: false,
      isFeatured: true,
      rating: 4.8,
      ratingCount: 80,
      reviewCount: 50,
      attributes: {
        'alcohol_content': '43%',
        'volume': '750ml',
        'age': '12 years'
      },
      brandId: brands.find(b => b.name === 'The Macallan')._id,
      categoryIds: [categories.find(c => c.name === 'Whisky')._id]
    },
    {
      name: 'Maker\'s Mark Bourbon',
      slug: 'makers-mark-bourbon',
      description: 'Handcrafted bourbon whisky with a smooth, rich flavor profile.',
      shortDescription: 'Handcrafted Kentucky bourbon',
      price: 34.99,
      salePrice: 29.99,
      onSale: true,
      sku: 'MMB-001',
      stock: 22,
      images: [
        {
          url: 'https://images.unsplash.com/photo-1651818749233-d9126c84e480',
          alt: 'Maker\'s Mark Bourbon',
          isPrimary: true
        }
      ],
      isActive: true,
      isHot: false,
      isFeatured: false,
      rating: 4.5,
      ratingCount: 95,
      reviewCount: 60,
      attributes: {
        'alcohol_content': '45%',
        'volume': '750ml',
        'type': 'Kentucky Straight Bourbon'
      },
      brandId: brands.find(b => b.name === 'Jack Daniel\'s')._id,
      categoryIds: [categories.find(c => c.name === 'Whisky')._id]
    },
    {
      name: 'Hennessy XO Cognac',
      slug: 'hennessy-xo-cognac',
      description: 'Exceptionally rich and complex cognac blend aged up to 30 years.',
      shortDescription: 'Premium aged cognac',
      price: 199.99,
      salePrice: 189.99,
      onSale: true,
      sku: 'HXO-001',
      stock: 8,
      images: [
        {
          url: 'https://images.unsplash.com/photo-1602166242272-3033495b183d',
          alt: 'Hennessy XO Cognac',
          isPrimary: true
        }
      ],
      isActive: true,
      isHot: true,
      isFeatured: true,
      rating: 4.9,
      ratingCount: 70,
      reviewCount: 40,
      attributes: {
        'alcohol_content': '40%',
        'volume': '750ml',
        'age': 'Blend of up to 30 years'
      },
      brandId: brands.find(b => b.name === 'Johnnie Walker')._id,
      categoryIds: [categories.find(c => c.name === 'Liqueur')._id]
    },
    {
      name: 'Moët & Chandon Champagne',
      slug: 'moet-chandon-champagne',
      description: 'Iconic champagne with an elegant maturity and complex flavor profile.',
      shortDescription: 'Classic French champagne',
      price: 59.99,
      salePrice: 0,
      onSale: false,
      sku: 'MCC-001',
      stock: 20,
      images: [
        {
          url: 'https://images.unsplash.com/photo-1607748851687-ba9a10438621',
          alt: 'Moët & Chandon Champagne',
          isPrimary: true
        }
      ],
      isActive: true,
      isHot: false,
      isFeatured: true,
      rating: 4.7,
      ratingCount: 85,
      reviewCount: 50,
      attributes: {
        'alcohol_content': '12%',
        'volume': '750ml',
        'type': 'Brut'
      },
      brandId: brands.find(b => b.name === 'Grey Goose')._id,
      categoryIds: [categories.find(c => c.name === 'Champagne')._id]
    },
    {
      name: 'Baileys Irish Cream',
      slug: 'baileys-irish-cream',
      description: 'Smooth and creamy Irish whiskey-based liqueur.',
      shortDescription: 'Creamy Irish liqueur',
      price: 23.99,
      salePrice: 21.99,
      onSale: true,
      sku: 'BIC-001',
      stock: 30,
      images: [
        {
          url: 'https://images.unsplash.com/photo-1608680291971-324f67a2acee',
          alt: 'Baileys Irish Cream',
          isPrimary: true
        }
      ],
      isActive: true,
      isHot: false,
      isFeatured: false,
      rating: 4.6,
      ratingCount: 100,
      reviewCount: 65,
      attributes: {
        'alcohol_content': '17%',
        'volume': '750ml',
        'type': 'Cream Liqueur'
      },
      brandId: brands.find(b => b.name === 'Bacardi')._id,
      categoryIds: [categories.find(c => c.name === 'Liqueur')._id]
    },
    {
      name: 'Tanqueray Gin',
      slug: 'tanqueray-gin',
      description: 'Premium London dry gin with a distinctive citrus character.',
      shortDescription: 'Classic London dry gin',
      price: 27.99,
      salePrice: 0,
      onSale: false,
      sku: 'TG-001',
      stock: 25,
      images: [
        {
          url: 'https://images.unsplash.com/photo-1621873495884-845a939ministeriodefomento@kbqpd1wre/uploads/2023/04/tanqueray-gin.webp',
          alt: 'Tanqueray Gin',
          isPrimary: true
        }
      ],
      isActive: true,
      isHot: false,
      isFeatured: false,
      rating: 4.5,
      ratingCount: 90,
      reviewCount: 55,
      attributes: {
        'alcohol_content': '47.3%',
        'volume': '750ml',
        'type': 'London Dry Gin'
      },
      brandId: brands.find(b => b.name === 'Bombay Sapphire')._id,
      categoryIds: [categories.find(c => c.name === 'Gin')._id]
    }
  ];
  
  return products;
};

// Function to add products
const addProducts = async (categories, brands) => {
  try {
    // Clear existing products
    await Product.deleteMany({});
    
    // Generate products
    const products = generateProducts(categories, brands);
    
    // Add new products
    const createdProducts = await Product.insertMany(products);
    console.log(`${createdProducts.length} products added`);
    return createdProducts;
  } catch (error) {
    console.error('Error adding products:', error);
    throw error;
  }
};

// Main function to run the script
const main = async () => {
  try {
    console.log('Starting data import...');
    
    // Add categories
    const categories = await addCategories();
    
    // Add brands
    const brands = await addBrands();
    
    // Add products
    await addProducts(categories, brands);
    
    console.log('Data import completed successfully!');
    process.exit(0);
  } catch (error) {
    console.error('Error during data import:', error);
    process.exit(1);
  }
};

// Run the script
main(); 