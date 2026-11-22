export const products = [
  {
    id: 'prod-sneaker-01',
    name: 'Air Jordan Cyber Sneaker',
    slug: 'air-jordan-cyber-sneaker',
    category: 'sneakers',
    price: 24500,
    originalPrice: 28500,
    rating: 4.9,
    reviewsCount: 128,
    isFeatured: true,
    isNew: true,
    inStock: true,
    stockQuantity: 24,
    description: 'Iconic aerodynamic silhouette with responsive cushioning, premium upper construction, and signature purple glow accents.',
    images: [
      '/images/products/sneakers/Air Jordan Sneakers.png'
    ],
    colors: ['#070709', '#8b5cf6', '#ffffff'],
    sizes: ['US 8', 'US 9', 'US 10', 'US 11', 'US 12'],
    specs: {
      weight: '310g',
      material: 'Engineered Leather & Carbon Support',
      sole: 'Air Cushioned Energy Sole'
    }
  },
  {
    id: 'prod-headphone-01',
    name: 'Wireless Headphones Pro',
    slug: 'wireless-headphones-pro',
    category: 'headphones',
    price: 34000,
    originalPrice: 39500,
    rating: 4.8,
    reviewsCount: 94,
    isFeatured: true,
    isNew: true,
    inStock: true,
    stockQuantity: 18,
    description: 'High-fidelity acoustic drivers paired with active spatial noise cancellation and aerospace-grade memory foam cups.',
    images: [
      '/images/products/headphones/Wireless Headphones.png'
    ],
    colors: ['#070709', '#7c3aed', '#e2e8f0'],
    specs: {
      battery: '40 Hours Playback',
      driver: '45mm Custom Acoustic',
      connectivity: 'Bluetooth 5.4 / Lossless USB-C'
    }
  },
  {
    id: 'prod-watch-01',
    name: 'Smart Watch Titanium Edition',
    slug: 'smart-watch-titanium-edition',
    category: 'watches',
    price: 48000,
    originalPrice: 55000,
    rating: 5.0,
    reviewsCount: 62,
    isFeatured: true,
    isNew: true,
    inStock: true,
    stockQuantity: 10,
    description: 'Precision-machined titanium case with sapphire crystal glass, health biometric sensors, and an ultra-sharp AMOLED dial.',
    images: [
      '/images/products/watches/Smart Watch.png'
    ],
    colors: ['#121217', '#8b5cf6'],
    specs: {
      chassis: 'Grade 5 Titanium',
      waterResistance: '10 ATM (100m)',
      crystal: 'Anti-reflective Sapphire'
    }
  },
  {
    id: 'prod-handbag-01',
    name: 'Luxury Matte Handbag',
    slug: 'luxury-matte-handbag',
    category: 'handbags',
    price: 18500,
    originalPrice: 22000,
    rating: 4.7,
    reviewsCount: 45,
    isFeatured: false,
    isNew: false,
    inStock: true,
    stockQuantity: 14,
    description: 'Sculpted luxury minimalist exterior with gunmetal anodized hardware and modular magnetic compartments.',
    images: [
      '/images/products/handbags/Luxury Handbag.png'
    ],
    colors: ['#070709', '#3b0764', '#ffffff'],
    specs: {
      material: 'Water-resistant Bio-Leather',
      hardware: 'Anodized Gunmetal',
      strap: 'Adjustable Jacquard Webbing'
    }
  },
  {
    id: 'prod-gaming-01',
    name: 'Phantom Mechanical Keyboard',
    slug: 'phantom-mechanical-keyboard',
    category: 'gaming',
    price: 15500,
    originalPrice: 18500,
    rating: 4.9,
    reviewsCount: 210,
    isFeatured: true,
    isNew: true,
    inStock: true,
    stockQuantity: 30,
    description: 'Gasket-mounted hot-swappable mechanical keyboard featuring sound-dampening brass weight and per-key RGB backlighting.',
    images: [
      '/images/products/gaming/gaming-1.svg'
    ],
    colors: ['#070709', '#8b5cf6'],
    specs: {
      switches: 'Custom Pre-lubed Linear Purple',
      pollingRate: '8000Hz Ultra-Low Latency',
      case: 'CNC Anodized Aluminum'
    }
  },
  {
    id: 'prod-sunglasses-01',
    name: 'Sunglasses UV400 Polarized',
    slug: 'sunglasses-uv400-polarized',
    category: 'sunglasses',
    price: 8500,
    originalPrice: 11000,
    rating: 4.6,
    reviewsCount: 38,
    isFeatured: false,
    isNew: true,
    inStock: true,
    stockQuantity: 20,
    description: 'Ultralight geometric frames equipped with UV400 hydrophobic purple-tinted polarization for crisp contrast.',
    images: [
      '/images/products/sunglasses/Sunglasses.png'
    ],
    colors: ['#070709', '#a855f7'],
    specs: {
      lens: 'Triacetate Cellulose Polarized UV400',
      frame: 'TR90 Memory Polymer',
      weight: '22g'
    }
  },
  {
    id: 'prod-speaker-01',
    name: 'Bluetooth Speaker 360',
    slug: 'bluetooth-speaker-360',
    category: 'speakers',
    price: 28000,
    originalPrice: 32500,
    rating: 4.8,
    reviewsCount: 81,
    isFeatured: true,
    isNew: true,
    inStock: true,
    stockQuantity: 12,
    description: 'Omnidirectional 360-degree acoustic array with dual downward-firing bass radiators and interactive purple halo illumination.',
    images: [
      '/images/products/speakers/Bluetooth Speaker.png'
    ],
    colors: ['#070709', '#8b5cf6', '#f8fafc'],
    specs: {
      power: '90W RMS Continuous',
      frequency: '35Hz - 22kHz',
      waterproof: 'IPX7 Weatherproof'
    }
  }
];
