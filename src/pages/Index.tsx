import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { ArrowRight, Shield, TrendingUp, Globe, Star, Trophy, Award, Crown, Check, Zap, Sparkles } from 'lucide-react';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import PropertyCard from '@/components/PropertyCard';
import { Button } from '@/components/ui/button';
import { supabase } from '@/integrations/supabase/client';
import heroImage from '@/assets/hero-luxury-estate.jpg';

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
}

const Index = () => {
  const [featuredProperties, setFeaturedProperties] = useState<Property[]>([]);
  const [loading, setLoading] = useState(true);
  const [isAuthenticated, setIsAuthenticated] = useState(false);

  useEffect(() => {
    const fetchFeaturedProperties = async () => {
      try {
        const { data, error } = await supabase
          .from('properties')
          .select('*')
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

    fetchFeaturedProperties();
    checkAuth();
  }, []);

  return (
    <div className="min-h-screen">
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
              <div className="text-4xl font-bold text-gradient-gold mb-2 tracking-tight">$2.5B+</div>
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
                  currency="USD"
                  exchangeRates={{ USD: 1, ZAR: 18.5, AED: 3.67 }}
                  isAuthenticated={isAuthenticated}
                  // ADDED: Rental property props
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
                  <span className="text-3xl font-bold text-primary tracking-tight">$500</span>
                  <span className="text-gray-400 ml-2 font-medium">/month</span>
                </div>
                <div className="text-sm text-gray-400 mb-6 font-medium">
                  Investment Range: $100K - $500K
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
              <Button className="w-full border border-primary text-primary bg-transparent hover:bg-primary hover:text-white font-semibold py-3 transition-all duration-300 mt-auto">
                Join Gold
              </Button>
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
                  <span className="text-3xl font-bold text-primary tracking-tight">$1,000</span>
                  <span className="text-gray-400 ml-2 font-medium">/month</span>
                </div>
                <div className="text-sm text-gray-400 mb-6 font-medium">
                  Investment Range: $500K - $1M
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
              <Button className="w-full border border-primary text-primary bg-transparent hover:bg-primary hover:text-white font-semibold py-3 transition-all duration-300 mt-auto">
                Join Silver
              </Button>
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
                  <span className="text-3xl font-bold text-primary tracking-tight">$2,000</span>
                  <span className="text-gray-400 ml-2 font-medium">/month</span>
                </div>
                <div className="text-sm text-gray-400 mb-6 font-medium">
                  Investment Range: $1M - $1B
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
              <Button className="w-full border border-primary text-primary bg-transparent hover:bg-primary hover:text-white font-semibold py-3 transition-all duration-300 mt-auto">
                Join Platinum
              </Button>
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