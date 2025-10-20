import { Link } from 'react-router-dom';
import { Mail, Phone, MapPin, Facebook, Twitter, Instagram, Linkedin } from 'lucide-react';

const Footer = () => {
  return (
    <footer className="bg-secondary text-secondary-foreground">
      <div className="container mx-auto px-4 py-12">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
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
              <li className="hover:text-primary transition-colors cursor-pointer">Property Sales</li>
              <li className="hover:text-primary transition-colors cursor-pointer">Property Management</li>
              <li className="hover:text-primary transition-colors cursor-pointer">Investment Advisory</li>
              <li className="hover:text-primary transition-colors cursor-pointer">Market Research</li>
            </ul>
          </div>

          {/* Contact */}
          <div>
            <h4 className="font-heading font-semibold mb-4">Contact Us</h4>
            <ul className="space-y-3 text-sm">
              <li className="flex items-start space-x-2">
                <MapPin size={16} className="mt-1 text-primary flex-shrink-0" />
                <span>Emirates Towers, Shaikh Zayed Rd , Dubai , UAE</span>
              </li>
              <li className="flex items-center space-x-2">
                <Phone size={16} className="text-primary flex-shrink-0" />
                <span>+971 58 305 1460 </span>
              </li>
              <li className="flex items-center space-x-2">
                <Mail size={16} className="text-primary flex-shrink-0" />
                <span> info@nimrodestates.com </span>
              </li>
            </ul>
          </div>
        </div>

        <div className="border-t border-border mt-8 pt-8 text-center text-sm text-muted-foreground">
          <p>&copy; {new Date().getFullYear()} Nimrod Estates. All rights reserved.</p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
