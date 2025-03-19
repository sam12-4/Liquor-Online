const dummyProducts = [
    {
        id: 1,
        name: 'Johnnie Walker Blue Label',
        category: 'Whisky',
        brand: 'Johnnie Walker',
        price: 180.99,
        salePrice: 170.99,
        image: 'https://images.unsplash.com/photo-1619451334792-150fd785ee74?ixlib=rb-4.0.3&auto=format&fit=crop&w=1974&q=80',
        inStock: 15,
        rating: 4.8,
        description: 'Premium blended Scotch whisky with a remarkably smooth flavor.',
        featured: true
    },
    {
        id: 2,
        name: 'Grey Goose Vodka',
        category: 'Vodka',
        brand: 'Grey Goose',
        price: 45.99,
        salePrice: null,
        image: 'https://images.unsplash.com/photo-1613063070402-86acc8a55e0c?ixlib=rb-4.0.3&auto=format&fit=crop&w=1974&q=80',
        inStock: 28,
        rating: 4.5,
        description: 'Premium French vodka made from the finest ingredients.',
        featured: true
    },
    {
        id: 3,
        name: 'Hendrick\'s Gin',
        category: 'Gin',
        brand: 'Hendrick\'s',
        price: 39.99,
        salePrice: 34.99,
        image: 'https://images.unsplash.com/photo-1571577571750-0f2293980b63?ixlib=rb-4.0.3&auto=format&fit=crop&w=1972&q=80',
        inStock: 20,
        rating: 4.7,
        description: 'Scottish gin distilled with rose and cucumber for a distinctive flavor.',
        featured: false
    },
    {
        id: 4,
        name: 'Don Julio 1942 Tequila',
        category: 'Tequila',
        brand: 'Don Julio',
        price: 149.99,
        salePrice: null,
        image: 'https://images.unsplash.com/photo-1649197002381-9badf65d25ec?ixlib=rb-4.0.3&auto=format&fit=crop&w=1936&q=80',
        inStock: 10,
        rating: 4.9,
        description: 'Luxury añejo tequila aged for a minimum of two and a half years.',
        featured: true
    },
    {
        id: 5,
        name: 'Bacardi Superior Rum',
        category: 'Rum',
        brand: 'Bacardi',
        price: 19.99,
        salePrice: 17.99,
        image: 'https://images.unsplash.com/photo-1598018553943-93e905b47a9e?ixlib=rb-4.0.3&auto=format&fit=crop&w=1974&q=80',
        inStock: 35,
        rating: 4.2,
        description: 'Classic white rum, perfect for cocktails and mixed drinks.',
        featured: false
    },
    // Add more products as needed
];

export default dummyProducts;