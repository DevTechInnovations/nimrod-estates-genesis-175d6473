import { Users, Globe2, Award, TrendingUp } from 'lucide-react';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';

const About = () => {
  const team = [
    {
      name: 'David Nimrod',
      title: 'Founder & CEO',
      image: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=400&auto=format&fit=crop',
    },
    {
      name: 'Sarah Mitchell',
      title: 'Head of Investment',
      image: 'https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?w=400&auto=format&fit=crop',
    },
    {
      name: 'James Chen',
      title: 'Global Operations Director',
      image: 'https://images.unsplash.com/photo-1519085360753-af0119f7cbe7?w=400&auto=format&fit=crop',
    },
    {
      name: 'Emma Rodriguez',
      title: 'Wealth Advisory Lead',
      image: 'https://images.unsplash.com/photo-1580489944761-15a19d654956?w=400&auto=format&fit=crop',
    },
  ];

  return (
    <div className="min-h-screen">
      <Navbar />

      {/* Hero Section */}
      <section className="pt-32 pb-20 bg-gradient-to-b from-background to-muted">
        <div className="container mx-auto px-4 text-center">
          <h1 className="font-heading text-5xl md:text-6xl font-bold mb-6">
            About <span className="text-gradient-gold">Nimrod Estates</span>
          </h1>
          <p className="text-xl text-muted-foreground max-w-3xl mx-auto">
            Empowering investors with global real estate opportunities since 2003
          </p>
        </div>
      </section>

      {/* Company Overview */}
      <section className="py-20 bg-background">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-12 items-center">
            <div>
              <h2 className="font-heading text-4xl font-bold mb-6">
                Our <span className="text-gradient-gold">Mission</span>
              </h2>
              <p className="text-lg text-muted-foreground mb-4">
                At Nimrod Estates, we believe that luxury real estate investment should be accessible, 
                transparent, and profitable. Our mission is to connect discerning investors with the 
                world's most exceptional properties while providing unparalleled service and expertise.
              </p>
              <p className="text-lg text-muted-foreground">
                With over two decades of experience in international real estate, we've built a 
                reputation for excellence, integrity, and outstanding returns on investment.
              </p>
            </div>
            <div className="grid grid-cols-2 gap-6">
              <div className="bg-card p-6 rounded-lg border border-border hover-lift">
                <Users className="text-primary mb-4" size={40} />
                <div className="text-3xl font-bold text-primary mb-2">2,500+</div>
                <div className="text-muted-foreground">Satisfied Clients</div>
              </div>
              <div className="bg-card p-6 rounded-lg border border-border hover-lift">
                <Globe2 className="text-primary mb-4" size={40} />
                <div className="text-3xl font-bold text-primary mb-2">50+</div>
                <div className="text-muted-foreground">Countries</div>
              </div>
              <div className="bg-card p-6 rounded-lg border border-border hover-lift">
                <Award className="text-primary mb-4" size={40} />
                <div className="text-3xl font-bold text-primary mb-2">15+</div>
                <div className="text-muted-foreground">Industry Awards</div>
              </div>
              <div className="bg-card p-6 rounded-lg border border-border hover-lift">
                <TrendingUp className="text-primary mb-4" size={40} />
                <div className="text-3xl font-bold text-primary mb-2">12%</div>
                <div className="text-muted-foreground">Avg. ROI</div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Vision */}
      <section className="py-20 bg-muted">
        <div className="container mx-auto px-4 text-center">
          <h2 className="font-heading text-4xl font-bold mb-8">
            Our <span className="text-gradient-gold">Vision</span>
          </h2>
          <p className="text-xl text-muted-foreground max-w-4xl mx-auto mb-12">
            To be the world's most trusted and innovative luxury real estate investment platform, 
            creating wealth and opportunity for our clients while setting new standards of excellence 
            in the industry.
          </p>
        </div>
      </section>

      {/* Leadership Team */}
      <section className="py-20 bg-background">
        <div className="container mx-auto px-4">
          <div className="text-center mb-12">
            <h2 className="font-heading text-4xl font-bold mb-4">
              Leadership <span className="text-gradient-gold">Team</span>
            </h2>
            <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
              Meet the experienced professionals guiding Nimrod Estates to new heights
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
            {team.map((member, index) => (
              <div key={index} className="bg-card rounded-lg overflow-hidden hover-lift border border-border">
                <div className="aspect-square overflow-hidden">
                  <img
                    src={member.image}
                    alt={member.name}
                    className="w-full h-full object-cover transition-transform duration-500 hover:scale-110"
                  />
                </div>
                <div className="p-6 text-center">
                  <h3 className="font-heading text-xl font-bold mb-1">{member.name}</h3>
                  <p className="text-primary text-sm">{member.title}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Global Reach */}
      <section className="py-20 bg-secondary text-secondary-foreground">
        <div className="container mx-auto px-4">
          <div className="text-center mb-12">
            <h2 className="font-heading text-4xl font-bold mb-4">
              Global <span className="text-gradient-gold">Reach</span>
            </h2>
            <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
              Our international presence spans across continents, bringing you the best investment 
              opportunities from around the world
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="bg-card p-8 rounded-lg text-center">
              <h3 className="font-heading text-2xl font-bold mb-3">North America</h3>
              <p className="text-muted-foreground mb-4">
                Premium properties in major US and Canadian cities
              </p>
              <ul className="text-sm text-muted-foreground space-y-1">
                <li>New York • Los Angeles</li>
                <li>Miami • Toronto</li>
                <li>Vancouver • Chicago</li>
              </ul>
            </div>

            <div className="bg-card p-8 rounded-lg text-center">
              <h3 className="font-heading text-2xl font-bold mb-3">Europe</h3>
              <p className="text-muted-foreground mb-4">
                Luxury residences in Europe's most prestigious locations
              </p>
              <ul className="text-sm text-muted-foreground space-y-1">
                <li>London • Paris</li>
                <li>Monaco • Zurich</li>
                <li>Barcelona • Milan</li>
              </ul>
            </div>

            <div className="bg-card p-8 rounded-lg text-center">
              <h3 className="font-heading text-2xl font-bold mb-3">Asia & Middle East</h3>
              <p className="text-muted-foreground mb-4">
                Exclusive properties in rapidly growing markets
              </p>
              <ul className="text-sm text-muted-foreground space-y-1">
                <li>Dubai • Singapore</li>
                <li>Hong Kong • Tokyo</li>
                <li>Bangkok • Mumbai</li>
              </ul>
            </div>
          </div>
        </div>
      </section>

      <Footer />
    </div>
  );
};

export default About;
