// src/pages/services/RealEstateServices.tsx
import { Building2, Home, Shield, ArrowRight, CheckCircle } from 'lucide-react';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import { Button } from '@/components/ui/button';
import { Link } from 'react-router-dom';
import heroImage from '@/assets/ai-generated-house-design.jpg';

const RealEstateServices = () => {
  const services = [
    {
      icon: Home,
      title: 'Property Listings',
      description: 'Residential, commercial, and luxury properties for sale and rental. Browse our extensive portfolio of premium properties worldwide.',
      features: ['250+ Luxury Properties', 'Global Market Access', 'Expert Acquisition Guidance'],
      image: 'https://images.unsplash.com/photo-1560518883-ce09059eeffa?ixlib=rb-4.0.3&auto=format&fit=crop&w=500&q=80',
      link: '/services/property-listings'
    },
    {
      icon: Building2,
      title: 'Property Management',
      description: 'Comprehensive management of residential and commercial properties including tenant services, maintenance, and rental collection.',
      features: ['Full-Service Management', 'Tenant Relations', 'Maintenance Coordination'],
      image: 'https://images.unsplash.com/photo-1486406146926-c627a92ad1ab?ixlib=rb-4.0.3&auto=format&fit=crop&w=500&q=80',
      link: '/services/property-management'
    },
    {
      icon: Shield,
      title: 'Asset Management',
      description: 'Maximizing property value and returns through strategic oversight of real estate portfolios and investment optimization.',
      features: ['Portfolio Optimization', 'Value Enhancement', 'Strategic Planning'],
      image: 'https://images.unsplash.com/photo-1497366811353-6870744d04b2?ixlib=rb-4.0.3&auto=format&fit=crop&w=500&q=80',
      link: '/member-auth'
    }
  ];

  const stats = [
    { number: '500+', label: 'Properties Managed' },
    { number: '25+', label: 'Countries' },
    { number: '98%', label: 'Client Satisfaction' },
    { number: '15+', label: 'Years Experience' }
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
            Real Estate <span className="text-gradient-gold">Services</span>
          </h1>
          <p className="text-xl md:text-2xl max-w-3xl mx-auto text-white/90">
            Comprehensive property solutions tailored to your investment goals
          </p>
        </div>
      </section>

      {/* Stats Section */}
      <section className="py-16 bg-white">
        <div className="container mx-auto px-6">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
            {stats.map((stat, index) => (
              <div key={index} className="text-center">
                <div className="text-3xl md:text-4xl font-bold text-primary mb-2">{stat.number}</div>
                <div className="text-gray-600 font-medium">{stat.label}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Services Grid */}
      <section className="py-20 bg-gray-50">
        <div className="container mx-auto px-6">
          <div className="text-center mb-16">
            <h2 className="font-heading text-4xl font-bold mb-4 text-gray-900">
              Our Real Estate <span className="text-primary">Solutions</span>
            </h2>
            <p className="text-lg text-gray-600 max-w-2xl mx-auto">
              End-to-end property services designed to maximize your investment returns
            </p>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            {services.map((service, index) => {
              const Icon = service.icon;
              // if this is the Property Listings service, route to /properties
              const target = service.link === '/services/property-listings' ? '/properties' : service.link;
               return (
                 <div
                   key={index}
                   className="group bg-white rounded-2xl border border-gray-200 shadow-lg hover:shadow-2xl hover:-translate-y-2 transition-all duration-300 overflow-hidden"
                 >
                  {/* Image */}
                  <div className="relative h-48 overflow-hidden">
                    <img
                      src={service.image}
                      alt={service.title}
                      className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/20 to-transparent" />
                    <div className="absolute top-4 left-4 inline-flex items-center justify-center w-12 h-12 rounded-xl bg-white/90 backdrop-blur-sm">
                      <Icon className="text-primary" size={24} />
                    </div>
                  </div>

                  {/* Content */}
                  <div className="p-6">
                    <h3 className="font-heading text-xl font-bold text-gray-900 mb-3 group-hover:text-primary transition-colors duration-300">
                      {service.title}
                    </h3>
                    <p className="text-gray-600 mb-6 leading-relaxed">
                      {service.description}
                    </p>
                    
                    {/* Features */}
                    <ul className="space-y-2 mb-6">
                      {service.features.map((feature, featureIndex) => (
                        <li key={featureIndex} className="flex items-center text-sm text-gray-600">
                          <CheckCircle className="text-primary mr-2" size={16} />
                          {feature}
                        </li>
                      ))}
                    </ul>

                    <Link to={target}>
                      <Button className="w-full bg-primary hover:bg-primary/90 text-white">
                        Learn More
                        <ArrowRight className="ml-2" size={16} />
                      </Button>
                    </Link>
                   </div>
                 </div>
               );
             })}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 bg-primary/10">
        <div className="container mx-auto px-6 text-center">
          <h2 className="font-heading text-4xl font-bold mb-6 text-gray-900">
            Ready to Elevate Your <span className="text-primary">Real Estate Portfolio?</span>
          </h2>
          <p className="text-xl text-gray-700 mb-8 max-w-2xl mx-auto">
            Contact our expert team to discuss how our real estate services can help you achieve your investment goals.
          </p>
          <Link to="/contact">
            <Button size="lg" className="bg-primary hover:bg-primary/90 text-white px-8">
              Schedule Consultation
              <ArrowRight className="ml-2" size={16} />
            </Button>
          </Link>
        </div>
      </section>

      <Footer />
    </div>
  );
};

export default RealEstateServices;