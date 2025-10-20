import { Building2, LineChart, Shield, Key, Lock, Users, ArrowRight, CheckCircle } from 'lucide-react';
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
      <section className="py-20 bg-gray-50">
        <div className="container mx-auto px-6">
          <div className="text-center mb-16">
            <h2 className="font-heading text-4xl font-extrabold mb-4 tracking-tight">
              Available to <span className="text-primary">Everyone</span>
            </h2>
            <p className="text-lg text-muted-foreground max-w-2xl mx-auto leading-relaxed font-medium">
              Access these premium services — no membership required
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-10">
            {publicServices.map((service, index) => {
              const Icon = service.icon;
              const serviceImages = [
                "https://images.unsplash.com/photo-1560518883-ce09059eeffa?ixlib=rb-4.0.3&auto=format&fit=crop&w=500&q=80",
                "https://images.unsplash.com/photo-1486406146926-c627a92ad1ab?ixlib=rb-4.0.3&auto=format&fit=crop&w=500&q=80",
                "https://images.unsplash.com/photo-1497366811353-6870744d04b2?ixlib=rb-4.0.3&auto=format&fit=crop&w=500&q=80"
              ];
              
              return (
                <div
                  key={index}
                  className="group relative bg-white rounded-2xl border border-gray-200 shadow-md hover:shadow-2xl hover:-translate-y-2 transition-all duration-300 overflow-hidden flex flex-col h-full"
                >
                  {/* Image Section */}
                  <div className="relative h-48 overflow-hidden flex-shrink-0">
                    <img
                      src={serviceImages[index]}
                      alt={service.title}
                      className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/20 to-transparent"></div>
                    
                    {/* Icon Overlay */}
                    <div className="absolute top-4 left-4 inline-flex items-center justify-center w-12 h-12 rounded-xl bg-white/90 backdrop-blur-sm">
                      <Icon className="text-primary" size={24} />
                    </div>
                  </div>

                  {/* Content Section */}
                  <div className="p-8 flex flex-col flex-grow">
                    {/* Title */}
                    <h3 className="font-heading text-2xl font-bold mb-3 text-gray-900 group-hover:text-primary transition-colors duration-300">
                      {service.title}
                    </h3>

                    {/* Description */}
                    <p className="text-muted-foreground mb-8 leading-relaxed flex-grow">
                      {service.description}
                    </p>

                    {/* Button - Always at bottom */}
                    <div className="mt-auto">
                      <Link to="/contact">
                        <Button
                          variant="outline"
                          size="lg"
                          className="border-primary text-primary bg-transparent hover:bg-primary hover:text-white w-full transition-all duration-300"
                        >
                          Learn More
                        </Button>
                      </Link>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* Member-Only Services */}
      <section className="py-20 bg-gray-50">
        <div className="container mx-auto px-6">
          <div className="text-center mb-16">
            <h2 className="font-heading text-4xl font-extrabold mb-4 tracking-tight">
              <span className="text-primary">Member-Exclusive</span> Services
            </h2>
            <p className="text-lg text-muted-foreground max-w-2xl mx-auto leading-relaxed font-medium">
              Premium services available only to our valued members
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-10">
            {memberServices.map((service, index) => {
              const Icon = service.icon;
              const serviceImages = [
                "https://images.unsplash.com/photo-1560518883-ce09059eeffa?ixlib=rb-4.0.3&auto=format&fit=crop&w=500&q=80",
                "https://images.unsplash.com/photo-1486406146926-c627a92ad1ab?ixlib=rb-4.0.3&auto=format&fit=crop&w=500&q=80",
                "https://images.unsplash.com/photo-1497366811353-6870744d04b2?ixlib=rb-4.0.3&auto=format&fit=crop&w=500&q=80"
              ];
              
              return (
                <div
                  key={index}
                  className="group relative bg-white rounded-2xl border-2 border-primary/20 hover:border-primary/50 shadow-md hover:shadow-2xl hover:-translate-y-2 transition-all duration-300 overflow-hidden flex flex-col h-full"
                >
                  {/* Image Section */}
                  <div className="relative h-48 overflow-hidden flex-shrink-0">
                    <img
                      src={serviceImages[index]}
                      alt={service.title}
                      className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/20 to-transparent"></div>
                    
                    {/* Icon Overlay */}
                    <div className="absolute top-4 left-4 inline-flex items-center justify-center w-12 h-12 rounded-xl bg-white/90 backdrop-blur-sm">
                      <Icon className="text-primary" size={24} />
                    </div>

                    {/* Lock Icon */}
                    <div className="absolute top-4 right-4 inline-flex items-center justify-center w-10 h-10 rounded-xl bg-primary/20 backdrop-blur-sm">
                      <Lock className="text-primary" size={20} />
                    </div>
                  </div>

                  {/* Content Section */}
                  <div className="p-8 flex flex-col flex-grow">
                    {/* Tier Badge */}
                    <div className="inline-block px-3 py-1 bg-primary/20 text-primary text-sm font-semibold rounded-full mb-4">
                      {service.tier}
                    </div>

                    {/* Title */}
                    <h3 className="font-heading text-2xl font-bold mb-3 text-gray-900 group-hover:text-primary transition-colors duration-300">
                      {service.title}
                    </h3>

                    {/* Description */}
                    <p className="text-muted-foreground mb-8 leading-relaxed flex-grow">
                      {service.description}
                    </p>

                    {/* Button - Always at bottom */}
                    <div className="mt-auto">
                      <Button className="border border-primary text-primary bg-transparent hover:bg-primary hover:text-white w-full transition-all duration-300 font-semibold py-3">
                        Unlock Access
                        <Key className="ml-2" size={16} />
                      </Button>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>

          {/* CTA Section */}
          <div className="text-center mt-16">
            <p className="text-muted-foreground mb-6 text-lg">
              Ready to unlock exclusive benefits?
            </p>
            <Link to="/">
              <Button size="lg" className="bg-primary hover:bg-primary/90 text-white px-8">
                View Membership Plans
                <ArrowRight className="ml-2" size={16} />
              </Button>
            </Link>
          </div>
        </div>
      </section>

      {/* Process Section */}
      <section className="py-20 bg-white">
        <div className="container mx-auto px-6">
          <div className="text-center mb-16">
            <h2 className="font-heading text-4xl font-extrabold mb-4 tracking-tight">
              Our <span className="text-primary">Seamless</span> Process
            </h2>
            <p className="text-lg text-muted-foreground max-w-2xl mx-auto leading-relaxed font-medium">
              From vision to acquisition - your guided journey to premium real estate investment
            </p>
          </div>

          <div className="relative">
            {/* Timeline Connector - Updated Colors */}
            <div className="absolute inset-0 bg-gradient-to-r from-transparent via-primary/60 to-transparent"></div>
</div>

<div className="grid grid-cols-1 md:grid-cols-4 gap-8 max-w-7xl mx-auto">
  {[
    {
      number: '01',
      title: 'Consultation',
      description: 'Initial meeting to understand your investment goals and preferences',
      icon: Users,
    },
    {
      number: '02',
      title: 'Property Selection',
      description: 'Curated property recommendations based on your criteria',
      icon: Building2,
    },
    {
      number: '03',
      title: 'Due Diligence',
      description: 'Comprehensive analysis and verification of investment opportunities',
      icon: Shield,
    },
    {
      number: '04',
      title: 'Acquisition',
      description: 'Full support through transaction completion and beyond',
      icon: CheckCircle,
    }
  ].map((step, index) => {
    const Icon = step.icon;
    return (
      <div
        key={index}
        className="group relative text-center flex flex-col items-center"
      >
        {/* Step Circle - Matching Platinum Style */}
        <div className="relative z-10 inline-flex items-center justify-center w-20 h-20 rounded-full bg-primary/20 text-primary font-bold text-xl mb-6 shadow-lg group-hover:bg-primary/30 group-hover:scale-110 transition-all duration-300">
          <span>{step.number}</span>
        </div>

        {/* Content Card - Rounded edges and no yellow square */}
        <div className="group relative bg-secondary border-2 border-gray-800 hover:border-primary transition-all duration-300 hover:-translate-y-2 shadow-xl overflow-hidden p-6 flex flex-col h-64 w-full rounded-3xl">
          <div className="relative z-10 flex flex-col flex-grow">
            {/* Icon */}
            <div className="inline-flex items-center justify-center w-12 h-12 mb-4 bg-primary/20 group-hover:bg-primary/30 transition-colors mx-auto rounded-xl">
              <Icon className="text-primary" size={24} />
            </div>
            
            {/* Title */}
            <h3 className="font-heading text-xl font-bold mb-3 tracking-tight text-white group-hover:text-primary transition-colors duration-300">
              {step.title}
            </h3>
            
            {/* Description */}
            <p className="text-gray-300 leading-relaxed flex-grow">
              {step.description}
            </p>
          </div>
        </div>
      </div>
    );
  })}
</div>


          {/* Bottom CTA */}
          <div className="text-center mt-16">
            <div className="inline-flex flex-col sm:flex-row items-center gap-8 bg-gray-50 px-8 py-6 rounded-2xl border border-gray-200">
              <div className="text-left">
                <div className="text-gray-900 font-semibold text-lg mb-2">Ready to begin your journey?</div>
                <div className="text-gray-600">Start with a complimentary consultation today</div>
              </div>
              <Link to="/contact">
                <Button size="lg" className="bg-primary hover:bg-primary/90 text-white">
                  Schedule Consultation
                  <ArrowRight className="ml-2" size={16} />
                </Button>
              </Link>
            </div>
          </div>
        </div>
      </section>

      <Footer />
    </div>
  );
};

export default Services;