import { Building2, LineChart, Shield, Key, Lock, Users } from 'lucide-react';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import { Button } from '@/components/ui/button';
import { Link } from 'react-router-dom';
import heroImage from '@/assets/ai-generated-house-design.jpg';

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
      <section className="relative h-[60vh] flex items-center justify-center overflow-hidden">
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
            Our <span className="text-gradient-gold">Services</span>
          </h1>
          <p className="text-xl md:text-2xl max-w-3xl mx-auto text-white/90">
            Real estate solutions tailored to your investment goals
          </p>
        </div>
      </section>

      {/* Public Services */}
      <section className="py-20 bg-white">
        <div className="container mx-auto px-4">
          <div className="text-center mb-12">
            <h2 className="font-heading text-4xl font-bold mb-4">
              Available to <span className="text-primary">Everyone</span>
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
                  className="bg-white p-8 rounded-2xl border-2 border-gray-100 hover:border-primary/30 hover-lift shadow-lg hover:shadow-xl transition-all duration-300"
                >
                  <div className="inline-flex items-center justify-center w-16 h-16 rounded-2xl bg-primary/10 mb-6 group-hover:bg-primary/20 transition-colors">
                    <Icon className="text-primary" size={32} />
                  </div>
                  <h3 className="font-heading text-2xl font-bold mb-4 text-gray-900">{service.title}</h3>
                  <p className="text-muted-foreground mb-6">{service.description}</p>
                  <Link to="/contact">
                    <Button variant="outline" className="border-primary text-primary hover:bg-primary hover:text-white">
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
      <section className="py-20 bg-gray-50">
        <div className="container mx-auto px-4">
          <div className="text-center mb-12">
            <h2 className="font-heading text-4xl font-bold mb-4">
              <span className="text-primary">Member-Exclusive</span> Services
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
                  className="bg-white p-8 rounded-2xl border-2 border-primary/20 hover:border-primary/50 hover-lift shadow-lg hover:shadow-xl transition-all duration-300 relative overflow-hidden group"
                >
                  <div className="absolute top-4 right-4">
                    <Lock className="text-primary/40" size={24} />
                  </div>
                  <div className="inline-flex items-center justify-center w-16 h-16 rounded-2xl bg-primary/10 mb-6 group-hover:bg-primary/20 transition-colors">
                    <Icon className="text-primary" size={32} />
                  </div>
                  <div className="inline-block px-3 py-1 bg-primary/20 text-primary text-sm font-semibold rounded-full mb-4">
                    {service.tier}
                  </div>
                  <h3 className="font-heading text-2xl font-bold mb-4 text-gray-900">{service.title}</h3>
                  <p className="text-muted-foreground mb-6">{service.description}</p>
                  <Button className="bg-primary hover:bg-primary/90 text-white">
                    Unlock Access
                  </Button>
                </div>
              );
            })}
          </div>

          <div className="text-center mt-12">
            <p className="text-muted-foreground mb-4 text-lg">
              Ready to unlock exclusive benefits?
            </p>
            <Link to="/">
              <Button size="lg" className="bg-primary hover:bg-primary/90 text-white">
                View Membership Plans
              </Button>
            </Link>
          </div>
        </div>
      </section>

      {/* Process Section */}
      <section className="py-20 bg-white">
        <div className="container mx-auto px-4">
          <div className="text-center mb-12">
            <h2 className="font-heading text-4xl font-bold mb-4">
              How We <span className="text-primary">Work</span>
            </h2>
            <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
              Our streamlined process ensures a smooth investment journey
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-4 gap-8 max-w-6xl mx-auto">
            <div className="text-center p-6 rounded-2xl bg-gray-50 hover:bg-primary/5 transition-colors duration-300">
              <div className="inline-flex items-center justify-center w-16 h-16 rounded-2xl bg-primary text-white font-bold text-xl mb-4 shadow-md">
                1
              </div>
              <h3 className="font-heading text-xl font-bold mb-3 text-gray-900">Consultation</h3>
              <p className="text-muted-foreground">
                Initial meeting to understand your investment goals and preferences
              </p>
            </div>

            <div className="text-center p-6 rounded-2xl bg-gray-50 hover:bg-primary/5 transition-colors duration-300">
              <div className="inline-flex items-center justify-center w-16 h-16 rounded-2xl bg-primary text-white font-bold text-xl mb-4 shadow-md">
                2
              </div>
              <h3 className="font-heading text-xl font-bold mb-3 text-gray-900">Property Selection</h3>
              <p className="text-muted-foreground">
                Curated property recommendations based on your criteria
              </p>
            </div>

            <div className="text-center p-6 rounded-2xl bg-gray-50 hover:bg-primary/5 transition-colors duration-300">
              <div className="inline-flex items-center justify-center w-16 h-16 rounded-2xl bg-primary text-white font-bold text-xl mb-4 shadow-md">
                3
              </div>
              <h3 className="font-heading text-xl font-bold mb-3 text-gray-900">Due Diligence</h3>
              <p className="text-muted-foreground">
                Comprehensive analysis and verification of investment opportunities
              </p>
            </div>

            <div className="text-center p-6 rounded-2xl bg-gray-50 hover:bg-primary/5 transition-colors duration-300">
              <div className="inline-flex items-center justify-center w-16 h-16 rounded-2xl bg-primary text-white font-bold text-xl mb-4 shadow-md">
                4
              </div>
              <h3 className="font-heading text-xl font-bold mb-3 text-gray-900">Acquisition</h3>
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