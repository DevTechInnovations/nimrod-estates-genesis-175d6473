export interface Property {
  id: string;
  title: string;
  description: string;
  location: string;
  price: string;
  bedrooms: number;
  bathrooms: number;
  area: number;
  roi?: string;
  images: string[];
  featured: boolean;
  type: string;
  videoUrl?: string;
  pdfUrl?: string;
}

export const properties: Property[] = [
  {
    id: '1',
    title: 'Oceanfront Villa Paradise',
    description: 'Stunning modern villa with panoramic ocean views, infinity pool, and private beach access. Features state-of-the-art smart home technology and luxury finishes throughout.',
    location: 'Malibu, California',
    price: '$8,950,000',
    bedrooms: 5,
    bathrooms: 6,
    area: 650,
    roi: '12%',
    images: ['https://images.unsplash.com/photo-1613490493576-7fde63acd811?w=800&auto=format&fit=crop'],
    featured: true,
    type: 'Villa',
  },
  {
    id: '2',
    title: 'Manhattan Penthouse Suite',
    description: 'Luxurious penthouse in prime Manhattan location with skyline views, private terrace, and world-class amenities.',
    location: 'New York, NY',
    price: '$15,500,000',
    bedrooms: 4,
    bathrooms: 5,
    area: 450,
    roi: '9%',
    images: ['https://images.unsplash.com/photo-1512917774080-9991f1c4c750?w=800&auto=format&fit=crop'],
    featured: true,
    type: 'Penthouse',
  },
  {
    id: '3',
    title: 'Dubai Marina Residence',
    description: 'Ultra-modern waterfront apartment with stunning marina views, premium amenities, and access to exclusive yacht club.',
    location: 'Dubai, UAE',
    price: '$5,200,000',
    bedrooms: 3,
    bathrooms: 4,
    area: 380,
    roi: '15%',
    images: ['https://images.unsplash.com/photo-1600596542815-ffad4c1539a9?w=800&auto=format&fit=crop'],
    featured: true,
    type: 'Apartment',
  },
  {
    id: '4',
    title: 'London Heritage Townhouse',
    description: 'Elegant Georgian townhouse in prestigious Kensington, meticulously restored with modern luxury while preserving historic charm.',
    location: 'London, UK',
    price: '£12,750,000',
    bedrooms: 6,
    bathrooms: 5,
    area: 520,
    roi: '8%',
    images: ['https://images.unsplash.com/photo-1600585154340-be6161a56a0c?w=800&auto=format&fit=crop'],
    featured: false,
    type: 'Townhouse',
  },
  {
    id: '5',
    title: 'Swiss Alps Chalet',
    description: 'Exclusive mountain retreat with breathtaking alpine views, ski-in/ski-out access, and luxurious spa facilities.',
    location: 'Zermatt, Switzerland',
    price: '€9,800,000',
    bedrooms: 7,
    bathrooms: 6,
    area: 780,
    roi: '10%',
    images: ['https://images.unsplash.com/photo-1600607687939-ce8a6c25118c?w=800&auto=format&fit=crop'],
    featured: false,
    type: 'Chalet',
  },
  {
    id: '6',
    title: 'Singapore Sky Garden',
    description: 'Contemporary luxury residence in the heart of Singapore with private sky garden and panoramic city views.',
    location: 'Singapore',
    price: '$7,300,000',
    bedrooms: 4,
    bathrooms: 4,
    area: 420,
    roi: '11%',
    images: ['https://images.unsplash.com/photo-1600047509807-ba8f99d2cdde?w=800&auto=format&fit=crop'],
    featured: true,
    type: 'Apartment',
  },
];
