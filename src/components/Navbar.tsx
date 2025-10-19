import { useState, useEffect } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { Menu, X, ChevronDown, User, Shield } from 'lucide-react';
import { Button } from '@/components/ui/button';

const Navbar = () => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [isLoginDropdownOpen, setIsLoginDropdownOpen] = useState(false);
  const location = useLocation();

  useEffect(() => {
    const handleScroll = () => setIsScrolled(window.scrollY > 20);
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const navLinks = [
    { name: 'Home', path: '/' },
    { name: 'About', path: '/about' },
    { name: 'Services', path: '/services' },
    { name: 'Properties', path: '/properties' },
    { name: 'Contact', path: '/contact' },
  ];

  const isActive = (path: string) => location.pathname === path;

  // Dynamic color setup
  const textColor = isScrolled ? 'text-black' : 'text-white';
  const textColorSoft = isScrolled
    ? 'text-black/70 hover:text-primary'
    : 'text-white/80 hover:text-primary';
  const borderColor = 'border-primary';
  const dropdownBg = isScrolled
    ? 'bg-white border-gray-200'
    : 'bg-black/90 border-white/20';
  const dropdownText = isScrolled
    ? 'text-black hover:text-primary'
    : 'text-white/90 hover:text-primary';
  const iconColor = isScrolled ? 'text-black' : 'text-white';

  return (
    <nav
      className={`fixed top-0 w-full z-50 transition-all duration-300 ${
        isScrolled ? 'bg-white shadow-lg' : 'bg-transparent'
      }`}
    >
      <div className="container mx-auto px-4">
        <div className="flex items-center justify-between h-20">
          {/* Logo */}
          <Link to="/" className="flex items-center space-x-2">
            <img
              src="/NM.png"
              alt="Nimrod Estates logo"
              className="w-15 h-14"
              loading="eager"
            />
          </Link>

          {/* Desktop Navigation */}
          <div className="hidden md:flex items-center space-x-8">
            {navLinks.map((link) => (
              <Link
                key={link.path}
                to={link.path}
                className={`text-sm font-medium transition-all duration-300 ${
                  isActive(link.path)
                    ? `${textColor} border-b-2 ${borderColor}`
                    : textColorSoft
                }`}
              >
                {link.name}
              </Link>
            ))}

            {/* Login Dropdown */}
            <div className="relative">
              <button
                className={`text-sm font-medium transition-all duration-300 flex items-center gap-1 ${
                  isLoginDropdownOpen
                    ? `${textColor} border-b-2 ${borderColor}`
                    : textColorSoft
                }`}
                onClick={() => setIsLoginDropdownOpen(!isLoginDropdownOpen)}
              >
                Login
                <ChevronDown
                  className={`h-4 w-4 transition-transform ${iconColor} ${
                    isLoginDropdownOpen ? 'rotate-180' : ''
                  }`}
                />
              </button>

              {isLoginDropdownOpen && (
                <div
                  className={`absolute top-full right-0 mt-2 w-48 ${dropdownBg} rounded-lg shadow-lg py-2 z-50`}
                >
                  <Link
                    to="/member-auth"
                    className={`flex items-center gap-3 px-4 py-2 text-sm transition-colors ${dropdownText}`}
                    onClick={() => setIsLoginDropdownOpen(false)}
                  >
                    <User className={`h-4 w-4 ${iconColor}`} />
                    <span>Member Login</span>
                  </Link>
                  <Link
                    to="/auth"
                    className={`flex items-center gap-3 px-4 py-2 text-sm transition-colors ${dropdownText}`}
                    onClick={() => setIsLoginDropdownOpen(false)}
                  >
                    <Shield className={`h-4 w-4 ${iconColor}`} />
                    <span>Admin Login</span>
                  </Link>
                </div>
              )}
            </div>
          </div>

          {/* Mobile Menu Button */}
          <button
            className={`md:hidden ${textColor}`}
            onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
          >
            {isMobileMenuOpen ? <X size={24} /> : <Menu size={24} />}
          </button>
        </div>

        {/* Mobile Menu */}
        {isMobileMenuOpen && (
          <div
            className={`md:hidden py-4 ${
              isScrolled
                ? 'bg-white text-black'
                : 'bg-black/90 text-white backdrop-blur-md'
            }`}
          >
            {navLinks.map((link) => (
              <Link
                key={link.path}
                to={link.path}
                onClick={() => setIsMobileMenuOpen(false)}
                className={`block py-2 text-sm font-medium transition-colors ${
                  isActive(link.path)
                    ? 'text-primary'
                    : isScrolled
                    ? 'text-black/80 hover:text-primary'
                    : 'text-white/80 hover:text-primary'
                }`}
              >
                {link.name}
              </Link>
            ))}

            {/* Mobile Login Options */}
            <div
              className={`border-t mt-4 pt-4 ${
                isScrolled ? 'border-black/20' : 'border-white/20'
              }`}
            >
              <div
                className={`text-sm font-medium px-2 py-1 ${
                  isScrolled ? 'text-black/60' : 'text-white/60'
                }`}
              >
                Login Options
              </div>
              <Link
                to="/member-auth"
                onClick={() => setIsMobileMenuOpen(false)}
                className={`flex items-center gap-3 py-2 text-sm transition-colors ${
                  isScrolled
                    ? 'text-black/80 hover:text-primary'
                    : 'text-white/80 hover:text-primary'
                }`}
              >
                <User className={`h-4 w-4 ${iconColor}`} />
                <span>Member Login</span>
              </Link>
              <Link
                to="/auth"
                onClick={() => setIsMobileMenuOpen(false)}
                className={`flex items-center gap-3 py-2 text-sm transition-colors ${
                  isScrolled
                    ? 'text-black/80 hover:text-primary'
                    : 'text-white/80 hover:text-primary'
                }`}
              >
                <Shield className={`h-4 w-4 ${iconColor}`} />
                <span>Admin Login</span>
              </Link>
            </div>
          </div>
        )}
      </div>

      {/* Click outside to close dropdown */}
      {isLoginDropdownOpen && (
        <div
          className="fixed inset-0 z-40"
          onClick={() => setIsLoginDropdownOpen(false)}
        />
      )}
    </nav>
  );
};

export default Navbar;