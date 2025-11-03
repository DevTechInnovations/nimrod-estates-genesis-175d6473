import { useEffect, useState, useRef } from 'react';
import { Link } from 'react-router-dom';
import { ArrowRight, Shield, TrendingUp, Globe, Star, Trophy, Award, Crown, Check, Zap, Sparkles } from 'lucide-react';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import PropertyCard from '@/components/PropertyCard';
import { Button } from '@/components/ui/button';
import { supabase } from '@/integrations/supabase/client';
import heroImage from '@/assets/hero-luxury-estate.jpg';
import { Helmet } from 'react-helmet-async';


interface Property {
  id: string;
  title: string;
  location: string;
  price: string;
  bedrooms: number;
  bathrooms: number;
  area: number;
  roi: string | null;
  images: string[];
  featured: boolean;
  property_type?: 'sale' | 'rental';
  rental_period?: string | null;
  security_deposit?: string | null;
  investmentOpportunity: boolean;
  exclusive: boolean;
  imageLinks: string[];
  listing_currency?: 'USD' | 'ZAR' | 'AED'; // ✅ ADD THIS
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
};

const Index = () => {
  const [featuredProperties, setFeaturedProperties] = useState<Property[]>([]);
  const [loading, setLoading] = useState(true);
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [currency, setCurrency] = useState<'USD' | 'ZAR' | 'AED' | 'EUR' | 'GBP'>('USD');
  const [exchangeRates, setExchangeRates] = useState<ExchangeRates>({ 
    USD: 1, 
    ZAR: 18.5, 
    AED: 3.67,
    EUR: 0.92,
    GBP: 0.79
  });
  const [locationLoading, setLocationLoading] = useState(true);
  const [isManualCurrency, setIsManualCurrency] = useState(false);
  const detectionCompleted = useRef(false);

  useEffect(() => {
   const fetchFeaturedProperties = async () => {
  try {
    const { data, error } = await supabase
      .from('properties')
      .select('*, listing_currency') // ✅ ADD listing_currency here
      .eq('featured', true)
      .order('created_at', { ascending: false })
      .limit(3);

    if (error) throw error;
    setFeaturedProperties(data || []);
  } catch (error) {
    console.error('Error fetching featured properties:', error);
  } finally {
    setLoading(false);
  }
};

    const checkAuth = async () => {
      try {
        const { data: { session } } = await supabase.auth.getSession();
        setIsAuthenticated(!!session);
        
        // Listen for auth state changes
        const { data: { subscription } } = supabase.auth.onAuthStateChange((_event, session) => {
          setIsAuthenticated(!!session);
        });

        return () => subscription.unsubscribe();
      } catch (error) {
        console.error('Error checking auth:', error);
      }
    };

    // Only run auto-detection once on mount
    if (!detectionCompleted.current) {
      detectUserLocation();
      detectionCompleted.current = true;
    }

    fetchFeaturedProperties();
    checkAuth();

    // Refresh rates every 24 hours
    const interval = setInterval(fetchExchangeRates, 24 * 60 * 60 * 1000);
    return () => clearInterval(interval);
  }, []);

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

  // Format membership prices based on currency
  const formatMembershipPrice = (usdPrice: number) => {
    const convertedAmount = usdPrice * exchangeRates[currency];
    
    return new Intl.NumberFormat('en-US', {
      style: 'currency',
      currency: currency,
      maximumFractionDigits: 0,
    }).format(convertedAmount);
  };

  const structuredData = {
    "@context": "https://schema.org",
    "@type": "RealEstateAgent",
    "name": "Nimrod Property Estates",
    "url": "https://nimrodestates.com/",
    "description": "Luxury properties, real estate investments, and property development opportunities in South Africa, Dubai, and Monaco.",
    "areaServed": ["South Africa", "Dubai", "Monaco"],
    "serviceType": [
      "Property for rent",
      "Property to buy",
      "Property development",
      "Real estate investments",
      "Luxury properties"
    ],
  };

  return (
    <div className="min-h-screen">
      {/* Currency Test Panel
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
      */}

      {/* SEO Section */}
      <Helmet>
        <title>Luxury Property Investments | Nimrod Property Estates</title>
        <meta
          name="description"
          content="Explore luxury properties, real estate investments, and property development opportunities with Nimrod Property Estates. Featuring premium properties for rent and investment in South Africa, Dubai, and Monaco."
        />
        <meta
          name="keywords"
          content="Property for rent, Property investment in South Africa, Property investment in Dubai, Property investment in Monaco, Property development, Property to buy, Real estate investments, Luxury properties, Nimrod Property Estates"
        />
        <meta property="og:title" content="Luxury Real Estate & Investments | Nimrod Property Estates" />
        <meta property="og:description" content="Discover exclusive luxury properties and investment opportunities in South Africa, Dubai, and Monaco." />
        <meta property="og:image" content={heroImage} />
        <meta property="og:url" content="https://nimrodestates.com/" />
        <meta property="og:type" content="website" />
        <meta name="twitter:card" content="summary_large_image" />
        <script type="application/ld+json">{JSON.stringify(structuredData)}</script>
      </Helmet>
      
      <Navbar />
      
      {/* Hero Section */}
      <section className="relative h-screen flex items-center justify-center overflow-hidden">
        <div
          className="absolute inset-0 bg-cover bg-center"
          style={{
            backgroundImage: `url(${heroImage})`,
          }}
        >
          <div className="absolute inset-0 bg-gradient-to-r from-black/80 via-black/60 to-transparent"></div>
        </div>

        <div className="relative z-10 container mx-auto px-4 text-center text-white">
          <h1 className="text-5xl md:text-7xl font-bold mb-6 animate-fade-in leading-tight">
            <span className="text-gradient-gold">Luxury Real Estate</span> Investments
          </h1>
          <p className="text-xl md:text-2xl mb-8 max-w-2xl mx-auto animate-fade-in text-white/90 leading-relaxed">
            Invest with confidence in exclusive properties worldwide.
          </p>

          {/* Currency Display */}
          <div className="mb-6 animate-fade-in">
            {locationLoading ? (
              <div className="flex items-center justify-center gap-2 text-amber-300">
                <div className="w-4 h-4 border-2 border-amber-300 border-t-transparent rounded-full animate-spin" />
                <span className="text-sm">Detecting your currency...</span>
              </div>
            ) : (
              <div className="text-sm text-amber-300 bg-amber-900/30 px-4 py-2 rounded-lg inline-block">
                <strong>Prices displayed in {getCurrencyName()}</strong> ({getCurrencySymbol()})
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
            )}
          </div>

          <div className="flex flex-col sm:flex-row gap-4 justify-center animate-fade-in">
            <Link to="/properties">
              <Button 
                size="lg" 
                variant="outline" 
                className="border-primary text-primary bg-transparent hover:bg-primary hover:text-white transition-all duration-300 shadow-gold"
              >
                Explore Properties
                <ArrowRight className="ml-2" size={20} />
              </Button>
            </Link>
            <Link to="/contact">
              <Button 
                size="lg" 
                variant="outline" 
                className="border-primary text-primary bg-transparent hover:bg-primary hover:text-white transition-all duration-300"
              >
                Get Started
              </Button>
            </Link>
          </div>
        </div>
      </section>

      {/* Quick Stats */}
      <section className="py-16 bg-secondary text-secondary-foreground">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-8 text-center">
            <div className="animate-fade-in">
              <div className="text-4xl font-bold text-gradient-gold mb-2 tracking-tight">500+</div>
              <div className="text-muted-foreground font-medium">Luxury Properties</div>
            </div>
            <div className="animate-fade-in">
              <div className="text-4xl font-bold text-gradient-gold mb-2 tracking-tight">50+</div>
              <div className="text-muted-foreground font-medium">Global Locations</div>
            </div>
            <div className="animate-fade-in">
              <div className="text-4xl font-bold text-gradient-gold mb-2 tracking-tight">
                {getCurrencySymbol()}2.5B+
              </div>
              <div className="text-muted-foreground font-medium">Assets Managed</div>
            </div>
            <div className="animate-fade-in">
              <div className="text-4xl font-bold text-gradient-gold mb-2 tracking-tight">98%</div>
              <div className="text-muted-foreground font-medium">Client Satisfaction</div>
            </div>
          </div>
        </div>
      </section>

      {/* Featured Properties */}
      <section className="py-20 bg-background">
        <div className="container mx-auto px-4">
          <div className="text-center mb-12">
            <h2 className="text-4xl font-bold mb-4 tracking-tight">
              Featured <span className="text-gradient-gold">Properties</span>
            </h2>
            <p className="text-muted-foreground text-lg max-w-2xl mx-auto leading-relaxed font-medium">
              Discover our handpicked selection of exceptional investment opportunities
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-8">
            {loading ? (
              <div className="col-span-3 text-center py-12 text-muted-foreground font-medium">
                Loading featured properties...
              </div>
            ) : featuredProperties.length === 0 ? (
              <div className="col-span-3 text-center py-12 text-muted-foreground font-medium">
                No featured properties available yet.
              </div>
            ) : (
              featuredProperties.map((property) => (
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
    listing_currency={property.listing_currency || 'USD'} // ✅ CORRECT - Individual property currency
    isAuthenticated={isAuthenticated}
    propertyType={property.property_type || 'sale'}
    rentalPeriod={property.rental_period || ''}
    securityDeposit={property.security_deposit || ''}
  />
))
              
            )}
          </div>

          <div className="text-center">
            <Link to="/properties">
              <Button 
                size="lg" 
                variant="outline" 
                className="border-primary text-primary bg-transparent hover:bg-primary hover:text-white transition-all duration-300 font-semibold"
              >
                View All Properties
                <ArrowRight className="ml-2" size={20} />
              </Button>
            </Link>
          </div>
        </div>
      </section>

      {/* Membership Tiers */}
      <section className="py-20 bg-gray-100 text-white">
        <div className="container mx-auto px-6">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold mb-4 tracking-tight">
              <span className="text-black">Exclusive</span>{" "}
              <span className="text-yellow-500"> Membership Tiers</span>
            </h2>
            <p className="text-muted-foreground text-lg max-w-2xl mx-auto leading-relaxed font-medium">
              Join our community of elite investors and unlock premium benefits
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-10 max-w-7xl mx-auto">
            {/* Gold Tier */}
            <div className="bg-secondary border-2 border-gray-800 hover:border-primary transition-all duration-300 hover:-translate-y-2 shadow-xl group relative overflow-hidden p-10 flex flex-col h-full">
              <div className="absolute top-0 right-0 w-32 h-32 bg-primary/10 -translate-y-14 translate-x-14 group-hover:scale-110 transition-transform duration-300"></div>
              <div className="relative z-10 flex-1">
                <div className="inline-flex items-center justify-center w-16 h-16 mb-6 bg-primary/20 group-hover:bg-primary/30 transition-colors">
                  <Trophy size={28} className="text-primary" />
                </div>
                <h3 className="text-2xl font-bold mb-3 tracking-tight text-white">Gold</h3>
                <div className="flex items-baseline mb-2">
                  <span className="text-3xl font-bold text-primary tracking-tight">
                    {formatMembershipPrice(500)}
                  </span>
                  <span className="text-gray-400 ml-2 font-medium">/6 months</span>
                </div>
                <div className="text-sm text-gray-400 mb-6 font-medium">
                  Investment Range: {getCurrencySymbol()}100K - {getCurrencySymbol()}500K
                </div>
                <ul className="space-y-4 mb-8">
                  <li className="flex items-start">
                    <Check size={18} className="text-primary mr-3 mt-0.5" />
                    <span className="text-gray-300 font-medium">Access to premium property listings</span>
                  </li>
                  <li className="flex items-start">
                    <Check size={18} className="text-primary mr-3 mt-0.5" />
                    <span className="text-gray-300 font-medium">Monthly market insights & reports</span>
                  </li>
                  <li className="flex items-start">
                    <Check size={18} className="text-primary mr-3 mt-0.5" />
                    <span className="text-gray-300 font-medium">Priority email support</span>
                  </li>
                  <li className="flex items-start">
                    <Check size={18} className="text-primary mr-3 mt-0.5" />
                    <span className="text-gray-300 font-medium">Basic investment consultation</span>
                  </li>
                </ul>
              </div>
               <Link to="/member-auth">
              <Button className="w-full border border-primary text-primary bg-transparent hover:bg-primary hover:text-white font-semibold py-3 transition-all duration-300 mt-auto">
                Join Gold
              </Button>
              </Link>
            </div>

            {/* Silver Tier - Featured */}
            <div className="bg-secondary border-2 border-primary shadow-2xl transform md:scale-105 transition-all duration-300 p-10 relative group overflow-hidden flex flex-col h-full">
              <div className="absolute top-4 right-4 bg-primary text-white px-3 py-1 text-sm font-semibold flex items-center rounded-none">
                <Zap size={14} className="mr-1" /> Most Popular
              </div>
              <div className="absolute top-0 right-0 w-32 h-32 bg-primary/15 -translate-y-14 translate-x-14 group-hover:scale-110 transition-transform duration-300"></div>
              <div className="relative z-10 flex-1">
                <div className="inline-flex items-center justify-center w-16 h-16 mb-6 bg-primary/30 group-hover:bg-primary/40 transition-colors">
                  <Award size={28} className="text-primary" />
                </div>
                <h3 className="text-2xl font-bold mb-3 tracking-tight text-white">Silver</h3>
                <div className="flex items-baseline mb-2">
                  <span className="text-3xl font-bold text-primary tracking-tight">
                    {formatMembershipPrice(1000)}
                  </span>
                  <span className="text-gray-400 ml-2 font-medium">/6 months</span>
                </div>
                <div className="text-sm text-gray-400 mb-6 font-medium">
                  Investment Range: {getCurrencySymbol()}500K - {getCurrencySymbol()}1M
                </div>
                <ul className="space-y-4 mb-8">
                  <li className="flex items-start">
                    <Check size={18} className="text-primary mr-3 mt-0.5" />
                    <span className="text-gray-300 font-medium">All Gold benefits</span>
                  </li>
                  <li className="flex items-start">
                    <Check size={18} className="text-primary mr-3 mt-0.5" />
                    <span className="text-gray-300 font-medium">Exclusive off-market properties</span>
                  </li>
                  <li className="flex items-start">
                    <Check size={18} className="text-primary mr-3 mt-0.5" />
                    <span className="text-gray-300 font-medium">Personal investment advisor</span>
                  </li>
                  <li className="flex items-start">
                    <Check size={18} className="text-primary mr-3 mt-0.5" />
                    <span className="text-gray-300 font-medium">Priority phone & email support</span>
                  </li>
                  <li className="flex items-start">
                    <Check size={18} className="text-primary mr-3 mt-0.5" />
                    <span className="text-gray-300 font-medium">Custom portfolio analysis</span>
                  </li>
                </ul>
              </div>
              <Link to="/member-auth">
              <Button className="w-full border border-primary text-primary bg-transparent hover:bg-primary hover:text-white font-semibold py-3 transition-all duration-300 mt-auto">
                Join Silver
              </Button>
              </Link>
            </div>

            {/* Platinum Tier */}
            <div className="bg-secondary border-2 border-gray-800 hover:border-primary transition-all duration-300 hover:-translate-y-2 shadow-xl group relative overflow-hidden p-10 flex flex-col h-full">
              <div className="absolute top-0 right-0 w-32 h-32 bg-primary/10 -translate-y-14 translate-x-14 group-hover:scale-110 transition-transform duration-300"></div>
              <div className="relative z-10 flex-1">
                <div className="inline-flex items-center justify-center w-16 h-16 mb-6 bg-primary/20 group-hover:bg-primary/30 transition-colors">
                  <Crown size={28} className="text-primary" />
                </div>
                <h3 className="text-2xl font-bold mb-3 tracking-tight text-white">Platinum</h3>
                <div className="flex items-baseline mb-2">
                  <span className="text-3xl font-bold text-primary tracking-tight">
                    {formatMembershipPrice(2000)}
                  </span>
                  <span className="text-gray-400 ml-2 font-medium">/6 months</span>
                </div>
                <div className="text-sm text-gray-400 mb-6 font-medium">
                  Investment Range: {getCurrencySymbol()}1M - {getCurrencySymbol()}1B
                </div>
                <ul className="space-y-4 mb-8">
                  <li className="flex items-start">
                    <Check size={18} className="text-primary mr-3 mt-0.5" />
                    <span className="text-gray-300 font-medium">All Silver benefits</span>
                  </li>
                  <li className="flex items-start">
                    <Check size={18} className="text-primary mr-3 mt-0.5" />
                    <span className="text-gray-300 font-medium">First access to premium developments</span>
                  </li>
                  <li className="flex items-start">
                    <Check size={18} className="text-primary mr-3 mt-0.5" />
                    <span className="text-gray-300 font-medium">Dedicated wealth management team</span>
                  </li>
                  <li className="flex items-start">
                    <Check size={18} className="text-primary mr-3 mt-0.5" />
                    <span className="text-gray-300 font-medium">24/7 executive concierge</span>
                  </li>
                  <li className="flex items-start">
                    <Check size={18} className="text-primary mr-3 mt-0.5" />
                    <span className="text-gray-300 font-medium">Global investment opportunities</span>
                  </li>
                  <li className="flex items-start">
                    <Check size={18} className="text-primary mr-3 mt-0.5" />
                    <span className="text-gray-300 font-medium">Private deal structuring</span>
                  </li>
                </ul>
              </div>
              <Link to="/member-auth">
              <Button className="w-full border border-primary text-primary bg-transparent hover:bg-primary hover:text-white font-semibold py-3 transition-all duration-300 mt-auto">
                Join Platinum
              </Button>
              </Link>
            </div>
          </div>

          {/* Additional Info */}
          <div className="text-center mt-12">
            <p className="text-gray-400 font-medium flex items-center justify-center">
              <Sparkles size={16} className="mr-2 text-primary" />
              All plans include personalized onboarding and dedicated support
            </p>
          </div>
        </div>
      </section>

      <Footer />
    </div>
  );
};

export default Index;