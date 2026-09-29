export interface Product3DConfig {
  type: 'necklace' | 'ring' | 'bangle' | 'earring' | 'pendant';
  goldColor: 'yellow' | 'rose' | 'white';
  gemColor: 'emerald' | 'ruby' | 'sapphire' | 'diamond';
  gemCount: number;
}

export interface Product {
  id: string;
  name: string;
  subtitle: string;
  category: 'Bridal' | 'Necklaces' | 'Earrings' | 'Bangles' | 'Rings' | 'Everyday Elegance';
  priceINR: number;
  priceUSD: number;
  description: string;
  craftsmanshipDetails: string;
  goldPurity: string; // e.g. "22K BIS Hallmarked (916 Pure)"
  diamondClarity?: string; // e.g. "VVS1 Colorless (EF)"
  weight: string; // e.g. "64.5 grams"
  image: string;
  model3DPreset: Product3DConfig['type'];
  config3D: Product3DConfig;
  featured: boolean;
  bestseller: boolean;
  tags: string[];
}

export interface CategoryCardData {
  id: string;
  title: string;
  subtitle: string;
  image: string;
  count: number;
  slug: string;
}

export const CATEGORIES: CategoryCardData[] = [
  {
    id: 'bridal',
    title: 'Bridal Heritage',
    subtitle: 'Grand multi-tiered Kundan & Polki sets crafted for royalty.',
    image: '/assets/bridal_editorial.jpg',
    count: 14,
    slug: 'bridal'
  },
  {
    id: 'necklaces',
    title: 'Royale Necklaces',
    subtitle: 'Chokers, Harams & sculpted collar pieces in 22K hallmarked gold.',
    image: '/assets/hero_necklace_premium.jpg',
    count: 22,
    slug: 'necklaces'
  },
  {
    id: 'earrings',
    title: 'Temple & Diamond Earrings',
    subtitle: 'Jhumkas, studs, and chandelier dangles adorned with gemstones.',
    image: '/assets/temple_jhumka_real.jpg',
    count: 18,
    slug: 'earrings'
  },
  {
    id: 'bangles',
    title: 'Kadas & Kasu Bangles',
    subtitle: 'Solid gold sculpted bangles featuring ancient temple relief art.',
    image: '/assets/kasula_bangles_real.jpg',
    count: 12,
    slug: 'bangles'
  },
  {
    id: 'rings',
    title: 'Celestial Diamond Rings',
    subtitle: 'Bespoke solitaire rings & carved emerald signet bands.',
    image: '/assets/celestial_ring_real.jpg',
    count: 16,
    slug: 'rings'
  },
  {
    id: 'everyday',
    title: 'Everyday Elegance',
    subtitle: 'Lightweight modern luxury designed for contemporary statements.',
    image: '/assets/mayura_kada_real.jpg',
    count: 10,
    slug: 'everyday'
  }
];

export const PRODUCTS: Product[] = [
  {
    id: 'royal-maharani-necklace',
    name: 'The Royal Maharani Emerald Choker',
    subtitle: '22K Gold & Carved Zambian Emerald Choker',
    category: 'Bridal',
    priceINR: 485000,
    priceUSD: 5850,
    description: 'A masterpiece of royal Indian heritage. Intricately set in 22K yellow gold with central hand-carved leaf Zambian emeralds, bordered by brilliant uncut Polki diamonds and cascading South Sea pearls.',
    craftsmanshipDetails: 'Over 140 hours of master craftsman precision in Jaipuri Kundan setting with meenakari enameling on the reverse side.',
    goldPurity: '22K BIS Hallmarked (916 Pure Gold)',
    diamondClarity: 'Certified Natural Uncut Polki Diamonds',
    weight: '92.4 grams',
    image: '/assets/hero_necklace_premium.jpg',
    model3DPreset: 'necklace',
    config3D: {
      type: 'necklace',
      goldColor: 'yellow',
      gemColor: 'emerald',
      gemCount: 12
    },
    featured: true,
    bestseller: true,
    tags: ['Bridal', 'Emerald', 'Kundan', 'Royal', '22K Gold']
  },
  {
    id: 'celestial-diamond-ring',
    name: 'Celestial Diamond Solitaire Ring',
    subtitle: '18K White & Gold Solitaire Masterpiece',
    category: 'Rings',
    priceINR: 320000,
    priceUSD: 3850,
    description: 'An ethereal 2.5-carat oval brilliant solitaire diamond mounted on an 18K gold hand-carved lattice band with pave diamond halo accents.',
    craftsmanshipDetails: 'Micro-pave hand claw setting with liquid-smooth interior comfort fit.',
    goldPurity: '18K BIS Certified Gold',
    diamondClarity: 'VVS1 Clarity, E-Color Ideal Cut (IGI Certified)',
    weight: '7.8 grams',
    image: '/assets/celestial_ring_real.jpg',
    model3DPreset: 'ring',
    config3D: {
      type: 'ring',
      goldColor: 'white',
      gemColor: 'diamond',
      gemCount: 1
    },
    featured: true,
    bestseller: false,
    tags: ['Solitaire', 'Diamond', 'Engagement', '18K Gold']
  },
  {
    id: 'kasula-heritage-bangles',
    name: 'Kasula Temple Gold Bangle Pair',
    subtitle: 'Solid 22K Antique Relief Gold Kadas',
    category: 'Bangles',
    priceINR: 245000,
    priceUSD: 2950,
    description: 'Sculpted by master goldsmiths of South India, featuring ancient coin motifs depicting Goddess Lakshmi framed by cabochon rubies and granulate gold beads.',
    craftsmanshipDetails: 'Traditional wax-casting technique followed by hand-chasing and antique patina finishing.',
    goldPurity: '22K BIS Hallmarked 916 Antique Gold',
    weight: '58.2 grams (Pair)',
    image: '/assets/kasula_bangles_real.jpg',
    model3DPreset: 'bangle',
    config3D: {
      type: 'bangle',
      goldColor: 'yellow',
      gemColor: 'ruby',
      gemCount: 8
    },
    featured: true,
    bestseller: true,
    tags: ['Temple', 'Bangles', 'Kasu', '22K Gold', 'Heritage']
  },
  {
    id: 'lotus-diamond-earrings',
    name: 'Lotus Bloom Diamond Studs',
    subtitle: '18K Rose Gold & Diamond Chandelier Earrings',
    category: 'Earrings',
    priceINR: 180000,
    priceUSD: 2150,
    description: 'Inspired by sacred lotus petals opening at sunrise. Crafted in 18K rose gold with marquise and pear-shaped diamonds floating seamlessly with pearl drops.',
    craftsmanshipDetails: 'Invisible gemstone prong settings engineered for maximum light play and brilliance.',
    goldPurity: '18K Rose Gold BIS Certified',
    diamondClarity: 'VS1-VVS1 F-G Color Diamonds',
    weight: '14.2 grams',
    image: '/assets/lotus_earrings_real.jpg',
    model3DPreset: 'earring',
    config3D: {
      type: 'earring',
      goldColor: 'rose',
      gemColor: 'diamond',
      gemCount: 16
    },
    featured: true,
    bestseller: false,
    tags: ['Earrings', 'Lotus', 'Rose Gold', 'Diamonds']
  },
  {
    id: 'surya-kundan-pendant',
    name: 'Surya Kundan & Ruby Pendant',
    subtitle: '22K Sun Motif Pendant with South Sea Pearl Drop',
    category: 'Necklaces',
    priceINR: 390000,
    priceUSD: 4700,
    description: 'A radiant solar disk motif paved with uncut diamonds and a vibrant cushion-cut pigeon blood Burmese ruby at its center.',
    craftsmanshipDetails: 'Handcrafted Kundan foil backing that enhances internal ruby refraction.',
    goldPurity: '22K BIS Hallmarked Gold',
    diamondClarity: 'Certified Uncut Polki Diamonds',
    weight: '41.6 grams',
    image: '/assets/surya_pendant_real.jpg',
    model3DPreset: 'pendant',
    config3D: {
      type: 'pendant',
      goldColor: 'yellow',
      gemColor: 'ruby',
      gemCount: 9
    },
    featured: true,
    bestseller: true,
    tags: ['Pendant', 'Ruby', 'Kundan', 'Heritage']
  },
  {
    id: 'mayura-sapphire-kada',
    name: 'Mayura Peacock Sapphire Kada',
    subtitle: '22K Antiqued Gold & Ceylon Sapphire Cuff',
    category: 'Everyday Elegance',
    priceINR: 195000,
    priceUSD: 2350,
    description: 'A sleek hinged cuff featuring twin peacock heads sculpted in gold with deep royal blue Ceylon sapphire eyes and diamond plumage.',
    craftsmanshipDetails: 'Spring-loaded safety hinge mechanism with hand-etched peacock feather texturing.',
    goldPurity: '22K BIS Hallmarked Antique Gold',
    diamondClarity: 'VVS2 Round Brilliant Diamonds',
    weight: '34.8 grams',
    image: '/assets/mayura_kada_real.jpg',
    model3DPreset: 'bangle',
    config3D: {
      type: 'bangle',
      goldColor: 'yellow',
      gemColor: 'sapphire',
      gemCount: 4
    },
    featured: true,
    bestseller: false,
    tags: ['Kada', 'Sapphire', 'Peacock', '22K Gold']
  },
  {
    id: 'temple-heritage-jhumkas',
    name: 'Royal Temple Gold Jhumkas',
    subtitle: '22K Antique Gold & Emerald Bead Drops',
    category: 'Earrings',
    priceINR: 210000,
    priceUSD: 2550,
    description: 'Traditional dome Jhumka earrings hand-chased with delicate floral filigree, crowned with rubies and finished with natural emerald bead tassels.',
    craftsmanshipDetails: 'Handcrafted by hereditary South Indian goldsmiths with traditional wax casting.',
    goldPurity: '22K BIS Hallmarked 916 Pure Gold',
    weight: '28.6 grams',
    image: '/assets/temple_jhumka_real.jpg',
    model3DPreset: 'earring',
    config3D: {
      type: 'earring',
      goldColor: 'yellow',
      gemColor: 'emerald',
      gemCount: 12
    },
    featured: true,
    bestseller: true,
    tags: ['Earrings', 'Jhumkas', 'Temple Gold', 'Emerald']
  },
  {
    id: 'carved-ruby-signet-ring',
    name: 'Royal Carved Ruby Signet Ring',
    subtitle: '22K Yellow Gold & Carved Floral Ruby',
    category: 'Rings',
    priceINR: 275000,
    priceUSD: 3300,
    description: 'A stately 22K gold signet band featuring an intricately hand-carved floral Burmese ruby centerpiece encircled by a double micro-pave diamond halo.',
    craftsmanshipDetails: 'Hand-carved gemstone intaglio art wrapped in 22K solid gold setting.',
    goldPurity: '22K BIS Hallmarked Gold',
    diamondClarity: 'VVS1 Colorless Diamonds',
    weight: '16.4 grams',
    image: '/assets/ruby_ring_real.jpg',
    model3DPreset: 'ring',
    config3D: {
      type: 'ring',
      goldColor: 'yellow',
      gemColor: 'ruby',
      gemCount: 1
    },
    featured: true,
    bestseller: true,
    tags: ['Signet', 'Ruby', 'Rings', '22K Gold']
  }
];

export const TESTIMONIALS = [
  {
    id: '1',
    quote: 'Abharana created my entire bridal heirloom collection. When I put on the Royal Maharani Choker, it felt like wearing history, soul, and pure luxury.',
    author: 'Ananya Singhania',
    role: 'Vogue Bride & Art Patron',
    location: 'Mumbai & London'
  },
  {
    id: '2',
    quote: 'The precision of their studio inspector allowed me to view every gemstone facet before ordering. The physical piece exceeded every expectation.',
    author: 'Radhika Merchant-Mehta',
    role: 'Connoisseur',
    location: 'New Delhi'
  },
  {
    id: '3',
    quote: 'Every piece from Abharana by Kavya is an investment in timeless elegance. The weight, the finish of the 22K gold, and the uncut diamonds are unmatched.',
    author: 'Dr. Devika Rao',
    role: 'Jewellery Collector',
    location: 'Bengaluru'
  }
];

export const CRAFTSMANSHIP_STEPS = [
  {
    number: '01',
    title: 'THE SKETCH & INSPIRATION',
    subtitle: 'From Royal Archives to Paper',
    description: 'Every Abharana creation begins with hand-penciled sketches inspired by Indian royal palaces, temple art motifs, and high-fashion geometry.',
    detail: 'Over 40 hours of design iteration per piece before goldsmith approval.',
    image: '/assets/bridal_editorial.jpg'
  },
  {
    number: '02',
    title: 'METICULOUS ALLOYING & CASTING',
    subtitle: 'Certified 22K & 18K Gold',
    description: 'Our metallurgists blend 99.99% pure gold with copper and silver to achieve our proprietary warm champagne and deep rich 22K hues.',
    detail: '100% BIS Hallmarked 916 pure gold with certified origin provenance.',
    image: '/assets/hero_necklace_premium.jpg'
  },
  {
    number: '03',
    title: 'GEMSTONE SELECTION & KUNDAN SETTING',
    subtitle: 'The Heart of Heritage',
    description: 'Master craftsmen (Karigars) place uncut Polki diamonds and hand-carved Zambian emeralds into pure gold foil beds using age-old royal methods.',
    detail: 'Conflict-free diamonds with IGI/GIA certification.',
    image: '/assets/surya_pendant_real.jpg'
  },
  {
    number: '04',
    title: 'POLISH & MEENAKARI ENAMELING',
    subtitle: 'Hidden Details of Luxury',
    description: 'The reverse side of each piece is detailed with miniature royal enamel paintings (Meenakari), ensuring the jewellery is as breathtaking from behind as from the front.',
    detail: 'Natural mineral pigments baked at 800°C for lifetime durability.',
    image: '/assets/temple_jhumka_real.jpg'
  },
  {
    number: '05',
    title: 'HALLMARKING & FINAL PRESENTATION',
    subtitle: 'Delivered in Velvet & Mahogany',
    description: 'Inspected under 40x magnification, engraved with unique serial numbers, and placed in hand-carved mahogany boxes lined with Italian velvet.',
    detail: 'Includes lifetime appraisal certificate and insured white-glove delivery.',
    image: '/assets/ruby_ring_real.jpg'
  }
];

export const INSTAGRAM_POSTS = [
  {
    id: 'ig-1',
    image: '/assets/hero_necklace_premium.jpg',
    likes: '4.8k',
    caption: 'The Royal Maharani Emerald Choker set in 22K gold.'
  },
  {
    id: 'ig-2',
    image: '/assets/bridal_editorial.jpg',
    likes: '6.2k',
    caption: 'Behind the scenes at our Royal Heritage Campaign shoot.'
  },
  {
    id: 'ig-3',
    image: '/assets/celestial_ring_real.jpg',
    likes: '3.9k',
    caption: 'Celestial 2.5ct solitaire ring bathed in morning light.'
  },
  {
    id: 'ig-4',
    image: '/assets/kasula_bangles_real.jpg',
    likes: '5.1k',
    caption: 'Kasula coins hand-engraved with Goddess Lakshmi motifs.'
  },
  {
    id: 'ig-5',
    image: '/assets/lotus_earrings_real.jpg',
    likes: '2.7k',
    caption: 'Lotus chandelier studs crafted in 18K rose gold.'
  },
  {
    id: 'ig-6',
    image: '/assets/mayura_kada_real.jpg',
    likes: '4.4k',
    caption: 'Mayura Ceylon Sapphire cuff for everyday royal statements.'
  }
];
