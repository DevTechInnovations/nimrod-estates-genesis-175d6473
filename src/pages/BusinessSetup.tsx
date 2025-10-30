import { Briefcase, FileText, Globe, Settings, ArrowRight, CheckCircle } from 'lucide-react';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import { Button } from '@/components/ui/button';
import { Link } from 'react-router-dom';
import heroImage from '@/assets/ai-generated-house-design.jpg';
import { Helmet } from 'react-helmet-async';

const BusinessSetup = () => {
  const services = [
    {
      icon: Briefcase,
      title: 'Business Registration',
      description: 'Complete company incorporation services in South Africa, Dubai, and Mauritius with expert guidance.',
      features: ['Company Incorporation', 'Legal Documentation', 'Jurisdiction Selection'],
      image: 'https://images.unsplash.com/photo-1553877522-43269d4ea984?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8Nnx8YnVzaW5lc3N8ZW58MHx8MHx8fDA%3D&auto=format&fit=crop&w=500&q=60',
      link: '/services/business-registration'
    },
    {
      icon: FileText,
      title: 'Business Licensing',
      description: 'Assistance with trade licenses, professional licenses, and compliance requirements for your business.',
      features: ['License Acquisition', 'Compliance Support', 'Regulatory Guidance'],
      image: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MTB8fGJ1c2luZXNzfGVufDB8fDB8fHww&auto=format&fit=crop&w=500&q=60',
      link: '/services/business-licensing'
    },
    {
      icon: Globe,
      title: 'Customs Clearance & Licensing',
      description: 'Comprehensive support for import/export activities including customs approvals and documentation.',
      features: ['Customs Documentation', 'Import/Export Support', 'Clearance Processing'],
      image: 'https://images.unsplash.com/photo-1560472354-b33ff0c44a43?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MTJ8fGJ1c2luZXNzfGVufDB8fDB8fHww&auto=format&fit=crop&w=500&q=60',
      link: '/services/customs-clearance'
    },
    {
      icon: Settings,
      title: 'Import & Export Licensing',
      description: 'Facilitating permits and authorizations for global trade and international business operations.',
      features: ['Trade Permits', 'Export Authorizations', 'International Compliance'],
      image: 'https://images.unsplash.com/photo-1552664730-d307ca884978?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MTR8fGJ1c2luZXNzfGVufDB8fDB8fHww&auto=format&fit=crop&w=500&q=60',
      link: '/services/import-export'
    }
  ];

  const setupLocations = [
    { country: 'Dubai, UAE', benefits: ['Free Zone Options', 'Tax Benefits', 'Strategic Location'] },
    { country: 'South Africa', benefits: ['Local Market Access', 'Established Infrastructure', 'Growth Potential'] },
    { country: 'Mauritius', benefits: ['International Business', 'Tax Efficiency', 'Investment Protection'] }
  ];

  return (
    <div className="min-h-screen">
        {/* SEO Metadata */}
    <Helmet>
      {/* Standard SEO */}
      <title>Business Setup Services | Nimrod Estates</title>
      <meta
        name="description"
        content="Complete business setup and compliance solutions in South Africa, Dubai, and Mauritius. Company registration, licensing, customs, and import/export support."
      />
      <meta
        name="keywords"
        content="business setup, company registration, business licensing, import export, Nimrod Estates"
      />
      <meta property="og:title" content="Business Setup Services | Nimrod Estates" />
      <meta property="og:description" content="Complete business setup and compliance solutions in South Africa, Dubai, and Mauritius." />
      <meta property="og:type" content="website" />

      {/* JSON-LD Structured Data */}
      <script type="application/ld+json">
        {JSON.stringify({
          "@context": "https://schema.org",
          "@type": "ProfessionalService",
          "name": "Nimrod Estates",
          "url": "https://nimrodestates.com",
          "logo": "https://nimrodestates.com/NM.png",
          "image": "https://nimrodestates.com/assets",
          "description": "Complete business setup and compliance solutions in South Africa, Dubai, and Mauritius. Company registration, licensing, customs, and import/export support.",
          "areaServed": [
            { "@type": "Country", "name": "South Africa" },
            { "@type": "Country", "name": "United Arab Emirates" },
            { "@type": "Country", "name": "Mauritius" }
          ],
          "serviceType": [
            "Business Registration",
            "Business Licensing",
            "Customs Clearance & Licensing",
            "Import & Export Licensing",
            "Compliance & Legal Advisory"
          ],
          "sameAs": [
            "https://www.facebook.com/Nimrodestates",
            "https://twitter.com/Nimrodestates",
            "https://www.linkedin.com/company/nimrod-property-estates"
          ],
          "contactPoint": [
            {
            "@type": "ContactPoint",
            "telephone": "+971 58 305 1460",
            "contactType": "Customer Service",
            "areaServed": ["Dubai", "Monaco", "South Africa"],
            "availableLanguage": ["English"]
            }
          ]
        })}
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
            Business <span className="text-gradient-gold">Setup</span>
          </h1>
          <p className="text-xl md:text-2xl max-w-3xl mx-auto text-white/90">
            Complete business establishment and compliance solutions
          </p>
        </div>
      </section>

      {/* Services Grid */}
      <section className="py-20 bg-white">
        <div className="container mx-auto px-6">
          <div className="text-center mb-16">
            <h2 className="font-heading text-4xl font-bold mb-4 text-gray-900">
              Setup <span className="text-primary">Services</span>
            </h2>
            <p className="text-lg text-gray-600 max-w-2xl mx-auto">
              Complete business setup solutions for startups and established firms
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
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
                        Get Started
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
            Launch Your Business <span className="text-primary">Globally</span>
          </h2>
          <p className="text-xl text-gray-700 mb-8 max-w-2xl mx-auto">
            Let us handle the complexities of business setup while you focus on building your vision.
          </p>
          <Link to="/contact">
            <Button size="lg" className="bg-primary hover:bg-primary/90 text-white px-8">
              Start Business Setup
              <ArrowRight className="ml-2" size={16} />
            </Button>
          </Link>
        </div>
      </section>

      <Footer />
    </div>
  );
};

export default BusinessSetup;