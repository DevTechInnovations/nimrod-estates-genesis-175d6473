import { useState } from 'react';
import { Search } from 'lucide-react';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import PropertyCard from '@/components/PropertyCard';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { properties } from '@/data/properties';

const Properties = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [typeFilter, setTypeFilter] = useState('All');
  const [priceFilter, setPriceFilter] = useState('All');

  const propertyTypes = ['All', 'Villa', 'Penthouse', 'Apartment', 'Townhouse', 'Chalet'];
  const priceRanges = ['All', 'Under $5M', '$5M - $10M', '$10M - $15M', 'Over $15M'];

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
      <section className="pt-32 pb-12 bg-gradient-to-b from-background to-muted">
        <div className="container mx-auto px-4 text-center">
          <h1 className="font-heading text-5xl md:text-6xl font-bold mb-6">
            Luxury <span className="text-gradient-gold">Property</span> Listings
          </h1>
          <p className="text-xl text-muted-foreground max-w-3xl mx-auto">
            Discover exceptional investment opportunities around the world
          </p>
        </div>
      </section>

      {/* Search and Filters */}
      <section className="py-8 bg-muted sticky top-20 z-40 shadow-md">
        <div className="container mx-auto px-4">
          <div className="flex flex-col md:flex-row gap-4">
            {/* Search */}
            <div className="flex-1 relative">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground" size={20} />
              <Input
                type="text"
                placeholder="Search by location or property name..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="pl-10"
              />
            </div>

            {/* Type Filter */}
            <div className="flex gap-2 overflow-x-auto">
              {propertyTypes.map((type) => (
                <Button
                  key={type}
                  variant={typeFilter === type ? 'default' : 'outline'}
                  onClick={() => setTypeFilter(type)}
                  className={typeFilter === type ? 'bg-primary hover:bg-primary-glow' : 'hover-gold'}
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
      <section className="py-12 bg-background">
        <div className="container mx-auto px-4">
          {filteredProperties.length > 0 ? (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              {filteredProperties.map((property) => (
                <PropertyCard
                  key={property.id}
                  id={property.id}
                  image={property.images[0]}
                  title={property.title}
                  location={property.location}
                  price={property.price}
                  bedrooms={property.bedrooms}
                  bathrooms={property.bathrooms}
                  area={property.area}
                  roi={property.roi}
                />
              ))}
            </div>
          ) : (
            <div className="text-center py-20">
              <p className="text-xl text-muted-foreground">No properties found matching your criteria.</p>
              <Button
                onClick={() => {
                  setSearchTerm('');
                  setTypeFilter('All');
                  setPriceFilter('All');
                }}
                className="mt-4 bg-primary hover:bg-primary-glow"
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
