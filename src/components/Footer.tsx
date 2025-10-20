import { Link } from 'react-router-dom';
import { Mail, Phone, MapPin, Facebook, Twitter, Instagram, Linkedin } from 'lucide-react';

const Footer = () => {
  return (
    <footer className="bg-secondary text-secondary-foreground">
      <div className="container mx-auto px-4 py-12">
        <div className="grid grid-cols-1 md:grid-cols-5 gap-8">
          {/* Company Info */}
          <div>
            <h3 className="text-xl font-heading font-bold mb-4">
              <span className="text-gradient-gold">NIMROD</span> ESTATES
            </h3>
            <p className="text-sm text-muted-foreground mb-4">
              Empowering investors with global real estate opportunities.
            </p>
            <div className="flex space-x-4">
              <a href="#" className="hover:text-primary transition-colors">
                <Facebook size={20} />
              </a>
              <a href="#" className="hover:text-primary transition-colors">
                <Twitter size={20} />
              </a>
              <a href="#" className="hover:text-primary transition-colors">
                <Instagram size={20} />
              </a>
              <a href="#" className="hover:text-primary transition-colors">
                <Linkedin size={20} />
              </a>
            </div>
          </div>

          {/* Quick Links */}
          <div>
            <h4 className="font-heading font-semibold mb-4">Quick Links</h4>
            <ul className="space-y-2 text-sm">
              <li>
                <Link to="/" className="hover:text-primary transition-colors">
                  Home
                </Link>
              </li>
              <li>
                <Link to="/about" className="hover:text-primary transition-colors">
                  About Us
                </Link>
              </li>
              <li>
                <Link to="/services" className="hover:text-primary transition-colors">
                  Services
                </Link>
              </li>
              <li>
                <Link to="/properties" className="hover:text-primary transition-colors">
                  Properties
                </Link>
              </li>
            </ul>
          </div>

          {/* Services */}
          <div>
            <h4 className="font-heading font-semibold mb-4">Services</h4>
            <ul className="space-y-2 text-sm">
              <li>
                <Link to="/services/real-estate" className="hover:text-primary transition-colors">
                  Real Estate Services
                </Link>
              </li>
              <li>
                <Link to="/services/wealth-investment" className="hover:text-primary transition-colors">
                  Wealth & Investment
                </Link>
              </li>
              <li>
                <Link to="/services/business-consulting" className="hover:text-primary transition-colors">
                  Business Consulting
                </Link>
              </li>
              <li>
                <Link to="/services/business-setup" className="hover:text-primary transition-colors">
                  Business Setup
                </Link>
              </li>
            </ul>
          </div>

          {/* Global Offices */}
          <div>
            <h4 className="font-heading font-semibold mb-4">Global Offices</h4>
            <div className="space-y-3 text-sm">
              <div className="flex items-center space-x-2">
                <MapPin size={14} className="text-primary flex-shrink-0" />
                <span className="text-white">Monaco</span>
              </div>
              <div className="flex items-center space-x-2">
                <MapPin size={14} className="text-primary flex-shrink-0" />
                <span className="text-white">Dubai</span>
              </div>
              <div className="flex items-center space-x-2">
                <MapPin size={14} className="text-primary flex-shrink-0" />
                <span className="text-white">South Africa</span>
              </div>
            </div>
          </div>

          {/* Contact Info */}
          <div>
            <h4 className="font-heading font-semibold mb-4">Contact Info</h4>
            <div className="space-y-3 text-sm">
              <div className="space-y-2">
                <div className="flex items-center space-x-2">
                  <Phone size={14} className="text-primary flex-shrink-0" />
                  <span className="text-white">+971 58 3051460</span>
                </div>
                <div className="flex items-center space-x-2">
                  <Phone size={14} className="text-primary flex-shrink-0" />
                  <span className="text-white">+27 63 730 1255</span>
                </div>
                <div className="flex items-center space-x-2">
                  <Phone size={14} className="text-primary flex-shrink-0" />
                  <span className="text-white">+27 79 354 3708</span>
                </div>
              </div>
              <div className="flex items-center space-x-2 pt-2">
                <Mail size={14} className="text-primary flex-shrink-0" />
                <span className="text-white">info@nimrodestates.com</span>
              </div>
            </div>
          </div>
        </div>

        {/* Copyright and Powered By Section */}
        <div className="border-t border-border mt-8 pt-8 text-center text-sm text-muted-foreground">
          <p className="mb-2">&copy; {new Date().getFullYear()} Nimrod Estates. All rights reserved.</p>
          <p>
            Powered by{' '}
            <a 
              href="https://www.devtechinnovations.co.za/" 
              target="_blank" 
              rel="noopener noreferrer"
              className="text-primary hover:text-primary/80 transition-colors font-medium"
            >
              DevTech Innovations
            </a>
          </p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;