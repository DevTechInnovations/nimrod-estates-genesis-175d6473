// src/pages/services/PropertyDevelopment.tsx
import { Home, Building, Hammer, ArrowRight, CheckCircle, DollarSign, FileText, Shield, ChevronLeft, ChevronRight } from 'lucide-react';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import { Button } from '@/components/ui/button';
import { Link } from 'react-router-dom';
import heroImage from '@/assets/ai-generated-house-design.jpg';
import { useState, useRef } from 'react';

const PropertyDevelopment = () => {
  const services = [
    {
      icon: Home,
      title: 'Residential Development',
      description: 'Complete residential property development from single homes to luxury estates with premium finishes.',
      features: ['Custom Home Design', 'Quality Construction', 'Project Management', 'Premium Finishes'],
      image: 'https://images.unsplash.com/photo-1568605114967-8130f3a36994?ixlib=rb-4.0.3&auto=format&fit=crop&w=500&q=80',
      link: '/services/residential-development'
    },
    {
      icon: Building,
      title: 'Commercial Development',
      description: 'Office buildings, retail spaces, and mixed-use developments designed for maximum ROI and functionality.',
      features: ['Commercial Design', 'Retail Spaces', 'Office Buildings', 'Mixed-Use Developments'],
      image: 'https://images.unsplash.com/photo-1486406146926-c627a92ad1ab?ixlib=rb-4.0.3&auto=format&fit=crop&w=500&q=80',
      link: '/services/commercial-development'
    },
    {
      icon: Hammer,
      title: 'Luxury Estates',
      description: 'Premium luxury estate developments with exclusive amenities and superior architectural design.',
      features: ['Luxury Amenities', 'Exclusive Design', 'High-End Finishes', 'Estate Management'],
      image: 'https://images.unsplash.com/photo-1613977257363-707ba9348227?ixlib=rb-4.0.3&auto=format&fit=crop&w=500&q=80',
      link: '/services/luxury-estates'
    },
    {
      icon: DollarSign,
      title: 'Investment Properties',
      description: 'Strategic property development solutions designed specifically for investment and rental income.',
      features: ['ROI Focused', 'Rental Ready', 'Market Analysis', 'Investment Strategy'],
      image: 'https://images.unsplash.com/photo-1560518883-ce09059eeffa?ixlib=rb-4.0.3&auto=format&fit=crop&w=500&q=80',
      link: '/services/investment-properties'
    }
  ];

  const buildingPackages = [
    {
      range: 'R200,000 - R1 Million',
      type: 'Starter Homes & Renovations',
      description: 'Perfect for first-time homeowners and small-scale renovations',
      features: ['Basic Home Construction', 'Room Additions', 'Kitchen/Bathroom Renovations', 'Garden Cottages']
    },
    {
      range: 'R1 Million - R5 Million',
      type: 'Mid-Range Residential',
      description: 'Quality family homes and small commercial projects',
      features: ['Family Homes', 'Duplexes', 'Small Office Buildings', 'Townhouse Complexes']
    },
    {
      range: 'R5 Million - R20 Million',
      type: 'Luxury Residential',
      description: 'Premium homes with high-end finishes and custom features',
      features: ['Luxury Villas', 'Custom Estates', 'Boutique Complexes', 'Premium Finishes']
    },
    {
      range: 'R20 Million - R1 Billion',
      type: 'Large-Scale Developments',
      description: 'Major commercial and residential estate developments',
      features: ['Shopping Centers', 'Office Parks', 'Large Estates', 'Mixed-Use Developments']
    }
  ];

  const financeOptions = [
    {
      title: 'Flexible Payment Plans',
      description: 'Pay in instalments while your project is being built',
      icon: DollarSign,
      details: 'All applications subject to approval by partnering banks and private finance assessors'
    },
    {
      title: 'Application Requirements',
      description: 'Simple documentation process for quick approval',
      icon: FileText,
      details: 'Employed: 3 months payslips + bank statements | Self-employed: 12 months business statements + registration'
    },
    {
      title: 'Legal & Financial Assessment',
      description: 'Comprehensive verification through our expert team',
      icon: Shield,
      details: 'In-house legal team and approved financial partners ensure transparent process'
    }
  ];

  const partnerBanks = [
    {
      name: 'Standard Bank',
      logo: 'https://tse4.mm.bing.net/th/id/OIP.D10MxAWE8nD5qo4rWGhozQHaD2?cb=12ucfimg=1&rs=1&pid=ImgDetMain&o=7&rm=3'
    },
    {
      name: 'First National Bank',
      logo: 'https://tse1.explicit.bing.net/th/id/OIP.jIbZI5el3KPU4KHBnLW51AAAAA?cb=12ucfimg=1&w=280&h=280&rs=1&pid=ImgDetMain&o=7&rm=3'
    },
    {
      name: 'Absa Bank',
      logo: 'https://companiesmarketcap.com/img/company-logos/256/ABSP.JO.png'
    },
    {
      name: 'OOBA Home Loans',
      logo: 'https://assets-global.website-files.com/61110f294933f9d0faf6d77f/61115eaf6f08a06532dfee32_Transparent.png'
    },
    {
      name: 'FAB',
      logo: 'https://tse4.mm.bing.net/th/id/OIP.V4fz-SNXs9VBVVp_hQ7HEAAAAA?cb=12ucfimg=1&rs=1&pid=ImgDetMain&o=7&rm=3'
    },
    {
      name: 'Emirates NBD',
      logo: 'https://res.cloudinary.com/pricejugaad/image/upload/mymoneysouq_images/about-bank/emirates-nbd.png'
    },
    {
      name: 'Barclays Bank',
      logo: 'https://pluspng.com/img-png/barclays-png-1505px-barclays-logo-1505.png'
    },
  ];

  // Slider functionality
  const sliderRef = useRef<HTMLDivElement>(null);
  const [showLeftArrow, setShowLeftArrow] = useState(false);
  const [showRightArrow, setShowRightArrow] = useState(true);

  const scrollSlider = (direction: 'left' | 'right') => {
    if (sliderRef.current) {
      const scrollAmount = 300;
      const newScrollLeft = sliderRef.current.scrollLeft + (direction === 'right' ? scrollAmount : -scrollAmount);
      
      sliderRef.current.scrollTo({
        left: newScrollLeft,
        behavior: 'smooth'
      });

      // Update arrow visibility after scroll
      setTimeout(() => {
        if (sliderRef.current) {
          const { scrollLeft, scrollWidth, clientWidth } = sliderRef.current;
          setShowLeftArrow(scrollLeft > 0);
          setShowRightArrow(scrollLeft < scrollWidth - clientWidth - 10);
        }
      }, 300);
    }
  };

  const checkScrollPosition = () => {
    if (sliderRef.current) {
      const { scrollLeft, scrollWidth, clientWidth } = sliderRef.current;
      setShowLeftArrow(scrollLeft > 0);
      setShowRightArrow(scrollLeft < scrollWidth - clientWidth - 10);
    }
  };

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
            Property <span className="text-gradient-gold">Development</span>
          </h1>
          <p className="text-xl md:text-2xl max-w-3xl mx-auto text-white/90">
            Complete design and construction solutions
          </p>
        </div>
      </section>

      {/* Introduction Section */}
      <section className="py-16 bg-white">
        <div className="container mx-auto px-6">
          <div className="max-w-4xl mx-auto text-center">
            <h2 className="font-heading text-4xl font-bold mb-6 text-gray-900">
              Your Vision, Our <span className="text-primary">Expertise</span>
            </h2>
            <p className="text-lg text-gray-600 mb-8 leading-relaxed">
              At <strong>Nimrod Estates</strong>, we make your dream of owning or developing a property a reality. 
              Our <strong>Building Package</strong> offers complete design and construction solutions for residential, 
              commercial, and luxury developments — delivering high-quality projects tailored to your vision and budget.
            </p>
          </div>
        </div>
      </section>

      {/* Services Grid */}
      <section className="py-20 bg-gray-50">
        <div className="container mx-auto px-6">
          <div className="text-center mb-16">
            <h2 className="font-heading text-4xl font-bold mb-4 text-gray-900">
              Development <span className="text-primary">Services</span>
            </h2>
            <p className="text-lg text-gray-600 max-w-2xl mx-auto">
              Comprehensive property development solutions for every need and budget
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

      {/* Building Packages Section */}
<section className="py-20 bg-gray-100">
  <div className="container mx-auto px-6">
    <div className="text-center mb-16">
      <h2 className="font-heading text-4xl font-bold mb-4 text-black">
        Building <span className="text-primary">Packages</span>
      </h2>
      <p className="text-muted-foreground text-lg max-w-2xl mx-auto leading-relaxed font-medium">
        Tailored construction solutions for projects of all scales and budgets
      </p>
    </div>

    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
      {/* Starter Package */}
      <div className="bg-secondary border-2 border-gray-800 hover:border-primary transition-all duration-300 hover:-translate-y-2 shadow-xl group relative overflow-hidden p-8 flex flex-col h-full">
        <div className="absolute top-0 right-0 w-32 h-32 bg-primary/10 -translate-y-14 translate-x-14 group-hover:scale-110 transition-transform duration-300"></div>
        <div className="relative z-10 flex-1">
          <div className="inline-flex items-center justify-center w-16 h-16 mb-6 bg-primary/20 group-hover:bg-primary/30 transition-colors">
            <Home size={28} className="text-primary" />
          </div>
          <h3 className="text-2xl font-bold mb-3 tracking-tight text-white">Starter</h3>
          <div className="flex items-baseline mb-2">
            <span className="text-3xl font-bold text-primary tracking-tight">R200K</span>
            <span className="text-gray-400 ml-2 font-medium">- R1M</span>
          </div>
          <div className="text-sm text-gray-400 mb-6 font-medium">
            Starter Homes & Renovations
          </div>
          <ul className="space-y-4 mb-8">
            <li className="flex items-start">
              <CheckCircle size={18} className="text-primary mr-3 mt-0.5" />
              <span className="text-gray-300 font-medium">Basic Home Construction</span>
            </li>
            <li className="flex items-start">
              <CheckCircle size={18} className="text-primary mr-3 mt-0.5" />
              <span className="text-gray-300 font-medium">Room Additions</span>
            </li>
            <li className="flex items-start">
              <CheckCircle size={18} className="text-primary mr-3 mt-0.5" />
              <span className="text-gray-300 font-medium">Kitchen/Bathroom Renovations</span>
            </li>
            <li className="flex items-start">
              <CheckCircle size={18} className="text-primary mr-3 mt-0.5" />
              <span className="text-gray-300 font-medium">Garden Cottages</span>
            </li>
          </ul>
        </div>
        <Button className="w-full border border-primary text-primary bg-transparent hover:bg-primary hover:text-white font-semibold py-3 transition-all duration-300 mt-auto">
          Get Started
        </Button>
      </div>

      {/* Mid-Range Package */}
      <div className="bg-secondary border-2 border-gray-800 hover:border-primary transition-all duration-300 hover:-translate-y-2 shadow-xl group relative overflow-hidden p-8 flex flex-col h-full">
        <div className="absolute top-0 right-0 w-32 h-32 bg-primary/10 -translate-y-14 translate-x-14 group-hover:scale-110 transition-transform duration-300"></div>
        <div className="relative z-10 flex-1">
          <div className="inline-flex items-center justify-center w-16 h-16 mb-6 bg-primary/20 group-hover:bg-primary/30 transition-colors">
            <Building size={28} className="text-primary" />
          </div>
          <h3 className="text-2xl font-bold mb-3 tracking-tight text-white">Mid-Range</h3>
          <div className="flex items-baseline mb-2">
            <span className="text-3xl font-bold text-primary tracking-tight">R1M</span>
            <span className="text-gray-400 ml-2 font-medium">- R5M</span>
          </div>
          <div className="text-sm text-gray-400 mb-6 font-medium">
            Quality Family Homes
          </div>
          <ul className="space-y-4 mb-8">
            <li className="flex items-start">
              <CheckCircle size={18} className="text-primary mr-3 mt-0.5" />
              <span className="text-gray-300 font-medium">Family Homes</span>
            </li>
            <li className="flex items-start">
              <CheckCircle size={18} className="text-primary mr-3 mt-0.5" />
              <span className="text-gray-300 font-medium">Duplexes</span>
            </li>
            <li className="flex items-start">
              <CheckCircle size={18} className="text-primary mr-3 mt-0.5" />
              <span className="text-gray-300 font-medium">Small Office Buildings</span>
            </li>
            <li className="flex items-start">
              <CheckCircle size={18} className="text-primary mr-3 mt-0.5" />
              <span className="text-gray-300 font-medium">Townhouse Complexes</span>
            </li>
          </ul>
        </div>
        <Button className="w-full border border-primary text-primary bg-transparent hover:bg-primary hover:text-white font-semibold py-3 transition-all duration-300 mt-auto">
          Get Started
        </Button>
      </div>

      {/* Luxury Package */}
      <div className="bg-secondary border-2 border-gray-800 hover:border-primary transition-all duration-300 hover:-translate-y-2 shadow-xl group relative overflow-hidden p-8 flex flex-col h-full">
        <div className="absolute top-0 right-0 w-32 h-32 bg-primary/10 -translate-y-14 translate-x-14 group-hover:scale-110 transition-transform duration-300"></div>
        <div className="relative z-10 flex-1">
          <div className="inline-flex items-center justify-center w-16 h-16 mb-6 bg-primary/20 group-hover:bg-primary/30 transition-colors">
            <Hammer size={28} className="text-primary" />
          </div>
          <h3 className="text-2xl font-bold mb-3 tracking-tight text-white">Luxury</h3>
          <div className="flex items-baseline mb-2">
            <span className="text-3xl font-bold text-primary tracking-tight">R5M</span>
            <span className="text-gray-400 ml-2 font-medium">- R20M</span>
          </div>
          <div className="text-sm text-gray-400 mb-6 font-medium">
            Premium Residential
          </div>
          <ul className="space-y-4 mb-8">
            <li className="flex items-start">
              <CheckCircle size={18} className="text-primary mr-3 mt-0.5" />
              <span className="text-gray-300 font-medium">Luxury Villas</span>
            </li>
            <li className="flex items-start">
              <CheckCircle size={18} className="text-primary mr-3 mt-0.5" />
              <span className="text-gray-300 font-medium">Custom Estates</span>
            </li>
            <li className="flex items-start">
              <CheckCircle size={18} className="text-primary mr-3 mt-0.5" />
              <span className="text-gray-300 font-medium">Boutique Complexes</span>
            </li>
            <li className="flex items-start">
              <CheckCircle size={18} className="text-primary mr-3 mt-0.5" />
              <span className="text-gray-300 font-medium">Premium Finishes</span>
            </li>
          </ul>
        </div>
        <Button className="w-full border border-primary text-primary bg-transparent hover:bg-primary hover:text-white font-semibold py-3 transition-all duration-300 mt-auto">
          Get Started
        </Button>
      </div>

      {/* Enterprise Package */}
      <div className="bg-secondary border-2 border-gray-800 hover:border-primary transition-all duration-300 hover:-translate-y-2 shadow-xl group relative overflow-hidden p-8 flex flex-col h-full">
        <div className="absolute top-0 right-0 w-32 h-32 bg-primary/10 -translate-y-14 translate-x-14 group-hover:scale-110 transition-transform duration-300"></div>
        <div className="relative z-10 flex-1">
          <div className="inline-flex items-center justify-center w-16 h-16 mb-6 bg-primary/20 group-hover:bg-primary/30 transition-colors">
            <DollarSign size={28} className="text-primary" />
          </div>
          <h3 className="text-2xl font-bold mb-3 tracking-tight text-white">Enterprise</h3>
          <div className="flex items-baseline mb-2">
            <span className="text-3xl font-bold text-primary tracking-tight">R20M</span>
            <span className="text-gray-400 ml-2 font-medium">- R1B</span>
          </div>
          <div className="text-sm text-gray-400 mb-6 font-medium">
            Large-Scale Developments
          </div>
          <ul className="space-y-4 mb-8">
            <li className="flex items-start">
              <CheckCircle size={18} className="text-primary mr-3 mt-0.5" />
              <span className="text-gray-300 font-medium">Shopping Centers</span>
            </li>
            <li className="flex items-start">
              <CheckCircle size={18} className="text-primary mr-3 mt-0.5" />
              <span className="text-gray-300 font-medium">Office Parks</span>
            </li>
            <li className="flex items-start">
              <CheckCircle size={18} className="text-primary mr-3 mt-0.5" />
              <span className="text-gray-300 font-medium">Large Estates</span>
            </li>
            <li className="flex items-start">
              <CheckCircle size={18} className="text-primary mr-3 mt-0.5" />
              <span className="text-gray-300 font-medium">Mixed-Use Developments</span>
            </li>
          </ul>
        </div>
        <Button className="w-full border border-primary text-primary bg-transparent hover:bg-primary hover:text-white font-semibold py-3 transition-all duration-300 mt-auto">
          Get Started
        </Button>
      </div>
    </div>
  </div>
</section>

{/* Finance Options Timeline Section */}
<section className="py-20 bg-white">
  <div className="container mx-auto px-6">
    <div className="text-center mb-16">
      <h2 className="font-heading text-4xl font-extrabold mb-4 tracking-tight text-gray-900">
        Flexible <span className="text-primary">Financing</span> Process
      </h2>
      <p className="text-lg text-gray-600 max-w-2xl mx-auto leading-relaxed font-medium">
        Streamlined application and approval process to get your project funded quickly
      </p>
    </div>

    <div className="relative">
      {/* Timeline Connector */}
      <div className="absolute left-0 right-0 top-10 h-1 bg-gradient-to-r from-transparent via-primary/60 to-transparent hidden md:block"></div>
    </div>

    <div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-6xl mx-auto">
      {[
        {
          number: '01',
          title: 'Application & Documentation',
          description: 'Submit your application with required documents for initial assessment',
          icon: FileText,
          details: 'Employed: 3 months payslips + bank statements | Self-employed: 12 months business statements + registration'
        },
        {
          number: '02',
          title: 'Financial Assessment',
          description: 'Comprehensive verification through our expert team and partner banks',
          icon: Shield,
          details: 'In-house legal team and approved financial partners ensure transparent process'
        },
        {
          number: '03',
          title: 'Approval & Payment Plan',
          description: 'Receive approval and structured payment plan tailored to your project',
          icon: DollarSign,
          details: 'Pay in instalments while your project is being built - subject to approval'
        }
      ].map((step, index) => {
        const Icon = step.icon;
        return (
          <div
            key={index}
            className="group relative text-center flex flex-col items-center"
          >
            {/* Step Circle */}
            <div className="relative z-10 inline-flex items-center justify-center w-20 h-20 rounded-full bg-primary/20 text-primary font-bold text-xl mb-6 shadow-lg group-hover:bg-primary/30 group-hover:scale-110 transition-all duration-300">
              <span>{step.number}</span>
            </div>

            {/* Content Card */}
            <div className="group relative bg-secondary border-2 border-gray-800 hover:border-primary transition-all duration-300 hover:-translate-y-2 shadow-xl overflow-hidden p-6 flex flex-col h-80 w-full rounded-3xl">
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
                <p className="text-gray-300 leading-relaxed mb-4 flex-grow">
                  {step.description}
                </p>

                {/* Details */}
                <div className="bg-gray-800/50 rounded-lg p-3 mt-auto">
                  <p className="text-sm text-gray-400 font-medium">
                    {step.details}
                  </p>
                </div>
              </div>
            </div>
          </div>
        );
      })}
    </div>

    {/* Consultation Fee Note */}
    <div className="text-center mt-8">
      <p className="text-sm text-gray-500 italic">
        * A consultation fee of R2,500 applies for all applications. This fee covers assessment, consultation, and legal verification.
        The fee is non-refundable if the application is unsuccessful.
      </p>
    </div>
  </div>
</section>

      {/* Partner Banks Slider Section */}
 <section className="py-16 bg-white">
  <div className="container mx-auto px-6">
    <div className="text-center mb-12">
      <h2 className="font-heading text-4xl font-bold mb-4 text-gray-900">
        Partner <span className="text-primary">Financial Institutions</span>
      </h2>
      <p className="text-xl text-gray-600 max-w-2xl mx-auto">
        We collaborate with leading banks and financial partners
      </p>
    </div>

    <div className="relative">
      {/* Left Arrow */}
      {showLeftArrow && (
        <button
          onClick={() => scrollSlider('left')}
          className="absolute left-0 top-1/2 transform -translate-y-1/2 z-10 bg-primary hover:bg-primary/90 text-white p-3 rounded-r-lg transition-all duration-300 shadow-lg"
        >
          <ChevronLeft size={24} />
        </button>
      )}

      {/* Right Arrow */}
      {showRightArrow && (
        <button
          onClick={() => scrollSlider('right')}
          className="absolute right-0 top-1/2 transform -translate-y-1/2 z-10 bg-primary hover:bg-primary/90 text-white p-3 rounded-l-lg transition-all duration-300 shadow-lg"
        >
          <ChevronRight size={24} />
        </button>
      )}

      {/* Slider Container */}
      <div
        ref={sliderRef}
        className="flex gap-8 overflow-x-auto scrollbar-hide py-6 px-2"
        onScroll={checkScrollPosition}
        style={{ scrollbarWidth: 'none', msOverflowStyle: 'none' }}
      >
        {partnerBanks.map((bank, index) => (
          <div
            key={index}
            className="flex-shrink-0 w-48 h-48 bg-white border-2 border-gray-200 hover:border-primary transition-all duration-300 flex items-center justify-center p-6 hover:shadow-xl group"
          >
            <img
              src={bank.logo}
              alt={bank.name}
              className="max-w-full max-h-20 object-contain filter grayscale group-hover:grayscale-0 transition-all duration-300"
              title={bank.name}
            />
          </div>
        ))}
      </div>
    </div>

    <div className="text-center mt-8">
      <p className="text-gray-500 text-sm">
        Scroll or use arrows to view all our financial partners
      </p>
    </div>
  </div>
</section>

      <Footer />
    </div>
  );
};

export default PropertyDevelopment;