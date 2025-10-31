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

    const competencies = [
    {
      name: 'Property Practicioners Regulatory Authority',
      logo: 'https://media.licdn.com/dms/image/v2/D4E22AQHlVusixV2cvA/feedshare-shrink_2048_1536/feedshare-shrink_2048_1536/0/1729592966348?e=1763596800&v=beta&t=ohTwp6XQG28_8Qr6nn2HmsyWqP_lPDmL4bb6e7fTG_k'
    },
    {
      name: 'Construction Industry Development Board',
      logo:'https://rampiet.co.za/wp-content/uploads/2023/07/cidb_logo2.jpg'
    },
    {
      name: 'Central Supplier Database',
      logo:'https://www.govchain.co.za/_next/image?url=https%3A%2F%2Fcdn.sanity.io%2Fimages%2Fonvsvlsh%2Fproduction%2Fa1ae0b8f11f339c0f9c2175230d8e9f1e8fe200b-1200x630.jpg%3Fh%3D500&w=3840&q=75'
    },
    {
      name: 'National Home Builders Registration Council',
      logo:'data:image/png;base64,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'
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
              commercial, and luxury developments delivering high-quality projects tailored to your vision and budget.
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

  <section className="py-16 bg-white">
  <div className="container mx-auto px-6">
    <div className="text-center mb-12">
      <h2 className="font-heading text-4xl font-bold mb-4 text-gray-900">
        Industry <span className="text-primary">Accreditations</span>
      </h2>
      <p className="text-xl text-gray-600 max-w-2xl mx-auto">
         Fully accredited and compliant with all major regulatory bodies
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
        className="flex gap-8 overflow-x-auto scrollbar-hide py-6 px-2 justify-center"
        onScroll={checkScrollPosition}
        style={{ scrollbarWidth: 'none', msOverflowStyle: 'none' }}
      >
        {competencies.map((bank, index) => (
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

  </div>
</section>

      <Footer />
    </div>
  );
};

export default PropertyDevelopment;