import { Building2, LineChart, Shield, Key, Lock, Users } from 'lucide-react';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import { Button } from '@/components/ui/button';
import { Link } from 'react-router-dom';

const Services = () => {
  const publicServices = [
    {
      icon: Building2,
      title: 'Property Listings & Sales',
      description: 'Browse our extensive portfolio of luxury properties worldwide. Expert guidance through every step of the acquisition process.',
    },
    {
      icon: Shield,
      title: 'Property Management Consultation',
      description: 'Professional advice on maintaining and optimizing your real estate investments for maximum returns.',
    },
    {
      icon: LineChart,
      title: 'Market Insights & Reports',
      description: 'Comprehensive market analysis, trends, and forecasts to inform your investment decisions.',
    },
  ];

  const memberServices = [
    {
      icon: Key,
      title: 'Exclusive Investment Opportunities',
      description: 'Access to off-market properties and pre-launch developments not available to the public.',
      tier: 'Silver & Platinum',
    },
    {
      icon: Users,
      title: 'Financial & Wealth Advisory',
      description: 'Personalized wealth management and investment strategy consultation from industry experts.',
      tier: 'Platinum',
    },
    {
      icon: Lock,
      title: 'Private Consultations',
      description: 'One-on-one sessions with senior advisors for bespoke investment planning and portfolio optimization.',
      tier: 'Platinum',
    },
  ];

  return (
    <div className="min-h-screen">
      <Navbar />

      {/* Hero Section */}
      <section className="pt-32 pb-20 bg-gradient-to-b from-background to-muted">
        <div className="container mx-auto px-4 text-center">
          <h1 className="font-heading text-5xl md:text-6xl font-bold mb-6">
            Our <span className="text-gradient-gold">Services</span>
          </h1>
          <p className="text-xl text-muted-foreground max-w-3xl mx-auto">
            Comprehensive real estate solutions tailored to your investment goals
          </p>
        </div>
      </section>

      {/* Public Services */}
      <section className="py-20 bg-background">
        <div className="container mx-auto px-4">
          <div className="text-center mb-12">
            <h2 className="font-heading text-4xl font-bold mb-4">
              Available to <span className="text-gradient-gold">Everyone</span>
            </h2>
            <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
              Access these premium services without a membership
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {publicServices.map((service, index) => {
              const Icon = service.icon;
              return (
                <div
                  key={index}
                  className="bg-card p-8 rounded-lg border border-border hover-lift"
                >
                  <div className="inline-block p-4 bg-primary/10 rounded-full mb-6">
                    <Icon className="text-primary" size={40} />
                  </div>
                  <h3 className="font-heading text-2xl font-bold mb-4">{service.title}</h3>
                  <p className="text-muted-foreground mb-6">{service.description}</p>
                  <Link to="/contact">
                    <Button variant="outline" className="hover-gold">
                      Learn More
                    </Button>
                  </Link>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* Member-Only Services */}
      <section className="py-20 bg-muted">
        <div className="container mx-auto px-4">
          <div className="text-center mb-12">
            <h2 className="font-heading text-4xl font-bold mb-4">
              <span className="text-gradient-gold">Member-Exclusive</span> Services
            </h2>
            <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
              Premium services available only to our valued members
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {memberServices.map((service, index) => {
              const Icon = service.icon;
              return (
                <div
                  key={index}
                  className="bg-card p-8 rounded-lg border-2 border-primary/20 hover-lift relative overflow-hidden"
                >
                  <div className="absolute top-4 right-4">
                    <Lock className="text-primary/30" size={24} />
                  </div>
                  <div className="inline-block p-4 bg-primary/10 rounded-full mb-6">
                    <Icon className="text-primary" size={40} />
                  </div>
                  <div className="inline-block px-3 py-1 bg-primary/20 text-primary text-xs font-semibold rounded-full mb-4">
                    {service.tier}
                  </div>
                  <h3 className="font-heading text-2xl font-bold mb-4">{service.title}</h3>
                  <p className="text-muted-foreground mb-6">{service.description}</p>
                  <Button className="bg-primary hover:bg-primary-glow">
                    Unlock Access
                  </Button>
                </div>
              );
            })}
          </div>

          <div className="text-center mt-12">
            <p className="text-muted-foreground mb-4">
              Ready to unlock exclusive benefits?
            </p>
            <Link to="/">
              <Button size="lg" className="bg-primary hover:bg-primary-glow">
                View Membership Plans
              </Button>
            </Link>
          </div>
        </div>
      </section>

      {/* Process Section */}
      <section className="py-20 bg-background">
        <div className="container mx-auto px-4">
          <div className="text-center mb-12">
            <h2 className="font-heading text-4xl font-bold mb-4">
              How We <span className="text-gradient-gold">Work</span>
            </h2>
            <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
              Our streamlined process ensures a smooth investment journey
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
            <div className="text-center">
              <div className="inline-flex items-center justify-center w-16 h-16 rounded-full bg-primary text-primary-foreground font-bold text-xl mb-4">
                1
              </div>
              <h3 className="font-heading text-xl font-bold mb-2">Consultation</h3>
              <p className="text-muted-foreground">
                Initial meeting to understand your investment goals and preferences
              </p>
            </div>

            <div className="text-center">
              <div className="inline-flex items-center justify-center w-16 h-16 rounded-full bg-primary text-primary-foreground font-bold text-xl mb-4">
                2
              </div>
              <h3 className="font-heading text-xl font-bold mb-2">Property Selection</h3>
              <p className="text-muted-foreground">
                Curated property recommendations based on your criteria
              </p>
            </div>

            <div className="text-center">
              <div className="inline-flex items-center justify-center w-16 h-16 rounded-full bg-primary text-primary-foreground font-bold text-xl mb-4">
                3
              </div>
              <h3 className="font-heading text-xl font-bold mb-2">Due Diligence</h3>
              <p className="text-muted-foreground">
                Comprehensive analysis and verification of investment opportunities
              </p>
            </div>

            <div className="text-center">
              <div className="inline-flex items-center justify-center w-16 h-16 rounded-full bg-primary text-primary-foreground font-bold text-xl mb-4">
                4
              </div>
              <h3 className="font-heading text-xl font-bold mb-2">Acquisition</h3>
              <p className="text-muted-foreground">
                Full support through transaction completion and beyond
              </p>
            </div>
          </div>
        </div>
      </section>

      <Footer />
    </div>
  );
};

export default Services;
