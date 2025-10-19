import { Mail, Phone, MapPin, Clock, Send } from 'lucide-react';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import heroImage from '@/assets/neo-brutalism-inspired-building.jpg';

const Contact = () => {
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
              <h2 className="font-heading text-3xl font-bold mb-6 text-gray-900">Send Us a Message</h2>
              <form className="space-y-6">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm font-medium mb-2 text-gray-700">First Name *</label>
                    <Input type="text" placeholder="John" required className="border-gray-300" />
                  </div>
                  <div>
                    <label className="block text-sm font-medium mb-2 text-gray-700">Last Name *</label>
                    <Input type="text" placeholder="Doe" required className="border-gray-300" />
                  </div>
                </div>

                <div>
                  <label className="block text-sm font-medium mb-2 text-gray-700">Email Address *</label>
                  <Input type="email" placeholder="john.doe@example.com" required className="border-gray-300" />
                </div>

                <div>
                  <label className="block text-sm font-medium mb-2 text-gray-700">Phone Number</label>
                  <Input type="tel" placeholder="+1 (555) 123-4567" className="border-gray-300" />
                </div>

                <div>
                  <label className="block text-sm font-medium mb-2 text-gray-700">Subject *</label>
                  <Input type="text" placeholder="Investment Inquiry" required className="border-gray-300" />
                </div>

                <div>
                  <label className="block text-sm font-medium mb-2 text-gray-700">Message *</label>
                  <Textarea
                    rows={6}
                    placeholder="Tell us about your investment goals and how we can help..."
                    required
                    className="border-gray-300"
                  />
                </div>

                <Button type="submit" size="lg" className="w-full bg-primary hover:bg-primary/90 text-white">
                  <Send className="mr-2" size={20} />
                  Send Message
                </Button>
              </form>
            </div>

            {/* Contact Information */}
            <div className="space-y-8">
              <div>
                <h2 className="font-heading text-3xl font-bold mb-6 text-gray-900">Contact Information</h2>
                <p className="text-muted-foreground mb-8 text-lg">
                  Our team is ready to assist you with any questions about our properties, 
                  services, or membership programs.
                </p>
              </div>

              {/* Contact Details */}
              <div className="space-y-6">
                <div className="flex items-start space-x-4 p-4 rounded-2xl bg-gray-50 hover:bg-primary/5 transition-colors duration-300">
                  <div className="flex-shrink-0 w-12 h-12 bg-primary/10 rounded-full flex items-center justify-center">
                    <MapPin className="text-primary" size={24} />
                  </div>
                  <div>
                    <h3 className="font-semibold mb-1 text-gray-900">Office Address</h3>
                    <p className="text-muted-foreground">
                      123 Luxury Avenue, Suite 500<br />
                      Global City, GC 10001
                    </p>
                  </div>
                </div>

                <div className="flex items-start space-x-4 p-4 rounded-2xl bg-gray-50 hover:bg-primary/5 transition-colors duration-300">
                  <div className="flex-shrink-0 w-12 h-12 bg-primary/10 rounded-full flex items-center justify-center">
                    <Phone className="text-primary" size={24} />
                  </div>
                  <div>
                    <h3 className="font-semibold mb-1 text-gray-900">Phone</h3>
                    <p className="text-muted-foreground">
                      +1 (555) 123-4567<br />
                      +1 (555) 123-4568 (International)
                    </p>
                  </div>
                </div>

                <div className="flex items-start space-x-4 p-4 rounded-2xl bg-gray-50 hover:bg-primary/5 transition-colors duration-300">
                  <div className="flex-shrink-0 w-12 h-12 bg-primary/10 rounded-full flex items-center justify-center">
                    <Mail className="text-primary" size={24} />
                  </div>
                  <div>
                    <h3 className="font-semibold mb-1 text-gray-900">Email</h3>
                    <p className="text-muted-foreground">
                      info@nimrodestates.com<br />
                      support@nimrodestates.com
                    </p>
                  </div>
                </div>

                <div className="flex items-start space-x-4 p-4 rounded-2xl bg-gray-50 hover:bg-primary/5 transition-colors duration-300">
                  <div className="flex-shrink-0 w-12 h-12 bg-primary/10 rounded-full flex items-center justify-center">
                    <Clock className="text-primary" size={24} />
                  </div>
                  <div>
                    <h3 className="font-semibold mb-1 text-gray-900">Business Hours</h3>
                    <p className="text-muted-foreground">
                      Monday - Friday: 9:00 AM - 6:00 PM<br />
                      Saturday: 10:00 AM - 4:00 PM<br />
                      Sunday: Closed
                    </p>
                  </div>
                </div>
              </div>

              {/* Map Placeholder */}
              <div className="bg-gray-100 h-64 rounded-2xl flex items-center justify-center mt-8 border-2 border-gray-200">
                <div className="text-center text-muted-foreground">
                  <MapPin size={48} className="mx-auto mb-2 text-primary/50" />
                  <p className="font-medium">Interactive Google Map</p>
                  <p className="text-sm">123 Luxury Avenue, Global City</p>
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