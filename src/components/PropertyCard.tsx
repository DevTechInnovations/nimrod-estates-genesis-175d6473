import { Link } from 'react-router-dom';
import { MapPin, Bed, Bath, Square, Crown, TrendingUp, Calendar, Shield } from 'lucide-react';
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
  propertyType?: 'sale' | 'rental';
  rentalPeriod?: string;
  securityDeposit?: string;
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
  propertyType = 'sale',
  rentalPeriod = '',
  securityDeposit = '',
}: PropertyCardProps) => {
  
  console.log('PropertyCard authentication debug:', {
    propertyId: id,
    propertyTitle: title,
    isExclusive: exclusive,
    isAuthenticated: isAuthenticated,
    shouldBeLocked: exclusive && !isAuthenticated,
    propertyType,
    rentalPeriod
  });

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

  // Prioritize imageLinks over image prop
  const displayImage = imageLinks && imageLinks.length > 0 
    ? imageLinks[0] 
    : image || '';

  // Get rental period display text
  const getRentalPeriodText = (period: string) => {
    switch (period) {
      case 'monthly': return '/month';
      case 'weekly': return '/week';
      case 'daily': return '/day';
      case 'yearly': return '/year';
      default: return '';
    }
  };

  // Get rental period display for badge
  const getRentalPeriodBadge = (period: string) => {
    return period.charAt(0).toUpperCase() + period.slice(1);
  };

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
        
        {/* Top Badges Container - Organized in corners */}
        <div className="absolute top-3 left-3 right-3 flex justify-between items-start">
          {/* Left Side Badges */}
          <div className="flex flex-col gap-2">
            {/* Property Type Badge */}
            <div className={`px-3 py-1.5 rounded-full text-sm font-semibold shadow-lg flex items-center w-fit ${
              propertyType === 'rental' 
                ? 'bg-blue-500 text-white border border-blue-300' 
                : 'bg-primary text-primary-foreground border border-primary/20'
            }`}>
              {propertyType === 'rental' ? (
                <>
                  <Calendar size={14} className="mr-1.5" />
                  For Rent
                </>
              ) : (
                <>
                  <TrendingUp size={14} className="mr-1.5" />
                  For Sale
                </>
              )}
            </div>

            {/* Exclusive Badge */}
            {exclusive && (
              <div className="bg-gradient-to-r from-amber-500 to-amber-600 text-white px-3 py-1.5 rounded-full text-sm font-semibold shadow-lg flex items-center w-fit border border-amber-300">
                <Crown size={14} className="mr-1.5" />
                Exclusive
              </div>
            )}
          </div>

          {/* Right Side Badges */}
          <div className="flex flex-col gap-2 items-end">
            {/* ROI Badge */}
            {roi && (
              <div className="bg-gradient-to-r from-green-500 to-green-600 text-white px-3 py-1.5 rounded-full text-sm font-semibold shadow-lg flex items-center border border-green-300">
                <TrendingUp size={14} className="mr-1.5" />
                {roi} ROI
              </div>
            )}

            {/* Investment Opportunity Badge */}
            {investmentOpportunity && (
              <div className="bg-gradient-to-r from-purple-500 to-purple-600 text-white px-3 py-1.5 rounded-full text-sm font-semibold shadow-lg flex items-center border border-purple-300">
                <TrendingUp size={14} className="mr-1.5" />
                Investment
              </div>
            )}

            {/* Rental Period Badge */}
            {propertyType === 'rental' && rentalPeriod && (
              <div className="bg-blue-600 text-white px-3 py-1.5 rounded-full text-sm font-semibold shadow-lg flex items-center border border-blue-400">
                <Calendar size={14} className="mr-1.5" />
                {getRentalPeriodBadge(rentalPeriod)}
              </div>
            )}
          </div>
        </div>

        {/* Lock Overlay for Exclusive Properties */}
        {isLocked && (
          <div className="absolute inset-0 bg-black/70 flex items-center justify-center backdrop-blur-sm">
            <div className="text-center text-white p-6">
              <Crown size={48} className="mx-auto mb-3 text-amber-300" />
              <h3 className="font-semibold text-xl mb-2">Exclusive Property</h3>
              <p className="text-sm opacity-90 mb-4">Sign in to view premium listings</p>
              <Link to="/member-auth">
                <Button 
                  size="sm" 
                  className="bg-amber-500 hover:bg-amber-600 text-white border-0"
                >
                  Sign In to View
                </Button>
              </Link>
            </div>
          </div>
        )}
      </div>

      {/* Details Overlay - Appears on Hover */}
      <div className={`absolute inset-0 bg-gradient-to-t from-black/95 via-black/50 to-transparent opacity-0 group-hover:opacity-100 transition-all duration-500 flex flex-col justify-end p-6 ${
        isLocked ? 'pointer-events-none' : ''
      }`}>
        <div className="transform translate-y-8 group-hover:translate-y-0 transition-transform duration-500">
          <h3 className="font-heading text-xl font-semibold mb-3 text-white">
            {title}
          </h3>

          <div className="flex items-center text-white/90 mb-4">
            <MapPin size={16} className="mr-2 text-blue-300" />
            <span className="text-sm">{location}</span>
          </div>

          <div className="flex items-center justify-between mb-4 text-sm text-white/90">
            <div className="flex items-center space-x-4">
              <span className="flex items-center bg-white/20 px-2 py-1 rounded-lg">
                <Bed size={16} className="mr-1.5 text-blue-300" /> 
                <span className="font-semibold">{bedrooms}</span>
              </span>
              <span className="flex items-center bg-white/20 px-2 py-1 rounded-lg">
                <Bath size={16} className="mr-1.5 text-blue-300" /> 
                <span className="font-semibold">{bathrooms}</span>
              </span>
              <span className="flex items-center bg-white/20 px-2 py-1 rounded-lg">
                <Square size={16} className="mr-1.5 text-blue-300" /> 
                <span className="font-semibold">{area} m²</span>
              </span>
            </div>
          </div>

          {/* Security Deposit for Rental Properties */}
          {propertyType === 'rental' && securityDeposit && (
            <div className="mb-4 p-3 bg-blue-500/30 rounded-lg border border-blue-400/30">
              <div className="flex items-center text-white/90 text-sm">
                <Shield size={16} className="mr-2 text-blue-300" />
                <span className="font-medium">Security Deposit: </span>
                <span className="ml-1 font-semibold">{formatPrice(securityDeposit, currency)}</span>
              </div>
            </div>
          )}

          <div className="flex items-center justify-between pt-4 border-t border-white/30">
            <div>
              <p className="text-2xl font-heading font-bold text-white">
                {formatPrice(price, currency)}
                {propertyType === 'rental' && rentalPeriod && (
                  <span className="text-lg font-normal ml-1.5 text-white/80">
                    {getRentalPeriodText(rentalPeriod)}
                  </span>
                )}
              </p>
              {propertyType === 'rental' && !rentalPeriod && (
                <p className="text-sm text-white/80 mt-1 flex items-center">
                  <Calendar size={14} className="mr-1" />
                  Available for Rent
                </p>
              )}
            </div>
            <Link to={isLocked ? '/member-auth' : `/properties/${id}`}>
              <Button 
                variant="outline" 
                size="sm" 
                className="border-white text-white bg-transparent hover:bg-white hover:text-black hover:border-white transition-all duration-300 shadow-lg hover:shadow-white/25 font-semibold"
              >
                {isLocked ? 'Sign In to View' : 'View Details'}
              </Button>
            </Link>
          </div>
        </div>
      </div>

      {/* Static Info (Visible without hover) */}
      <div className="p-6 bg-white">
        <h3 className="font-heading text-xl font-semibold mb-2 text-foreground line-clamp-2 h-14">
          {title}
        </h3>

        <div className="flex items-center text-muted-foreground mb-3">
          <MapPin size={16} className="mr-2 flex-shrink-0" />
          <span className="text-sm line-clamp-1">{location}</span>
        </div>

        <div className="flex items-center justify-between mb-4 text-sm text-muted-foreground">
          <div className="flex items-center space-x-3">
            <span className="flex items-center bg-gray-100 px-2 py-1 rounded-lg">
              <Bed size={14} className="mr-1.5" /> 
              <span className="font-semibold text-foreground">{bedrooms}</span>
            </span>
            <span className="flex items-center bg-gray-100 px-2 py-1 rounded-lg">
              <Bath size={14} className="mr-1.5" /> 
              <span className="font-semibold text-foreground">{bathrooms}</span>
            </span>
            <span className="flex items-center bg-gray-100 px-2 py-1 rounded-lg">
              <Square size={14} className="mr-1.5" /> 
              <span className="font-semibold text-foreground">{area} m²</span>
            </span>
          </div>
        </div>

        {/* Security Deposit for Static View */}
        {propertyType === 'rental' && securityDeposit && (
          <div className="mb-3 p-2 bg-blue-50 rounded-lg border border-blue-200">
            <div className="flex items-center text-blue-800 text-xs">
              <Shield size={12} className="mr-1.5 flex-shrink-0" />
              <span className="font-medium">Deposit: </span>
              <span className="ml-1 font-semibold">{formatPrice(securityDeposit, currency)}</span>
            </div>
          </div>
        )}

        <div className="flex items-center justify-between pt-4 border-t border-border">
          <div className="flex-1 min-w-0">
            <p className="text-2xl font-heading font-bold text-foreground truncate">
              {formatPrice(price, currency)}
              {propertyType === 'rental' && rentalPeriod && (
                <span className="text-lg font-normal ml-1.5 text-muted-foreground">
                  {getRentalPeriodText(rentalPeriod)}
                </span>
              )}
            </p>
            {propertyType === 'rental' && !rentalPeriod && (
              <p className="text-sm text-muted-foreground mt-1 flex items-center">
                <Calendar size={14} className="mr-1" />
                For Rent
              </p>
            )}
          </div>
          <Link to={isLocked ? '/member-auth' : `/properties/${id}`} className="flex-shrink-0 ml-3">
            <Button 
              variant="outline" 
              size="sm" 
              className="border-primary text-primary bg-transparent hover:bg-primary hover:text-primary-foreground hover:border-primary transition-all duration-300 font-semibold whitespace-nowrap"
            >
              {isLocked ? 'Sign In' : 'Details'}
            </Button>
          </Link>
        </div>
      </div>
    </div>
  );
};

export default PropertyCard;