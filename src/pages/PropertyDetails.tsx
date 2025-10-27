import { useEffect, useState } from 'react';
import { useParams, Link, useNavigate } from 'react-router-dom';
import { Loader2, MapPin, Bed, Bath, Square, TrendingUp, ArrowLeft, Crown, ChevronLeft, ChevronRight, X, Maximize2, Calendar, Shield } from 'lucide-react';
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
  imageLinks: string[];
  featured: boolean;
  exclusive: boolean;
  investmentOpportunity: boolean;
  type: string;
  video_url: string | null;
  pdf_url: string | null;
  property_type: 'sale' | 'rental';
  rental_period: string | null;
  security_deposit: string | null;
}

const PropertyDetails = () => {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const [property, setProperty] = useState<Property | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [currentImage, setCurrentImage] = useState<number>(0);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [modalImageIndex, setModalImageIndex] = useState(0);

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

  // Combine images and Imagelinks for display
  const allImages = property ? [...(property.images || []), ...(property.imageLinks || [])] : [];

  const formatPrice = (p?: string) => {
    if (!p) return 'N/A';
    const num = Number(p.replace(/[^0-9.-]+/g, ''));
    if (Number.isFinite(num)) {
      return new Intl.NumberFormat('en-US', { style: 'currency', currency: 'USD', maximumFractionDigits: 0 }).format(num);
    }
    return p;
  };

  const getRentalPeriodText = (period: string | null) => {
    if (!period) return '';
    switch (period) {
      case 'monthly': return '/month';
      case 'weekly': return '/week';
      case 'daily': return '/day';
      case 'yearly': return '/year';
      default: return '';
    }
  };

  const getRentalPeriodDisplay = (period: string | null) => {
    if (!period) return '';
    return period.charAt(0).toUpperCase() + period.slice(1);
  };

  const renderDescription = (text: string) => {
    if (!text) return null;
    const paragraphs = text.split(/\r?\n\r?\n/).map(p => p.trim()).filter(Boolean);
    return paragraphs.map((p, i) => <p key={i} className="mb-4 leading-relaxed text-base text-muted-foreground">{p}</p>);
  };

  const nextImage = () => {
    if (allImages.length === 0) return;
    setCurrentImage((prev) => (prev + 1) % allImages.length);
  };

  const prevImage = () => {
    if (allImages.length === 0) return;
    setCurrentImage((prev) => (prev - 1 + allImages.length) % allImages.length);
  };

  const nextModalImage = () => {
    if (allImages.length === 0) return;
    setModalImageIndex((prev) => (prev + 1) % allImages.length);
  };

  const prevModalImage = () => {
    if (allImages.length === 0) return;
    setModalImageIndex((prev) => (prev - 1 + allImages.length) % allImages.length);
  };

  const openModal = (index: number) => {
    setModalImageIndex(index);
    setIsModalOpen(true);
  };

  const closeModal = () => {
    setIsModalOpen(false);
  };

  // Handle keyboard navigation
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (!isModalOpen) return;
      
      if (e.key === 'Escape') {
        closeModal();
      } else if (e.key === 'ArrowLeft') {
        prevModalImage();
      } else if (e.key === 'ArrowRight') {
        nextModalImage();
      }
    };

    document.addEventListener('keydown', handleKeyDown);
    return () => document.removeEventListener('keydown', handleKeyDown);
  }, [isModalOpen]);

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
                <div className="bg-card rounded-lg overflow-hidden shadow relative">
                  {allImages.length > 0 ? (
                    <>
                      <div className="w-full h-96 bg-gray-100 flex items-center justify-center overflow-hidden relative">
                        <img
                          src={allImages[currentImage]}
                          alt={`${property.title} image ${currentImage + 1}`}
                          className="w-full h-full object-cover cursor-pointer"
                          onClick={() => openModal(currentImage)}
                        />
                        
                        {/* Fullscreen button */}
                        <button
                          onClick={() => openModal(currentImage)}
                          className="absolute top-3 right-3 bg-black/50 text-white p-2 rounded-full hover:bg-black/70 transition-colors"
                          aria-label="View fullscreen"
                        >
                          <Maximize2 className="h-4 w-4" />
                        </button>

                        {/* Navigation arrows */}
                        {allImages.length > 1 && (
                          <>
                            <button
                              onClick={prevImage}
                              className="absolute left-3 top-1/2 transform -translate-y-1/2 bg-black/50 text-white p-2 rounded-full hover:bg-black/70 transition-colors"
                              aria-label="Previous image"
                            >
                              <ChevronLeft className="h-5 w-5" />
                            </button>
                            <button
                              onClick={nextImage}
                              className="absolute right-3 top-1/2 transform -translate-y-1/2 bg-black/50 text-white p-2 rounded-full hover:bg-black/70 transition-colors"
                              aria-label="Next image"
                            >
                              <ChevronRight className="h-5 w-5" />
                            </button>
                          </>
                        )}
                      </div>

                      {allImages.length > 1 && (
                        <div className="p-3 flex gap-2 overflow-x-auto bg-muted">
                          {allImages.map((img, idx) => (
                            <button
                              key={idx}
                              onClick={() => setCurrentImage(idx)}
                              className={`flex-shrink-0 w-24 h-16 border rounded overflow-hidden ${idx === currentImage ? 'ring-2 ring-primary' : 'opacity-80 hover:opacity-100'}`}
                              aria-label={`Show image ${idx + 1}`}
                            >
                              <img 
                                src={img} 
                                alt={`thumbnail ${idx + 1}`} 
                                className="w-full h-full object-cover" 
                              />
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
                    {/* Property Type Badge */}
                    <div className={`px-3 py-1 rounded-full text-sm font-semibold shadow-lg flex items-center ${
                      property.property_type === 'rental' 
                        ? 'bg-blue-500 text-white' 
                        : 'bg-primary text-primary-foreground'
                    }`}>
                      {property.property_type === 'rental' ? (
                        <>
                          <Calendar size={14} className="mr-1" />
                          For Rent
                        </>
                      ) : (
                        'For Sale'
                      )}
                    </div>

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

                  {/* Price Section */}
                  <div className="mb-4">
                    <div className="text-3xl font-extrabold text-foreground">
                      {formatPrice(property.price)}
                      {property.property_type === 'rental' && property.rental_period && (
                        <span className="text-lg font-normal ml-1 text-muted-foreground">
                          {getRentalPeriodText(property.rental_period)}
                        </span>
                      )}
                    </div>
                    
                    {/* Security Deposit for Rental */}
                    {property.property_type === 'rental' && property.security_deposit && (
                      <div className="flex items-center gap-2 mt-2 text-sm text-muted-foreground">
                        <Shield className="h-4 w-4" />
                        <span>Security Deposit: {formatPrice(property.security_deposit)}</span>
                      </div>
                    )}
                  </div>

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
                      <Button className="w-full">
                        {property.property_type === 'rental' ? 'Schedule Viewing' : 'Contact Agent'}
                      </Button>
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
                    <div><span className="text-muted-foreground">Listing Type: </span>
                      <span className={`font-medium ${
                        property.property_type === 'rental' ? 'text-blue-600' : 'text-primary'
                      }`}>
                        {property.property_type === 'rental' ? 'For Rent' : 'For Sale'}
                      </span>
                    </div>
                    {property.property_type === 'rental' && property.rental_period && (
                      <div><span className="text-muted-foreground">Rental Period: </span>
                        <span className="font-medium">{getRentalPeriodDisplay(property.rental_period)}</span>
                      </div>
                    )}
                    <div><span className="text-muted-foreground">Location: </span>{property.location}</div>
                    <div><span className="text-muted-foreground">Status: </span>{property.featured ? 'Featured' : 'Standard'}</div>
                    {property.exclusive && (
                      <div><span className="text-muted-foreground">Access: </span>Exclusive Members</div>
                    )}
                    {property.investmentOpportunity && (
                      <div><span className="text-muted-foreground">Category: </span>Investment Property</div>
                    )}
                    {property.property_type === 'rental' && property.security_deposit && (
                      <div><span className="text-muted-foreground">Security Deposit: </span>
                        <span className="font-medium">{formatPrice(property.security_deposit)}</span>
                      </div>
                    )}
                  </div>
                </div>

                {/* Rental Specific Information */}
                {property.property_type === 'rental' && (
                  <div className="bg-primary border border-primary p-4 rounded-lg">
                    <div className="flex items-center gap-2 mb-2">
                      <Calendar className="h-5 w-5 text-white" />
                      <h3 className="font-semibold text-white">Rental Information</h3>
                    </div>
                    <div className="text-sm text-white space-y-1">
                      <p>• Minimum lease: 12 months</p>
                      <p>• Utilities not included</p>
                      <p>• Available for immediate occupancy</p>
                      <p>• Pet-friendly (with additional deposit)</p>
                    </div>
                  </div>
                )}
              </aside>
            </div>
          )}
        </div>
      </section>
      <Footer />

      {/* Image Modal */}
      {isModalOpen && allImages.length > 0 && (
        <div className="fixed inset-0 bg-black/90 z-50 flex items-center justify-center p-4">
          <button
            onClick={closeModal}
            className="absolute top-4 right-4 text-white p-2 hover:bg-white/10 rounded-full transition-colors"
            aria-label="Close modal"
          >
            <X className="h-6 w-6" />
          </button>

          {allImages.length > 1 && (
            <>
              <button
                onClick={prevModalImage}
                className="absolute left-4 top-1/2 transform -translate-y-1/2 text-white p-3 hover:bg-white/10 rounded-full transition-colors"
                aria-label="Previous image"
              >
                <ChevronLeft className="h-8 w-8" />
              </button>
              <button
                onClick={nextModalImage}
                className="absolute right-4 top-1/2 transform -translate-y-1/2 text-white p-3 hover:bg-white/10 rounded-full transition-colors"
                aria-label="Next image"
              >
                <ChevronRight className="h-8 w-8" />
              </button>
            </>
          )}

          <div className="relative max-w-4xl max-h-full w-full h-full flex items-center justify-center">
            <img
              src={allImages[modalImageIndex]}
              alt={`${property?.title} image ${modalImageIndex + 1}`}
              className="max-w-full max-h-full object-contain"
            />
            
            {/* Image counter */}
            <div className="absolute bottom-4 left-1/2 transform -translate-x-1/2 bg-black/50 text-white px-3 py-1 rounded-full text-sm">
              {modalImageIndex + 1} / {allImages.length}
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default PropertyDetails;