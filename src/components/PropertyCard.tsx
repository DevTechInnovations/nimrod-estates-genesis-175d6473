import { Link } from 'react-router-dom';
import { MapPin, Bed, Bath, Square } from 'lucide-react';
import { Button } from '@/components/ui/button';

interface PropertyCardProps {
  id: string;
  image: string;
  title: string;
  location: string;
  price: string;
  bedrooms: number;
  bathrooms: number;
  area: number;
  roi?: string;
  currency?: 'USD' | 'ZAR' | 'AED';
  exchangeRates?: { USD: number; ZAR: number; AED: number };
}

const PropertyCard = ({
  id,
  image,
  title,
  location,
  price,
  bedrooms,
  bathrooms,
  area,
  roi,
  currency = 'USD',
  exchangeRates = { USD: 1, ZAR: 18.5, AED: 3.67 },
}: PropertyCardProps) => {
  const formatPrice = (p?: string, curr: 'USD' | 'ZAR' | 'AED' = 'USD') => {
    if (!p) return 'N/A';
    const num = Number(String(p).replace(/[^0-9.-]+/g, ''));
    if (!Number.isFinite(num)) return p;
    
    // Use live exchange rates
    const convertedAmount = num * exchangeRates[curr];
    
    return new Intl.NumberFormat('en-US', {
      style: 'currency',
      currency: curr,
      maximumFractionDigits: 0,
    }).format(convertedAmount);
  };

  return (
    <div className="group bg-card overflow-hidden shadow-lg hover-lift border border-border relative">
      {/* Image Container - Always Visible with Sharp Edges */}
      <div className="relative overflow-hidden h-80">
        <img
          src={image}
          alt={title}
          className="w-full h-full object-cover transition-all duration-500 group-hover:scale-105"
        />
        {roi && (
          <div className="absolute top-4 right-4 bg-primary text-primary-foreground px-3 py-1 rounded-full text-sm font-semibold shadow-lg">
            {roi} ROI
          </div>
        )}
      </div>

      {/* Details Overlay - Appears on Hover */}
      <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/70 to-transparent opacity-0 group-hover:opacity-100 transition-all duration-500 flex flex-col justify-end p-6">
        <div className="transform translate-y-8 group-hover:translate-y-0 transition-transform duration-500">
          <h3 className="font-heading text-xl font-semibold mb-2 text-primary-foreground">
            {title}
          </h3>

          <div className="flex items-center text-primary-foreground/90 mb-3">
            <MapPin size={16} className="mr-1 text-primary" />
            <span className="text-sm">{location}</span>
          </div>

          <div className="flex items-center justify-between mb-4 text-sm text-primary-foreground/90">
            <div className="flex items-center space-x-4">
              <span className="flex items-center">
                <Bed size={16} className="mr-1 text-primary" /> {bedrooms}
              </span>
              <span className="flex items-center">
                <Bath size={16} className="mr-1 text-primary" /> {bathrooms}
              </span>
              <span className="flex items-center">
                <Square size={16} className="mr-1 text-primary" /> {area} m²
              </span>
            </div>
          </div>

          <div className="flex items-center justify-between pt-4 border-t border-primary/30">
            <div>
              <p className="text-2xl font-heading font-bold text-primary">
                {formatPrice(price, currency)}
              </p>
            </div>
            <Link to={`/properties/${id}`}>
              <Button 
                variant="outline" 
                size="sm" 
                className="border-primary text-primary bg-transparent hover:bg-primary hover:text-primary-foreground hover:border-primary transition-all duration-300 shadow-lg hover:shadow-primary/25"
              >
                View Details
              </Button>
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
};

export default PropertyCard;