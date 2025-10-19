import { useState, useEffect } from 'react';
import { Search, Loader2, DollarSign } from 'lucide-react';
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
  featured: boolean;
  type: string;
  video_url: string | null;
  pdf_url: string | null;
}

const Properties = () => {
  const [properties, setProperties] = useState<Property[]>([]);
  const [loading, setLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState('');
  const [typeFilter, setTypeFilter] = useState('All');
  const [currency, setCurrency] = useState<'USD' | 'ZAR' | 'AED'>('USD');
  const [exchangeRates, setExchangeRates] = useState({ USD: 1, ZAR: 18.5, AED: 3.67 });

  useEffect(() => {
    fetchProperties();
    fetchExchangeRates();
  }, []);

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
      // Keep using default fallback rates
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
    } catch (error) {
      console.error('Error fetching properties:', error);
    } finally {
      setLoading(false);
    }
  };

  const propertyTypes = ['All', ...Array.from(new Set(properties.map(p => p.type)))];

  const filteredProperties = properties.filter((property) => {
    const matchesSearch =
      property.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
      property.location.toLowerCase().includes(searchTerm.toLowerCase());
    
    const matchesType = typeFilter === 'All' || property.type === typeFilter;
    
    return matchesSearch && matchesType;
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
                      : 'border-gray-300 text-gray-700 hover:border-primary hover:text-primary'
                  }`}
                  size="sm"
                >
                  {type}
                </Button>
              ))}
            </div>
          </div>

          <div className="mt-4 text-sm text-muted-foreground">
            Showing {filteredProperties.length} of {properties.length} properties
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
                <Link
                  key={property.id}
                  to={`/properties/${property.id}`}
                  className="block"
                >
                  <PropertyCard
                    id={property.id}
                    image={property.images?.[0]}
                    title={property.title}
                    location={property.location}
                    price={property.price}
                    bedrooms={property.bedrooms}
                    bathrooms={property.bathrooms}
                    area={property.area}
                    roi={property.roi}
                    currency={currency}
                    exchangeRates={exchangeRates}
                  />
                </Link>
              ))}
            </div>
          ) : (
            <div className="text-center py-20 bg-white rounded-2xl shadow-lg">
              <p className="text-xl text-muted-foreground mb-4">No properties found matching your criteria.</p>
              <Button
                onClick={() => {
                  setSearchTerm('');
                  setTypeFilter('All');
                }}
                className="bg-primary hover:bg-primary/90 text-white"
              >
                Clear Filters
              </Button>
            </div>
          )}
        </div>
      </section>

      <Footer />
    </div>
  );
};

export default Properties;