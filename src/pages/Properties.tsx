import { useState, useEffect } from 'react';
import { Search, Loader2, DollarSign, Filter, X } from 'lucide-react';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import PropertyCard from '@/components/PropertyCard';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { supabase } from '@/integrations/supabase/client';
import { Link } from 'react-router-dom';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import {
  Sheet,
  SheetContent,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from '@/components/ui/sheet';
import { Slider } from '@/components/ui/slider';
import { Badge } from '@/components/ui/badge';
import heroImage from '@/assets/luxurious-villa-with-modern-architectural-design.jpg';

// interface Property {
//   id: string;
//   title: string;
//   description: string;
//   location: string;
//   price: string;
//   bedrooms: number;
//   bathrooms: number;
//   area: number;
//   roi: string | null;
//   images: string[];
//   featured: boolean;
//   investmentOpportunity: boolean;
//   exclusive: boolean;
//   type: string;
//   video_url: string | null;
//   pdf_url: string | null;
//   garage?: number;
//   year_built?: number;
//   parking_spaces?: number;
// }



interface Property {
  id: string;
  title: string;
  description: string;
  location: string;
  price: string;
  bedrooms: number;
  bathrooms: number;
  area: number;
  roi: string | null;
  images: string[];
  imageLinks: string[]; // Add this line
  featured: boolean;
  investmentOpportunity: boolean;
  exclusive: boolean;
  type: string;
  video_url: string | null;
  pdf_url: string | null;
  garage?: number;
  year_built?: number;
  parking_spaces?: number;
}

interface Filters {
  bedrooms: number[];
  bathrooms: number[];
  minPrice: number;
  maxPrice: number;
  minArea: number;
  maxArea: number;
  garage: number[];
  parkingSpaces: number[];
  yearBuilt: number[];
  features: string[];
}

const Properties = () => {
  const [properties, setProperties] = useState<Property[]>([]);
  const [loading, setLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState('');
  const [typeFilter, setTypeFilter] = useState('All');
  const [currency, setCurrency] = useState<'USD' | 'ZAR' | 'AED'>('USD');
  const [exchangeRates, setExchangeRates] = useState({ USD: 1, ZAR: 18.5, AED: 3.67 });
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [filters, setFilters] = useState<Filters>({
    bedrooms: [],
    bathrooms: [],
    minPrice: 0,
    maxPrice: 10000000,
    minArea: 0,
    maxArea: 10000,
    garage: [],
    parkingSpaces: [],
    yearBuilt: [],
    features: []
  });
  const [activeFilters, setActiveFilters] = useState<string[]>([]);

useEffect(() => {
  fetchProperties();
  fetchExchangeRates();
  checkAuth();

  // Refresh rates every hour
  const interval = setInterval(fetchExchangeRates, 60 * 60 * 1000);
  return () => clearInterval(interval);
}, []);

  useEffect(() => {
    updateActiveFilters();
  }, [filters]);

  const checkAuth = async () => {
    try {
      const { data: { session } } = await supabase.auth.getSession();
      setIsAuthenticated(!!session);
      
      const { data: { subscription } } = supabase.auth.onAuthStateChange((_event, session) => {
        setIsAuthenticated(!!session);
      });

      return () => subscription.unsubscribe();
    } catch (error) {
      console.error('Error checking auth:', error);
    }
  };

  const fetchExchangeRates = async () => {
    try {
      const { data, error } = await supabase.functions.invoke('currency-rates');
      
      if (error) throw error;
      
      if (data) {
        setExchangeRates(data);
        console.log('Live exchange rates loaded:', data);
      }
    } catch (error) {
      console.error('Error fetching exchange rates:', error);
    }
  };

  const fetchProperties = async () => {
    try {
      const { data, error } = await supabase
        .from('properties')
        .select('*')
        .order('created_at', { ascending: false });

      if (error) throw error;
      setProperties(data || []);
      
      // Set initial filter ranges based on actual data
      if (data && data.length > 0) {
        const prices = data.map(p => parseFloat(p.price.replace(/[^0-9.-]+/g, "")) || 0);
        const areas = data.map(p => p.area || 0);
        
        setFilters(prev => ({
          ...prev,
          minPrice: Math.min(...prices),
          maxPrice: Math.max(...prices),
          minArea: Math.min(...areas),
          maxArea: Math.max(...areas)
        }));
      }
    } catch (error) {
      console.error('Error fetching properties:', error);
    } finally {
      setLoading(false);
    }
  };

  const updateActiveFilters = () => {
    const active: string[] = [];
    
    if (filters.bedrooms.length > 0) {
      active.push(`${filters.bedrooms.join(',')} Bedrooms`);
    }
    if (filters.bathrooms.length > 0) {
      active.push(`${filters.bathrooms.join(',')} Bathrooms`);
    }
    if (filters.garage.length > 0) {
      active.push(`${filters.garage.join(',')} Garage`);
    }
    if (filters.parkingSpaces.length > 0) {
      active.push(`${filters.parkingSpaces.join(',')} Parking`);
    }
    if (filters.yearBuilt.length > 0) {
      active.push(`Built ${filters.yearBuilt.join(',')}`);
    }
    if (filters.minPrice > 0 || filters.maxPrice < 10000000) {
      active.push(`Price: $${filters.minPrice.toLocaleString()} - $${filters.maxPrice.toLocaleString()}`);
    }
    if (filters.minArea > 0 || filters.maxArea < 10000) {
      active.push(`Area: ${filters.minArea} - ${filters.maxArea} sqft`);
    }

    setActiveFilters(active);
  };

  const clearFilter = (filterType: keyof Filters) => {
    setFilters(prev => ({
      ...prev,
      [filterType]: Array.isArray(prev[filterType]) ? [] : 
                   typeof prev[filterType] === 'number' ? 
                   (filterType === 'minPrice' ? 0 : 
                    filterType === 'maxPrice' ? 10000000 :
                    filterType === 'minArea' ? 0 : 10000) : 
                   prev[filterType]
    }));
  };

  const clearAllFilters = () => {
    setFilters({
      bedrooms: [],
      bathrooms: [],
      minPrice: 0,
      maxPrice: 10000000,
      minArea: 0,
      maxArea: 10000,
      garage: [],
      parkingSpaces: [],
      yearBuilt: [],
      features: []
    });
  };

  const propertyTypes = ['All', ...Array.from(new Set(properties.map(p => p.type)))];
  const bedroomOptions = [1, 2, 3, 4, 5, 6];
  const bathroomOptions = [1, 2, 3, 4, 5, 6];
  const garageOptions = [0, 1, 2, 3, 4];
  const parkingOptions = [0, 1, 2, 3, 4, 5];

  const filteredProperties = properties.filter((property) => {
    const matchesSearch =
      property.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
      property.location.toLowerCase().includes(searchTerm.toLowerCase());
    
    const matchesType = typeFilter === 'All' || property.type === typeFilter;
    
    // Filter out exclusive properties if not authenticated
    if (property.exclusive && !isAuthenticated) {
      return false;
    }

    // Numeric filters
    const price = parseFloat(property.price.replace(/[^0-9.-]+/g, "")) || 0;
    const matchesPrice = price >= filters.minPrice && price <= filters.maxPrice;
    const matchesArea = property.area >= filters.minArea && property.area <= filters.maxArea;
    
    // Array filters
    const matchesBedrooms = filters.bedrooms.length === 0 || filters.bedrooms.includes(property.bedrooms);
    const matchesBathrooms = filters.bathrooms.length === 0 || filters.bathrooms.includes(property.bathrooms);
    const matchesGarage = filters.garage.length === 0 || filters.garage.includes(property.garage || 0);
    const matchesParking = filters.parkingSpaces.length === 0 || filters.parkingSpaces.includes(property.parking_spaces || 0);
    
    return matchesSearch && matchesType && matchesPrice && matchesArea && 
           matchesBedrooms && matchesBathrooms && matchesGarage && matchesParking;
  });

  return (
    <div className="min-h-screen">
      <Navbar />

      {/* Hero Section */}
      <section className="relative h-[50vh] flex items-center justify-center overflow-hidden">
        <div
          className="absolute inset-0 bg-cover bg-center"
          style={{
            backgroundImage: `url(${heroImage})`,
          }}
        >
          <div className="absolute inset-0 bg-gradient-to-r from-black/80 via-black/60 to-transparent"></div>
        </div>

        <div className="relative z-10 container mx-auto px-4 text-center text-white">
          <h1 className="font-heading text-5xl md:text-6xl font-bold mb-6">
            Luxury <span className="text-gradient-gold">Property</span> Listings
          </h1>
          <p className="text-xl md:text-2xl max-w-3xl mx-auto text-white/90">
            Discover exceptional investment opportunities around the world
            {!isAuthenticated && (
              <span className="block text-sm mt-2 text-amber-300">
                Sign in to access exclusive properties
              </span>
            )}
          </p>
        </div>
      </section>

      {/* Search and Filters */}
      <section className="py-8 bg-white border-b border-gray-200 sticky top-20 z-40 shadow-sm">
        <div className="container mx-auto px-4">
          <div className="flex flex-col md:flex-row gap-4 items-start md:items-center">
            {/* Search */}
            <div className="flex-1 relative min-w-0">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground" size={20} />
              <Input
                type="text"
                placeholder="Search by location or property name..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="pl-10"
              />
            </div>

            {/* Currency Selector */}
            <div className="w-full md:w-40">
              <Select value={currency} onValueChange={(value: 'USD' | 'ZAR' | 'AED') => setCurrency(value)}>
                <SelectTrigger className="w-full">
                  <DollarSign className="mr-2 h-4 w-4" />
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="USD">USD ($)</SelectItem>
                  <SelectItem value="ZAR">ZAR (R)</SelectItem>
                  <SelectItem value="AED">AED (د.إ)</SelectItem>
                </SelectContent>
              </Select>
            </div>

            {/* Advanced Filters */}
            <Sheet>
              <SheetTrigger asChild>
                <Button variant="outline" className="flex items-center gap-2">
                  <Filter className="h-4 w-4" />
                  Filters
                  {activeFilters.length > 0 && (
                    <Badge variant="secondary" className="ml-1">
                      {activeFilters.length}
                    </Badge>
                  )}
                </Button>
              </SheetTrigger>
              <SheetContent className="w-full sm:max-w-md overflow-y-auto">
                <SheetHeader>
                  <SheetTitle>Property Filters</SheetTitle>
                </SheetHeader>
                
                <div className="space-y-6 mt-6">
                  {/* Price Range */}
                  <div>
                    <h4 className="font-semibold mb-3">Price Range</h4>
                    <div className="space-y-4">
                      <Slider
                        value={[filters.minPrice, filters.maxPrice]}
                        min={0}
                        max={10000000}
                        step={10000}
                        onValueChange={([min, max]) => setFilters(prev => ({ ...prev, minPrice: min, maxPrice: max }))}
                        className="my-4"
                      />
                      <div className="flex justify-between text-sm text-muted-foreground">
                        <span>${filters.minPrice.toLocaleString()}</span>
                        <span>${filters.maxPrice.toLocaleString()}</span>
                      </div>
                    </div>
                  </div>

                  {/* Area Range */}
                  <div>
                    <h4 className="font-semibold mb-3">Area (sqft)</h4>
                    <div className="space-y-4">
                      <Slider
                        value={[filters.minArea, filters.maxArea]}
                        min={0}
                        max={10000}
                        step={100}
                        onValueChange={([min, max]) => setFilters(prev => ({ ...prev, minArea: min, maxArea: max }))}
                        className="my-4"
                      />
                      <div className="flex justify-between text-sm text-muted-foreground">
                        <span>{filters.minArea} sqft</span>
                        <span>{filters.maxArea} sqft</span>
                      </div>
                    </div>
                  </div>

                  {/* Bedrooms */}
                  <div>
                    <h4 className="font-semibold mb-3">Bedrooms</h4>
                    <div className="flex flex-wrap gap-2">
                      {bedroomOptions.map(beds => (
                        <Button
                          key={beds}
                          variant={filters.bedrooms.includes(beds) ? "default" : "outline"}
                          size="sm"
                          onClick={() => setFilters(prev => ({
                            ...prev,
                            bedrooms: prev.bedrooms.includes(beds) 
                              ? prev.bedrooms.filter(b => b !== beds)
                              : [...prev.bedrooms, beds]
                          }))}
                        >
                          {beds}+
                        </Button>
                      ))}
                    </div>
                  </div>

                  {/* Bathrooms */}
                  <div>
                    <h4 className="font-semibold mb-3">Bathrooms</h4>
                    <div className="flex flex-wrap gap-2">
                      {bathroomOptions.map(baths => (
                        <Button
                          key={baths}
                          variant={filters.bathrooms.includes(baths) ? "default" : "outline"}
                          size="sm"
                          onClick={() => setFilters(prev => ({
                            ...prev,
                            bathrooms: prev.bathrooms.includes(baths) 
                              ? prev.bathrooms.filter(b => b !== baths)
                              : [...prev.bathrooms, baths]
                          }))}
                        >
                          {baths}+
                        </Button>
                      ))}
                    </div>
                  </div>

                  {/* Garage */}
                  <div>
                    <h4 className="font-semibold mb-3">Garage</h4>
                    <div className="flex flex-wrap gap-2">
                      {garageOptions.map(garage => (
                        <Button
                          key={garage}
                          variant={filters.garage.includes(garage) ? "default" : "outline"}
                          size="sm"
                          onClick={() => setFilters(prev => ({
                            ...prev,
                            garage: prev.garage.includes(garage) 
                              ? prev.garage.filter(g => g !== garage)
                              : [...prev.garage, garage]
                          }))}
                        >
                          {garage}
                        </Button>
                      ))}
                    </div>
                  </div>

                  {/* Parking Spaces */}
                  <div>
                    <h4 className="font-semibold mb-3">Parking Spaces</h4>
                    <div className="flex flex-wrap gap-2">
                      {parkingOptions.map(parking => (
                        <Button
                          key={parking}
                          variant={filters.parkingSpaces.includes(parking) ? "default" : "outline"}
                          size="sm"
                          onClick={() => setFilters(prev => ({
                            ...prev,
                            parkingSpaces: prev.parkingSpaces.includes(parking) 
                              ? prev.parkingSpaces.filter(p => p !== parking)
                              : [...prev.parkingSpaces, parking]
                          }))}
                        >
                          {parking}
                        </Button>
                      ))}
                    </div>
                  </div>

                  {/* Clear Filters */}
                  <div className="flex gap-2 pt-4">
                    <Button variant="outline" onClick={clearAllFilters} className="flex-1">
                      Clear All
                    </Button>
                    <SheetTrigger asChild>
                      <Button className="flex-1">
                        Apply Filters
                      </Button>
                    </SheetTrigger>
                  </div>
                </div>
              </SheetContent>
            </Sheet>

            {/* Type Filter */}
            <div className="flex gap-2 overflow-x-auto w-full md:w-auto pb-2 md:pb-0">
              {propertyTypes.map((type) => (
                <Button
                  key={type}
                  variant={typeFilter === type ? 'default' : 'outline'}
                  onClick={() => setTypeFilter(type)}
                  className={`whitespace-nowrap ${
                    typeFilter === type 
                      ? 'bg-primary hover:bg-primary/90 text-white' 
                      : 'border-gray-300 text-gray-700 hover:border-primary hover:text-black'
                  }`}
                  size="sm"
                >
                  {type}
                </Button>
              ))}
            </div>
          </div>

          {/* Active Filters */}
          {activeFilters.length > 0 && (
            <div className="mt-4 flex flex-wrap gap-2">
              {activeFilters.map((filter, index) => (
                <Badge key={index} variant="secondary" className="flex items-center gap-1">
                  {filter}
                  <X 
                    className="h-3 w-3 cursor-pointer" 
                    onClick={() => {
                      // This is a simplified clear - you might want to implement individual filter clearing
                      clearAllFilters();
                    }}
                  />
                </Badge>
              ))}
              <Button variant="ghost" size="sm" onClick={clearAllFilters} className="text-xs h-6">
                Clear All
              </Button>
            </div>
          )}

          <div className="mt-4 text-sm text-muted-foreground">
            Showing {filteredProperties.length} of {properties.length} properties
            {!isAuthenticated && (
              <span className="ml-2 text-amber-600">
                • Sign in to view exclusive properties
              </span>
            )}
          </div>
        </div>
      </section>
{/* Property Grid */}
<section className="py-12 bg-gray-50">
  <div className="container mx-auto px-4">
    {loading ? (
      <div className="flex justify-center items-center py-20">
        <Loader2 className="h-12 w-12 animate-spin text-primary" />
      </div>
    ) : filteredProperties.length > 0 ? (
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
        {filteredProperties.map((property) => (
          <PropertyCard
            key={property.id}
            id={property.id}
            image={property.images?.[0] || ''}
            imageLinks={property.imageLinks || []}
            title={property.title}
            location={property.location}
            price={property.price}
            bedrooms={property.bedrooms}
            bathrooms={property.bathrooms}
            area={property.area}
            roi={property.roi}
            investmentOpportunity={property.investmentOpportunity || false}
            exclusive={property.exclusive || false}
            currency={currency}
            exchangeRates={exchangeRates}
            isAuthenticated={isAuthenticated} // This is now correctly passed
          />
        ))}
      </div>
    ) : (
      <div className="text-center py-20 bg-white rounded-2xl shadow-lg">
        <p className="text-xl text-muted-foreground mb-4">
          {isAuthenticated ? 'No properties found matching your criteria.' : 'No properties available. Sign in to view exclusive properties.'}
        </p>
        <div className="flex gap-4 justify-center">
          <Button
            onClick={() => {
              setSearchTerm('');
              setTypeFilter('All');
              clearAllFilters();
            }}
            className="bg-primary hover:bg-primary/90 text-white"
          >
            Clear Filters
          </Button>
          {!isAuthenticated && (
            <Link to="/member-auth">
              <Button variant="outline" className="border-amber-600 text-amber-600 hover:bg-amber-50">
                Sign In
              </Button>
            </Link>
          )}
        </div>
      </div>
    )}
  </div>
</section>

      <Footer />
    </div>
  );
};

export default Properties;