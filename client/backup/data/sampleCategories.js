// Sample categories data for demonstration purposes
const sampleCategories = [
  {
    id: 'spirits',
    name: 'Spirits',
    slug: 'spirits',
    description: 'Premium spirits including whisky, vodka, tequila, rum, and more.',
    parentId: null,
    image: 'https://example.com/images/spirits.jpg',
    isActive: true,
    displayOrder: 1,
    filterMetadata: {
      showInMainNav: true,
      showInFilters: true,
      iconClass: 'icon-spirits'
    }
  },
  {
    id: 'wine',
    name: 'Wine',
    slug: 'wine',
    description: 'Fine wines from around the world, including red, white, rosé, and sparkling.',
    parentId: null,
    image: 'https://example.com/images/wine.jpg',
    isActive: true,
    displayOrder: 2,
    filterMetadata: {
      showInMainNav: true,
      showInFilters: true,
      iconClass: 'icon-wine'
    }
  },
  {
    id: 'beer',
    name: 'Beer',
    slug: 'beer',
    description: 'Craft, domestic, and imported beers from breweries worldwide.',
    parentId: null,
    image: 'https://example.com/images/beer.jpg',
    isActive: true,
    displayOrder: 3,
    filterMetadata: {
      showInMainNav: true,
      showInFilters: true,
      iconClass: 'icon-beer'
    }
  },
  {
    id: 'champagne',
    name: 'Champagne & Sparkling',
    slug: 'champagne',
    description: 'Champagne and sparkling wines for celebrations and special occasions.',
    parentId: 'wine',
    image: 'https://example.com/images/champagne.jpg',
    isActive: true,
    displayOrder: 4,
    filterMetadata: {
      showInMainNav: false,
      showInFilters: true,
      iconClass: 'icon-champagne'
    }
  },
  {
    id: 'cider',
    name: 'Cider',
    slug: 'cider',
    description: 'Refreshing ciders made from apples and other fruits.',
    parentId: null,
    image: 'https://example.com/images/cider.jpg',
    isActive: true,
    displayOrder: 5,
    filterMetadata: {
      showInMainNav: false,
      showInFilters: true,
      iconClass: 'icon-cider'
    }
  },
  {
    id: 'ready-to-drink',
    name: 'Ready to Drink',
    slug: 'ready-to-drink',
    description: 'Pre-mixed cocktails and beverages ready to enjoy.',
    parentId: null,
    image: 'https://example.com/images/rtd.jpg',
    isActive: true,
    displayOrder: 6,
    filterMetadata: {
      showInMainNav: false,
      showInFilters: true,
      iconClass: 'icon-rtd'
    }
  },
  {
    id: 'non-alcoholic',
    name: 'Non-Alcoholic',
    slug: 'non-alcoholic',
    description: 'Alcohol-free alternatives including mocktails, sodas, and more.',
    parentId: null,
    image: 'https://example.com/images/non-alcoholic.jpg',
    isActive: true,
    displayOrder: 7,
    filterMetadata: {
      showInMainNav: false,
      showInFilters: true,
      iconClass: 'icon-non-alcoholic'
    }
  },
  {
    id: 'gifts',
    name: 'Gift Sets & Accessories',
    slug: 'gifts',
    description: 'Curated gift sets and accessories for the perfect present.',
    parentId: null,
    image: 'https://example.com/images/gifts.jpg',
    isActive: true,
    displayOrder: 8,
    filterMetadata: {
      showInMainNav: false,
      showInFilters: true,
      iconClass: 'icon-gifts'
    }
  }
];

export default sampleCategories; 