import { Users, Globe, Key, ArrowRight, CheckCircle } from 'lucide-react';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import { Button } from '@/components/ui/button';
import { Link } from 'react-router-dom';
import heroImage from '@/assets/ai-generated-house-design.jpg';
import { Helmet } from 'react-helmet-async';

const BusinessConsulting = () => {
  const services = [
    {
      icon: Users,
      title: 'Consulting Services',
      description: 'Expert guidance in wealth structuring, real estate investment, and cross-border business expansion strategies.',
      features: ['Wealth Structuring', 'Investment Strategy', 'Business Expansion'],
      image: 'https://images.unsplash.com/photo-1552664730-d307ca884978?ixlib=rb-4.0.3&auto=format&fit=crop&w=500&q=80',
      link: '/services/consulting'
    },
    {
      icon: Globe,
      title: 'International Investment Advisory',
      description: 'Comprehensive assistance with investing in foreign markets including legal, financial, and regulatory guidance.',
      features: ['Market Entry Strategy', 'Legal Compliance', 'Regulatory Guidance'],
      image: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?ixlib=rb-4.0.3&auto=format&fit=crop&w=500&q=80',
      link: '/services/international-advisory'
    },
    {
      icon: Key,
      title: 'Visa & Residency Services',
      description: 'Complete support with investor visas, residency permits, and relocation solutions for global mobility.',
      features: ['Investor Visas', 'Residency Permits', 'Relocation Support'],
      image: 'https://images.unsplash.com/photo-1522543558187-768b6df7c25c?ixlib=rb-4.0.3&auto=format&fit=crop&w=500&q=80',
      link: '/services/visa-residency'
    }
  ];

  return (
    <div className="min-h-screen">
         {/* SEO Metadata */}
      <Helmet>
        <title>Business Consulting Services | Nimrod Property Estates</title>
        <meta
          name="description"
          content="Explore Nimrod Property Estates' Business Consulting Services. Expert guidance on wealth structuring, real estate investment, international expansion, and investor visas."
        />
        <meta
          name="keywords"
          content="Business Consulting, Investment Advisory, Wealth Structuring, International Expansion, Real Estate Investment, Nimrod Property Estates"
        />
        <link rel="canonical" href="https://nimrodestates.com/services/business-consulting" />

        {/* Open Graph / Social Sharing */}
        <meta property="og:title" content="Business Consulting Services | Nimrod Property Estates" />
        <meta property="og:description" content="Expert guidance on wealth structuring, international investment, and business growth with Nimrod Property Estates." />
        <meta property="og:image" content="https://nimrodestates.com/assets/ai-generated-house-design.jpg" />
        <meta property="og:url" content="https://nimrodestates.com/services/business-consulting" />
        <meta property="og:type" content="website" />

        <script type="application/ld+json">
          {`
          {
            "@context": "https://schema.org",
            "@type": "Service",
            "serviceType": "Business Consulting",
            "provider": {
              "@type": "Organization",
              "name": "Nimrod Property Estates",
              "url": "https://nimrodestates.com",
              "logo": "https://nimrodestates.com/logo.png"
            },
            "areaServed": "Global",
            "description": "Expert guidance in wealth structuring, real estate investment, international expansion, and visa/residency services.",
            "url": "https://nimrodestates.com/services/business-consulting"
          }
          `}
        </script>
      </Helmet>
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
            Business <span className="text-gradient-gold">Consulting</span>
          </h1>
          <p className="text-xl md:text-2xl max-w-3xl mx-auto text-white/90">
            Expert guidance for business growth and international expansion
          </p>
        </div>
      </section>

      {/* Services Grid */}
      <section className="py-20 bg-gray-50">
        <div className="container mx-auto px-6">
          <div className="text-center mb-16">
            <h2 className="font-heading text-4xl font-bold mb-4 text-gray-900">
              Consulting <span className="text-primary">Solutions</span>
            </h2>
            <p className="text-lg text-gray-600 max-w-2xl mx-auto">
              Strategic advisory services for business growth and international expansion
            </p>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
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
            Ready for Strategic <span className="text-primary">Growth?</span>
          </h2>
          <p className="text-xl text-gray-700 mb-8 max-w-2xl mx-auto">
            Let our consulting experts help you navigate business challenges and unlock new opportunities for expansion.
          </p>
          <Link to="/contact">
            <Button size="lg" className="bg-primary hover:bg-primary/90 text-white px-8">
              Book Consultation
              <ArrowRight className="ml-2" size={16} />
            </Button>
          </Link>
        </div>
      </section>

      <Footer />
    </div>
  );
};

export default BusinessConsulting;