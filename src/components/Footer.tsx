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
               <li>
                <Link to="/services/business-setup" className="hover:text-primary transition-colors">
                  Property Development
                </Link>
              </li>
            </ul>
          </div>

          {/* Global Offices */}
          <div>
            <h4 className="font-heading font-semibold mb-4">Global Offices</h4>
            <div className="space-y-4 text-sm text-white">
              {/* Monaco */}
              <div>
                <div className="flex items-center space-x-2 mb-1">
                  <MapPin size={14} className="text-primary flex-shrink-0" />
                  <span className="font-semibold">Monaco</span>
                </div>
                <p className="text-muted-foreground">
                  Monte Carlo Sun, Bd d'Italie 74, 98000 Monaco
                </p>
              </div>

              {/* Dubai */}
              {/* <div>
                <div className="flex items-center space-x-2 mb-1">
                  <MapPin size={14} className="text-primary flex-shrink-0" />
                  <span className="font-semibold">Dubai</span>
                </div>
                <p className="text-muted-foreground">
                  Emirates Towers, Dubai, United Arab Emirates
                </p>
              </div> */}

              {/* South Africa */}
              <div>
                <div className="flex items-center space-x-2 mb-1">
                  <MapPin size={14} className="text-primary flex-shrink-0" />
                  <span className="font-semibold">South Africa</span>
                </div>
                <p className="text-muted-foreground">
                  96 Rivonia Road, Sandton, Gauteng
                </p>
              </div>
               <div>
                <div className="flex items-center space-x-2 mb-1">
                  <MapPin size={14} className="text-primary flex-shrink-0" />
                  <span className="font-semibold">South Africa (Midrand)</span>
                </div>
                <p className="text-muted-foreground">
                 Building 10, Thornhill Office Park, 94 Bekker Rd, Vorna Valley, Midrand, 1686
                </p>
              </div>
            </div>
          </div>

          {/* Contact Info */}
        <div>
  <h4 className="font-heading font-semibold mb-4">Contact Info</h4>
  <div className="space-y-3 text-sm">
    <div className="space-y-4">
      <div className="flex flex-col">
        {/* <span className="text-primary font-semibold">Dubai:</span>
        <div className="flex items-center space-x-2">
          <Phone size={14} className="text-primary flex-shrink-0" />
          <span className="text-white">+971 58 305 1460</span>
        </div> */}
      </div>

      <div className="flex flex-col">
        <span className="text-primary font-semibold">South Africa:</span>
        <div className="flex items-center space-x-2">
          <Phone size={14} className="text-primary flex-shrink-0" />
          <span className="text-white">+27 63 730 1255</span>
        </div>
      </div>

      <div className="flex flex-col">
        <span className="text-primary font-semibold">South Africa (Alt):</span>
        <div className="flex items-center space-x-2">
          <Phone size={14} className="text-primary flex-shrink-0" />
          <span className="text-white">+27 79 354 3708</span>
        </div>
      </div>

        <div className="flex flex-col">
        <span className="text-primary font-semibold">Telephone:</span>
        <div className="flex items-center space-x-2">
          <Phone size={14} className="text-primary flex-shrink-0" />
          <span className="text-white">+27 10 745 0361</span>
        </div>
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
          <p className="mb-2">
            &copy; {new Date().getFullYear()} Nimrod Estates. All rights reserved.
          </p>
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