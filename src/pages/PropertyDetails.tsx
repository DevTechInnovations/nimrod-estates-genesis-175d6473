import { useParams, Link } from 'react-router-dom';
import { MapPin, Bed, Bath, Square, TrendingUp, ArrowLeft } from 'lucide-react';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import { Button } from '@/components/ui/button';
import { properties } from '@/data/properties';

const PropertyDetails = () => {
  const { id } = useParams();
  const property = properties.find((p) => p.id === id);

  if (!property) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center">
          <h1 className="text-2xl font-bold mb-4">Property not found</h1>
          <Link to="/properties">
            <Button className="bg-primary hover:bg-primary-glow">
              Back to Properties
            </Button>
          </Link>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen">
      <Navbar />

      <div className="pt-24 pb-12">
        <div className="container mx-auto px-4">
          {/* Back Button */}
          <Link to="/properties">
            <Button variant="outline" className="mb-6 hover-gold">
              <ArrowLeft className="mr-2" size={20} />
              Back to Properties
            </Button>
          </Link>

          {/* Property Title */}
          <div className="mb-8">
            <h1 className="font-heading text-4xl md:text-5xl font-bold mb-4">{property.title}</h1>
            <div className="flex items-center text-muted-foreground text-lg mb-4">
              <MapPin className="mr-2" size={20} />
              {property.location}
            </div>
            <div className="flex items-center gap-4">
              <span className="text-4xl font-heading font-bold text-primary">{property.price}</span>
              {property.roi && (
                <span className="bg-primary text-primary-foreground px-4 py-2 rounded-full text-sm font-semibold flex items-center">
                  <TrendingUp className="mr-1" size={16} />
                  {property.roi} ROI
                </span>
              )}
            </div>
          </div>

          {/* Image Gallery */}
          <div className="mb-8">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="col-span-1 md:col-span-2">
                <img
                  src={property.images[0]}
                  alt={property.title}
                  className="w-full h-[500px] object-cover rounded-lg"
                />
              </div>
            </div>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            {/* Property Details */}
            <div className="lg:col-span-2">
              {/* Key Features */}
              <div className="bg-card p-6 rounded-lg border border-border mb-8">
                <h2 className="font-heading text-2xl font-bold mb-6">Key Features</h2>
                <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
                  <div className="text-center p-4 bg-muted rounded-lg">
                    <Bed className="mx-auto mb-2 text-primary" size={32} />
                    <div className="font-bold text-xl">{property.bedrooms}</div>
                    <div className="text-sm text-muted-foreground">Bedrooms</div>
                  </div>
                  <div className="text-center p-4 bg-muted rounded-lg">
                    <Bath className="mx-auto mb-2 text-primary" size={32} />
                    <div className="font-bold text-xl">{property.bathrooms}</div>
                    <div className="text-sm text-muted-foreground">Bathrooms</div>
                  </div>
                  <div className="text-center p-4 bg-muted rounded-lg">
                    <Square className="mx-auto mb-2 text-primary" size={32} />
                    <div className="font-bold text-xl">{property.area}</div>
                    <div className="text-sm text-muted-foreground">m² Area</div>
                  </div>
                  <div className="text-center p-4 bg-muted rounded-lg">
                    <TrendingUp className="mx-auto mb-2 text-primary" size={32} />
                    <div className="font-bold text-xl">{property.roi}</div>
                    <div className="text-sm text-muted-foreground">ROI</div>
                  </div>
                </div>
              </div>

              {/* Description */}
              <div className="bg-card p-6 rounded-lg border border-border mb-8">
                <h2 className="font-heading text-2xl font-bold mb-4">Description</h2>
                <p className="text-muted-foreground leading-relaxed">{property.description}</p>
              </div>

              {/* Location Map Placeholder */}
              <div className="bg-card p-6 rounded-lg border border-border">
                <h2 className="font-heading text-2xl font-bold mb-4">Location</h2>
                <div className="bg-muted h-64 rounded-lg flex items-center justify-center">
                  <div className="text-center text-muted-foreground">
                    <MapPin size={48} className="mx-auto mb-2" />
                    <p>Interactive map will be displayed here</p>
                    <p className="text-sm">{property.location}</p>
                  </div>
                </div>
              </div>
            </div>

            {/* Contact Form */}
            <div className="lg:col-span-1">
              <div className="bg-card p-6 rounded-lg border border-border sticky top-24">
                <h3 className="font-heading text-2xl font-bold mb-6">Interested in this property?</h3>
                <div className="space-y-4 mb-6">
                  <div>
                    <label className="block text-sm font-medium mb-2">Full Name</label>
                    <input
                      type="text"
                      className="w-full px-4 py-2 border border-border rounded-md focus:outline-none focus:ring-2 focus:ring-primary"
                      placeholder="John Doe"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium mb-2">Email</label>
                    <input
                      type="email"
                      className="w-full px-4 py-2 border border-border rounded-md focus:outline-none focus:ring-2 focus:ring-primary"
                      placeholder="john@example.com"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium mb-2">Phone</label>
                    <input
                      type="tel"
                      className="w-full px-4 py-2 border border-border rounded-md focus:outline-none focus:ring-2 focus:ring-primary"
                      placeholder="+1 (555) 123-4567"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium mb-2">Message</label>
                    <textarea
                      rows={4}
                      className="w-full px-4 py-2 border border-border rounded-md focus:outline-none focus:ring-2 focus:ring-primary resize-none"
                      placeholder="I'm interested in this property..."
                    ></textarea>
                  </div>
                </div>
                <Button className="w-full bg-primary hover:bg-primary-glow mb-3">
                  Request Information
                </Button>
                <Link to="/contact">
                  <Button variant="outline" className="w-full hover-gold">
                    Schedule Viewing
                  </Button>
                </Link>
              </div>
            </div>
          </div>
        </div>
      </div>

      <Footer />
    </div>
  );
};

export default PropertyDetails;
