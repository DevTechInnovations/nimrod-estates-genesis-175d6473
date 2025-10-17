import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { ArrowRight, Shield, TrendingUp, Globe, Star, Trophy, Award, Crown } from 'lucide-react';
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
}

const Index = () => {
  const [featuredProperties, setFeaturedProperties] = useState<Property[]>([]);
  const [loading, setLoading] = useState(true);

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

    fetchFeaturedProperties();
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
                  title={property.title}
                  location={property.location}
                  price={property.price}
                  bedrooms={property.bedrooms}
                  bathrooms={property.bathrooms}
                  area={property.area}
                  roi={property.roi}
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
      <section className="py-20 bg-muted">
        <div className="container mx-auto px-4">
          <div className="text-center mb-12">
            <h2 className="text-4xl font-bold mb-4 tracking-tight">
              Exclusive <span className="text-gradient-gold">Membership</span> Tiers
            </h2>
            <p className="text-muted-foreground text-lg max-w-2xl mx-auto leading-relaxed font-medium">
              Join our community of elite investors and unlock premium benefits
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {/* Gold Tier */}
            <div className="bg-card p-8 rounded-lg border-2 border-border hover-lift">
              <div className="inline-flex items-center justify-center w-16 h-16 mb-4 rounded-full bg-gradient-to-br from-amber-50 to-amber-100 shadow-sm">
                <Trophy size={32} className="text-amber-500" />
              </div>
              <h3 className="text-2xl font-bold mb-2 tracking-tight">Gold</h3>
              <p className="text-3xl font-bold text-primary mb-4 tracking-tight">$299/mo</p>
              <ul className="space-y-3 mb-6 text-muted-foreground">
                <li className="flex items-start font-medium">
                  <Star className="text-primary mr-2 mt-1 flex-shrink-0" size={16} />
                  Access to basic property listings
                </li>
                <li className="flex items-start font-medium">
                  <Star className="text-primary mr-2 mt-1 flex-shrink-0" size={16} />
                  Monthly market reports
                </li>
                <li className="flex items-start font-medium">
                  <Star className="text-primary mr-2 mt-1 flex-shrink-0" size={16} />
                  Email support
                </li>
              </ul>
              <Button className="w-full bg-primary hover:bg-primary-glow font-semibold tracking-wide">Join Gold</Button>
            </div>

            {/* Silver Tier */}
            <div className="bg-card p-8 rounded-lg border-2 border-primary hover-lift transform md:scale-105 shadow-gold">
              <div className="inline-flex items-center justify-center w-16 h-16 mb-4 rounded-full bg-gradient-to-br from-slate-50 to-slate-100 shadow-sm">
                <Award size={32} className="text-slate-400" />
              </div>
              <h3 className="text-2xl font-bold mb-2 tracking-tight">Silver</h3>
              <p className="text-3xl font-bold text-primary mb-4 tracking-tight">$599/mo</p>
              <ul className="space-y-3 mb-6 text-muted-foreground">
                <li className="flex items-start font-medium">
                  <Star className="text-primary mr-2 mt-1 flex-shrink-0" size={16} />
                  All Gold benefits
                </li>
                <li className="flex items-start font-medium">
                  <Star className="text-primary mr-2 mt-1 flex-shrink-0" size={16} />
                  Priority property access
                </li>
                <li className="flex items-start font-medium">
                  <Star className="text-primary mr-2 mt-1 flex-shrink-0" size={16} />
                  Investment advisory
                </li>
                <li className="flex items-start font-medium">
                  <Star className="text-primary mr-2 mt-1 flex-shrink-0" size={16} />
                  Phone support
                </li>
              </ul>
              <Button className="w-full bg-primary hover:bg-primary-glow font-semibold tracking-wide">Join Silver</Button>
            </div>

            {/* Platinum Tier */}
            <div className="bg-card p-8 rounded-lg border-2 border-border hover-lift">
              <div className="inline-flex items-center justify-center w-16 h-16 mb-4 rounded-full bg-gradient-to-br from-indigo-50 to-indigo-100 shadow-sm">
                <Crown size={32} className="text-indigo-600" />
              </div>
              <h3 className="text-2xl font-bold mb-2 tracking-tight">Platinum</h3>
              <p className="text-3xl font-bold text-primary mb-4 tracking-tight">$1,299/mo</p>
              <ul className="space-y-3 mb-6 text-muted-foreground">
                <li className="flex items-start font-medium">
                  <Star className="text-primary mr-2 mt-1 flex-shrink-0" size={16} />
                  All Silver benefits
                </li>
                <li className="flex items-start font-medium">
                  <Star className="text-primary mr-2 mt-1 flex-shrink-0" size={16} />
                  Exclusive off-market deals
                </li>
                <li className="flex items-start font-medium">
                  <Star className="text-primary mr-2 mt-1 flex-shrink-0" size={16} />
                  Personal wealth advisor
                </li>
                <li className="flex items-start font-medium">
                  <Star className="text-primary mr-2 mt-1 flex-shrink-0" size={16} />
                  24/7 concierge service
                </li>
              </ul>
              <Button className="w-full bg-primary hover:bg-primary-glow font-semibold tracking-wide">Join Platinum</Button>
            </div>
          </div>
        </div>
      </section>

      {/* Why Choose Us */}
      <section className="py-20 bg-background">
        <div className="container mx-auto px-4">
          <div className="text-center mb-12">
            <h2 className="text-4xl font-bold mb-4 tracking-tight">
              Why Choose <span className="text-gradient-gold">Nimrod Estates</span>
            </h2>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="text-center p-6 hover-lift">
              <div className="inline-block p-4 bg-primary/10 rounded-full mb-4">
                <Globe className="text-primary" size={40} />
              </div>
              <h3 className="text-xl font-bold mb-3 tracking-tight">Global Reach</h3>
              <p className="text-muted-foreground leading-relaxed font-medium">
                Access exclusive properties in over 50 countries worldwide
              </p>
            </div>

            <div className="text-center p-6 hover-lift">
              <div className="inline-block p-4 bg-primary/10 rounded-full mb-4">
                <Shield className="text-primary" size={40} />
              </div>
              <h3 className="text-xl font-bold mb-3 tracking-tight">Trusted Service</h3>
              <p className="text-muted-foreground leading-relaxed font-medium">
                20+ years of excellence in luxury real estate investment
              </p>
            </div>

            <div className="text-center p-6 hover-lift">
              <div className="inline-block p-4 bg-primary/10 rounded-full mb-4">
                <TrendingUp className="text-primary" size={40} />
              </div>
              <h3 className="text-xl font-bold mb-3 tracking-tight">High Returns</h3>
              <p className="text-muted-foreground leading-relaxed font-medium">
                Average ROI of 12% with carefully curated investment opportunities
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Testimonials */}
      <section className="py-20 bg-secondary text-secondary-foreground">
        <div className="container mx-auto px-4">
          <div className="text-center mb-12">
            <h2 className="text-4xl font-bold mb-4 tracking-tight">
              Client <span className="text-gradient-gold">Success Stories</span>
            </h2>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="bg-card p-6 rounded-lg">
              <div className="flex items-center mb-4">
                {[...Array(5)].map((_, i) => (
                  <Star key={i} className="text-primary fill-primary" size={20} />
                ))}
              </div>
              <p className="text-muted-foreground mb-4 leading-relaxed font-medium">
                "Nimrod Estates helped me diversify my portfolio with premium international properties. The returns have exceeded my expectations!"
              </p>
              <div className="font-semibold tracking-wide">James Morrison</div>
              <div className="text-sm text-muted-foreground font-medium">Platinum Member</div>
            </div>

            <div className="bg-card p-6 rounded-lg">
              <div className="flex items-center mb-4">
                {[...Array(5)].map((_, i) => (
                  <Star key={i} className="text-primary fill-primary" size={20} />
                ))}
              </div>
              <p className="text-muted-foreground mb-4 leading-relaxed font-medium">
                "Professional service, exclusive access to off-market deals, and exceptional support throughout the entire investment process."
              </p>
              <div className="font-semibold tracking-wide">Sarah Chen</div>
              <div className="text-sm text-muted-foreground font-medium">Silver Member</div>
            </div>

            <div className="bg-card p-6 rounded-lg">
              <div className="flex items-center mb-4">
                {[...Array(5)].map((_, i) => (
                  <Star key={i} className="text-primary fill-primary" size={20} />
                ))}
              </div>
              <p className="text-muted-foreground mb-4 leading-relaxed font-medium">
                "The wealth advisory team at Nimrod Estates is outstanding. They've transformed my approach to real estate investment."
              </p>
              <div className="font-semibold tracking-wide">Michael Rodriguez</div>
              <div className="text-sm text-muted-foreground font-medium">Gold Member</div>
            </div>
          </div>
        </div>
      </section>

      <Footer />
    </div>
  );
};

export default Index;