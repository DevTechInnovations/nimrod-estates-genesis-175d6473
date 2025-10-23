import { useState, useEffect } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { Menu, X, ChevronDown, User, Shield, LayoutDashboard } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { useAuth } from '@/contexts/AuthContext';

const Navbar = () => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [isLoginDropdownOpen, setIsLoginDropdownOpen] = useState(false);
  const [isServicesDropdownOpen, setIsServicesDropdownOpen] = useState(false);
  const location = useLocation();
  const { user } = useAuth();

  useEffect(() => {
    const handleScroll = () => setIsScrolled(window.scrollY > 20);
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const navLinks = [
    { name: 'Home', path: '/' },
    { name: 'About', path: '/about' },
    { name: 'Properties', path: '/properties' },
    { name: 'Contact', path: '/contact' },
  ];

  const mainServiceCategories = [
    { name: 'Real Estate Services', path: '/services/real-estate' },
    { name: 'Wealth & Investment', path: '/services/wealth-investment' },
    { name: 'Business Consulting', path: '/services/business-consulting' },
    { name: 'Business Setup', path: '/services/business-setup' },
    { name: 'Property Development', path: '/services/property-development' },
  ];

  const getNavLinks = () => {
    const links = [...navLinks];
    if (user) links.push({ name: 'Dashboard', path: '/dashboard' });
    return links;
  };

  const isActive = (path: string) => location.pathname === path;
  const isServicesActive = () => location.pathname.startsWith('/services');

  const textColor = isScrolled ? 'text-black' : 'text-white';
  const hoverColor = isScrolled ? 'hover:text-primary' : 'hover:text-primary';
  const borderColor = isScrolled ? 'border-black' : 'border-white';
  
  const dropdownBg = isScrolled ? 'bg-white' : 'bg-black/90 backdrop-blur-md';
  const dropdownTextColor = isScrolled ? 'text-gray-800' : 'text-white';
  const dropdownHoverBg = isScrolled ? 'hover:bg-gray-100' : 'hover:bg-white/20';
  const dropdownBorder = isScrolled ? 'border-gray-200' : 'border-white/20';

  // Services Dropdown Component
  const ServicesDropdown = () => (
    <div className="relative">
      <button
        className={`text-sm font-medium transition-all duration-300 flex items-center gap-1 
          ${isServicesActive() || isServicesDropdownOpen 
            ? 'text-primary border-b-2 border-primary' 
            : `${textColor} ${hoverColor}`
          }`}
        onClick={() => setIsServicesDropdownOpen(!isServicesDropdownOpen)}
      >
        Services
        <ChevronDown
          className={`h-4 w-4 transition-transform ${
            isServicesDropdownOpen ? 'rotate-180' : ''
          }`}
        />
      </button>

      {isServicesDropdownOpen && (
        <div className={`absolute top-full left-0 mt-2 w-64 border rounded-lg shadow-lg py-2 z-50 ${dropdownBg} ${dropdownBorder}`}>
          {mainServiceCategories.map((category, index) => (
            <Link
              key={index}
              to={category.path}
              className={`flex items-center px-4 py-2 text-sm transition-colors ${dropdownTextColor} ${dropdownHoverBg}`}
              onClick={() => setIsServicesDropdownOpen(false)}
            >
              {category.name}
            </Link>
          ))}
        </div>
      )}
    </div>
  );

  // Mobile Services Menu
  const MobileServicesMenu = () => (
    <div className="border-t mt-4 pt-4 border-white/20">
      <div className="text-sm font-medium px-2 py-1 opacity-60 mb-2">
        Services
      </div>
      {mainServiceCategories.map((category, index) => (
        <Link
          key={index}
          to={category.path}
          onClick={() => setIsMobileMenuOpen(false)}
          className="block py-2 px-4 text-sm transition-colors hover:text-primary"
        >
          {category.name}
        </Link>
      ))}
    </div>
  );

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
            {getNavLinks().map((link) => (
              <Link
                key={link.path}
                to={link.path}
                className={`text-sm font-medium transition-all duration-300 flex items-center gap-1 
                  ${isActive(link.path)
                    ? 'text-primary border-b-2 border-primary'
                    : `${textColor} ${hoverColor}`
                  }`}
              >
                {link.name === 'Dashboard' && <LayoutDashboard className="h-4 w-4" />}
                {link.name}
              </Link>
            ))}

            {/* Services Dropdown */}
            <ServicesDropdown />

            {/* Login Dropdown */}
            <div className="relative">
              <button
                className={`text-sm font-medium transition-all duration-300 flex items-center gap-1 
                  ${isLoginDropdownOpen ? 'text-primary border-b-2 border-primary' : `${textColor} ${hoverColor}`}
                `}
                onClick={() => setIsLoginDropdownOpen(!isLoginDropdownOpen)}
              >
                {user ? (
                  <>
                    <User className="h-4 w-4" />
                    My Account
                    <ChevronDown
                      className={`h-4 w-4 transition-transform ${
                        isLoginDropdownOpen ? 'rotate-180' : ''
                      }`}
                    />
                  </>
                ) : (
                  <>
                    Login
                    <ChevronDown
                      className={`h-4 w-4 transition-transform ${
                        isLoginDropdownOpen ? 'rotate-180' : ''
                      }`}
                    />
                  </>
                )}
              </button>

              {isLoginDropdownOpen && (
                <div className={`absolute top-full left-0 mt-2 w-48 border rounded-lg shadow-lg py-2 z-50 ${dropdownBg} ${dropdownBorder}`}>
                  {user ? (
                    <>
                      <Link
                        to="/dashboard"
                        className={`flex items-center gap-3 px-4 py-2 text-sm transition-colors ${dropdownTextColor} ${dropdownHoverBg}`}
                        onClick={() => setIsLoginDropdownOpen(false)}
                      >
                        <LayoutDashboard className="h-4 w-4" />
                        <span>Dashboard</span>
                      </Link>
                      <Link
                        to="/settings"
                        className={`flex items-center gap-3 px-4 py-2 text-sm transition-colors ${dropdownTextColor} ${dropdownHoverBg}`}
                        onClick={() => setIsLoginDropdownOpen(false)}
                      >
                        <User className="h-4 w-4" />
                        <span>My Profile</span>
                      </Link>
                      <div className={`border-t my-1 ${isScrolled ? 'border-gray-200' : 'border-white/20'}`}></div>
                      <Link
                        to="/auth"
                        className={`flex items-center gap-3 px-4 py-2 text-sm transition-colors ${dropdownTextColor} ${dropdownHoverBg}`}
                        onClick={() => setIsLoginDropdownOpen(false)}
                      >
                        <Shield className="h-4 w-4" />
                        <span>Admin Panel</span>
                      </Link>
                    </>
                  ) : (
                    <>
                      <Link
                        to="/member-auth"
                        className={`flex items-center gap-3 px-4 py-2 text-sm transition-colors ${dropdownTextColor} ${dropdownHoverBg}`}
                        onClick={() => setIsLoginDropdownOpen(false)}
                      >
                        <User className="h-4 w-4" />
                        <span>Member Login</span>
                      </Link>
                      <Link
                        to="/auth"
                        className={`flex items-center gap-3 px-4 py-2 text-sm transition-colors ${dropdownTextColor} ${dropdownHoverBg}`}
                        onClick={() => setIsLoginDropdownOpen(false)}
                      >
                        <Shield className="h-4 w-4" />
                        <span>Admin Login</span>
                      </Link>
                    </>
                  )}
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
              isScrolled ? 'bg-white text-black' : 'bg-black/90 text-white backdrop-blur-md'
            }`}
          >
            {getNavLinks().map((link) => (
              <Link
                key={link.path}
                to={link.path}
                onClick={() => setIsMobileMenuOpen(false)}
                className={`block py-2 text-sm font-medium transition-colors ${
                  isActive(link.path)
                    ? 'text-primary'
                    : isScrolled
                    ? 'text-black hover:text-primary'
                    : 'text-white/80 hover:text-primary'
                }`}
              >
                {link.name}
              </Link>
            ))}

            {/* Mobile Services Menu */}
            <MobileServicesMenu />

            {/* Login Options */}
            <div className="border-t mt-4 pt-4 border-white/20">
              <div className="text-sm font-medium px-2 py-1 opacity-60">
                Login Options
              </div>
              <Link
                to="/member-auth"
                onClick={() => setIsMobileMenuOpen(false)}
                className="flex items-center gap-3 py-2 text-sm transition-colors hover:text-primary"
              >
                <User className="h-4 w-4" />
                <span>Member Login</span>
              </Link>
              <Link
                to="/auth"
                onClick={() => setIsMobileMenuOpen(false)}
                className="flex items-center gap-3 py-2 text-sm transition-colors hover:text-primary"
              >
                <Shield className="h-4 w-4" />
                <span>Admin Login</span>
              </Link>
            </div>
          </div>
        )}
      </div>

      {/* Overlay to close dropdowns */}
      {(isLoginDropdownOpen || isServicesDropdownOpen) && (
        <div
          className="fixed inset-0 z-40"
          onClick={() => {
            setIsLoginDropdownOpen(false);
            setIsServicesDropdownOpen(false);
          }}
        />
      )}
    </nav>
  );
};

export default Navbar;