import { Users, Globe2, Award, TrendingUp } from 'lucide-react';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import heroImage from '@/assets/3d-electric-car-building.jpg';
import davidImage from '@/assets/david-nimrod.jpg';
import { Helmet } from 'react-helmet-async'; 

const About = () => {
  const team = [
    {
      name: 'Nimrod Gumede',
      title: 'Founder & CEO',
      image:  davidImage,
    },
    // {
    //   name: 'Sarah Mitchell',
    //   title: 'Head of Investment',
    //   image: 'https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?w=400&auto=format&fit=crop',
    // },
    // {
    //   name: 'James Chen',
    //   title: 'Global Operations Director',
    //   image: 'https://images.unsplash.com/photo-1519085360753-af0119f7cbe7?w=400&auto=format&fit=crop',
    // },
    // {
    //   name: 'Emma Rodriguez',
    //   title: 'Wealth Advisory Lead',
    //   image: 'https://images.unsplash.com/photo-1580489944761-15a19d654956?w=400&auto=format&fit=crop',
    // },
  ];

  return (
    <div className="min-h-screen">
            {/* SEO Section */}
      <Helmet>
  <title>About Nimrod Estates | Luxury Real Estate & Global Property Investment</title>
  <meta
    name="description"
    content="Discover Nimrod Estates — a premier firm specializing in luxury properties, property investment in South Africa, Dubai, and Monaco, as well as exclusive real estate development opportunities for global investors."
  />
  <meta
    name="keywords"
    content="Property for rent, Property investment in South Africa, Property investment in Dubai, Property investment in Monaco, Property development, Property to buy, Real estate investments, Luxury properties, Nimrod Property Estates"
  />
  <meta name="author" content="Nimrod Property Estates" />

  <link rel="canonical" href="https://nimrodestates.com/about" />

  <meta property="og:title" content="About Nimrod Estates | Global Luxury Real Estate Experts" />
  <meta
    property="og:description"
    content="Explore Nimrod Estates — connecting global investors with exclusive luxury properties and development opportunities across South Africa, Dubai, and Monaco."
  />
  <meta property="og:image" content="https://nimrodestates.com/assets" />
  <meta property="og:url" content="https://nimrodestates.com/about" />
  <meta property="og:type" content="website" />

  <script type="application/ld+json">
    {JSON.stringify({
      "@context": "https://schema.org",
      "@type": "Organization",
      name: "Nimrod Property Estates",
      url: "https://nimrodestates.com",
      logo: "https://nimrodestates.com/NM.png",
      description:
        "Nimrod Estates is a global leader in luxury property investment, connecting clients to premium estates in South Africa, Dubai, Monaco, and beyond.",
      founder: {
        "@type": "Person",
        name: "Nimrod Gumede",
      },
      sameAs: [
        "https://www.linkedin.com/company/nimrodestates",
        "https://www.instagram.com/nimrodestates",
      ],
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
            About <span className="text-gradient-gold">Nimrod Estates</span>
          </h1>
          <p className="text-xl md:text-2xl max-w-3xl mx-auto text-white/90">
            {/* Empowering investors with real estate opportunities since 2003 */}
            Nimrod Estates is an exclusive luxury real estate firm specializing in serving 
            Ultra-High-Net-Worth Individuals, distinguished family offices, and global investors 
            seeking exceptional properties worldwide.
          </p>
        </div>
      </section>

      {/* Company Overview */}
      <section className="py-20 bg-white">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-12 items-center">
            <div>
  <h2 className="font-heading text-4xl font-bold mb-6">
    Our <span className="text-primary">Mission</span>
  </h2>
  <p className="text-lg text-muted-foreground mb-4 text-left">
    {/* Our mission is to connect clients to the best premium real estate opportunities worldwide
    offering access to exclusive properties that embody sophistication, value, and long-term growth.
    We aim to simplify global real estate investment through trust, expertise, and seamless service. */}
      At Nimrod Estates, our mission is to connect clients with the world’s most exceptional estate opportunities by delivering the best premium services in 
      property sales, management, asset management, and development. We are dedicated to upholding the highest standards of discretion, exclusivity, 
      and personal attention, ensuring every client experiences a level of service as exceptional as the properties we represent.
  </p>
  {/* <p className="text-lg text-muted-foreground">
    By leveraging strategic partnerships and a deep understanding of international markets, 
    we empower our clients to invest with confidence and success. At Nimrod Estates, we don’t 
    just connect clients with properties we connect them with possibilities.
  </p> */}
</div>

            <div className="grid grid-cols-2 gap-6">
              <div className="bg-secondary p-6 rounded-lg border-2 border-gray-100 hover-lift shadow-lg">
                <Users className="text-primary mb-4" size={40} />
                <div className="text-3xl font-bold text-primary mb-2">2,500+</div>
                <div className="text-primary font-bold">Satisfied Clients</div>
              </div>
              <div className="bg-secondary p-6 rounded-lg border-2 border-gray-100 hover-lift shadow-lg">
                <Globe2 className="text-primary mb-4" size={40} />
                <div className="text-3xl font-bold text-primary mb-2">50+</div>
                <div className="text-primary font-bold">Countries</div>
              </div>
              <div className="bg-secondary p-6 rounded-lg border-2 border-gray-100 hover-lift shadow-lg">
                <Award className="text-primary mb-4" size={40} />
                <div className="text-3xl font-bold text-primary mb-2">15+</div>
                <div className="text-primary font-bold">Industry Awards</div>
              </div>
              <div className="bg-secondary p-6 rounded-lg border-2 border-gray-100 hover-lift shadow-lg">
                <TrendingUp className="text-primary mb-4" size={40} />
                <div className="text-3xl font-bold text-primary mb-2">12%</div>
                <div className="text-primary font-bold">Avg. ROI</div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Vision */}
  <section className="py-24 bg-gray-50">
  <div className="container mx-auto px-4 flex flex-col md:flex-row items-center gap-12">
    
    {/* Image - Now first on mobile, left on desktop */}
    <div className="md:w-1/2">
      <img
        src="src\assets\3d-house-model-with-modern-architecture-about.jpg" 
        alt="Luxury Real Estate"
        className="w-full h-auto shadow-lg object-cover"
      />
    </div>

    {/* Text Content - Now second on mobile, right on desktop */}
   <div className="md:w-1/2 text-center md:text-left">
  <h2 className="font-heading text-5xl font-extrabold mb-6">
    Our <span className="text-primary">Vision</span>
  </h2>
  <p className="text-lg text-muted-foreground max-w-xl leading-relaxed mb-6 text-left">
    We pride ourselves on being the world’s most trusted and innovative real estate partner 
redefining luxury living and investment opportunities through integrity, excellence, and exclusivity. 
    Our vision is to create a future where premium real estate is not just a symbol of success, 
    but a gateway to enduring value, growth, and prestige.
  </p>
  {/* <p className="text-lg text-muted-foreground max-w-xl leading-relaxed mb-6">
    By continuously setting new benchmarks in the industry, we aim to inspire confidence, 
    elevate lifestyles, and build lasting wealth for our clients. At Nimrod Estates, 
    we don’t just develop properties — we shape the global standard of luxury living.
  </p> */}
  {/* <button className="px-8 py-2 font-semibold text-white bg-primary rounded-md shadow-lg hover:bg-primary/90 transition-all duration-300">
    Learn More
  </button> */}
</div>
  </div>
</section>

      {/* Leadership Team */}
<section className="py-20 bg-white">
  <div className="container mx-auto px-4">
    <div className="text-center mb-12">
      <h2 className="font-heading text-4xl font-bold mb-4">
        Leadership <span className="text-primary">Team</span>
      </h2>
      <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
        Meet the experienced professionals guiding Nimrod Estates to new heights
      </p>
    </div>

    <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
      {team.map((member, index) => (
        <div key={index} className="group bg-white overflow-hidden shadow-lg hover-lift border-2 border-gray-100 relative">
          {/* Image Container - Increased Height */}
          <div className="relative overflow-hidden h-96">
            <img
              src={member.image}
              alt={member.name}
               className="w-full h-full object-cover object-top transition-all duration-500 group-hover:scale-105"
            />
            
            {/* Name and Title - Always Visible at Bottom of Image */}
            <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black/80 to-transparent p-4">
              <h3 className="font-heading text-lg font-semibold text-white mb-1">
                {member.name}
              </h3>
              <p className="text-primary text-sm font-medium">
                {member.title}
              </p>
            </div>
          </div>

          {/* Details Overlay - Appears on Hover */}
          <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/70 to-transparent opacity-0 group-hover:opacity-100 transition-all duration-500 flex flex-col justify-end p-6">
            <div className="transform translate-y-8 group-hover:translate-y-0 transition-transform duration-500">
              {/* <h3 className="font-heading text-xl font-semibold mb-2 text-white">
                {member.name}
              </h3> */}
              {/* <p className="text-primary text-sm font-medium mb-4">
                {member.title}
              </p> */}
              <div className="pt-4 border-t border-primary/30">
                <p className="text-white/80 text-sm leading-relaxed">
                Nimrod Gumede is the Founder and Chief Executive Officer of Nimrod Estates. He holds MBA in Credential of Readiness , Financial Accounting, and Electrical Engineering, having studied at Harvard University, Harvard Business School, and Berea Technical College. As a seasoned entrepreneur, he has successfully managed and led companies with international operations, establishing himself as a global business leader with expertise across real estate, finance, and engineering.
                </p>
              </div>
            </div>
          </div>
        </div>
      ))}
    </div>
  </div>
</section>

      <Footer />
    </div>
  );
};

export default About;