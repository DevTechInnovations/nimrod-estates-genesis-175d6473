import { useEffect, useState } from 'react';
import { useParams, Link, useNavigate } from 'react-router-dom';
import { Loader2, MapPin, Bed, Bath, Square, TrendingUp, ArrowLeft, Crown } from 'lucide-react';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import { Button } from '@/components/ui/button';
import { supabase } from '@/integrations/supabase/client';

interface Property {
  id: string;
  title: string;
  description: string;
  location: string;
  price: string;
  bedrooms: number;
  bathrooms: number;
  area: number;
  roi: string | null;
  images: string[];
  featured: boolean;
  exclusive: boolean;
  investmentOpportunity: boolean;
  type: string;
  video_url: string | null;
  pdf_url: string | null;
}

const PropertyDetails = () => {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const [property, setProperty] = useState<Property | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [currentImage, setCurrentImage] = useState<number>(0);

  useEffect(() => {
    if (!id) return;
    const fetchProperty = async () => {
      setLoading(true);
      try {
        const { data, error } = await supabase
          .from('properties')
          .select('*')
          .eq('id', id)
          .maybeSingle();

        if (error) {
          throw error;
        }
        
        if (!data) {
          setError('Property not found');
          return;
        }
        
        setProperty(data as Property);
        setCurrentImage(0);
      } catch (err: any) {
        console.error('Error fetching property:', err);
        setError(err.message || 'Failed to load property');
      } finally {
        setLoading(false);
      }
    };

    fetchProperty();
  }, [id]);

  const formatPrice = (p?: string) => {
    if (!p) return 'N/A';
    const num = Number(p.replace(/[^0-9.-]+/g, ''));
    if (Number.isFinite(num)) {
      return new Intl.NumberFormat('en-US', { style: 'currency', currency: 'USD', maximumFractionDigits: 0 }).format(num);
    }
    return p;
  };

  const renderDescription = (text: string) => {
    if (!text) return null;
    // split paragraphs on double line breaks, fallback to single line breaks
    const paragraphs = text.split(/\r?\n\r?\n/).map(p => p.trim()).filter(Boolean);
    return paragraphs.map((p, i) => <p key={i} className="mb-4 leading-relaxed text-base text-muted-foreground">{p}</p>);
  };

  return (
    <div className="min-h-screen">
      <Navbar />
      <section className="pt-24 pb-16 bg-background">
        <div className="container mx-auto px-4">
          <div className="mb-6 flex items-center justify-between">
            <div className="flex items-center gap-3">
              <button
                onClick={() => navigate(-1)}
                className="inline-flex items-center gap-2 text-sm text-muted-foreground hover:text-foreground"
                aria-label="Back"
              >
                <ArrowLeft className="h-4 w-4" />
                Back
              </button>
              <nav className="text-sm text-muted-foreground">
                <Link to="/" className="hover:underline">Home</Link>
                <span className="mx-2">/</span>
                <Link to="/properties" className="hover:underline">Properties</Link>
                {property && (
                  <>
                    <span className="mx-2">/</span>
                    <span className="text-foreground">{property.title}</span>
                  </>
                )}
              </nav>
            </div>

            <div className="text-right">
              <div className="text-sm text-muted-foreground">Listed</div>
              <div className="text-base font-medium">{property?.featured ? 'Featured' : 'Standard'}</div>
            </div>
          </div>

          {loading ? (
            <div className="flex justify-center py-20">
              <Loader2 className="h-12 w-12 animate-spin text-primary" />
            </div>
          ) : error ? (
            <div className="text-center py-20 text-red-600">{error}</div>
          ) : !property ? (
            <div className="text-center py-20">Property not found.</div>
          ) : (
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
              {/* Left: Gallery */}
              <div className="lg:col-span-2">
                <div className="bg-card rounded-lg overflow-hidden shadow">
                  {property.images && property.images.length > 0 ? (
                    <>
                      <div className="w-full h-96 bg-gray-100 flex items-center justify-center overflow-hidden">
                        <img
                          src={property.images[currentImage]}
                          alt={`${property.title} image ${currentImage + 1}`}
                          className="w-full h-full object-cover"
                        />
                      </div>

                      {property.images.length > 1 && (
                        <div className="p-3 flex gap-2 overflow-x-auto bg-muted">
                          {property.images.map((img, idx) => (
                            <button
                              key={idx}
                              onClick={() => setCurrentImage(idx)}
                              className={`flex-shrink-0 w-24 h-16 border rounded overflow-hidden ${idx === currentImage ? 'ring-2 ring-primary' : 'opacity-80 hover:opacity-100'}`}
                              aria-label={`Show image ${idx + 1}`}
                            >
                              <img src={img} alt={`thumbnail ${idx + 1}`} className="w-full h-full object-cover" />
                            </button>
                          ))}
                        </div>
                      )}
                    </>
                  ) : (
                    <div className="w-full h-96 flex items-center justify-center text-muted-foreground">
                      No images available
                    </div>
                  )}
                </div>

                <div className="mt-6 bg-card p-6 rounded-lg shadow">
                  <h2 className="text-2xl font-semibold mb-3">Overview</h2>
                  {renderDescription(property.description)}
                </div>
              </div>

              {/* Right: Summary & Actions */}
              <aside className="space-y-4">
                <div className="bg-card p-6 rounded-lg shadow">
                  {/* Badges Section */}
                  <div className="flex flex-wrap gap-2 mb-4">
                    {property.exclusive && (
                      <div className="bg-gradient-to-r from-amber-500 to-amber-600 text-white px-3 py-1 rounded-full text-sm font-semibold shadow-lg flex items-center">
                        <Crown size={14} className="mr-1" />
                        Exclusive
                      </div>
                    )}
                    {property.investmentOpportunity && (
                      <div className="bg-gradient-to-r from-green-500 to-green-600 text-white px-3 py-1 rounded-full text-sm font-semibold shadow-lg flex items-center">
                        <TrendingUp size={14} className="mr-1" />
                        Investment Opportunity
                      </div>
                    )}
                    {property.featured && (
                      <div className="bg-gradient-to-r from-blue-500 to-blue-600 text-white px-3 py-1 rounded-full text-sm font-semibold shadow-lg">
                        Featured
                      </div>
                    )}
                  </div>

                  <h1 className="text-2xl font-bold mb-1">{property.title}</h1>
                  <div className="flex items-center gap-2 text-sm text-muted-foreground mb-4">
                    <MapPin className="h-4 w-4" /> {property.location}
                  </div>

                  <div className="text-3xl font-extrabold text-foreground mb-4">{formatPrice(property.price)}</div>

                  <div className="grid grid-cols-3 gap-3 mb-4 text-sm">
                    <div className="flex flex-col items-start">
                      <div className="flex items-center gap-2 text-muted-foreground">
                        <Bed className="h-4 w-4" /> Bedrooms
                      </div>
                      <div className="font-medium text-foreground">{property.bedrooms}</div>
                    </div>

                    <div className="flex flex-col items-start">
                      <div className="flex items-center gap-2 text-muted-foreground">
                        <Bath className="h-4 w-4" /> Bathrooms
                      </div>
                      <div className="font-medium text-foreground">{property.bathrooms}</div>
                    </div>

                    <div className="flex flex-col items-start">
                      <div className="flex items-center gap-2 text-muted-foreground">
                        <Square className="h-4 w-4" /> Area
                      </div>
                      <div className="font-medium text-foreground">{property.area} m²</div>
                    </div>
                  </div>

                  {property.roi && (
                    <div className="flex items-center gap-2 text-sm mb-4">
                      <TrendingUp className="h-4 w-4 text-muted-foreground" />
                      <div className="text-sm text-muted-foreground">Estimated ROI</div>
                      <div className="ml-auto font-medium">{property.roi}</div>
                    </div>
                  )}

                  <div className="flex flex-col gap-2">
                    <Link to="/contact">
                      <Button className="w-full">Contact Agent</Button>
                    </Link>

                    {property.pdf_url && (
                      <a href={property.pdf_url} target="_blank" rel="noreferrer">
                        <Button variant="outline" className="w-full">Download Brochure</Button>
                      </a>
                    )}

                    {property.video_url && (
                      <a href={property.video_url} target="_blank" rel="noreferrer">
                        <Button variant="ghost" className="w-full">Watch Video Tour</Button>
                      </a>
                    )}
                  </div>
                </div>

                <div className="bg-card p-4 rounded-lg text-sm text-muted-foreground">
                  <div className="font-medium mb-2">Property Details</div>
                  <div className="flex flex-col gap-2">
                    <div><span className="text-muted-foreground">Type: </span>{property.type}</div>
                    <div><span className="text-muted-foreground">Location: </span>{property.location}</div>
                    <div><span className="text-muted-foreground">Status: </span>{property.featured ? 'Featured' : 'Standard'}</div>
                    {property.exclusive && (
                      <div><span className="text-muted-foreground">Access: </span>Exclusive Members</div>
                    )}
                    {property.investmentOpportunity && (
                      <div><span className="text-muted-foreground">Category: </span>Investment Property</div>
                    )}
                  </div>
                </div>
              </aside>
            </div>
          )}
        </div>
      </section>
      <Footer />
    </div>
  );
};

export default PropertyDetails;