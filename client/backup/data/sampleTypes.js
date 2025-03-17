// Sample types data for demonstration purposes
const sampleTypes = [
  // Wine Types
  {
    id: 'red',
    name: 'Red Wine',
    slug: 'red-wine',
    description: 'Red wines made from dark-colored grape varieties.',
    isActive: true,
    displayOrder: 1,
    categoryIds: ['wine'],
    filterMetadata: {
      displayName: 'Red',
      showInFilters: true
    }
  },
  {
    id: 'white',
    name: 'White Wine',
    slug: 'white-wine',
    description: 'White wines made from green or yellow grapes.',
    isActive: true,
    displayOrder: 2,
    categoryIds: ['wine'],
    filterMetadata: {
      displayName: 'White',
      showInFilters: true
    }
  },
  {
    id: 'rose',
    name: 'Rosé Wine',
    slug: 'rose-wine',
    description: 'Pink-colored wines made from red grapes with limited skin contact.',
    isActive: true,
    displayOrder: 3,
    categoryIds: ['wine'],
    filterMetadata: {
      displayName: 'Rosé',
      showInFilters: true
    }
  },
  {
    id: 'sparkling',
    name: 'Sparkling Wine',
    slug: 'sparkling-wine',
    description: 'Wines with significant levels of carbon dioxide, making them fizzy.',
    isActive: true,
    displayOrder: 4,
    categoryIds: ['wine', 'champagne'],
    filterMetadata: {
      displayName: 'Sparkling',
      showInFilters: true
    }
  },
  {
    id: 'champagne',
    name: 'Champagne',
    slug: 'champagne',
    description: 'Sparkling wine from the Champagne region of France.',
    isActive: true,
    displayOrder: 5,
    categoryIds: ['wine', 'champagne'],
    filterMetadata: {
      displayName: 'Champagne',
      showInFilters: true
    }
  },
  {
    id: 'dessert',
    name: 'Dessert Wine',
    slug: 'dessert-wine',
    description: 'Sweet wines typically served with dessert.',
    isActive: true,
    displayOrder: 6,
    categoryIds: ['wine'],
    filterMetadata: {
      displayName: 'Dessert',
      showInFilters: true
    }
  },
  {
    id: 'fortified',
    name: 'Fortified Wine',
    slug: 'fortified-wine',
    description: 'Wines with added spirits, such as port or sherry.',
    isActive: true,
    displayOrder: 7,
    categoryIds: ['wine'],
    filterMetadata: {
      displayName: 'Fortified',
      showInFilters: true
    }
  },
  
  // Wine Varietals
  {
    id: 'cabernet-sauvignon',
    name: 'Cabernet Sauvignon',
    slug: 'cabernet-sauvignon',
    description: 'Full-bodied red wine known for its dark fruit flavors and savory taste.',
    isActive: true,
    displayOrder: 8,
    categoryIds: ['wine'],
    filterMetadata: {
      displayName: 'Cabernet Sauvignon',
      showInFilters: true
    }
  },
  {
    id: 'merlot',
    name: 'Merlot',
    slug: 'merlot',
    description: 'Medium to full-bodied red wine with soft tannins and red fruit flavors.',
    isActive: true,
    displayOrder: 9,
    categoryIds: ['wine'],
    filterMetadata: {
      displayName: 'Merlot',
      showInFilters: true
    }
  },
  {
    id: 'pinot-noir',
    name: 'Pinot Noir',
    slug: 'pinot-noir',
    description: 'Light to medium-bodied red wine with high acidity and red fruit flavors.',
    isActive: true,
    displayOrder: 10,
    categoryIds: ['wine'],
    filterMetadata: {
      displayName: 'Pinot Noir',
      showInFilters: true
    }
  },
  {
    id: 'chardonnay',
    name: 'Chardonnay',
    slug: 'chardonnay',
    description: 'Full-bodied white wine with flavors ranging from apple to tropical fruit.',
    isActive: true,
    displayOrder: 11,
    categoryIds: ['wine'],
    filterMetadata: {
      displayName: 'Chardonnay',
      showInFilters: true
    }
  },
  {
    id: 'sauvignon-blanc',
    name: 'Sauvignon Blanc',
    slug: 'sauvignon-blanc',
    description: 'Light to medium-bodied white wine with high acidity and herbaceous flavors.',
    isActive: true,
    displayOrder: 12,
    categoryIds: ['wine'],
    filterMetadata: {
      displayName: 'Sauvignon Blanc',
      showInFilters: true
    }
  },
  {
    id: 'bordeaux',
    name: 'Bordeaux',
    slug: 'bordeaux',
    description: 'Wines from the Bordeaux region of France, typically red blends.',
    isActive: true,
    displayOrder: 13,
    categoryIds: ['wine'],
    filterMetadata: {
      displayName: 'Bordeaux',
      showInFilters: true
    }
  },
  
  // Spirit Types
  {
    id: 'whisky',
    name: 'Whisky/Whiskey',
    slug: 'whisky',
    description: 'Distilled alcoholic beverage made from fermented grain mash.',
    isActive: true,
    displayOrder: 14,
    categoryIds: ['spirits'],
    filterMetadata: {
      displayName: 'Whisky/Whiskey',
      showInFilters: true
    }
  },
  {
    id: 'bourbon',
    name: 'Bourbon',
    slug: 'bourbon',
    description: 'American whiskey made primarily from corn.',
    isActive: true,
    displayOrder: 15,
    categoryIds: ['spirits'],
    filterMetadata: {
      displayName: 'Bourbon',
      showInFilters: true
    }
  },
  {
    id: 'scotch',
    name: 'Scotch',
    slug: 'scotch',
    description: 'Whisky made in Scotland, typically from malted barley.',
    isActive: true,
    displayOrder: 16,
    categoryIds: ['spirits'],
    filterMetadata: {
      displayName: 'Scotch',
      showInFilters: true
    }
  },
  {
    id: 'single-malt',
    name: 'Single Malt',
    slug: 'single-malt',
    description: 'Whisky made from malted barley at a single distillery.',
    isActive: true,
    displayOrder: 17,
    categoryIds: ['spirits'],
    filterMetadata: {
      displayName: 'Single Malt',
      showInFilters: true
    }
  },
  {
    id: 'vodka',
    name: 'Vodka',
    slug: 'vodka',
    description: 'Clear distilled alcoholic beverage originating from Eastern Europe.',
    isActive: true,
    displayOrder: 18,
    categoryIds: ['spirits'],
    filterMetadata: {
      displayName: 'Vodka',
      showInFilters: true
    }
  },
  {
    id: 'gin',
    name: 'Gin',
    slug: 'gin',
    description: 'Distilled alcoholic beverage flavored with juniper berries and other botanicals.',
    isActive: true,
    displayOrder: 19,
    categoryIds: ['spirits'],
    filterMetadata: {
      displayName: 'Gin',
      showInFilters: true
    }
  },
  {
    id: 'rum',
    name: 'Rum',
    slug: 'rum',
    description: 'Distilled alcoholic beverage made from sugarcane byproducts.',
    isActive: true,
    displayOrder: 20,
    categoryIds: ['spirits'],
    filterMetadata: {
      displayName: 'Rum',
      showInFilters: true
    }
  },
  {
    id: 'tequila',
    name: 'Tequila',
    slug: 'tequila',
    description: 'Distilled alcoholic beverage made from the blue agave plant.',
    isActive: true,
    displayOrder: 21,
    categoryIds: ['spirits'],
    filterMetadata: {
      displayName: 'Tequila',
      showInFilters: true
    }
  },
  {
    id: 'blanco',
    name: 'Blanco/Silver Tequila',
    slug: 'blanco-tequila',
    description: 'Unaged tequila, bottled immediately after distillation.',
    isActive: true,
    displayOrder: 22,
    categoryIds: ['spirits'],
    filterMetadata: {
      displayName: 'Blanco/Silver',
      showInFilters: true
    }
  },
  {
    id: 'reposado',
    name: 'Reposado Tequila',
    slug: 'reposado-tequila',
    description: 'Tequila aged in oak barrels for 2-12 months.',
    isActive: true,
    displayOrder: 23,
    categoryIds: ['spirits'],
    filterMetadata: {
      displayName: 'Reposado',
      showInFilters: true
    }
  },
  {
    id: 'anejo',
    name: 'Añejo Tequila',
    slug: 'anejo-tequila',
    description: 'Tequila aged in oak barrels for 1-3 years.',
    isActive: true,
    displayOrder: 24,
    categoryIds: ['spirits'],
    filterMetadata: {
      displayName: 'Añejo',
      showInFilters: true
    }
  },
  {
    id: 'cognac',
    name: 'Cognac',
    slug: 'cognac',
    description: 'Brandy made in the Cognac region of France.',
    isActive: true,
    displayOrder: 25,
    categoryIds: ['spirits'],
    filterMetadata: {
      displayName: 'Cognac',
      showInFilters: true
    }
  },
  
  // Beer Types
  {
    id: 'lager',
    name: 'Lager',
    slug: 'lager',
    description: 'Beer fermented and conditioned at low temperatures.',
    isActive: true,
    displayOrder: 26,
    categoryIds: ['beer'],
    filterMetadata: {
      displayName: 'Lager',
      showInFilters: true
    }
  },
  {
    id: 'ale',
    name: 'Ale',
    slug: 'ale',
    description: 'Beer fermented at warmer temperatures using top-fermenting yeast.',
    isActive: true,
    displayOrder: 27,
    categoryIds: ['beer'],
    filterMetadata: {
      displayName: 'Ale',
      showInFilters: true
    }
  },
  {
    id: 'ipa',
    name: 'IPA',
    slug: 'ipa',
    description: 'India Pale Ale, characterized by its hoppy flavor and higher alcohol content.',
    isActive: true,
    displayOrder: 28,
    categoryIds: ['beer'],
    filterMetadata: {
      displayName: 'IPA',
      showInFilters: true
    }
  },
  {
    id: 'stout',
    name: 'Stout',
    slug: 'stout',
    description: 'Dark beer made using roasted malt or barley, hops, water, and yeast.',
    isActive: true,
    displayOrder: 29,
    categoryIds: ['beer'],
    filterMetadata: {
      displayName: 'Stout',
      showInFilters: true
    }
  },
  {
    id: 'porter',
    name: 'Porter',
    slug: 'porter',
    description: 'Dark style of beer developed in London in the early 18th century.',
    isActive: true,
    displayOrder: 30,
    categoryIds: ['beer'],
    filterMetadata: {
      displayName: 'Porter',
      showInFilters: true
    }
  },
  {
    id: 'wheat',
    name: 'Wheat Beer',
    slug: 'wheat-beer',
    description: 'Beer brewed with a significant proportion of wheat.',
    isActive: true,
    displayOrder: 31,
    categoryIds: ['beer'],
    filterMetadata: {
      displayName: 'Wheat',
      showInFilters: true
    }
  },
  {
    id: 'sour',
    name: 'Sour Beer',
    slug: 'sour-beer',
    description: 'Beer with an intentionally acidic, tart, or sour taste.',
    isActive: true,
    displayOrder: 32,
    categoryIds: ['beer'],
    filterMetadata: {
      displayName: 'Sour',
      showInFilters: true
    }
  },
  {
    id: 'imported',
    name: 'Imported Beer',
    slug: 'imported-beer',
    description: 'Beers imported from other countries.',
    isActive: true,
    displayOrder: 33,
    categoryIds: ['beer'],
    filterMetadata: {
      displayName: 'Imported',
      showInFilters: true
    }
  },
  {
    id: 'domestic',
    name: 'Domestic Beer',
    slug: 'domestic-beer',
    description: 'Beers produced locally.',
    isActive: true,
    displayOrder: 34,
    categoryIds: ['beer'],
    filterMetadata: {
      displayName: 'Domestic',
      showInFilters: true
    }
  },
  {
    id: 'craft',
    name: 'Craft Beer',
    slug: 'craft-beer',
    description: 'Beers made by small, independent breweries.',
    isActive: true,
    displayOrder: 35,
    categoryIds: ['beer'],
    filterMetadata: {
      displayName: 'Craft',
      showInFilters: true
    }
  }
];

export default sampleTypes; 