// src/pages/services/WealthInvestment.tsx
import { LineChart, TrendingUp, PieChart, ArrowRight, CheckCircle } from 'lucide-react';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import { Button } from '@/components/ui/button';
import { Link } from 'react-router-dom';
import heroImage from '@/assets/ai-generated-house-design.jpg';

const WealthInvestment = () => {
  const services = [
    {
      icon: PieChart,
      title: 'Equity Management',
      description: 'Advisory and structuring for equity investments in property and businesses. Strategic guidance for optimal equity positioning.',
      features: ['Investment Structuring', 'Portfolio Diversification', 'Risk Management'],
      image: 'https://images.unsplash.com/photo-1611974789855-9c2a0a7236a3?ixlib=rb-4.0.3&auto=format&fit=crop&w=500&q=80',
      link: '/services/equity-management'
    },
    {
      icon: TrendingUp,
      title: 'Investment Management & Planning',
      description: 'Tailored investment strategies in real estate, assets, and international markets to grow and protect your wealth.',
      features: ['Custom Investment Plans', 'Market Analysis', 'Wealth Preservation'],
      image: 'https://images.unsplash.com/photo-1460925895917-afdab827c52f?ixlib=rb-4.0.3&auto=format&fit=crop&w=500&q=80',
      link: '/services/investment-management'
    }
  ];

  const investmentAreas = [
    'Real Estate Portfolios',
    'International Markets',
    'Private Equity',
    'Asset Diversification',
    'Wealth Preservation',
    'Tax Optimization'
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
            Wealth & <span className="text-gradient-gold">Investment</span>
          </h1>
          <p className="text-xl md:text-2xl max-w-3xl mx-auto text-white/90">
            Strategic investment planning and wealth management solutions
          </p>
        </div>
      </section>

      {/* Services Grid */}
      <section className="py-20 bg-white">
        <div className="container mx-auto px-6">
          <div className="text-center mb-16">
            <h2 className="font-heading text-4xl font-bold mb-4 text-gray-900">
              Investment <span className="text-primary">Management</span>
            </h2>
            <p className="text-lg text-gray-600 max-w-2xl mx-auto">
              Comprehensive wealth management solutions for sophisticated investors
            </p>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 max-w-6xl mx-auto">
            {services.map((service, index) => {
              const Icon = service.icon;
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

                    <Link to={service.link}>
                      <Button className="w-full bg-primary hover:bg-primary/90 text-white">
                        Explore Service
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
            Start Building Your <span className="text-primary">Wealth Legacy</span>
          </h2>
          <p className="text-xl text-gray-700 mb-8 max-w-2xl mx-auto">
            Let our investment experts help you create a personalized wealth management strategy for long-term success.
          </p>
          <Link to="/contact">
            <Button size="lg" className="bg-primary hover:bg-primary/90 text-white px-8">
              Schedule Wealth Review
              <ArrowRight className="ml-2" size={16} />
            </Button>
          </Link>
        </div>
      </section>

      <Footer />
    </div>
  );
};

export default WealthInvestment;