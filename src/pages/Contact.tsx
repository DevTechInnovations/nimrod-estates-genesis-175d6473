import { Mail, Phone, MapPin, Clock, Send, X, CheckCircle, AlertCircle } from 'lucide-react';
import Navbar from '@/components/Navbar';
import { useState } from 'react';
import Footer from '@/components/Footer';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import heroImage from '@/assets/neo-brutalism-inspired-building.jpg';
import { Helmet } from "react-helmet-async";

const Contact = () => {
  const [loading, setLoading] = useState(false);
  const [alert, setAlert] = useState<{ show: boolean; type: 'success' | 'error'; message: string }>({
    show: false,
    type: 'success',
    message: ''
  });

  const showAlert = (type: 'success' | 'error', message: string) => {
    setAlert({ show: true, type, message });
    // Auto hide after 5 seconds
    setTimeout(() => {
      setAlert(prev => ({ ...prev, show: false }));
    }, 5000);
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setLoading(true);

    const formData = {
      firstName: (e.target as any).firstName.value,
      lastName: (e.target as any).lastName.value,
      email: (e.target as any).email.value,
      phone: (e.target as any).phone.value,
      subject: (e.target as any).subject.value,
      message: (e.target as any).message.value,
    };

    try {
      const res = await fetch('https://back-end.nimrodestates.com/api/contact', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(formData),
      });

      const result = await res.json();

      if (result.success) {
        showAlert('success', 'Message sent successfully! We will get back to you within 24 hours.');
        (e.target as HTMLFormElement).reset();
      } else {
        showAlert('error', 'Failed to send message. Please try again or contact us directly.');
      }
    } catch (err) {
      console.error(err);
      showAlert('error', 'Network error. Please check your connection and try again.');
    }

    setLoading(false);
  };

  return (
    <div className="min-h-screen">
            {/* SEO Section */}
<Helmet>
  <title>Contact Us | Nimrod Property Estates | Luxury Real Estate Experts</title>
  <meta
    name="description"
    content="Contact Nimrod Property Estates for luxury real estate investments and property opportunities in South Africa, Dubai, and Monaco. Speak directly with our expert team today."
  />
  <meta
    name="keywords"
    content="Property for rent, Property investment in South Africa, Property investment in Dubai, Property investment in Monaco, Property development, Property to buy, Real estate investments, Luxury properties, Nimrod Property Estates"
  />
  <meta property="og:title" content="Contact Nimrod Property Estates | Global Property Experts" />
  <meta
    property="og:description"
    content="Get in touch with Nimrod Property Estates — leaders in luxury property investment and development across Monaco, Dubai, and South Africa."
  />
  <meta property="og:image" content="https://nimrodestates.com/NM.png" />
  <meta property="og:url" content="https://nimrodestates.com/contact" />
  <meta property="og:type" content="website" />
  <link rel="canonical" href="https://nimrodestates.com/contact" />

  <script type="application/ld+json">
    {`
      {
        "@context": "https://schema.org",
        "@type": "ContactPage",
        "name": "Contact Nimrod Property Estates",
        "url": "https://nimrodestates.com/contact",
        "about": {
          "@type": "Organization",
          "name": "Nimrod Property Estates",
          "url": "https://nimrodestates.com",
          "logo": "https://nimrodestates.com/logo.png",
          "sameAs": [
            "https://www.facebook.com/nimrodestates",
            "https://www.instagram.com/nimrodestates",
            "https://www.linkedin.com/company/nimrodestates"
          ],
          "contactPoint": {
            "@type": "ContactPoint",
            "telephone": "+971 58 305 1460",
            "contactType": "Customer Service",
            "areaServed": ["Dubai", "Monaco", "South Africa"],
            "availableLanguage": ["English"]
          }
        },
        "mainEntity": {
          "@type": "Organization",
          "name": "Nimrod Property Estates",
          "address": [
            {
              "@type": "PostalAddress",
              "streetAddress": "Monte Carlo Sun, Bd d'Italie 74",
              "addressLocality": "Monaco",
              "postalCode": "98000"
            },
            {
              "@type": "PostalAddress",
              "streetAddress": "Emirates Towers",
              "addressLocality": "Dubai",
              "addressCountry": "UAE"
            },
            {
              "@type": "PostalAddress",
              "streetAddress": "96 Rivonia Road, Sandton",
              "addressLocality": "Gauteng",
              "addressCountry": "South Africa"
            }
          ]
        }
      }
    `}
  </script>
</Helmet>
      <Navbar />

      {/* Beautiful Alert Notification */}
      {alert.show && (
        <div className="fixed top-4 right-4 z-50 animate-in slide-in-from-right duration-300">
          <div className={`flex items-center p-4 rounded-2xl shadow-lg border-2 max-w-md ${
            alert.type === 'success' 
              ? 'bg-green-50 border-green-200 text-green-800' 
              : 'bg-red-50 border-red-200 text-red-800'
          }`}>
            <div className="flex-shrink-0">
              {alert.type === 'success' ? (
                <CheckCircle className="h-6 w-6 text-green-600" />
              ) : (
                <AlertCircle className="h-6 w-6 text-red-600" />
              )}
            </div>
            <div className="ml-3 flex-1">
              <p className="text-sm font-medium">{alert.message}</p>
            </div>
            <button
              onClick={() => setAlert(prev => ({ ...prev, show: false }))}
              className="ml-4 flex-shrink-0 rounded-lg p-1 hover:bg-black/10 transition-colors"
            >
              <X className="h-4 w-4" />
            </button>
          </div>
        </div>
      )}

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
            Get in <span className="text-gradient-gold">Touch</span>
          </h1>
          <p className="text-xl md:text-2xl max-w-3xl mx-auto text-white/90">
            We're here to help you find your perfect investment opportunity
          </p>
        </div>
      </section>

      {/* Contact Form & Info */}
      <section className="py-20 bg-white">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 max-w-6xl mx-auto">
            {/* Contact Form */}
            <div className="bg-white p-8 rounded-2xl border-2 border-gray-100 shadow-lg">
              <h2 className="font-heading text-3xl font-bold mb-6 text-gray-900">
                Send Us a Message
              </h2>
              <form className="space-y-6" onSubmit={handleSubmit}>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm font-medium mb-2 text-gray-700">
                      First Name *
                    </label>
                    <Input 
                      type="text" 
                      name="firstName" 
                      placeholder="John" 
                      required 
                      className="border-gray-300 focus:border-primary transition-colors" 
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium mb-2 text-gray-700">
                      Last Name *
                    </label>
                    <Input 
                      type="text" 
                      name="lastName" 
                      placeholder="Doe" 
                      required 
                      className="border-gray-300 focus:border-primary transition-colors" 
                    />
                  </div>
                </div>

                <div>
                  <label className="block text-sm font-medium mb-2 text-gray-700">
                    Email Address *
                  </label>
                  <Input 
                    type="email" 
                    name="email" 
                    placeholder="john.doe@gmail.com" 
                    required 
                    className="border-gray-300 focus:border-primary transition-colors" 
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium mb-2 text-gray-700">
                    Phone Number
                  </label>
                  <Input 
                    type="tel" 
                    name="phone" 
                    placeholder="+27 79 123 4567" 
                    className="border-gray-300 focus:border-primary transition-colors" 
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium mb-2 text-gray-700">
                    Subject *
                  </label>
                  <Input 
                    type="text" 
                    name="subject" 
                    placeholder="Investment Enquiry" 
                    required 
                    className="border-gray-300 focus:border-primary transition-colors" 
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium mb-2 text-gray-700">
                    Message *
                  </label>
                  <Textarea 
                    name="message" 
                    rows={6} 
                    placeholder="Tell us about your investment goals..." 
                    required 
                    className="border-gray-300 focus:border-primary transition-colors resize-none" 
                  />
                </div>

                <Button 
                  type="submit" 
                  size="lg" 
                  className="w-full bg-primary hover:bg-primary/90 text-white transition-all duration-300 transform hover:scale-[1.02] active:scale-[0.98]" 
                  disabled={loading}
                >
                  {loading ? (
                    <div className="flex items-center gap-2">
                      <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin" />
                      Sending...
                    </div>
                  ) : (
                    <div className="flex items-center gap-2">
                      <Send className="mr-2" size={20} />
                      Send Message
                    </div>
                  )}
                </Button>
              </form>
            </div>

            {/* Contact Information */}
            <div className="space-y-8">
              <div>
                <h2 className="font-heading text-3xl font-bold mb-6 text-gray-900">
                  Contact Information
                </h2>
                <p className="text-muted-foreground mb-8 text-lg">
                  Our team is ready to assist you with any questions about our
                  properties, services, or exclusive investment opportunities.
                </p>
              </div>

              {/* Contact Details - Platinum Style */}
              <div className="space-y-6">
                <div className="flex items-start space-x-4 p-6 rounded-3xl bg-secondary border-2 border-gray-800 hover:border-primary hover:-translate-y-1 transition-all duration-300 shadow-xl">
                  <div className="flex-shrink-0 w-12 h-12 bg-primary/20 rounded-xl flex items-center justify-center">
                    <MapPin className="text-primary" size={24} />
                  </div>
                  <div>
                    <h3 className="font-semibold mb-1 text-white">
                      Office Addresses
                    </h3>
                    <p className="text-gray-300 text-sm">
                      <strong className="text-primary">Monaco:</strong> Monte Carlo Sun, Bd d'Italie 74, 98000 Monaco<br />
                      <strong className="text-primary">Dubai:</strong> Emirates Towers, Dubai, UAE<br />
                      <strong className="text-primary">South Africa:</strong> 96 Rivonia Road, Sandton, Gauteng
                    </p>
                  </div>
                </div>

                <div className="flex items-start space-x-4 p-6 rounded-3xl bg-secondary border-2 border-gray-800 hover:border-primary hover:-translate-y-1 transition-all duration-300 shadow-xl">
                  <div className="flex-shrink-0 w-12 h-12 bg-primary/20 rounded-xl flex items-center justify-center">
                    <Phone className="text-primary" size={24} />
                  </div>
                  <div>
                    <h3 className="font-semibold mb-1 text-white">
                      Phone Numbers
                    </h3>
                    <p className="text-gray-300 text-sm">
                      <strong className="text-primary">Dubai:</strong> +971 58 305 1460<br />
                      <strong className="text-primary">South Africa:</strong> +27 63 730 1255<br />
                      <strong className="text-primary">South Africa (Alt):</strong> +27 79 354 3708
                      <strong className="text-primary">Telephone</strong> +27 10 745 0361<br />
                    </p>
                  </div>
                </div>

                <div className="flex items-start space-x-4 p-6 rounded-3xl bg-secondary border-2 border-gray-800 hover:border-primary hover:-translate-y-1 transition-all duration-300 shadow-xl">
                  <div className="flex-shrink-0 w-12 h-12 bg-primary/20 rounded-xl flex items-center justify-center">
                    <Mail className="text-primary" size={24} />
                  </div>
                  <div>
                    <h3 className="font-semibold mb-1 text-white">Email</h3>
                    <p className="text-gray-300 text-sm">
                      info@nimrodestates.com
                    </p>
                  </div>
                </div>

                <div className="flex items-start space-x-4 p-6 rounded-3xl bg-secondary border-2 border-gray-800 hover:border-primary hover:-translate-y-1 transition-all duration-300 shadow-xl">
                  <div className="flex-shrink-0 w-12 h-12 bg-primary/20 rounded-xl flex items-center justify-center">
                    <Clock className="text-primary" size={24} />
                  </div>
                  <div>
                    <h3 className="font-semibold mb-1 text-white">
                      Business Hours
                    </h3>
                    <p className="text-gray-300 text-sm">
                      <span className="font-semibold text-primary">Monday - Saturday:</span> 7:00 AM - 8:00 PM<br />
                      <span className="font-semibold text-primary">Sunday:</span> Closed
                    </p>
                  </div>
                </div>
              </div>

              {/* Map Placeholder */}
              <div className="p-6 rounded-3xl bg-secondary border-2 border-gray-800 hover:border-primary hover:-translate-y-1 transition-all duration-300 shadow-xl">
                <div className="flex items-center space-x-4 mb-4">
                  <div className="flex-shrink-0 w-12 h-12 bg-primary/20 rounded-xl flex items-center justify-center">
                    <MapPin className="text-primary" size={24} />
                  </div>
                  <div>
                    <h3 className="font-semibold text-white">Our Location</h3>
                  </div>
                </div>
                <div className="bg-secondary h-48 rounded-2xl flex items-center justify-center border-2 border-white-700">
                  <div className="text-center text-gray-300">
                    <MapPin size={48} className="mx-auto mb-2 text-primary/50" />
                    <p className="font-medium">Our Global Offices</p>
                    <p className="text-sm">
                      Monaco • Dubai • South Africa
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      <Footer />
    </div>
  );
};

export default Contact;