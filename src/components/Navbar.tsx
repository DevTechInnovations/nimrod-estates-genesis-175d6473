import { useState, useEffect } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { Menu, X, ChevronDown, User, Shield, LayoutDashboard } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { useAuth } from '@/contexts/AuthContext';

const Navbar = () => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [isLoginDropdownOpen, setIsLoginDropdownOpen] = useState(false);
  const location = useLocation();
  const { user } = useAuth();

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20);
    };

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

  // Add dashboard link to navLinks when user is logged in
  const getNavLinks = () => {
    const links = [...navLinks];
    if (user) {
      links.push({ name: 'Dashboard', path: '/dashboard' });
    }
    return links;
  };

  const isActive = (path: string) => location.pathname === path;

  return (
    <nav
      className={`fixed top-0 w-full z-50 transition-all duration-300 ${
        isScrolled ? 'bg-background/95 backdrop-blur-md shadow-lg' : 'bg-transparent'
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
                className={`text-sm font-medium transition-all duration-300 flex items-center gap-1 ${
                  isActive(link.path)
                    ? 'text-primary border-b-2 border-primary'
                    : 'text-foreground hover-gold'
                } ${link.name === 'Dashboard' ? 'text-gold-600 hover:text-gold-600' : ''}`}
              >
                {link.name === 'Dashboard' && <LayoutDashboard className="h-4 w-4" />}
                {link.name}
              </Link>
            ))}
            
            {/* Login Dropdown - Styled like other nav items */}
            <div className="relative">
              <button
                className={`text-sm font-medium transition-all duration-300 flex items-center gap-1 ${
                  isLoginDropdownOpen
                    ? 'text-primary border-b-2 border-primary'
                    : 'text-foreground hover-gold'
                } ${user ? 'text-gold-600 hover:text-gold-600' : ''}`}
                onClick={() => setIsLoginDropdownOpen(!isLoginDropdownOpen)}
              >
                {user ? (
                  <>
                    <User className="h-4 w-4" />
                    My Account
                    <ChevronDown className={`h-4 w-4 transition-transform ${isLoginDropdownOpen ? 'rotate-180' : ''}`} />
                  </>
                ) : (
                  <>
                    Login
                    <ChevronDown className={`h-4 w-4 transition-transform ${isLoginDropdownOpen ? 'rotate-180' : ''}`} />
                  </>
                )}
              </button>
              
              {isLoginDropdownOpen && (
                <div className="absolute top-full right-0 mt-2 w-48 bg-background border border-border rounded-lg shadow-lg py-2 z-50">
                  {user ? (
                    <>
                      <Link
                        to="/dashboard"
                        className="flex items-center gap-3 px-4 py-2 text-sm text-foreground hover:bg-accent transition-colors"
                        onClick={() => setIsLoginDropdownOpen(false)}
                      >
                        <LayoutDashboard className="h-4 w-4" />
                        <span>Dashboard</span>
                      </Link>
                      <Link
                        to="/settings"
                        className="flex items-center gap-3 px-4 py-2 text-sm text-foreground hover:bg-accent transition-colors"
                        onClick={() => setIsLoginDropdownOpen(false)}
                      >
                        <User className="h-4 w-4" />
                        <span>My Profile</span>
                      </Link>
                      <div className="border-t border-border my-1"></div>
                      <Link
                        to="/auth"
                        className="flex items-center gap-3 px-4 py-2 text-sm text-foreground hover:bg-accent transition-colors"
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
                        className="flex items-center gap-3 px-4 py-2 text-sm text-foreground hover:bg-accent transition-colors"
                        onClick={() => setIsLoginDropdownOpen(false)}
                      >
                        <User className="h-4 w-4" />
                        <span>Member Login</span>
                      </Link>
                      <Link
                        to="/auth"
                        className="flex items-center gap-3 px-4 py-2 text-sm text-foreground hover:bg-accent transition-colors"
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
            className="md:hidden text-foreground"
            onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
          >
            {isMobileMenuOpen ? <X size={24} /> : <Menu size={24} />}
          </button>
        </div>

        {/* Mobile Menu */}
        {isMobileMenuOpen && (
          <div className="md:hidden py-4 bg-background/95 backdrop-blur-md">
            {getNavLinks().map((link) => (
              <Link
                key={link.path}
                to={link.path}
                onClick={() => setIsMobileMenuOpen(false)}
                className={`flex items-center gap-3 py-2 text-sm font-medium transition-colors ${
                  isActive(link.path) ? 'text-primary' : 'text-foreground hover:text-primary'
                } ${link.name === 'Dashboard' ? 'text-green-600 hover:text-green-700' : ''}`}
              >
                {link.name === 'Dashboard' && <LayoutDashboard className="h-4 w-4" />}
                {link.name}
              </Link>
            ))}
            
            {/* Mobile Login Options - Styled as simple links */}
            <div className="border-t border-border mt-4 pt-4">
              <div className="text-sm font-medium text-foreground/60 px-2 py-1">
                {user ? 'My Account' : 'Login Options'}
              </div>
              {user ? (
                <>
                  <Link
                    to="/dashboard"
                    onClick={() => setIsMobileMenuOpen(false)}
                    className="flex items-center gap-3 py-2 text-sm text-foreground hover:text-primary transition-colors"
                  >
                    <LayoutDashboard className="h-4 w-4" />
                    <span>Dashboard</span>
                  </Link>
                  <Link
                    to="/profile"
                    onClick={() => setIsMobileMenuOpen(false)}
                    className="flex items-center gap-3 py-2 text-sm text-foreground hover:text-primary transition-colors"
                  >
                    <User className="h-4 w-4" />
                    <span>My Profile</span>
                  </Link>
                  <Link
                    to="/auth"
                    onClick={() => setIsMobileMenuOpen(false)}
                    className="flex items-center gap-3 py-2 text-sm text-foreground hover:text-primary transition-colors"
                  >
                    <Shield className="h-4 w-4" />
                    <span>Admin Panel</span>
                  </Link>
                </>
              ) : (
                <>
                  <Link
                    to="/member-auth"
                    onClick={() => setIsMobileMenuOpen(false)}
                    className="flex items-center gap-3 py-2 text-sm text-foreground hover:text-primary transition-colors"
                  >
                    <User className="h-4 w-4" />
                    <span>Member Login</span>
                  </Link>
                  <Link
                    to="/auth"
                    onClick={() => setIsMobileMenuOpen(false)}
                    className="flex items-center gap-3 py-2 text-sm text-foreground hover:text-primary transition-colors"
                  >
                    <Shield className="h-4 w-4" />
                    <span>Admin Login</span>
                  </Link>
                </>
              )}
            </div>
          </div>
        )}
      </div>

      {/* Close dropdown when clicking outside */}
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