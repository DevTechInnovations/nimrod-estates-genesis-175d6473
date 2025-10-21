import { Link } from 'react-router-dom';
import { MapPin, Bed, Bath, Square, Crown, TrendingUp } from 'lucide-react'; // Added TrendingUp
import { Button } from '@/components/ui/button';

interface PropertyCardProps {
  id: string;
  image?: string;
  title: string;
  location: string;
  price: string;
  bedrooms: number;
  bathrooms: number;
  area: number;
  imageLinks: string[];
  roi: string | null;
  investmentOpportunity: boolean; 
  exclusive: boolean;
  currency: 'USD' | 'ZAR' | 'AED';
  exchangeRates: { USD: number; ZAR: number; AED: number };
  isAuthenticated: boolean;
  allImages?: string[];
}

const PropertyCard = ({
  id,
  image,
  title,
  imageLinks,
  location,
  price,
  bedrooms,
  bathrooms,
  area,
  roi,
  investmentOpportunity = false,
  exclusive = false,
  currency = 'USD',
  exchangeRates = { USD: 1, ZAR: 18.5, AED: 3.67 },
  isAuthenticated = false,
}: PropertyCardProps) => {
  const formatPrice = (p?: string, curr: 'USD' | 'ZAR' | 'AED' = 'USD') => {
    if (!p) return 'N/A';
    const num = Number(String(p).replace(/[^0-9.-]+/g, ''));
    if (!Number.isFinite(num)) return p;
    
    const convertedAmount = num * exchangeRates[curr];
    
    return new Intl.NumberFormat('en-US', {
      style: 'currency',
      currency: curr,
      maximumFractionDigits: 0,
    }).format(convertedAmount);
  };

  // Check if property should be blurred/locked
  const isLocked = exclusive && !isAuthenticated;

  // FIX: Prioritize imageLinks over image prop
  const displayImage = imageLinks && imageLinks.length > 0 
    ? imageLinks[0] 
    : image || '';




 // DEBUG: Add this console.log here
  console.log('PropertyCard debug:', {
    id,
    image,
    imageLinks,
    displayImage,
    hasImageLinks: imageLinks && imageLinks.length > 0,
    imageLinksLength: imageLinks?.length || 0
  });
  



  return (
    <div className={`group bg-card overflow-hidden shadow-lg hover-lift border border-border relative ${
      isLocked ? 'opacity-80' : ''
    }`}>
      <div className="relative overflow-hidden h-80">
        {displayImage ? (
          <img
            src={displayImage}
            alt={title}
            className={`w-full h-full object-cover transition-all duration-500 group-hover:scale-105 ${
              isLocked ? 'blur-sm' : ''
            }`}
          />
        ) : (
          <div className="w-full h-full bg-muted flex items-center justify-center">
            <div className="text-center text-muted-foreground">
              <Square size={48} className="mx-auto mb-2" />
              <p>No Image Available</p>
            </div>
          </div>
        )}
        
        {/* Badges Container */}
        <div className="absolute top-4 left-4 flex flex-col gap-2">
          {/* Exclusive Badge */}
          {exclusive && (
            <div className="bg-gradient-to-r from-amber-500 to-amber-600 text-white px-3 py-1 rounded-full text-sm font-semibold shadow-lg flex items-center w-fit">
              <Crown size={14} className="mr-1" />
              Exclusive
            </div>
          )}
          
          {/* Investment Opportunity Badge */}
          {investmentOpportunity && (
            <div className="bg-gradient-to-r from-green-500 to-green-600 text-white px-3 py-1 rounded-full text-sm font-semibold shadow-lg flex items-center w-fit">
              <TrendingUp size={14} className="mr-1" />
              Investment
            </div>
          )}
        </div>
        
        {/* ROI Badge - Moved to right side */}
        {roi && (
          <div className="absolute top-4 right-4 bg-primary text-primary-foreground px-3 py-1 rounded-full text-sm font-semibold shadow-lg">
            {roi} ROI
          </div>
        )}

        {/* Lock Overlay for Exclusive Properties */}
        {isLocked && (
          <div className="absolute inset-0 bg-black/60 flex items-center justify-center">
            <div className="text-center text-white p-4">
              <Crown size={48} className="mx-auto mb-2 text-amber-400" />
              <h3 className="font-semibold text-lg mb-1">Exclusive Property</h3>
              <p className="text-sm opacity-90">Sign in to view details</p>
            </div>
          </div>
        )}
      </div>

      {/* Details Overlay - Appears on Hover */}
      <div className={`absolute inset-0 bg-gradient-to-t from-black/90 via-black/70 to-transparent opacity-0 group-hover:opacity-100 transition-all duration-500 flex flex-col justify-end p-6 ${
        isLocked ? 'pointer-events-none' : ''
      }`}>
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
            <Link to={isLocked ? '/login' : `/properties/${id}`}>
              <Button 
                variant="outline" 
                size="sm" 
                className="border-primary text-primary bg-transparent hover:bg-primary hover:text-primary-foreground hover:border-primary transition-all duration-300 shadow-lg hover:shadow-primary/25"
              >
                {isLocked ? 'Sign In to View' : 'View Details'}
              </Button>
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
};

export default PropertyCard;