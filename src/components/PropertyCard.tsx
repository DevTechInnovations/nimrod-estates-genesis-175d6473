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
}: PropertyCardProps) => {
  return (
    <div className="group bg-card rounded-lg overflow-hidden shadow-lg hover-lift border border-border">
      <div className="relative overflow-hidden h-64">
        <img
          src={image}
          alt={title}
          className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
        />
        {roi && (
          <div className="absolute top-4 right-4 bg-primary text-primary-foreground px-3 py-1 rounded-full text-sm font-semibold">
            {roi} ROI
          </div>
        )}
      </div>

      <div className="p-6">
        <h3 className="font-heading text-xl font-semibold mb-2 group-hover:text-primary transition-colors">
          {title}
        </h3>

        <div className="flex items-center text-muted-foreground mb-3">
          <MapPin size={16} className="mr-1" />
          <span className="text-sm">{location}</span>
        </div>

        <div className="flex items-center justify-between mb-4 text-sm text-muted-foreground">
          <div className="flex items-center space-x-4">
            <span className="flex items-center">
              <Bed size={16} className="mr-1" /> {bedrooms}
            </span>
            <span className="flex items-center">
              <Bath size={16} className="mr-1" /> {bathrooms}
            </span>
            <span className="flex items-center">
              <Square size={16} className="mr-1" /> {area} m²
            </span>
          </div>
        </div>

        <div className="flex items-center justify-between pt-4 border-t border-border">
          <div>
            <p className="text-2xl font-heading font-bold text-primary">{price}</p>
          </div>
          <Link to={`/properties/${id}`}>
            <Button variant="outline" size="sm" className="hover-gold">
              View Details
            </Button>
          </Link>
        </div>
      </div>
    </div>
  );
};

export default PropertyCard;
