// Sample brands data for demonstration purposes
const sampleBrands = [
  // Tequila Brands
  {
    id: '818-tequila',
    name: '818 Tequila',
    slug: '818-tequila',
    description: 'Award-winning tequila brand founded by Kendall Jenner.',
    logo: 'https://example.com/logos/818-tequila.png',
    website: 'https://drink818.com',
    isActive: true,
    countryId: 'mexico',
    filterMetadata: {
      featured: true,
      showInFilters: true
    }
  },
  {
    id: 'patron',
    name: 'Patrón',
    slug: 'patron',
    description: 'Ultra-premium tequila brand known for its smooth taste and distinctive bottles.',
    logo: 'https://example.com/logos/patron.png',
    website: 'https://patrontequila.com',
    isActive: true,
    countryId: 'mexico',
    filterMetadata: {
      featured: true,
      showInFilters: true
    }
  },
  {
    id: 'don-julio',
    name: 'Don Julio',
    slug: 'don-julio',
    description: 'Premium tequila brand founded by Don Julio González.',
    logo: 'https://example.com/logos/don-julio.png',
    website: 'https://donjulio.com',
    isActive: true,
    countryId: 'mexico',
    filterMetadata: {
      featured: true,
      showInFilters: true
    }
  },
  
  // Whisky Brands
  {
    id: 'macallan',
    name: 'The Macallan',
    slug: 'macallan',
    description: 'Luxury single malt Scotch whisky brand from Speyside.',
    logo: 'https://example.com/logos/macallan.png',
    website: 'https://themacallan.com',
    isActive: true,
    countryId: 'scotland',
    filterMetadata: {
      featured: true,
      showInFilters: true
    }
  },
  {
    id: 'woodford-reserve',
    name: 'Woodford Reserve',
    slug: 'woodford-reserve',
    description: 'Premium small batch Kentucky straight bourbon whiskey.',
    logo: 'https://example.com/logos/woodford-reserve.png',
    website: 'https://woodfordreserve.com',
    isActive: true,
    countryId: 'usa',
    filterMetadata: {
      featured: true,
      showInFilters: true
    }
  },
  {
    id: 'jack-daniels',
    name: 'Jack Daniel\'s',
    slug: 'jack-daniels',
    description: 'American whiskey brand from Lynchburg, Tennessee.',
    logo: 'https://example.com/logos/jack-daniels.png',
    website: 'https://jackdaniels.com',
    isActive: true,
    countryId: 'usa',
    filterMetadata: {
      featured: true,
      showInFilters: true
    }
  },
  
  // Vodka Brands
  {
    id: 'grey-goose',
    name: 'Grey Goose',
    slug: 'grey-goose',
    description: 'Premium French vodka brand made with French wheat.',
    logo: 'https://example.com/logos/grey-goose.png',
    website: 'https://greygoose.com',
    isActive: true,
    countryId: 'france',
    filterMetadata: {
      featured: true,
      showInFilters: true
    }
  },
  {
    id: 'absolut',
    name: 'Absolut',
    slug: 'absolut',
    description: 'Swedish vodka brand known for its distinctive bottle shape and advertising.',
    logo: 'https://example.com/logos/absolut.png',
    website: 'https://absolut.com',
    isActive: true,
    countryId: 'sweden',
    filterMetadata: {
      featured: true,
      showInFilters: true
    }
  },
  
  // Gin Brands
  {
    id: 'hendricks',
    name: 'Hendrick\'s',
    slug: 'hendricks',
    description: 'Scottish gin infused with cucumber and rose petals.',
    logo: 'https://example.com/logos/hendricks.png',
    website: 'https://hendricksgin.com',
    isActive: true,
    countryId: 'scotland',
    filterMetadata: {
      featured: true,
      showInFilters: true
    }
  },
  {
    id: 'bombay-sapphire',
    name: 'Bombay Sapphire',
    slug: 'bombay-sapphire',
    description: 'Popular gin brand known for its blue bottle and 10 exotic botanicals.',
    logo: 'https://example.com/logos/bombay-sapphire.png',
    website: 'https://bombaysapphire.com',
    isActive: true,
    countryId: 'england',
    filterMetadata: {
      featured: true,
      showInFilters: true
    }
  },
  
  // Wine Brands
  {
    id: 'chateau-margaux',
    name: 'Château Margaux',
    slug: 'chateau-margaux',
    description: 'Premier Grand Cru Classé winery in the Bordeaux region of France.',
    logo: 'https://example.com/logos/chateau-margaux.png',
    website: 'https://chateau-margaux.com',
    isActive: true,
    countryId: 'france',
    filterMetadata: {
      featured: true,
      showInFilters: true
    }
  },
  {
    id: 'caymus',
    name: 'Caymus Vineyards',
    slug: 'caymus',
    description: 'Renowned Napa Valley winery known for its Cabernet Sauvignon.',
    logo: 'https://example.com/logos/caymus.png',
    website: 'https://caymus.com',
    isActive: true,
    countryId: 'usa',
    filterMetadata: {
      featured: true,
      showInFilters: true
    }
  },
  {
    id: 'kim-crawford',
    name: 'Kim Crawford',
    slug: 'kim-crawford',
    description: 'New Zealand winery known for its Sauvignon Blanc.',
    logo: 'https://example.com/logos/kim-crawford.png',
    website: 'https://kimcrawfordwines.com',
    isActive: true,
    countryId: 'new-zealand',
    filterMetadata: {
      featured: true,
      showInFilters: true
    }
  },
  
  // Champagne Brands
  {
    id: 'dom-perignon',
    name: 'Dom Pérignon',
    slug: 'dom-perignon',
    description: 'Prestigious vintage champagne brand produced by Moët & Chandon.',
    logo: 'https://example.com/logos/dom-perignon.png',
    website: 'https://domperignon.com',
    isActive: true,
    countryId: 'france',
    filterMetadata: {
      featured: true,
      showInFilters: true
    }
  },
  {
    id: 'veuve-clicquot',
    name: 'Veuve Clicquot',
    slug: 'veuve-clicquot',
    description: 'Champagne house known for its distinctive yellow label.',
    logo: 'https://example.com/logos/veuve-clicquot.png',
    website: 'https://veuveclicquot.com',
    isActive: true,
    countryId: 'france',
    filterMetadata: {
      featured: true,
      showInFilters: true
    }
  },
  
  // Beer Brands
  {
    id: 'heineken',
    name: 'Heineken',
    slug: 'heineken',
    description: 'Dutch brewing company known for its pale lager beer.',
    logo: 'https://example.com/logos/heineken.png',
    website: 'https://heineken.com',
    isActive: true,
    countryId: 'netherlands',
    filterMetadata: {
      featured: true,
      showInFilters: true
    }
  },
  {
    id: 'guinness',
    name: 'Guinness',
    slug: 'guinness',
    description: 'Irish brewery famous for its dark stout beer.',
    logo: 'https://example.com/logos/guinness.png',
    website: 'https://guinness.com',
    isActive: true,
    countryId: 'ireland',
    filterMetadata: {
      featured: true,
      showInFilters: true
    }
  },
  {
    id: 'stella-artois',
    name: 'Stella Artois',
    slug: 'stella-artois',
    description: 'Belgian pilsner beer brand with a history dating back to 1366.',
    logo: 'https://example.com/logos/stella-artois.png',
    website: 'https://stellaartois.com',
    isActive: true,
    countryId: 'belgium',
    filterMetadata: {
      featured: true,
      showInFilters: true
    }
  }
];

export default sampleBrands; 