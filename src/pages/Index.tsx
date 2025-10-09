import { Link } from 'react-router-dom';
import { ArrowRight, Shield, TrendingUp, Globe, Star } from 'lucide-react';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import PropertyCard from '@/components/PropertyCard';
import { Button } from '@/components/ui/button';
import { properties } from '@/data/properties';
import heroImage from '@/assets/hero-luxury-estate.jpg';

const Index = () => {
  const featuredProperties = properties.filter((p) => p.featured).slice(0, 3);

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
          <h1 className="font-heading text-5xl md:text-7xl font-bold mb-6 animate-fade-in">
            Global Investment &<br />
            <span className="text-gradient-gold">Luxury Property</span> Opportunities
          </h1>
          <p className="text-xl md:text-2xl mb-8 max-w-2xl mx-auto animate-fade-in text-white/90">
            Empowering investors with premium real estate opportunities worldwide
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center animate-fade-in">
            <Link to="/properties">
              <Button size="lg" className="bg-primary hover:bg-primary-glow text-white shadow-gold">
                Explore Properties
                <ArrowRight className="ml-2" size={20} />
              </Button>
            </Link>
            <Link to="/contact">
              <Button size="lg" variant="outline" className="border-white text-white hover:bg-white/10">
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
              <div className="text-4xl font-heading font-bold text-gradient-gold mb-2">500+</div>
              <div className="text-muted-foreground">Luxury Properties</div>
            </div>
            <div className="animate-fade-in">
              <div className="text-4xl font-heading font-bold text-gradient-gold mb-2">50+</div>
              <div className="text-muted-foreground">Global Locations</div>
            </div>
            <div className="animate-fade-in">
              <div className="text-4xl font-heading font-bold text-gradient-gold mb-2">$2.5B+</div>
              <div className="text-muted-foreground">Assets Managed</div>
            </div>
            <div className="animate-fade-in">
              <div className="text-4xl font-heading font-bold text-gradient-gold mb-2">98%</div>
              <div className="text-muted-foreground">Client Satisfaction</div>
            </div>
          </div>
        </div>
      </section>

      {/* Featured Properties */}
      <section className="py-20 bg-background">
        <div className="container mx-auto px-4">
          <div className="text-center mb-12">
            <h2 className="font-heading text-4xl font-bold mb-4">
              Featured <span className="text-gradient-gold">Properties</span>
            </h2>
            <p className="text-muted-foreground text-lg max-w-2xl mx-auto">
              Discover our handpicked selection of exceptional investment opportunities
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-8">
            {featuredProperties.map((property) => (
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

          <div className="text-center">
            <Link to="/properties">
              <Button size="lg" variant="outline" className="hover-gold">
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
            <h2 className="font-heading text-4xl font-bold mb-4">
              Exclusive <span className="text-gradient-gold">Membership</span> Tiers
            </h2>
            <p className="text-muted-foreground text-lg max-w-2xl mx-auto">
              Join our community of elite investors and unlock premium benefits
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {/* Gold Tier */}
            <div className="bg-card p-8 rounded-lg border-2 border-border hover-lift">
              <div className="text-primary text-4xl mb-4">🥉</div>
              <h3 className="font-heading text-2xl font-bold mb-2">Gold</h3>
              <p className="text-3xl font-bold text-primary mb-4">$299/mo</p>
              <ul className="space-y-3 mb-6 text-muted-foreground">
                <li className="flex items-start">
                  <Star className="text-primary mr-2 mt-1 flex-shrink-0" size={16} />
                  Access to basic property listings
                </li>
                <li className="flex items-start">
                  <Star className="text-primary mr-2 mt-1 flex-shrink-0" size={16} />
                  Monthly market reports
                </li>
                <li className="flex items-start">
                  <Star className="text-primary mr-2 mt-1 flex-shrink-0" size={16} />
                  Email support
                </li>
              </ul>
              <Button className="w-full bg-primary hover:bg-primary-glow">Join Gold</Button>
            </div>

            {/* Silver Tier */}
            <div className="bg-card p-8 rounded-lg border-2 border-primary hover-lift transform md:scale-105 shadow-gold">
              <div className="text-primary text-4xl mb-4">🥈</div>
              <h3 className="font-heading text-2xl font-bold mb-2">Silver</h3>
              <p className="text-3xl font-bold text-primary mb-4">$599/mo</p>
              <ul className="space-y-3 mb-6 text-muted-foreground">
                <li className="flex items-start">
                  <Star className="text-primary mr-2 mt-1 flex-shrink-0" size={16} />
                  All Gold benefits
                </li>
                <li className="flex items-start">
                  <Star className="text-primary mr-2 mt-1 flex-shrink-0" size={16} />
                  Priority property access
                </li>
                <li className="flex items-start">
                  <Star className="text-primary mr-2 mt-1 flex-shrink-0" size={16} />
                  Investment advisory
                </li>
                <li className="flex items-start">
                  <Star className="text-primary mr-2 mt-1 flex-shrink-0" size={16} />
                  Phone support
                </li>
              </ul>
              <Button className="w-full bg-primary hover:bg-primary-glow">Join Silver</Button>
            </div>

            {/* Platinum Tier */}
            <div className="bg-card p-8 rounded-lg border-2 border-border hover-lift">
              <div className="text-primary text-4xl mb-4">🥇</div>
              <h3 className="font-heading text-2xl font-bold mb-2">Platinum</h3>
              <p className="text-3xl font-bold text-primary mb-4">$1,299/mo</p>
              <ul className="space-y-3 mb-6 text-muted-foreground">
                <li className="flex items-start">
                  <Star className="text-primary mr-2 mt-1 flex-shrink-0" size={16} />
                  All Silver benefits
                </li>
                <li className="flex items-start">
                  <Star className="text-primary mr-2 mt-1 flex-shrink-0" size={16} />
                  Exclusive off-market deals
                </li>
                <li className="flex items-start">
                  <Star className="text-primary mr-2 mt-1 flex-shrink-0" size={16} />
                  Personal wealth advisor
                </li>
                <li className="flex items-start">
                  <Star className="text-primary mr-2 mt-1 flex-shrink-0" size={16} />
                  24/7 concierge service
                </li>
              </ul>
              <Button className="w-full bg-primary hover:bg-primary-glow">Join Platinum</Button>
            </div>
          </div>
        </div>
      </section>

      {/* Why Choose Us */}
      <section className="py-20 bg-background">
        <div className="container mx-auto px-4">
          <div className="text-center mb-12">
            <h2 className="font-heading text-4xl font-bold mb-4">
              Why Choose <span className="text-gradient-gold">Nimrod Estates</span>
            </h2>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="text-center p-6 hover-lift">
              <div className="inline-block p-4 bg-primary/10 rounded-full mb-4">
                <Globe className="text-primary" size={40} />
              </div>
              <h3 className="font-heading text-xl font-bold mb-3">Global Reach</h3>
              <p className="text-muted-foreground">
                Access exclusive properties in over 50 countries worldwide
              </p>
            </div>

            <div className="text-center p-6 hover-lift">
              <div className="inline-block p-4 bg-primary/10 rounded-full mb-4">
                <Shield className="text-primary" size={40} />
              </div>
              <h3 className="font-heading text-xl font-bold mb-3">Trusted Service</h3>
              <p className="text-muted-foreground">
                20+ years of excellence in luxury real estate investment
              </p>
            </div>

            <div className="text-center p-6 hover-lift">
              <div className="inline-block p-4 bg-primary/10 rounded-full mb-4">
                <TrendingUp className="text-primary" size={40} />
              </div>
              <h3 className="font-heading text-xl font-bold mb-3">High Returns</h3>
              <p className="text-muted-foreground">
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
            <h2 className="font-heading text-4xl font-bold mb-4">
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
              <p className="text-muted-foreground mb-4">
                "Nimrod Estates helped me diversify my portfolio with premium international properties. The returns have exceeded my expectations!"
              </p>
              <div className="font-semibold">James Morrison</div>
              <div className="text-sm text-muted-foreground">Platinum Member</div>
            </div>

            <div className="bg-card p-6 rounded-lg">
              <div className="flex items-center mb-4">
                {[...Array(5)].map((_, i) => (
                  <Star key={i} className="text-primary fill-primary" size={20} />
                ))}
              </div>
              <p className="text-muted-foreground mb-4">
                "Professional service, exclusive access to off-market deals, and exceptional support throughout the entire investment process."
              </p>
              <div className="font-semibold">Sarah Chen</div>
              <div className="text-sm text-muted-foreground">Silver Member</div>
            </div>

            <div className="bg-card p-6 rounded-lg">
              <div className="flex items-center mb-4">
                {[...Array(5)].map((_, i) => (
                  <Star key={i} className="text-primary fill-primary" size={20} />
                ))}
              </div>
              <p className="text-muted-foreground mb-4">
                "The wealth advisory team at Nimrod Estates is outstanding. They've transformed my approach to real estate investment."
              </p>
              <div className="font-semibold">Michael Rodriguez</div>
              <div className="text-sm text-muted-foreground">Gold Member</div>
            </div>
          </div>
        </div>
      </section>

      <Footer />
    </div>
  );
};

export default Index;
