import { useState, useEffect, useRef } from 'react';
import { Search, Loader2, Filter, X } from 'lucide-react';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import PropertyCard from '@/components/PropertyCard';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { supabase } from '@/integrations/supabase/client';
import { Link } from 'react-router-dom';
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
  imageLinks: string[];
  featured: boolean;
  investmentOpportunity: boolean;
  exclusive: boolean;
  type: string;
  video_url: string | null;
  pdf_url: string | null;
  garage?: number;
  property_type?: 'sale' | 'rental';
  rental_period?: string | null;
  security_deposit?: string | null;
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

interface ExchangeRates {
  USD: number;
  ZAR: number;
  AED: number;
  EUR?: number;
  GBP?: number;
}

// Country to currency mapping
const countryCurrencyMap: { [key: string]: 'USD' | 'ZAR' | 'AED' | 'EUR' | 'GBP' } = {
  'US': 'USD',
  'ZA': 'ZAR',
  'AE': 'AED',
  'SA': 'AED', // Saudi Arabia often uses AED
  'QA': 'AED', // Qatar often uses AED
  'EU': 'EUR',
  'DE': 'EUR', // Germany
  'FR': 'EUR', // France
  'IT': 'EUR', // Italy
  'ES': 'EUR', // Spain
  'GB': 'GBP', // United Kingdom
  'UK': 'GBP',
  // Add more country codes as needed
};

const Properties = () => {
  const [properties, setProperties] = useState<Property[]>([]);
  const [loading, setLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState('');
  const [typeFilter, setTypeFilter] = useState('All');
  const [currency, setCurrency] = useState<'USD' | 'ZAR' | 'AED' | 'EUR' | 'GBP'>('USD');
  const [exchangeRates, setExchangeRates] = useState<ExchangeRates>({ 
    USD: 1, 
    ZAR: 18.5, 
    AED: 3.67,
    EUR: 0.92,
    GBP: 0.79
  });
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
  const [locationLoading, setLocationLoading] = useState(true);
  // ADD: Track manual currency selection
  const [isManualCurrency, setIsManualCurrency] = useState(false);
  const detectionCompleted = useRef(false);

  useEffect(() => {
    fetchProperties();
    checkAuth();
    
    // Only run auto-detection once on mount
    if (!detectionCompleted.current) {
      detectUserLocation();
      detectionCompleted.current = true;
    }

    // Refresh rates every 24 hours
    const interval = setInterval(fetchExchangeRates, 24 * 60 * 60 * 1000);
    return () => clearInterval(interval);
  }, []);

  useEffect(() => {
    updateActiveFilters();
  }, [filters]);

  // ADD: Debug currency changes
  useEffect(() => {
    console.log('Currency changed to:', currency, 'Manual mode:', isManualCurrency);
  }, [currency, isManualCurrency]);

  // ADD: Manual currency setter
  const setCurrencyManual = (newCurrency: 'USD' | 'ZAR' | 'AED' | 'EUR' | 'GBP') => {
    setCurrency(newCurrency);
    setIsManualCurrency(true);
    console.log(`Currency manually set to: ${newCurrency}`);
  };

  const detectUserLocation = async () => {
    // Skip if currency was manually set
    if (isManualCurrency) {
      console.log('Skipping auto-detection - currency was manually set');
      setLocationLoading(false);
      return;
    }

    try {
      setLocationLoading(true);
      console.log('Starting auto-detection...');
      
      let detectedCurrency: 'USD' | 'ZAR' | 'AED' | 'EUR' | 'GBP' | null = null;

      // Method 1: Try IP-based geolocation first
      try {
        const ipResponse = await fetch('https://ipapi.co/json/');
        if (ipResponse.ok) {
          const ipData = await ipResponse.json();
          const countryCode = ipData.country_code;
          
          if (countryCode && countryCurrencyMap[countryCode]) {
            detectedCurrency = countryCurrencyMap[countryCode];
            console.log(`IP detection: ${detectedCurrency} for ${ipData.country_name}`);
          }
        }
      } catch (ipError) {
        console.log('IP detection failed:', ipError);
      }

      // Method 2: Fallback to browser geolocation
      if (!detectedCurrency && navigator.geolocation) {
        try {
          const position = await new Promise<GeolocationPosition>((resolve, reject) => {
            navigator.geolocation.getCurrentPosition(resolve, reject, { timeout: 5000 });
          });
          
          const { latitude, longitude } = position.coords;
          const response = await fetch(
            `https://api.bigdatacloud.net/data/reverse-geocode-client?latitude=${latitude}&longitude=${longitude}&localityLanguage=en`
          );
          
          if (response.ok) {
            const locationData = await response.json();
            const countryCode = locationData.countryCode;
            
            if (countryCode && countryCurrencyMap[countryCode]) {
              detectedCurrency = countryCurrencyMap[countryCode];
              console.log(`GPS detection: ${detectedCurrency} for ${locationData.countryName}`);
            }
          }
        } catch (gpsError) {
          console.log('GPS detection failed:', gpsError);
        }
      }

      // Set detected currency or fallback to USD
      if (detectedCurrency && !isManualCurrency) {
        setCurrency(detectedCurrency);
        console.log(`Final auto-detected currency: ${detectedCurrency}`);
      } else if (!isManualCurrency) {
        setCurrency('USD');
        console.log('No detection method worked, falling back to USD');
      }
      
      // Fetch exchange rates
      await fetchExchangeRates();
      
    } catch (error) {
      console.error('Error in location detection:', error);
      if (!isManualCurrency) {
        setCurrency('USD');
      }
    } finally {
      setLocationLoading(false);
    }
  };

  const fetchExchangeRates = async () => {
    try {
      // Try direct API call first (bypass Supabase function due to CORS)
      console.log('Fetching exchange rates directly...');
      const response = await fetch('https://api.exchangerate-api.com/v4/latest/USD');
      
      if (response.ok) {
        const rateData = await response.json();
        const newRates = {
          USD: 1,
          ZAR: rateData.rates.ZAR || 18.5,
          AED: rateData.rates.AED || 3.67,
          EUR: rateData.rates.EUR || 0.92,
          GBP: rateData.rates.GBP || 0.79
        };
        setExchangeRates(newRates);
        console.log('Direct exchange rates loaded:', newRates);
        return;
      }
      
      throw new Error('Direct API failed');
      
    } catch (error) {
      console.error('Error fetching exchange rates, using fallback:', error);
      // Use reliable fallback rates
      setExchangeRates({ 
        USD: 1, 
        ZAR: 18.5, 
        AED: 3.67,
        EUR: 0.92,
        GBP: 0.79
      });
    }
  };

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

  const fetchProperties = async () => {
    try {
      const { data, error } = await supabase
        .from('properties')
        .select('*')
        .order('created_at', { ascending: false });

      if (error) throw error;
      setProperties(data || []);
      
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
    
    if (property.exclusive && !isAuthenticated) {
      return false;
    }

    const price = parseFloat(property.price.replace(/[^0-9.-]+/g, "")) || 0;
    const matchesPrice = price >= filters.minPrice && price <= filters.maxPrice;
    const matchesArea = property.area >= filters.minArea && property.area <= filters.maxArea;
    
    const matchesBedrooms = filters.bedrooms.length === 0 || filters.bedrooms.includes(property.bedrooms);
    const matchesBathrooms = filters.bathrooms.length === 0 || filters.bathrooms.includes(property.bathrooms);
    const matchesGarage = filters.garage.length === 0 || filters.garage.includes(property.garage || 0);
    const matchesParking = filters.parkingSpaces.length === 0 || filters.parkingSpaces.includes(property.parking_spaces || 0);
    
    return matchesSearch && matchesType && matchesPrice && matchesArea && 
           matchesBedrooms && matchesBathrooms && matchesGarage && matchesParking;
  });

  // Get currency symbol for display
  const getCurrencySymbol = () => {
    switch (currency) {
      case 'USD': return '$';
      case 'ZAR': return 'R';
      case 'AED': return 'د.إ';
      case 'EUR': return '€';
      case 'GBP': return '£';
      default: return '$';
    }
  };

  // Get currency name for display
  const getCurrencyName = () => {
    switch (currency) {
      case 'USD': return 'US Dollars';
      case 'ZAR': return 'South African Rand';
      case 'AED': return 'UAE Dirham';
      case 'EUR': return 'Euros';
      case 'GBP': return 'British Pounds';
      default: return 'US Dollars';
    }
  };

  return (
    <div className="min-h-screen">
      <Navbar />

      {/* ADD: Test Currency Selector */}
      <div className="fixed bottom-4 right-4 bg-white p-4 rounded-lg shadow-lg border z-50 max-w-xs">
        <h4 className="font-semibold mb-2 text-sm">🧪 Test Currencies</h4>
        <div className="flex flex-wrap gap-1 mb-2">
          {[
            { code: 'US', name: 'USA', currency: 'USD' },
            { code: 'ZA', name: 'South Africa', currency: 'ZAR' },
            { code: 'AE', name: 'UAE', currency: 'AED' },
            { code: 'DE', name: 'Germany', currency: 'EUR' },
            { code: 'GB', name: 'UK', currency: 'GBP' }
          ].map((country) => (
            <button
              key={country.code}
              onClick={() => setCurrencyManual(country.currency as any)}
              className="px-2 py-1 text-xs bg-blue-100 hover:bg-blue-200 rounded border transition-colors"
            >
              {country.code}
            </button>
          ))}
        </div>
        <div className="text-xs space-y-1">
          <div><strong>Current:</strong> {currency} ({getCurrencySymbol()})</div>
          <div><strong>Mode:</strong> {isManualCurrency ? 'Manual' : 'Auto'}</div>
          <button 
            onClick={() => {
              setIsManualCurrency(false);
              detectUserLocation();
            }}
            className="text-blue-500 hover:text-blue-700 underline text-xs"
          >
            Reset to Auto-detect
          </button>
        </div>
      </div>

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
          <div className="text-xl md:text-2xl max-w-3xl mx-auto text-white/90">
            <p>Discover exceptional investment opportunities around the world</p>
            
            {/* IMPROVED: Currency display */}
            <div className="mt-4 space-y-2">
              {locationLoading ? (
                <div className="flex items-center justify-center gap-2 text-amber-300">
                  <Loader2 className="h-4 w-4 animate-spin" />
                  <span className="text-sm">Detecting your location and currency...</span>
                </div>
              ) : (
                <div className="space-y-1">
                  <div className="text-sm text-amber-300 bg-amber-900/30 px-3 py-2 rounded-lg inline-block">
                    <strong>Prices in {getCurrencyName()}</strong> ({getCurrencySymbol()})
                    {isManualCurrency && (
                      <span className="block text-xs text-amber-200 mt-1">
                        Manually selected • <button 
                          onClick={() => setIsManualCurrency(false)}
                          className="underline hover:text-white"
                        >
                          Reset to auto
                        </button>
                      </span>
                    )}
                  </div>
                </div>
              )}
              
              {!isAuthenticated && (
                <div className="text-sm text-amber-300">
                  Sign in to access exclusive properties
                </div>
              )}
            </div>
          </div>
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

            {/* IMPROVED: Currency Display */}
            <div className="w-full md:w-48 flex items-center justify-center px-4 py-3 border border-gray-300 rounded-lg bg-gradient-to-r from-blue-50 to-indigo-50">
              <div className="text-center">
                {locationLoading ? (
                  <div className="flex items-center gap-2 text-gray-600">
                    <Loader2 className="h-4 w-4 animate-spin" />
                    <span className="text-sm">Detecting...</span>
                  </div>
                ) : (
                  <div>
                    <div className="font-bold text-gray-800">{currency}</div>
                    <div className="text-xs text-gray-600 flex items-center justify-center gap-1">
                      <span>{getCurrencySymbol()}</span>
                      <span>•</span>
                      <span>{getCurrencyName()}</span>
                      {isManualCurrency && (
                        <span title="Manually selected" className="text-orange-500">●</span>
                      )}
                    </div>
                  </div>
                )}
              </div>
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
                    <h4 className="font-semibold mb-3">Price Range ({currency})</h4>
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
                        <span>{getCurrencySymbol()}{filters.minPrice.toLocaleString()}</span>
                        <span>{getCurrencySymbol()}{filters.maxPrice.toLocaleString()}</span>
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
                    onClick={() => clearAllFilters()}
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
                  isAuthenticated={isAuthenticated}
                  propertyType={property.property_type || 'sale'}
                  rentalPeriod={property.rental_period || ''}
                  securityDeposit={property.security_deposit || ''}
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